import React from "react";

export default function GallerySection() {
    // Array dummy untuk galeri
    const galleryImages = [
        "https://media.istockphoto.com/id/1483165116/id/foto/danau-sky.jpg?s=612x612&w=0&k=20&c=VtHx_S1lm8_hlDm5w8PZx5ry_N-C0RGkw56l6UUiYiM=",
        "https://media.istockphoto.com/id/1450645250/id/foto/matahari-terbit-di-waduk.jpg?s=612x612&w=0&k=20&c=jzdD-TBpj2cAn-JmShbMdtwljkw70_4pxsh4CMi5kEo=",
        "https://media.istockphoto.com/id/2210931004/id/foto/danau-buatan-dengan-pemandangan-gunung-di-pagi-hari-lanskap-pedesaan-di-mojokerto-indonesia.jpg?s=612x612&w=0&k=20&c=bHOdgvQFJtUz655sg3QgeWIoIVnu3jtjKwkO15w0gV0=",
        "https://media.istockphoto.com/id/1299775260/id/foto/danau-jatiluhur-jawa-barat.jpg?s=612x612&w=0&k=20&c=EtlWm7DxZ-noZ0FJ2jKvpMK6FNsof-20oNgb0reSzmQ=",
    ];

    return (
        <>
            <section id="gallery" className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-base font-semibold tracking-wider text-sky-600 uppercase text-center">
                        Visual Keindahan
                    </h2>
                    <h3 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12">
                        Galeri Foto Kampung Wisata Mutiara
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {galleryImages.map((src, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-xl shadow-md group"
                            >
                                <img
                                    src={src}
                                    alt={`Galeri Kampung Wisata Mutiara ${
                                        index + 1
                                    }`}
                                    className="w-full h-full object-cover aspect-square md:aspect-auto transition duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            "https://placehold.co/600x400?text=Image+Not+Available";
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
