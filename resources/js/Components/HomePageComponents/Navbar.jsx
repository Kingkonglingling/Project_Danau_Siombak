import React, { useState } from 'react';
    
export default function Navbar({ Sailboat, Menu}) {

    // State BARU untuk Mobile Menu
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

     // NavLink komponen yang diperbarui untuk menutup menu saat diklik
    const NavLink = ({ href, children, isMobile = false }) => (
        <a 
            href={href} 
            className={`transition duration-150 p-2 text-sm font-medium ${isMobile ? 'block px-3 py-2 text-base text-gray-700 hover:bg-sky-50 hover:text-sky-600 rounded-lg' : 'text-gray-600 hover:text-sky-600'}`}
            onClick={() => {
                if (isMobile) setIsMenuOpen(false); // Tutup menu jika ini link mobile
            }}
        >
            {children}
        </a>
    );

    return (
    <>

    <nav className="bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
                <div className="flex items-center">
                    <span className="flex items-center text-2xl font-bold text-sky-700">
                        <Sailboat className="w-6 h-6 mr-2" />
                        Siombak
                    </span>
                </div>
                {/* Desktop Menu (Tersimpan di sm:flex) */}
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center">
                    <NavLink href="#home">Beranda</NavLink>
                    <NavLink href="#about">Tentang</NavLink>
                    <NavLink href="#attractions">Aktivitas</NavLink>
                    <NavLink href="#gallery">Galeri</NavLink>
                    <NavLink href="#location">Lokasi</NavLink> 
                    <NavLink href="#chatbot">Panduan AI</NavLink> 
                    <a
                        href="#contact"
                        className="px-4 py-2 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700 transition duration-150 shadow-md"
                    >
                        Kunjungi Sekarang
                    </a>
                </div>
                
                {/* Mobile Menu Button (Hamburger) */}
                <div className="flex items-center sm:hidden">
                    <button 
                        className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
                        onClick={() => setIsMenuOpen(!isMenuOpen)} // Mengubah state saat diklik
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>

        {/* Mobile Menu Content (Tampil saat isMenuOpen TRUE) */}
        {isMenuOpen && (
            <div className="sm:hidden pb-4 pt-2 border-t border-gray-200 bg-white/95 backdrop-blur-md">
                <div className="space-y-1 px-2">
                    <NavLink href="#home" isMobile={true}>Beranda</NavLink>
                    <NavLink href="#about" isMobile={true}>Tentang</NavLink>
                    <NavLink href="#attractions" isMobile={true}>Aktivitas</NavLink>
                    <NavLink href="#gallery" isMobile={true}>Galeri</NavLink>
                    <NavLink href="#location" isMobile={true}>Lokasi</NavLink> 
                    <NavLink href="#chatbot" isMobile={true}>Panduan AI</NavLink>
                    <a
                        href="#contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full text-center mt-3 px-4 py-2 bg-sky-600 text-white text-base font-medium rounded-lg hover:bg-sky-700 transition duration-150 shadow-md"
                    >
                        Kunjungi Sekarang
                    </a>
                </div>
            </div>
        )}
    </nav>

    </>

    );
}