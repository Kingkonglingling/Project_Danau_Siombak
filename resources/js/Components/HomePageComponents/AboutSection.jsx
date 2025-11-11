import React from "react";

export default function AboutSection( {MapPin} ) {

    return (

        <>
        
        <section id="about" className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-base font-semibold tracking-wider text-sky-600 uppercase">Tentang Kami</h2>
                            <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                                Danau Buatan di Tengah Hutan Mangrove
                            </h3>
                            <p className="text-gray-600 text-lg">
                                Danau Siombak adalah danau buatan dengan luas sekitar 15 hektar yang berlokasi di Kelurahan Paya Pasir, Medan Marelan. Keunikan danau ini terletak pada lokasinya yang dikelilingi oleh hutan mangrove yang hijau dan rimbun, menciptakan ekosistem alami yang menyejukkan.
                            </p>
                            <p className="text-gray-600 text-lg">
                                Sejak dibuka untuk umum, Danau Siombak menjadi salah satu destinasi rekreasi favorit bagi warga Medan dan sekitarnya. Tempat ini menawarkan kombinasi sempurna antara kegiatan air yang menyenangkan, pemandangan alam yang asri, dan kuliner lokal yang lezat.
                            </p>
                            <div className="flex items-center space-x-2 text-sky-600 font-semibold">
                                <MapPin className="w-5 h-5" />
                                <span>Medan Marelan, Sumatera Utara</span>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                            <img
                                src="https://media.istockphoto.com/id/1286474249/id/foto/surealis.jpg?s=612x612&w=0&k=20&c=Q1fnMpHqSe9RjhlyDy8b7jOlUsk7oVOwU0X5VaGNZIU="
                                alt="Pintu Masuk Wisata Danau Siombak"
                                className="w-full h-full object-cover transition duration-500 hover:scale-105"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://media.istockphoto.com/id/1286474249/id/foto/surealis.jpg?s=612x612&w=0&k=20&c=Q1fnMpHqSe9RjhlyDy8b7jOlUsk7oVOwU0X5VaGNZIU=" }}
                            />
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}