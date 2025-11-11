import React, { useState, useRef, useEffect } from "react";

export default function ChatBotSection({ Send, MessageCircle }) {
    // State untuk Chatbot (sudah ada)
    const [messages, setMessages] = useState([
        {
            role: "ai",
            text: "Selamat datang di Panduan Wisata Kampung Wisata Mutiara! Saya adalah asisten virtual Anda. Silakan tanyakan apa saja tentang Kampung Wisata Mutiara!",
            sources: [],
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    useRef;
    const messagesEndRef = useRef(null);

    // Function to scroll to the bottom of the chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Function to call Gemini API
    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setIsLoading(true);

        // Add user message to state immediately
        setMessages((prev) => [...prev, { role: "user", text: userMessage }]);

        try {
            const systemPrompt =
                "Anda adalah pemandu wisata virtual yang ramah dan informatif tentang Kampung Wisata Mutiara di Medan, Sumatera Utara. Jawab semua pertanyaan wisatawan dalam Bahasa Indonesia, berikan detail spesifik tentang tempat wisata tersebut (sejarah, aktivitas, harga tiket jika ada, jam buka, dll.). Jawablah dengan ringkas dan langsung ke intinya. Jika Anda merujuk pada informasi eksternal (dari search grounding), berikan kutipan sumber di akhir jawaban.";
            const userQuery = userMessage;
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

            const payload = {
                contents: [{ parts: [{ text: userQuery }] }],
                // Enable Google Search grounding for accurate, real-time info
                tools: [{ google_search: {} }],
                systemInstruction: {
                    parts: [{ text: systemPrompt }],
                },
            };

            let response;
            for (let i = 0; i < 3; i++) {
                // Exponential backoff retry logic
                try {
                    response = await fetch(apiUrl, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                    });
                    if (response.ok) break;
                } catch (error) {
                    if (i < 2) {
                        await new Promise((resolve) =>
                            setTimeout(resolve, Math.pow(2, i) * 1000)
                        );
                    } else {
                        throw error;
                    }
                }
            }

            const result = await response.json();
            const candidate = result.candidates?.[0];
            let aiText =
                "Maaf, terjadi kesalahan dalam memproses permintaan Anda.";
            let sources = [];

            if (candidate && candidate.content?.parts?.[0]?.text) {
                aiText = candidate.content.parts[0].text;

                const groundingMetadata = candidate.groundingMetadata;
                if (
                    groundingMetadata &&
                    groundingMetadata.groundingAttributions
                ) {
                    sources = groundingMetadata.groundingAttributions
                        .map((attribution) => ({
                            uri: attribution.web?.uri,
                            title: attribution.web?.title,
                        }))
                        .filter((source) => source.uri && source.title);
                }
            }

            setMessages((prev) => [
                ...prev,
                { role: "ai", text: aiText, sources },
            ]);
        } catch (error) {
            console.error("API Error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    text: "Maaf, ada masalah koneksi. Silakan coba lagi.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <section id="chatbot" className="py-16 md:py-24 bg-white">
                <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-base font-semibold tracking-wider text-sky-600 uppercase text-center">
                        Bantuan Cepat
                    </h2>
                    <h3 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-8 flex justify-center items-center">
                        <MessageCircle className="w-8 h-8 mr-2 text-sky-600" />
                        Panduan AI Wisata
                    </h3>

                    <div className="bg-gray-100 rounded-xl shadow-2xl flex flex-col h-[500px]">
                        {/* Message History */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${
                                        msg.role === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-xl shadow-md ${
                                            msg.role === "user"
                                                ? "bg-sky-500 text-white rounded-br-none"
                                                : "bg-white text-gray-800 rounded-tl-none"
                                        }`}
                                    >
                                        <p className="whitespace-pre-wrap">
                                            {msg.text}
                                        </p>
                                        {msg.sources &&
                                            msg.sources.length > 0 && (
                                                <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-500 italic">
                                                    <span className="font-semibold">
                                                        Sumber:
                                                    </span>
                                                    {msg.sources.map(
                                                        (source, i) => (
                                                            <a
                                                                key={i}
                                                                href={
                                                                    source.uri
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="block text-sky-600 hover:underline"
                                                            >
                                                                {i + 1}.{" "}
                                                                {source.title}
                                                            </a>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-3 rounded-xl shadow-md rounded-tl-none text-gray-500">
                                        <svg
                                            className="animate-spin h-5 w-5 text-sky-600 inline mr-2"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        AI sedang berpikir...
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Form */}
                        <form
                            onSubmit={sendMessage}
                            className="p-4 bg-white border-t border-gray-200 flex space-x-3 rounded-b-xl"
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Tanyakan tentang Kampung Wisata Mutiara..."
                                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className={`p-3 rounded-lg text-white transition duration-200 ${
                                    input.trim() && !isLoading
                                        ? "bg-sky-600 hover:bg-sky-700"
                                        : "bg-gray-400 cursor-not-allowed"
                                }`}
                                disabled={!input.trim() || isLoading}
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
