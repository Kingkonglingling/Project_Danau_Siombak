// resources/js/components/GallerySection.jsx

import React from "react";

export default function GallerySection({ galleries = [] }) {
    // Jika belum ada foto, tampilkan placeholder cantik
    const photos = galleries.length > 0 ? galleries : Array(8).fill(null);

    return (
        <section id="gallery" className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Judul Section */}
                <div className="text-center mb-12">
                    <h2 className="text-base font-semibold tracking-wider text-sky-600 uppercase">
                        Visual Keindahan
                    </h2>
                    <h3 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900">
                        Galeri Foto Kampung Wisata Mutiara
                    </h3>
                </div>

                {/* Grid Foto */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                    {photos.map((foto, index) => (
                        <div
                            key={foto?.id || index}
                            className="group relative overflow-hidden rounded-2xl shadow-lg bg-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                        >
                            {foto ? (
                                <>
                                    <img
                                        src={foto.image_url}
                                        alt={foto.title || `Galeri Kampung Wisata Mutiara ${index + 1}`}
                                        className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    {/* Overlay Judul saat hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                        <p className="text-white text-sm font-medium p-4 line-clamp-2">
                                            {foto.title || "Keindahan Alam Mutiara"}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                // Placeholder kalau belum ada foto
                                <div className="w-full h-64 md:h-80 bg-gradient-to-br from-sky-100 to-emerald-100 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-16 h-16 mx-auto mb-3 bg-white/70 rounded-full flex items-center justify-center">
                                            <svg className="w-10 h-10 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-600 font-medium">Foto Segera Hadir</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Tombol Lihat Semua */}
                <div className="mt-12 text-center">
                    <a
                        href="/galeri"
                        className="inline-flex items-center gap-3 rounded-full bg-sky-600 px-8 py-3.5 text-white font-semibold hover:bg-sky-700 transition shadow-lg hover:shadow-xl"
                    >
                        Lihat Semua Foto
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}