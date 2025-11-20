import React, { useRef } from "react";
import { Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

export default function ActivitySection({ activities = [] }) {
    const scrollRef = useRef(null);

    // Maksimal 4 card tampil → sisanya bisa discroll
    const items = activities.length > 0 ? activities : [
        { title: "Loading...", description: "Menunggu aktivitas...", date: null },
        { title: "Loading...", description: "Menunggu aktivitas...", date: null },
        { title: "Loading...", description: "Menunggu aktivitas...", date: null },
        { title: "Loading...", description: "Menunggu aktivitas...", date: null },
    ];

    const showArrows = items.length > 4;

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -500, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 500, behavior: "smooth" });
    };

    const colors = ["text-sky-600", "text-orange-600", "text-emerald-600", "text-purple-600", "text-amber-600", "text-rose-600"];

    return (
        <section id="attractions" className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                
                {/* Judul */}
                <h2 className="text-base font-semibold tracking-wider text-sky-600 uppercase">
                    Kegiatan Utama
                </h2>
                <h3 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900">
                    Nikmati Momen Tak Terlupakan
                </h3>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Kampung Wisata Mutiara menawarkan berbagai aktivitas rekreasi yang cocok untuk keluarga, teman, maupun individu yang mencari ketenangan.
                </p>

                {/* Wrapper untuk slider */}
                <div className="relative mt-12">

                    {/* Tombol Kiri */}
                    {showArrows && (
                        <button
                            onClick={scrollLeft}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3
                                       transition-all duration-300 hover:scale-110 border hover:shadow-sky-300 hidden md:block"
                        >
                            <ChevronLeft className="w-6 h-6 text-sky-600" />
                        </button>
                    )}

                    {/* Tombol Kanan */}
                    {showArrows && (
                        <button
                            onClick={scrollRight}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3
                                       transition-all duration-300 hover:scale-110 border hover:shadow-sky-300 hidden md:block"
                        >
                            <ChevronRight className="w-6 h-6 text-sky-600" />
                        </button>
                    )}

                    {/* Scroll Container */}
                    <div
                        ref={scrollRef}
                        className="
                            flex gap-6 overflow-x-auto scroll-smooth pb-8
                            [scrollbar-width:none]
                            [-ms-overflow-style:none]
                            [&::-webkit-scrollbar]:hidden
                            mx-auto
                            h-96
                            px-2
                            max-w-[1400px]   /* ⬅ batas 4 card */
                        "
                    >
                        {items.map((act, index) => (
                            <div
                                key={index}
                                className="
                                    min-w-[330px]   
                                    max-w-[330px]
                                    flex-shrink-0
                                    group relative bg-white p-8 rounded-2xl shadow-lg 
                                    hover:shadow-2xl transition-all duration-300 
                                    hover:-translate-y-2 border-t-4 border-sky-600 overflow-hidden
                                "
                            >
                                {/* Pattern */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full -translate-y-16 translate-x-16 opacity-40 group-hover:opacity-60 transition"></div>

                                {/* Gambar */}
                                {act.image_url ? (
                                    <div className="mb-6 -mt-16 -mx-8">
                                        <img
                                            src={act.image_url}
                                            alt={act.title}
                                            className="w-full h-48 object-cover rounded-t-2xl"
                                            loading="lazy"
                                        />
                                    </div>
                                ) : (
                                    <div className="mb-6 flex justify-center">
                                        <div className={`p-5 rounded-full bg-gradient-to-br from-sky-100 to-emerald-100 ${colors[index % colors.length]}`}>
                                            <MapPin className="w-10 h-10" />
                                        </div>
                                    </div>
                                )}

                                {/* Tanggal */}
                                {act.date && (
                                    <div className="flex items-center justify-center gap-2 text-sm text-emerald-600 font-medium mb-3">
                                        <Calendar className="w-4 h-4" />
                                        <span>{act.date}</span>
                                    </div>
                                )}

                                {/* Judul */}
                                <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                    {act.title}
                                </h4>

                                {/* Deskripsi */}
                                <p className="text-gray-600 leading-relaxed line-clamp-4">
                                    {act.description}
                                </p>

                                {/* Border Hover */}
                                <div className="absolute inset-0 border-2 border-sky-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
