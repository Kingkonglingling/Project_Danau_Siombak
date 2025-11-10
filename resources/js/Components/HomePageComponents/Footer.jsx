import React from "react";

export default function Footer({ MapPin }) {
    return (

        <>
        
        <footer id="contact" className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="col-span-2 md:col-span-1 space-y-3">
                        <h4 className="text-xl font-bold text-sky-400">Siombak</h4>
                        <p className="text-sm text-gray-400">Destinasi wisata alam terbaik di Medan Utara.</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span>Paya Pasir, Medan Marelan</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3 text-sky-400">Navigasi</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#home" className="hover:text-white transition">Beranda</a></li>
                            <li><a href="#about" className="hover:text-white transition">Tentang</a></li>
                            <li><a href="#attractions" className="hover:text-white transition">Aktivitas</a></li>
                            <li><a href="#location" className="hover:text-white transition">Lokasi</a></li> 
                            <li><a href="#chatbot" className="hover:text-white transition">Panduan AI</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3 text-sky-400">Informasi</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Jam Operasional</li>
                            <li>Tiket Masuk</li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3 text-sky-400">Hubungi Kami</h4>
                        <p className="text-sm text-gray-400">Email: info@siombak.com</p>
                        <p className="text-sm text-gray-400">Telepon: (061) 123-456</p>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Danau Siombak Tourism. Dibuat dengan Inertia & React.
                </div>
            </div>
        </footer>
        
        </>
    );
}