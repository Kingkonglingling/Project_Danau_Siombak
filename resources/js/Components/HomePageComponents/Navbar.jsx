import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Navbar({ Sailboat, Menu }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hash, setHash] = useState(
        typeof window !== "undefined" ? window.location.hash : ""
    );
    const menuRef = useRef(null);

    // Active state: hash (#about, dll) atau path (mis. /homepage/survey)
    const pathname =
        typeof window !== "undefined" ? window.location.pathname : "/";

    const isActive = (href) => {
        if (!href) return false;
        if (href.startsWith("#")) return hash === href;
        // simple path match
        return pathname === href;
    };

    // Listen hash change
    useEffect(() => {
        const onHash = () => setHash(window.location.hash);
        window.addEventListener("hashchange", onHash);
        return () => window.removeEventListener("hashchange", onHash);
    }, []);

    // Close on outside click
    useEffect(() => {
        if (!isMenuOpen) return;
        const onDown = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, [isMenuOpen]);

    // Close on ESC + lock scroll
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setIsMenuOpen(false);
        document.addEventListener("keydown", onKey);
        // lock scroll
        const root = document.documentElement;
        if (isMenuOpen) {
            const prev = root.style.overflow;
            root.style.overflow = "hidden";
            return () => {
                root.style.overflow = prev;
                document.removeEventListener("keydown", onKey);
            };
        }
        return () => document.removeEventListener("keydown", onKey);
    }, [isMenuOpen]);

    const NavLink = ({ href, children, isMobile = false }) => {
        const active = isActive(href);
        const base =
            "transition-colors duration-150 p-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-md";

        const desktop =
            (active ? "text-sky-700" : "text-gray-600 hover:text-sky-600") +
            " px-2";
        const mobile =
            (active
                ? "text-sky-700 bg-sky-50"
                : "text-gray-700 hover:bg-sky-50 hover:text-sky-600") +
            " block px-3 py-2 text-base";

        return (
            <a
                href={href}
                className={`${base} ${isMobile ? mobile : desktop}`}
                aria-current={active ? "page" : undefined}
                onClick={() => {
                    if (isMobile) setIsMenuOpen(false);
                }}
            >
                {children}
            </a>
        );
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
                {/* BAR */}
                <div className="h-16 flex items-center justify-between">
                    {/* Brand */}
                    <a href="/" className="flex items-center gap-2 group">
                        <img
                            src="/apple-touch-icon.png" // update path logomu kalau perlu
                            alt="Siombak"
                            className="h-9 w-9 sm:h-20 sm:w-20 object-contain"
                            loading="eager"
                            decoding="async"
                        />
                    </a>

                    {/* Desktop nav */}
                    <div className="hidden sm:flex items-center gap-2 md:gap-4 lg:gap-6">
                        <NavLink href="#home">Beranda</NavLink>
                        <NavLink href="#about">Tentang</NavLink>
                        <NavLink href="#attractions">Aktivitas</NavLink>
                        <NavLink href="#gallery">Galeri</NavLink>
                        <NavLink href="#location">Lokasi</NavLink>
                        <NavLink href="#chatbot">Panduan AI</NavLink>
                        <NavLink href="/homepage/survey">Survey</NavLink>
                        <a
                            href="#contact"
                            className="ml-2 inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                        >
                            Kunjungi Sekarang
                        </a>
                    </div>

                    {/* Mobile button */}
                    <div className="sm:hidden">
                        <button
                            type="button"
                            aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
                            aria-expanded={isMenuOpen}
                            onClick={() => setIsMenuOpen((v) => !v)}
                            className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                        >
                            {isMenuOpen ? (
                                <span className="block h-6 w-6 leading-none text-xl">
                                    ✕
                                </span>
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                ref={menuRef}
                className={`sm:hidden overflow-hidden border-t border-slate-100 bg-white/95 backdrop-blur transition-[max-height,opacity] duration-300 ${
                    isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="px-3 py-2 space-y-1">
                    <NavLink href="#home" isMobile>
                        Beranda
                    </NavLink>
                    <NavLink href="#about" isMobile>
                        Tentang
                    </NavLink>
                    <NavLink href="#attractions" isMobile>
                        Aktivitas
                    </NavLink>
                    <NavLink href="#gallery" isMobile>
                        Galeri
                    </NavLink>
                    <NavLink href="#location" isMobile>
                        Lokasi
                    </NavLink>
                    <NavLink href="#chatbot" isMobile>
                        Panduan AI
                    </NavLink>
                    <NavLink href="/homepage/survey" isMobile>
                        Survey
                    </NavLink>

                    <a
                        href="#contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full text-center mt-3 px-4 py-2 bg-sky-600 text-white text-base font-medium rounded-lg hover:bg-sky-700 transition-colors shadow"
                    >
                        Kunjungi Sekarang
                    </a>
                </div>
            </div>
        </nav>
    );
}
