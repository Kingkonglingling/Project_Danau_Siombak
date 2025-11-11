import React from "react";

export default function MapSection() {
    // Placeholder URL untuk Google Maps Directions
    const directionsUrl =
        "https://www.google.com/maps/dir/?api=1&destination=Danau+Siombak,+Medan+Marelan";

    return (
        <>
            <section id="location" className="py-16 md:py-24 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-base font-semibold tracking-wider text-sky-600 uppercase">
                        Temukan Kami
                    </h2>
                    <h3 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">
                        Lokasi Kampung Wisata Mutiara di Peta
                    </h3>

                    <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-sky-500">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15927.817457319973!2d98.6657929!3d3.6938992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312e75e47858c7%3A0xc30349a37e108e4d!2sDanau%20Siombak!5e0!3m2!1sid!2sid!4v1701337483863!5m2!1sid!2sid"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Peta Lokasi Kampung Wisata Mutiara"
                            className="w-full"
                        ></iframe>
                    </div>

                    <p className="mt-6 text-lg text-gray-600">
                        Peta di atas menunjukkan lokasi Kampung Wisata Mutiara.
                        Gunakan tombol 'Cek Rute' untuk navigasi.
                    </p>
                </div>
            </section>

            <section className="bg-sky-700 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h3 className="text-3xl md:text-4xl font-bold">
                        Rencanakan Liburan Anda Sekarang!
                    </h3>
                    <p className="mt-4 text-xl font-light opacity-90">
                        Kunjungi Kampung Wisata Mutiara dan rasakan pengalaman
                        berlibur yang damai di tengah alam.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
                        {/* NEW: Cek Rute Button */}
                        <a
                            href={directionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-3 bg-red-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-red-600 transition duration-300 transform hover:scale-105"
                        >
                            Cek Rute
                        </a>
                        {/* Existing: Lihat di Peta Button (Modified) */}
                        <a
                            href="#location"
                            className="inline-block px-8 py-3 bg-white text-sky-700 font-bold text-lg rounded-full shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105"
                        >
                            Lihat di Peta
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
