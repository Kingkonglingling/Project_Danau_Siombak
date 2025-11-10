import React from "react";
import { Sailboat, Camera, Fish } from "lucide-react";

export default function AttractionsSection() {

  // Data Mockup untuk Atraksi
    const attractions = [
        {
            icon: Sailboat,
            title: "Menjelajah dengan Perahu",
            description: "Nikmati ketenangan danau dengan menyewa perahu atau kano. Rasakan hembusan angin segar dan pemandangan hijau.",
            color: 'text-sky-600',
        },
        {
            icon: Camera,
            title: "Spot Fotografi Alam",
            description: "Temukan berbagai sudut pandang memukau, terutama saat matahari terbit dan terbenam. Sempurna untuk pecinta fotografi.",
            color: 'text-orange-600',
        },
        {
            icon: Fish,
            title: "Aktivitas Memancing",
            description: "Danau Siombak dikenal memiliki beragam jenis ikan air tawar. Bawa peralatan Anda dan nikmati hobi memancing yang santai.",
            color: 'text-green-600',
        },
    ];

    return (

        <>
        
        <section id="attractions" className="py-16 md:py-24 bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-base font-semibold tracking-wider text-sky-600 uppercase">Kegiatan Utama</h2>
                        <h3 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900">
                            Nikmati Momen Tak Terlupakan
                        </h3>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                            Danau Siombak menawarkan berbagai aktivitas rekreasi yang cocok untuk keluarga, teman, maupun individu yang mencari ketenangan.
                        </p>

                        <div className="mt-12 grid gap-8 md:grid-cols-3">
                            {attractions.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border-t-4 border-sky-600"
                                >
                                    <div className={`p-4 inline-block rounded-full bg-sky-100 ${item.color}`}>
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <h4 className="mt-4 text-xl font-bold text-gray-900">{item.title}</h4>
                                    <p className="mt-2 text-gray-500">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
        
        </>
    );
}