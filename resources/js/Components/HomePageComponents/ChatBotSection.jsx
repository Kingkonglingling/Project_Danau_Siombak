import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


axios.defaults.withCredentials = true;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export default function ChatBotSection({ Send, MessageCircle }) {
    const [messages, setMessages] = useState([
        {
            role: "ai",
            text: "Selamat datang di Panduan Wisata Kampung Wisata Mutiara! Saya adalah asisten virtual Anda. Silakan tanyakan apa saja tentang Kampung Wisata Mutiara!",
            sources: [],
        },
    ]);

    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);

    const chatContainerRef = useRef(null);

    const inputRef = useRef(null);

    // Auto-scroll
   const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Auto-focus input
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput("");
        setIsLoading(true);

        // Tampilkan pesan user
        setMessages(prev => [...prev, { role: "user", text: userMsg }]);

        try {
            const apiUrl = "/chatbot";

            let response = null;

            // Retry logic (3x)
            for (let attempt = 0; attempt < 3; attempt++) {
                try {
                    response = await axios.post(apiUrl, {
                        message: userMsg,
                    });
                    break;
                } catch (err) {
                    if (attempt < 2) {
                        await new Promise(res => setTimeout(res, 1000 * (attempt + 1)));
                    } else {
                        throw err;
                    }
                }
            }

            const result = response?.data ?? null;

            const aiText = result?.reply || "Maaf, saya tidak dapat memahami permintaan Anda.";
            const sources = result?.sources ?? [];

            setMessages(prev => [
                ...prev,
                { role: "ai", text: aiText, sources }
            ]);

        } catch (error) {
            console.error("Chatbot Error:", error);

            setMessages(prev => [
                ...prev,
                { role: "ai", text: "Maaf, ada masalah koneksi. Silakan coba lagi." }
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
                        <div
                        ref={chatContainerRef}
                        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
                        >
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${
                                        msg.role === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
    {/* ============ BUBBLE AI (BARU) ============ */}
                                    {msg.role === "ai" ? (
                                        <div className="relative max-w-[85%] bg-white shadow-md border border-gray-200 rounded-xl p-4">

                                            {/* Garis biru kiri */}
                                            <div className="absolute left-0 top-0 h-full w-1 bg-sky-500 rounded-l-xl"></div>

                                            {/* Header AI */}
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="p-2 bg-sky-100 text-sky-600 rounded-full">
                                                    🤖
                                                </span>
                                                <span className="font-semibold text-gray-700">
                                                    Asisten Wisata
                                                </span>
                                            </div>

                                            {/* Isi */}
                                            <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {msg.text}
                                                </ReactMarkdown>
                                            </div>

                                            {/* Sumber */}
                                            {msg.sources &&
                                                msg.sources.length > 0 && (
                                                    <div className="mt-3 border-t pt-2 text-xs text-gray-500">
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
                                                                    {
                                                                        source.title
                                                                    }
                                                                </a>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                        </div>
                                    ) : (
                                        /* ============ BUBBLE USER ============ */
                                        <div className="max-w-[80%] p-3 rounded-xl shadow-md bg-sky-500 text-white rounded-br-none">
                                            <p className="whitespace-pre-wrap">
                                                {msg.text}
                                            </p>
                                        </div>
                                    )}
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
                                        Proses...
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
