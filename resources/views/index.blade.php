<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Explore Sumatra — Template Pariwisata</title>
  <meta name="description" content="Template situs pariwisata bergaya indonesia.travel untuk menampilkan destinasi, lokasi, dan akses transportasi." />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    .glass{backdrop-filter: blur(8px); background: rgba(255,255,255,.65)}
    .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
    .shadow-soft{box-shadow:0 10px 25px rgba(2,6,23,.06),0 4px 10px rgba(2,6,23,.06)}
  </style>
</head>
<body class="min-h-screen bg-slate-50 text-slate-800">
  <!-- Topbar -->
  <header class="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
      <a href="#" class="inline-flex items-center gap-2 font-semibold">
        <span class="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-600 text-white">ID</span>
        <span class="tracking-tight">Explore Sumatra</span>
      </a>
      <nav class="ml-auto hidden md:flex items-center gap-6 text-sm text-slate-600">
        <a href="#destinasi" class="hover:text-slate-900">Destinasi</a>
        <a href="#peta" class="hover:text-slate-900">Peta</a>
        <a href="#akses" class="hover:text-slate-900">Akses & Transport</a>
        <a href="#faq" class="hover:text-slate-900">FAQ</a>
      </nav>
      <button id="menuBtn" class="ml-auto md:hidden p-2 rounded-lg border text-slate-600" aria-label="Toggle menu">☰</button>
    </div>
  </header>

  <!-- Mobile Menu -->
  <div id="mobileMenu" class="hidden md:hidden border-b border-slate-200 bg-white">
    <div class="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-3 text-sm">
      <a href="#destinasi" class="hover:text-slate-900">Destinasi</a>
      <a href="#peta" class="hover:text-slate-900">Peta</a>
      <a href="#akses" class="hover:text-slate-900">Akses & Transport</a>
      <a href="#faq" class="hover:text-slate-900">FAQ</a>
    </div>
  </div>

  <!-- Hero -->
  <section class="relative">
    <div class="absolute inset-0 -z-10">
      <img src="https://images.unsplash.com/photo-1602786301160-6c3a4e65fb70?q=80&w=2060&auto=format&fit=crop" alt="Lanskap Sumatra" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-slate-900/60"></div>
    </div>
    <div class="max-w-7xl mx-auto px-4 py-16 md:py-24 text-white">
      <nav class="text-sm text-white/80 mb-4" aria-label="Breadcrumb">
        <ol class="flex items-center gap-2">
          <li><a href="#" class="hover:underline">Beranda</a></li>
          <li aria-hidden="true">›</li>
          <li><a href="#" class="hover:underline">Explore Indonesia</a></li>
          <li aria-hidden="true">›</li>
          <li class="text-white/95">Sumatra</li>
        </ol>
      </nav>
      <h1 class="text-3xl md:text-5xl font-semibold leading-tight">Jelajahi Pulau Sumatra</h1>
      <p class="mt-3 max-w-3xl text-white/90">Template ini menampilkan destinasi populer di Sumatra beserta lokasi dan akses transportasi. Gunakan sebagai dasar untuk membangun situs pariwisata Anda.</p>
      <div class="mt-6 flex flex-wrap gap-3">
        <button data-filter="all" class="filter-btn px-3 py-1.5 rounded-full bg-white/10 border border-white/30 hover:bg-white/20">Semua</button>
        <button data-filter="alam" class="filter-btn px-3 py-1.5 rounded-full bg-white/10 border border-white/30 hover:bg-white/20">Alam</button>
        <button data-filter="budaya" class="filter-btn px-3 py-1.5 rounded-full bg-white/10 border border-white/30 hover:bg-white/20">Budaya</button>
        <button data-filter="pantai" class="filter-btn px-3 py-1.5 rounded-full bg-white/10 border border-white/30 hover:bg-white/20">Pantai</button>
        <button data-filter="gunung" class="filter-btn px-3 py-1.5 rounded-full bg-white/10 border border-white/30 hover:bg-white/20">Gunung</button>
      </div>
    </div>
  </section>

  <!-- Destinations Grid -->
  <section id="destinasi" class="max-w-7xl mx-auto px-4 py-12">
    <header class="flex items-end justify-between mb-6">
      <div>
        <h2 class="text-2xl md:text-3xl font-semibold">Destinasi Unggulan</h2>
        <p class="text-slate-600">Klik kartu untuk melihat detail & akses transportasi.</p>
      </div>
      <div class="hidden md:flex items-center gap-2 text-sm">
        <label for="search" class="sr-only">Cari</label>
        <input id="search" type="search" placeholder="Cari destinasi…" class="w-64 px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
      </div>
    </header>

    <div id="cards" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card template instances -->
      
      <article class="card group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-soft" data-tags="alam gunung">
        <div class="relative h-44">
          <img src="https://images.unsplash.com/photo-1608346710474-002d4a0e2ba8?q=80&w=1974&auto=format&fit=crop" alt="Gunung Kerinci" class="w-full h-full object-cover" />
          <div class="absolute top-3 left-3 glass rounded-full px-3 py-1 text-xs font-medium">Jambi</div>
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold">Gunung Kerinci</h3>
          <p class="mt-1 text-sm text-slate-600 line-clamp-2">Puncak tertinggi di Sumatra dan gunung berapi tertinggi di Indonesia. Dikelilingi Taman Nasional Kerinci Seblat.</p>
          <div class="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
            <span class="px-2 py-1 rounded-full bg-slate-100 border">Gunung</span>
            <span class="px-2 py-1 rounded-full bg-slate-100 border">Alam</span>
          </div>
          <div class="mt-4 flex items-center justify-between text-sm">
            <button class="btn-detail text-emerald-700 hover:underline" data-title="Gunung Kerinci" data-lat="-1.6979" data-lng="101.2643" data-akses='[{"mode":"Pesawat","rute":"Jakarta → Jambi (Bandara Sultan Thaha), lanjut darat 7–8 jam ke Kerinci."},{"mode":"Bus/Travel","rute":"Dari Kota Jambi/Padang menuju Sungai Penuh (Kerinci)."},{"mode":"Sewa Mobil","rute":"Dari Jambi/Padang ±7–9 jam, akses via Sungai Penuh."}]'>Detail & Akses</button>
            <a target="_blank" class="text-slate-600 hover:text-slate-900" href="https://www.google.com/maps?q=Gunung+Kerinci">Lihat Maps →</a>
          </div>
        </div>
      </article>

      <article class="card group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-soft" data-tags="pantai alam">
        <div class="relative h-44">
          <img src="https://images.unsplash.com/photo-1560457079-9a6532ccb118?q=80&w=1974&auto=format&fit=crop" alt="Pulau Weh / Sabang" class="w-full h-full object-cover" />
          <div class="absolute top-3 left-3 glass rounded-full px-3 py-1 text-xs font-medium">Aceh</div>
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold">Pulau Weh (Sabang)</h3>
          <p class="mt-1 text-sm text-slate-600 line-clamp-2">Surga penyelam dengan air jernih, spot snorkeling dan diving kelas dunia di ujung barat Indonesia.</p>
          <div class="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
            <span class="px-2 py-1 rounded-full bg-slate-100 border">Pantai</span>
            <span class="px-2 py-1 rounded-full bg-slate-100 border">Alam</span>
          </div>
          <div class="mt-4 flex items-center justify-between text-sm">
            <button class="btn-detail text-emerald-700 hover:underline" data-title="Pulau Weh (Sabang)" data-lat="5.8833" data-lng="95.3167" data-akses='[{"mode":"Pesawat","rute":"Terbang ke Banda Aceh (BTJ), lanjut kapal cepat ke Sabang ±45–60 mnt."},{"mode":"Kapal","rute":"Ulee Lheue (Banda Aceh) → Balohan (Sabang)."},{"mode":"Sewa Motor/Mobil","rute":"Keliling Sabang dari Pelabuhan Balohan."}]'>Detail & Akses</button>
            <a target="_blank" class="text-slate-600 hover:text-slate-900" href="https://www.google.com/maps?q=Pulau+Weh">Lihat Maps →</a>
          </div>
        </div>
      </article>

      <article class="card group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-soft" data-tags="alam budaya">
        <div class="relative h-44">
          <img src="https://images.unsplash.com/photo-1564664394023-c47b315e30df?q=80&w=1974&auto=format&fit=crop" alt="Danau Toba" class="w-full h-full object-cover" />
          <div class="absolute top-3 left-3 glass rounded-full px-3 py-1 text-xs font-medium">Sumatera Utara</div>
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold">Danau Toba & Samosir</h3>
          <p class="mt-1 text-sm text-slate-600 line-clamp-2">Kaldera vulkanik raksasa dengan budaya Batak yang khas; panorama ikonik Sumatra.</p>
          <div class="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
            <span class="px-2 py-1 rounded-full bg-slate-100 border">Alam</span>
            <span class="px-2 py-1 rounded-full bg-slate-100 border">Budaya</span>
          </div>
          <div class="mt-4 flex items-center justify-between text-sm">
            <button class="btn-detail text-emerald-700 hover:underline" data-title="Danau Toba & Samosir" data-lat="2.6886" data-lng="98.8756" data-akses='[{"mode":"Pesawat","rute":"Terbang ke Kualanamu (KNO) atau Sisingamangaraja XII (DTB). Lanjut darat ke Parapat ±3–4 jam dari KNO atau ±1–2 jam dari DTB."},{"mode":"Kapal","rute":"Parapat ↔ Tomok/Tuktuk (Pulau Samosir) dengan kapal reguler."},{"mode":"Bus/Travel","rute":"Medan → Parapat tersedia banyak operator."}]'>Detail & Akses</button>
            <a target="_blank" class="text-slate-600 hover:text-slate-900" href="https://www.google.com/maps?q=Danau+Toba">Lihat Maps →</a>
          </div>
        </div>
      </article>

      <article class="card group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-soft" data-tags="budaya alam">
        <div class="relative h-44">
          <img src="https://images.unsplash.com/photo-1606188074044-2ced3a3a6d53?q=80&w=2069&auto=format&fit=crop" alt="Ngarai Sianok" class="w-full h-full object-cover" />
          <div class="absolute top-3 left-3 glass rounded-full px-3 py-1 text-xs font-medium">Sumatera Barat</div>
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold">Bukittinggi & Ngarai Sianok</h3>
          <p class="mt-1 text-sm text-slate-600 line-clamp-2">Heritage kota Bukittinggi, Jam Gadang, dan lanskap Ngarai Sianok yang dramatis.</p>
          <div class="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
            <span class="px-2 py-1 rounded-full bg-slate-100 border">Budaya</span>
            <span class="px-2 py-1 rounded-full bg-slate-100 border">Alam</span>
          </div>
          <div class="mt-4 flex items-center justify-between text-sm">
            <button class="btn-detail text-emerald-700 hover:underline" data-title="Bukittinggi & Ngarai Sianok" data-lat="-0.3052" data-lng="100.3692" data-akses='[{"mode":"Pesawat","rute":"Terbang ke Padang (PDG), lanjut darat ±2–3 jam ke Bukittinggi."},{"mode":"Bus/Travel","rute":"Padang ↔ Bukittinggi tersedia intensif."}]'>Detail & Akses</button>
            <a target="_blank" class="text-slate-600 hover:text-slate-900" href="https://www.google.com/maps?q=Bukittinggi">Lihat Maps →</a>
          </div>
        </div>
      </article>

      <article class="card group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-soft" data-tags="alam pantai">
        <div class="relative h-44">
          <img src="https://images.unsplash.com/photo-1603726574121-17317c1c99e9?q=80&w=1974&auto=format&fit=crop" alt="Belitung" class="w-full h-full object-cover" />
          <div class="absolute top-3 left-3 glass rounded-full px-3 py-1 text-xs font-medium">Bangka Belitung</div>
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold">Pantai-Pantai Belitung</h3>
          <p class="mt-1 text-sm text-slate-600 line-clamp-2">Batu granit raksasa, air sebening kristal, dan pulau-pulau kecil yang menawan.</p>
          <div class="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
            <span class="px-2 py-1 rounded-full bg-slate-100 border">Pantai</span>
            <span class="px-2 py-1 rounded-full bg-slate-100 border">Alam</span>
          </div>
          <div class="mt-4 flex items-center justify-between text-sm">
            <button class="btn-detail text-emerald-700 hover:underline" data-title="Pantai-Pantai Belitung" data-lat="-2.8700" data-lng="107.9800" data-akses='[{"mode":"Pesawat","rute":"Terbang langsung ke Tanjung Pandan (TJQ) dari Jakarta/Palembang."},{"mode":"Sewa Mobil","rute":"Keliling spot pantai dari pusat kota Tanjung Pandan."}]'>Detail & Akses</button>
            <a target="_blank" class="text-slate-600 hover:text-slate-900" href="https://www.google.com/maps?q=Tanjung+Tinggi+Belitung">Lihat Maps →</a>
          </div>
        </div>
      </article>

      <article class="card group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-soft" data-tags="alam">
        <div class="relative h-44">
          <img src="https://images.unsplash.com/photo-1602832327466-8e3fe8f302ff?q=80&w=2069&auto=format&fit=crop" alt="Way Kambas" class="w-full h-full object-cover" />
          <div class="absolute top-3 left-3 glass rounded-full px-3 py-1 text-xs font-medium">Lampung</div>
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold">Taman Nasional Way Kambas</h3>
          <p class="mt-1 text-sm text-slate-600 line-clamp-2">Habitat gajah Sumatra, konservasi, dan pengalaman safari edukatif.</p>
          <div class="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
            <span class="px-2 py-1 rounded-full bg-slate-100 border">Alam</span>
          </div>
          <div class="mt-4 flex items-center justify-between text-sm">
            <button class="btn-detail text-emerald-700 hover:underline" data-title="Taman Nasional Way Kambas" data-lat="-5.1000" data-lng="105.7333" data-akses='[{"mode":"Pesawat","rute":"Terbang ke Bandar Lampung (TKG), lanjut darat ±2–3 jam ke Way Kambas."},{"mode":"Bus/Travel","rute":"Dari Bandar Lampung/Terminal Rajabasa ke Lampung Timur."}]'>Detail & Akses</button>
            <a target="_blank" class="text-slate-600 hover:text-slate-900" href="https://www.google.com/maps?q=Way+Kambas">Lihat Maps →</a>
          </div>
        </div>
      </article>

    </div>
  </section>

  <!-- Map Section -->
  <section id="peta" class="bg-white border-y border-slate-200">
    <div class="max-w-7xl mx-auto px-4 py-12">
      <div class="flex items-end justify-between mb-4">
        <div>
          <h2 class="text-2xl md:text-3xl font-semibold">Peta Sumatra</h2>
          <p class="text-slate-600">Geser & zoom peta untuk melihat area destinasi.</p>
        </div>
      </div>
      <div class="rounded-2xl overflow-hidden border border-slate-200 aspect-[16/9]">
        <iframe title="Peta Sumatra" class="w-full h-full" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Sumatra&output=embed"></iframe>
      </div>
    </div>
  </section>

  <!-- Access & Transport -->
  <section id="akses" class="max-w-7xl mx-auto px-4 py-12">
    <h2 class="text-2xl md:text-3xl font-semibold">Akses & Transportasi Umum</h2>
    <p class="text-slate-600 mt-1">Ringkasan moda umum untuk menjangkau Sumatra dari kota besar di Indonesia.</p>

    <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft">
        <h3 class="font-semibold">Udara</h3>
        <p class="text-sm text-slate-600 mt-1">Bandara utama: Kualanamu (Medan), Minangkabau (Padang), Sultan Thaha (Jambi), Sultan Mahmud Badaruddin II (Palembang), Radin Inten II (Lampung), H.A.S. Hanandjoeddin (Belitung).</p>
      </div>
      <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft">
        <h3 class="font-semibold">Laut</h3>
        <p class="text-sm text-slate-600 mt-1">Pelabuhan besar: Belawan (Medan), Tanjung Priok ↔ Pelabuhan Sumatra (lintasan kapal), Ulee Lheue (Banda Aceh) → Balohan (Sabang), Bakauheni ↔ Merak.</p>
      </div>
      <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft">
        <h3 class="font-semibold">Darat</h3>
        <p class="text-sm text-slate-600 mt-1">Jalur lintas Sumatra dengan bus/travel & sewa mobil. Tersedia tol Trans-Sumatra di beberapa ruas (Lampung–Palembang, Palembang–Jambi [sebagian], dll.).</p>
      </div>
    </div>

    <div class="mt-8 text-sm text-slate-600">
      <p><strong>Tips:</strong> Gunakan tautan “Lihat Maps” di setiap destinasi untuk rute langsung, lalu aktifkan panduan arah di perangkat Anda.</p>
    </div>
  </section>

  <!-- FAQ -->
  <section id="faq" class="bg-white border-t border-slate-200">
    <div class="max-w-7xl mx-auto px-4 py-12">
      <h2 class="text-2xl md:text-3xl font-semibold mb-6">Pertanyaan yang Sering Diajukan</h2>
      <div class="grid grid-cols-1 gap-4">
        <details class="group bg-white rounded-xl border border-slate-200 p-4 open:shadow-soft">
          <summary class="cursor-pointer font-medium flex items-center justify-between">Apakah template ini bisa dipakai langsung?
            <span class="text-slate-400 group-open:rotate-180 transition">⌄</span>
          </summary>
          <div class="pt-3 text-sm text-slate-600">Ya, ini halaman HTML statis dengan TailwindCSS via CDN. Ganti gambar, teks, dan data akses sesuai kebutuhan. Untuk CMS/Framework (Laravel/WordPress/Next.js), silakan porting komponennya.</div>
        </details>
        <details class="group bg-white rounded-xl border border-slate-200 p-4">
          <summary class="cursor-pointer font-medium flex items-center justify-between">Bagaimana menambah destinasi?
            <span class="text-slate-400 group-open:rotate-180 transition">⌄</span>
          </summary>
          <div class="pt-3 text-sm text-slate-600">Duplikasi elemen <code>&lt;article class=&quot;card&quot;&gt;…</code> dan ubah atribut <code>data-tags</code>, gambar, teks, serta <code>data-akses</code>. Koordinat lat/lng opsional untuk prarender peta mini pada modal.</div>
        </details>
        <details class="group bg-white rounded-xl border border-slate-200 p-4">
          <summary class="cursor-pointer font-medium flex items-center justify-between">Bisa disambungkan ke Google Maps?
            <span class="text-slate-400 group-open:rotate-180 transition">⌄</span>
          </summary>
          <div class="pt-3 text-sm text-slate-600">Sudah. Tombol “Lihat Maps” membuka lokasi. Anda juga bisa mengganti iframe peta global menjadi peta tiap destinasi menggunakan lat/lng.</div>
        </details>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-slate-200 bg-slate-100">
    <div class="max-w-7xl mx-auto px-4 py-8 text-sm text-slate-600">
      <div class="flex items-center justify-between">
        <p>© 2025 Explore Sumatra. Template untuk demonstrasi (non‑resmi, tidak berafiliasi dengan indonesia.travel).</p>
        <div class="flex items-center gap-4">
          <a href="#" class="hover:text-slate-900">Kebijakan Privasi</a>
          <a href="#" class="hover:text-slate-900">Kontak</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Modal Detail & Akses -->
  <div id="detailModal" class="fixed inset-0 z-50 hidden">
    <div class="absolute inset-0 bg-black/50" data-close="modal"></div>
    <div class="relative max-w-3xl mx-auto my-8 md:my-16 bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
      <div class="p-5 md:p-6 flex items-start justify-between gap-3 border-b">
        <div>
          <h3 id="modalTitle" class="text-xl font-semibold">Judul Destinasi</h3>
          <p class="text-sm text-slate-600">Lokasi & akses transportasi</p>
        </div>
        <button class="p-2 rounded-lg border" data-close="modal" aria-label="Tutup">✕</button>
      </div>
      <div class="p-5 md:p-6 grid md:grid-cols-5 gap-6">
        <div class="md:col-span-3">
          <div class="rounded-xl overflow-hidden border border-slate-200 aspect-[16/9]">
            <iframe id="modalMap" class="w-full h-full" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Sumatra&output=embed"></iframe>
          </div>
        </div>
        <div class="md:col-span-2">
          <h4 class="font-medium">Pilihan Akses</h4>
          <ul id="aksesList" class="mt-3 space-y-3 text-sm text-slate-700"></ul>
          <div class="mt-4 text-sm">
            <a id="openInMaps" href="#" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-lg border hover:bg-slate-50">Buka di Google Maps →</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if(menuBtn){menuBtn.addEventListener('click',()=>mobileMenu.classList.toggle('hidden'))}

    // Simple search & filter
    const search = document.getElementById('search');
    const cards = document.getElementById('cards');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function applyFilter(){
      const q = (search?.value || '').toLowerCase();
      const active = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
      cards.querySelectorAll('.card').forEach(card=>{
        const tags = card.dataset.tags || '';
        const matchTag = active==='all' || tags.includes(active);
        const matchText = q==='' || card.textContent.toLowerCase().includes(q);
        card.style.display = (matchTag && matchText) ? '' : 'none';
      })
    }

    filterBtns.forEach(btn=>{
      btn.addEventListener('click',()=>{
        filterBtns.forEach(b=>b.classList.remove('active','ring','ring-emerald-400'));
        btn.classList.add('active','ring','ring-emerald-400');
        applyFilter();
      })
    })

    search?.addEventListener('input', applyFilter);

    // Modal logic
    const modal = document.getElementById('detailModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMap = document.getElementById('modalMap');
    const aksesList = document.getElementById('aksesList');
    const openInMaps = document.getElementById('openInMaps');

    function openModal(title, lat, lng, akses){
      modalTitle.textContent = title;
      const hasCoords = lat && lng;
      const mapQ = hasCoords ? `${lat},${lng}` : encodeURIComponent(title);
      modalMap.src = `https://www.google.com/maps?q=${mapQ}&output=embed`;
      openInMaps.href = `https://www.google.com/maps?q=${mapQ}`;
      aksesList.innerHTML = '';
      try{
        const items = Array.isArray(akses) ? akses : JSON.parse(akses || '[]');
        items.forEach(i=>{
          const li = document.createElement('li');
          li.innerHTML = `<div class="flex gap-3"><div class="shrink-0 mt-0.5">🧭</div><div><div class="font-medium">${i.mode||'Moda'}</div><div class="text-slate-600">${i.rute||''}</div></div></div>`;
          aksesList.appendChild(li);
        })
      }catch(e){ /* ignore */ }
      modal.classList.remove('hidden');
      document.body.style.overflow='hidden';
    }

    function closeModal(){
      modal.classList.add('hidden');
      document.body.style.overflow='';
    }

    document.querySelectorAll('.btn-detail').forEach(btn=>{
      btn.addEventListener('click',()=>{
        openModal(btn.dataset.title, parseFloat(btn.dataset.lat), parseFloat(btn.dataset.lng), btn.dataset.akses)
      })
    })

    modal.addEventListener('click', (e)=>{
      if(e.target.matches('[data-close="modal"], #detailModal')) closeModal();
    })

    // Initialize default states
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active','ring','ring-emerald-400');
  </script>
</body>
</html>
