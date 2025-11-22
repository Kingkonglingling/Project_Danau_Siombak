import React, { useRef, useEffect, useState } from "react";
// import { router } from "@inertiajs/react"; // InertiaJS dihapus untuk menghindari error lingkungan

export default function GallerySection({ galleries = [] }) {
    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    // State untuk menyimpan lebar item + gap secara dinamis (penting untuk scrolling akurat)
    const [itemScrollWidth, setItemScrollWidth] = useState(0); 

    // Menggunakan data placeholder jika 'galleries' kosong
    const photos = galleries.length > 0 ? galleries : Array(12).fill(null).map((_, i) => ({
        id: i + 1,
        image_url: null,
        title: `Placeholder Foto ${i + 1}`
    }));

    const AUTO_SCROLL_INTERVAL = 3000;
    // Terapkan auto-scroll hanya jika foto melebihi batas tampilan (4)
    const MIN_PHOTOS_FOR_SCROLL = 4; 
    const GAP_WIDTH_PX = 24; // Tailwind gap-6 is 1.5rem = 24px

    // 1. Dynamic Width Calculation on Mount/Resize
    // Fungsi untuk menghitung lebar scroll per item (Lebar Item + Gap)
    useEffect(() => {
        const calculateWidth = () => {
            if (scrollRef.current && scrollRef.current.children.length > 0) {
                // Ambil elemen anak pertama untuk mengukur lebar
                const firstChild = scrollRef.current.children[0];
                if (firstChild) {
                    const width = firstChild.offsetWidth;
                    // Lebar scroll = Lebar Item (offsetWidth) + Lebar Gap
                    setItemScrollWidth(width + GAP_WIDTH_PX);
                }
            }
        };

        // Hitungan awal
        calculateWidth();

        // Gunakan ResizeObserver untuk menghitung ulang saat ukuran layar berubah
        const observer = new ResizeObserver(() => {
            calculateWidth();
        });

        if (scrollRef.current) {
            observer.observe(scrollRef.current);
        }

        // Cleanup observer saat komponen dilepas
        return () => {
            if (scrollRef.current) {
                observer.unobserve(scrollRef.current);
            }
        };
    }, []); 


    // 2. Auto-Scroll Loop (menggunakan lebar dinamis)
    useEffect(() => {
        // Hanya jalankan scroll jika tidak di-pause, foto melebihi batas, dan lebar item sudah terhitung
        if (isPaused || photos.length <= MIN_PHOTOS_FOR_SCROLL || itemScrollWidth === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                if (!scrollRef.current || itemScrollWidth === 0) return prev;

                const maxScrollableIndex = photos.length - 1;
                const next = prev + 1;

                // Jika sudah sampai item terakhir → kembali ke awal
                if (next > maxScrollableIndex) {
                    scrollRef.current.scrollTo({
                        left: 0,
                        behavior: "smooth"
                    });
                    return 0;
                }

                // Scroll ke item berikutnya menggunakan lebar dinamis
                scrollRef.current.scrollTo({
                    left: next * itemScrollWidth,
                    behavior: "smooth",
                });

                return next;
            });
        }, AUTO_SCROLL_INTERVAL);

        return () => clearInterval(interval);
    }, [isPaused, photos.length, itemScrollWidth]); // itemScrollWidth sebagai dependency

    // 3. Update Index berdasarkan Manual Scroll
    const handleScroll = () => {
        if (!scrollRef.current || itemScrollWidth === 0) return;

        const scrollLeft = scrollRef.current.scrollLeft;
        // Hitung indeks terdekat berdasarkan scroll position
        const index = Math.round(scrollLeft / itemScrollWidth);

        // Update index hanya jika berbeda
        if (index !== currentIndex) {
            setCurrentIndex(index);
        }
    };

    // 4. Click Handler
    const handleClickPhoto = (foto) => {
        if (!foto?.id) return;
        // Mengganti router.visit dengan navigasi browser standar
        window.location.href = `/galeri/${foto.id}`; 
    };

    // 5. Manual Pagination Handler
    const handleDotClick = (index) => {
        if (!scrollRef.current || itemScrollWidth === 0) return;
        
        // Atur scrollLeft berdasarkan indeks dan lebar dinamis
        scrollRef.current.scrollTo({
            left: index * itemScrollWidth,
            behavior: "smooth",
        });
        setCurrentIndex(index);
    }

    return (
        <section id="gallery" className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 font-inter">
            <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                {/* JUDUL SECTION */}
                <div className="text-center mb-16">
                    <h2 className="text-lg font-bold tracking-wider text-sky-600 uppercase">
                        Visual Keindahan
                    </h2>
                    <h3 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900">
                        Galeri Foto Kampung Wisata Mutiara
                    </h3>
                </div>

                {/* GALLERY CONTAINER */}
                <div
                    className="relative overflow-hidden group/gallery"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        // Snap-x and scroll-smooth for enhanced manual user interaction
                        className="flex gap-6 overflow-x-scroll scroll-smooth pb-8 snap-x snap-mandatory 
                            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden 
                            max-w-full mx-auto cursor-grab active:cursor-grabbing"
                    >
                        {photos.map((foto, index) => (
                            <div
                                key={index}
                                onClick={() => handleClickPhoto(foto)}
                                // Responsive Item Widths (1, 2, 3, or 4 visible items plus gap)
                                className="flex-none 
                                    min-w-[calc(100%-2rem)] sm:min-w-[calc(50%-0.75rem)] md:min-w-[calc(33.33%-1rem)] lg:min-w-[calc(25%-1.125rem)] 
                                    relative overflow-hidden rounded-3xl snap-start 
                                    shadow-xl bg-white group/item transition-all duration-500 
                                    hover:scale-[1.03] hover:shadow-sky-300/80 cursor-pointer"
                            >
                                {/* Photo Content */}
                                <div className="w-full h-80">
                                    {foto?.image_url ? (
                                        <>
                                            <img
                                                src={foto.image_url}
                                                alt={foto.title || `Galeri ${index + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-700 
                                                    group-hover/item:scale-110"
                                                loading="lazy"
                                                // Fallback for missing image
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://placehold.co/400x320/e0f2fe/075985?text=Foto+Tidak+Ditemukan";
                                                }}
                                            />
                                            {/* Overlay for Title */}
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
                                        // Placeholder State (when image_url is null)
                                        <div className="w-full h-full bg-gradient-to-br 
                                            from-sky-100 via-cyan-50 to-emerald-100 
                                            flex items-center justify-center">
                                            <div className="text-center p-4">
                                                <div className="w-24 h-24 mx-auto mb-4 bg-white/90 rounded-full 
                                                    flex items-center justify-center shadow-xl border-4 border-white/50">
                                                    {/* Camera Icon */}
                                                    <svg className="w-14 h-14 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <p className="text-sky-800 font-extrabold text-xl mb-1">Segera Hadir</p>
                                                <p className="text-sky-700 font-medium text-sm">{foto.title || `Foto ${index + 1}`}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* DOTS PAGINATION (Hanya tampil jika foto melebihi batas) */}
                    {photos.length > MIN_PHOTOS_FOR_SCROLL && (
                        <div className="flex justify-center gap-2 mt-8">
                            {photos.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDotClick(index)}
                                    // Dot styling dengan efek aktif
                                    className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                                        currentIndex === index
                                            ? "w-10 h-3 bg-sky-600 shadow-lg shadow-sky-400/50"
                                            : "w-3 h-3 bg-gray-300 hover:bg-sky-400"
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}