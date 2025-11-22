import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Share2, Heart, Maximize2 } from 'lucide-react';

export default function ShowGallery({ gallery }) {

  const [isLiked, setIsLiked] = useState(false);

  // Format tanggal Indonesia
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Handle URL gambar (local storage / S3 / CDN)
  const imageUrl = gallery.image?.startsWith('http')
    ? gallery.image
    : `/storage/${gallery.image}`;

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-sky-100 selection:text-sky-700 pb-20">
      <Head title={gallery.title || 'Detail Galeri'} />

      {/* NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Tombol Kembali */}
          <Link 
            href="/homepage"
            className="group inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors duration-200"
          >
            <div className="p-2 rounded-full group-hover:bg-gray-100 transition-all">
              <ArrowLeft size={20} />
            </div>
            <span className="font-medium text-sm hidden sm:block">Kembali ke Galeri</span>
          </Link>

          <span className="text-sm font-semibold text-gray-900 tracking-tight">
            Detail Foto
          </span>

          <div className="w-8"></div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* IMAGE */}
        <div className="relative w-full mb-10 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-sky-200 to-indigo-200 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

          <div className="relative bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-gray-100">
            <div className="relative aspect-[16/10] md:aspect-[21/9] bg-gray-100 overflow-hidden">
              <img
                src={gallery.image_url}
                alt={gallery.title}
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                    e.target.src = '/images/no-image.png'; // Fallback dari public
                }}
            />

              {/* Tombol Fullscreen (belum aktif) */}
              <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-gray-700 p-2.5 rounded-full shadow-lg hover:bg-white hover:text-sky-600 transition-all transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300">
                <Maximize2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

          {/* LEFT SIDE */}
          <div className="md:col-span-8 space-y-6">

            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                {gallery.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
                  <Calendar size={14} />
                  <span>{formatDate(gallery.created_at)}</span>
                </div>
              </div>
            </div>

            <div className="prose prose-lg prose-gray max-w-none text-gray-600 leading-relaxed">
              {gallery.description ? (
                <p className="whitespace-pre-line">{gallery.description}</p>
              ) : (
                <p className="italic text-gray-400">Tidak ada deskripsi.</p>
              )}
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
