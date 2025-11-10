import React from "react";


export default function GallerySection() {

 // Array dummy untuk galeri
    const galleryImages = [
        'https://placehold.co/600x400/0044A5/FFFFFF?text=Pemandangan+Danau',
        'https://placehold.co/400x600/0077B6/FFFFFF?text=Perahu+Tradisional',
        'https://placehold.co/800x500/00A8E8/FFFFFF?text=Area+Memancing',
        'https://placehold.co/500x700/40916C/FFFFFF?text=Mangrove+Siombak',
    ];

    return (

        <>
        
         <section id="gallery" className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-base font-semibold tracking-wider text-sky-600 uppercase text-center">Visual Keindahan</h2>
                    <h3 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12">
                        Galeri Foto Danau Siombak
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {galleryImages.map((src, index) => (
                            <div key={index} className="overflow-hidden rounded-xl shadow-md group">
                                <img
                                    src={src}
                                    alt={`Galeri Danau Siombak ${index + 1}`}
                                    className="w-full h-full object-cover aspect-square md:aspect-auto transition duration-500 group-hover:scale-110"
                                    onError={(e) => { 
                                        e.target.onerror = null; 
                                        e.target.src = "https://placehold.co/600x400?text=Image+Not+Available"; }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        
        </>
    );
}