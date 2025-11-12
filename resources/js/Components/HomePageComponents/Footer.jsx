import React from "react";

export default function Footer({ MapPin, logoSrc = "/apple-touch-icon.png" }) {
    return (
        <footer
            id="contact"
            className="bg-gray-900 text-white py-12 backdrop-blur-sm"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Brand + blurb */}
                    <div className="col-span-2 md:col-span-1 space-y-3">
                        <a href="/" className="inline-flex items-center gap-3">
                            <img
                                src={logoSrc}
                                alt="Brand Logo"
                                className="h-24 w-auto object-contain"
                                loading="lazy"
                                decoding="async"
                            />
                        </a>
                        <p className="text-sm text-gray-400">
                            Destinasi wisata alam terbaik di Medan Utara.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            {MapPin ? (
                                <MapPin className="w-4 h-4 shrink-0" />
                            ) : null}
                            <span>Paya Pasir, Medan Marelan</span>
                        </div>
                    </div>

                    {/* Navigasi */}
                    <div>
                        <h4 className="font-semibold mb-3 text-sky-400">
                            Navigasi
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <a
                                    href="#home"
                                    className="hover:text-white transition"
                                >
                                    Beranda
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#about"
                                    className="hover:text-white transition"
                                >
                                    Tentang
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#attractions"
                                    className="hover:text-white transition"
                                >
                                    Aktivitas
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#location"
                                    className="hover:text-white transition"
                                >
                                    Lokasi
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#chatbot"
                                    className="hover:text-white transition"
                                >
                                    Panduan AI
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Informasi */}
                    <div>
                        <h4 className="font-semibold mb-3 text-sky-400">
                            Informasi
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Jam Operasional</li>
                            <li>Tiket Masuk</li>
                            <li>FAQ</li>
                        </ul>
                    </div>

                    {/* Kontak */}
                    <div>
                        <h4 className="font-semibold mb-3 text-sky-400">
                            Hubungi Kami
                        </h4>
                        <p className="text-sm text-gray-400">
                            Email: info@siombak.com
                        </p>
                        <p className="text-sm text-gray-400">
                            Telepon: (061) 123-456
                        </p>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Kampung Wisata Mutiara
                    Tourism.
                </div>
            </div>
        </footer>
    );
}
