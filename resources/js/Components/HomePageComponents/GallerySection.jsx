// resources/js/components/GallerySection.jsx
import React, { useRef, useEffect, useState } from "react";

export default function GallerySection({ galleries = [] }) {
    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Duplikat foto untuk efek infinite scroll yang mulus
    const photos = galleries.length > 0 ? galleries : Array(12).fill(null);
    const extendedPhotos = [...photos, ...photos]; // duplikat untuk infinite

    // Hitung lebar satu item (280px + gap 24px = 304px)
    const ITEM_WIDTH = 304;

    useEffect(() => {
        if (isPaused || photos.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                const next = prev + 1;
                // Reset ke tengah array asli saat sudah melewati duplikat
                if (next >= photos.length) {
                    // Langsung lompat ke posisi asli tanpa animasi terlihat patah
                    setTimeout(() => {
                        scrollRef.current.style.transition = 'none';
                        scrollRef.current.scrollLeft = 0;
                        requestAnimationFrame(() => {
                            scrollRef.current.style.transition = 'scroll-left 0.6s ease-in-out';
                        });
                    }, 50);
                    return 0;
                }
                return next;
            });

            // Scroll halus
            if (scrollRef.current) {
                scrollRef.current.scrollBy({
                    left: ITEM_WIDTH,
                    behavior: "smooth",
                });
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [isPaused, photos.length]);

    // Update currentIndex berdasarkan scroll position
    const handleScroll = () => {
        if (!scrollRef.current) return;
        const scrollLeft = scrollRef.current.scrollLeft;
        const index = Math.round(scrollLeft / ITEM_WIDTH) % photos.length;
        setCurrentIndex(index);
    };

    return (
        <section id="gallery" className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Judul */}
                <div className="text-center mb-16">
                    <h2 className="text-lg font-bold tracking-wider text-sky-600 uppercase">
                        Visual Keindahan
                    </h2>
                    <h3 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900">
                        Galeri Foto Kampung Wisata Mutiara
                    </h3>
                    <p className="mt-4 text-lg text-gray-600">
                        Nikmati momen indah yang bergerak otomatis
                    </p>
                </div>

                {/* Gallery Container */}
                <div
                    className="relative overflow-hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex gap-6 overflow-x-hidden scroll-smooth pb-8
                            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
                            max-w-[1300px] mx-auto"
                        style={{ scrollBehavior: "smooth" }}
                    >
                        {extendedPhotos.map((foto, index) => (
                            <div
                                key={`${foto?.id || 'placeholder'}-${index}`}
                                className="flex-none w-[280px] relative overflow-hidden rounded-3xl 
                                    shadow-xl bg-gray-100 group/item transition-all duration-500 
                                    hover:scale-[1.03] hover:shadow-sky-300"
                            >
                                {foto?.image_url ? (
                                    <>
                                        <img
                                            src={foto.image_url}
                                            alt={foto.title || `Galeri ${index + 1}`}
                                            className="w-full h-80 object-cover transition-transform duration-700 
                                                group-hover/item:scale-110"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t 
                                            from-black/80 via-black/20 to-transparent 
                                            opacity-0 group-hover/item:opacity-100 
                                            transition-all duration-500 flex items-end">
                                            <div className="p-6 text-white translate-y-6 
                                                group-hover/item:translate-y-0 transition-transform duration-500">
                                                <h4 className="text-xl font-bold drop-shadow-lg">
                                                    {foto.title || "Momen Indah di Mutiara"}
                                                </h4>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-80 bg-gradient-to-br 
                                        from-sky-100 via-cyan-50 to-emerald-100 
                                        flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-24 h-24 mx-auto mb-4 bg-white/80 rounded-full 
                                                flex items-center justify-center shadow-xl">
                                                <svg className="w-14 h-14 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <p className="text-sky-700 font-bold text-lg">Foto Segera Hadir</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {photos.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCurrentIndex(index);
                                    scrollRef.current.scrollTo({
                                        left: index * ITEM_WIDTH,
                                        behavior: "smooth",
                                    });
                                }}
                                className={`transition-all duration-300 rounded-full ${
                                    currentIndex === index
                                        ? "w-10 h-3 bg-sky-600"
                                        : "w-3 h-3 bg-gray-300 hover:bg-sky-400"
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}