
import React from 'react';
export default function HeroSection() {
    return (
        <>
        
        <header id="home" className="relative h-[80vh] flex items-center justify-center text-white overflow-hidden">
                    <img
                        src="https://media.istockphoto.com/id/1256765390/id/foto/rawa-pening-danau-dengan-latar-belakang-gunung.jpg?s=612x612&w=0&k=20&c=UoTm7bdZizAnK1fPpKa--9hVZMG7UWnybf3tOnH8q8I="
                        alt="Pemandangan Danau Siombak"
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://media.istockphoto.com/id/1256765390/id/foto/rawa-pening-danau-dengan-latar-belakang-gunung.jpg?s=612x612&w=0&k=20&c=UoTm7bdZizAnK1fPpKa--9hVZMG7UWnybf3tOnH8q8I=" }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-sky-900/80 backdrop-blur-sm"></div>

                    <div className="relative z-10 text-center p-6 max-w-4xl space-y-6">
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                            Danau Siombak
                        </h1>
                        <p className="text-xl md:text-2xl font-light">
                            Gerbang Keindahan Alam di Utara Kota Medan. Temukan kedamaian di tengah hutan mangrove dan danau buatan yang memesona.
                        </p>
                        <a
                            href="#attractions"
                            className="inline-block mt-4 px-8 py-3 bg-sky-600 text-white font-semibold text-lg rounded-full shadow-xl hover:bg-sky-700 transition duration-300 transform hover:scale-105"
                        >
                            Jelajahi Aktivitas
                        </a>
                    </div>
                </header>

        </>
    );
}