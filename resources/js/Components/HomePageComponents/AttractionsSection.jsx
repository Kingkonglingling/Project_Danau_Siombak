
import React from "react";
import { Calendar, MapPin, Clock } from "lucide-react";

export default function ActivitySection({ activities = [] }) {
    // Kalau belum ada data → tampilkan placeholder cantik
    const items = activities.length > 0 ? activities : [
        { title: "Loading...", description: "Menunggu aktivitas...", date: null },
        { title: "Loading...", description: "Menunggu aktivitas...", date: null },
        { title: "Loading...", description: "Menunggu aktivitas...", date: null },
    ];

    // Warna icon random biar cantik (bisa diganti sesuai tema)
    const colors = ["text-sky-600", "text-orange-600", "text-emerald-600", "text-purple-600", "text-amber-600", "text-rose-600"];

    return (
        <section id="attractions" className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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

                {/* Grid Aktivitas */}
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {items.map((act, index) => (
                        <div
                            key={act.id || index}
                            className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-sky-600 overflow-hidden"
                        >
                            {/* Background Pattern (opsional) */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full -translate-y-16 translate-x-16 opacity-40 group-hover:opacity-60 transition"></div>

                            {/* Foto Aktivitas (kalau ada) */}
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
                                    <div className={`p-5 inline-block rounded-full bg-gradient-to-br from-sky-100 to-emerald-100 ${colors[index % colors.length]}`}>
                                        <MapPin className="w-10 h-10" />
                                    </div>
                                </div>
                            )}

                            {/* Tanggal (kalau ada) */}
                            {act.date && (
                                <div className="flex items-center justify-center gap-2 text-sm text-emerald-600 font-medium mb-3">
                                    <Calendar className="w-4 h-4" />
                                    <span>{act.date}</span>
                                </div>
                            )}

                            {/* Judul */}
                            <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                {act.title || "Aktivitas Menarik"}
                            </h4>

                            {/* Deskripsi */}
                            <p className="text-gray-600 leading-relaxed line-clamp-4">
                                {act.description || "Segera hadir aktivitas seru untuk Anda nikmati bersama keluarga dan teman di Kampung Wisata Mutiara."}
                            </p>

                            {/* Hover Effect */}
                            <div className="absolute inset-0 border-2 border-sky-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        </div>
                    ))}
                </div>

                {/* Tombol Lihat Semua */}
                <div className="mt-12">
                    <a
                        href="/aktivitas"
                        className="inline-flex items-center gap-3 bg-sky-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-sky-700 transition shadow-xl hover:shadow-2xl"
                    >
                        Lihat Semua Aktivitas
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}