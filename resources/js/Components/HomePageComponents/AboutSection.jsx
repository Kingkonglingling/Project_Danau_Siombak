import React from "react";

export default function AboutSection({ about, MapPin }) {
    const title = about?.title ?? "Tentang Kami";
    const location = about?.location ?? "";
    const imageUrl = about?.image_url ?? null;

    // content dari DB biasanya 1 kolom panjang.
    // biar mirip 2 paragraf kayak desainmu, kita split by newline.
    const paragraphs = (about?.content || "")
        .split(/\n\s*\n/) // pisah antar paragraf pakai baris kosong
        .map((p) => p.trim())
        .filter(Boolean);

    return (
        <section id="about" className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-base font-semibold tracking-wider text-sky-600 uppercase">
                            Tentang Kami
                        </h2>

                        <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                            {title}
                        </h3>

                        {paragraphs.length ? (
                            paragraphs.map((p, idx) => (
                                <p key={idx} className="text-gray-600 text-lg">
                                    {p}
                                </p>
                            ))
                        ) : (
                            <p className="text-gray-600 text-lg">
                                Konten belum diisi.
                            </p>
                        )}

                        {!!location && (
                            <div className="flex items-center space-x-2 text-sky-600 font-semibold">
                                <MapPin className="w-5 h-5" />
                                <span>{location}</span>
                            </div>
                        )}
                    </div>

                    <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-slate-100">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={title}
                                className="w-full h-full object-cover transition duration-500 hover:scale-105"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "https://via.placeholder.com/1200x750?text=About+Image";
                                }}
                            />
                        ) : (
                            <div className="aspect-[16/10] flex items-center justify-center text-sm text-slate-500">
                                Belum ada gambar
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
