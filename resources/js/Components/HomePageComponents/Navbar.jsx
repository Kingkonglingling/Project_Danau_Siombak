// resources/js/Components/HomePageComponents/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { Menu as MenuIcon } from "lucide-react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const { url } = usePage();
    const currentPath = url.split("#")[0];
    const currentHash = url.includes("#") ? url.split("#")[1] : "";

    const isActive = (href) => {
        if (!href) return false;
        if (href.startsWith("#")) {
            return currentHash === href.slice(1);
        }
        return currentPath === href || currentPath === href.replace(/\/$/, "");
    };

    // Kunci: fungsi scroll manual yang pasti jalan!
    const scrollToSection = (sectionId) => {
        // Kalau bukan di beranda → pindah dulu ke beranda
        if (currentPath !== "/") {
            router.visit("/#" + sectionId, {
                preserveScroll: false,
                onSuccess: () => {
                    setTimeout(() => {
                        const el = document.getElementById(sectionId);
                        el?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 100);
                },
            });
        } else {
            // Sudah di beranda → langsung scroll
            const el = document.getElementById(sectionId);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                // Kalau element belum ada (jarang terjadi), reload + hash
                window.location.href = "/#" + sectionId;
            }
        }
        setIsMenuOpen(false);
    };

    // Close menu logic
    useEffect(() => {
        if (!isMenuOpen) return;
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };
        const handleEsc = (e) => e.key === "Escape" && setIsMenuOpen(false);
        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleEsc);
        document.documentElement.style.overflow = "hidden";
        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleEsc);
            document.documentElement.style.overflow = "";
        };
    }, [isMenuOpen]);

    const NavItem = ({ href, children, mobile = false }) => {
        const active = isActive(href);
        const base = mobile
            ? "block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors"
            : "px-3 py-2 text-sm font-medium rounded-md transition-colors";
        const style = active ? "text-sky-700 bg-sky-50" : "text-gray-700 hover:text-sky-600 hover:bg-sky-50";

        // Kalau link hash → pakai scroll manual
        if (href.startsWith("/#")) {
            const sectionId = href.split("#")[1];
            return (
                <button
                    onClick={() => scrollToSection(sectionId)}
                    className={`${base} ${style}`}
                >
                    {children}
                </button>
            );
        }

        // Kalau link biasa → pakai Inertia Link
        return (
            <Link
                href={href}
                className={`${base} ${style}`}
                onClick={() => mobile && setIsMenuOpen(false)}
            >
                {children}
            </Link>
        );
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <img
                            src="/apple-touch-icon.png"
                            alt="Kampung Wisata Mutiara"
                            className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
                        />
                    </Link>

                    <div className="hidden sm:flex items-center gap-6">
                        <NavItem href="/">Beranda</NavItem>
                        <NavItem href="/#about">Tentang</NavItem>
                        <NavItem href="/#attractions">Aktivitas</NavItem>
                        <NavItem href="/#gallery">Galeri</NavItem>
                        <NavItem href="/#location">Lokasi</NavItem>
                        <NavItem href="/#chatbot">Panduan AI</NavItem>
                        <NavItem href="/survey">Survey</NavItem>

                        <Link
                            href="/paket"
                            className="ml-4 rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-bold text-white shadow hover:bg-sky-700 transition"
                        >
                            Lihat Paket
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="sm:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                        {isMenuOpen ? (
                            <span className="text-2xl leading-none">×</span>
                        ) : (
                            <MenuIcon className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            <div
                ref={menuRef}
                className={`sm:hidden overflow-hidden transition-all duration-300 border-t border-slate-100 bg-white/95 backdrop-blur-md ${
                    isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="px-4 py-4 space-y-1">
                    <NavItem href="/" mobile>Beranda</NavItem>
                    <NavItem href="/#about" mobile>Tentang</NavItem>
                    <NavItem href="/#attractions" mobile>Aktivitas</NavItem>
                    <NavItem href="/#gallery" mobile>Galeri</NavItem>
                    <NavItem href="/#location" mobile>Lokasi</NavItem>
                    <NavItem href="/#chatbot" mobile>Panduan AI</NavItem>
                    <NavItem href="/survey" mobile>Survey</NavItem>

                    <Link
                        href="/paket"
                        onClick={() => setIsMenuOpen(false)}
                        className="block mt-6 w-full text-center rounded-xl bg-sky-600 py-3 text-base font-bold text-white hover:bg-sky-700 transition"
                    >
                        Lihat Paket
                    </Link>
                </div>
            </div>
        </nav>
    );
}