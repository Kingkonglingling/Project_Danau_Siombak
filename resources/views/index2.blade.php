<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Danau Toba — Panduan Resmi Pengunjung</title>
  <meta name="description" content="Halaman resmi kunjungan untuk satu destinasi wisata: info tiket, jam buka, rute & transportasi, galeri foto, peta, FAQ, dan kontak." />
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
  <style>
    .ph { background: repeating-linear-gradient(45deg,#e5e7eb,#e5e7eb 10px,#f3f4f6 10px,#f3f4f6 20px); }
    .line-clamp-3 { display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
    .leaflet-container { font: inherit; }
  </style>
</head>
<body class="bg-slate-50 text-slate-800">
  <!-- NAV -->
  <header class="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="#" class="flex items-center gap-2 font-semibold">
        <span class="inline-block w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-400"></span>
        Danau Toba
      </a>
      <nav class="hidden md:flex items-center gap-6 text-sm">
        <a href="#tentang" class="hover:text-blue-600">Tentang</a>
        <a href="#tiket" class="hover:text-blue-600">Tiket & Jam</a>
        <a href="#rute" class="hover:text-blue-600">Rute</a>
        <a href="#galeri" class="hover:text-blue-600">Galeri</a>
        <a href="#faq" class="hover:text-blue-600">FAQ</a>
        <a href="#kontak" class="hover:text-blue-600">Kontak</a>
      </nav>
      <div class="flex items-center gap-2">
        <a href="#rute" class="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm">Arahkan Saya</a>
      </div>
    </div>
  </header>

  <!-- HERO -->
  <section class="relative">
    <div class="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center py-10">
      <div>
        <h1 class="text-3xl md:text-4xl font-bold leading-tight">Danau Toba
          <span class="block text-lg md:text-xl text-slate-600 font-normal mt-2">Panduan pengunjung satu laman</span>
        </h1>
        <p class="mt-4 text-slate-600">Destinasi danau vulkanik terbesar di dunia. Nikmati panorama, budaya Batak, kuliner khas, dan aktivitas air.</p>
        <div class="mt-6 flex flex-wrap gap-2 text-xs">
          <span class="px-2 py-1 rounded-lg bg-slate-100 border">Alam</span>
          <span class="px-2 py-1 rounded-lg bg-slate-100 border">Budaya</span>
          <span class="px-2 py-1 rounded-lg bg-slate-100 border">Keluarga</span>
        </div>
        <div class="mt-6 flex gap-3">
          <a href="#tiket" class="px-4 py-2 rounded-xl bg-emerald-600 text-white shadow">Lihat Harga Tiket</a>
          <a href="#rute" class="px-4 py-2 rounded-xl border border-slate-300">Petunjuk Rute</a>
        </div>
      </div>
      <div class="aspect-video rounded-2xl ring-1 ring-slate-200 bg-white p-2 shadow-sm">
        <div id="heroMap" class="w-full h-full rounded-xl"></div>
      </div>
    </div>
  </section>

  <!-- TENTANG & FAKTA RINGKAS -->
  <section id="tentang" class="py-6">
    <div class="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
      <article class="md:col-span-2 rounded-2xl ring-1 ring-slate-200 bg-white p-5">
        <h2 class="text-xl font-semibold mb-2">Tentang Destinasi</h2>
        <p class="text-slate-700">Danau Toba terbentuk dari letusan supervulkan dan dikelilingi panorama bukit serta desa-desa adat. Pengunjung dapat mengeksplor Pulau Samosir, situs budaya, dan menikmati aktivitas seperti perahu, trekking, hingga wisata kuliner khas Batak.</p>
      </article>
      <aside class="rounded-2xl ring-1 ring-slate-200 bg-white p-5 grid grid-cols-2 gap-4 text-sm">
        <div>
          <div class="text-slate-500">Alamat</div>
          <div id="alamatText" class="font-medium">Parapat, Kab. Simalungun, Sumatera Utara</div>
          <button id="copyAlamat" class="mt-2 px-2 py-1 rounded-lg border text-xs">Salin</button>
        </div>
        <div>
          <div class="text-slate-500">Koordinat</div>
          <div class="font-medium">2.685, 98.875</div>
          <a class="mt-2 inline-block px-2 py-1 rounded-lg border text-xs" target="_blank" id="gmapsBtn">Buka di Google Maps</a>
        </div>
        <div>
          <div class="text-slate-500">Telepon</div>
          <div class="font-medium">(+62) 812-3456-7890</div>
        </div>
        <div>
          <div class="text-slate-500">Email</div>
          <div class="font-medium">info@danautoba.id</div>
        </div>
      </aside>
    </div>
  </section>

  <!-- HARGA TIKET & JAM BUKA -->
  <section id="tiket" class="py-10 bg-white border-y border-slate-200">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-xl font-semibold mb-4">Tiket & Jam Buka</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="rounded-2xl ring-1 ring-slate-200 bg-slate-50 p-5">
          <h3 class="font-medium mb-2">Harga Tiket (contoh)</h3>
          <ul class="text-sm text-slate-700 space-y-1">
            <li>Dewasa: Rp25.000</li>
            <li>Anak (≤12 th): Rp10.000</li>
            <li>Parkir Mobil: Rp10.000</li>
            <li>Parkir Motor: Rp5.000</li>
          </ul>
          <p class="text-xs text-slate-500 mt-3">*Harga dapat berubah saat event/liburan.</p>
        </div>
        <div class="rounded-2xl ring-1 ring-slate-200 bg-slate-50 p-5">
          <h3 class="font-medium mb-2">Jam Operasional</h3>
          <ul class="text-sm text-slate-700 space-y-1">
            <li>Senin–Jumat: 08.00–17.00</li>
            <li>Sabtu–Minggu: 07.00–18.00</li>
            <li>Libur Nasional: Ikuti pengumuman</li>
          </ul>
        </div>
        <div class="rounded-2xl ring-1 ring-slate-200 bg-slate-50 p-5">
          <h3 class="font-medium mb-2">Fasilitas</h3>
          <ul class="text-sm text-slate-700 space-y-1">
            <li>Area parkir, musholla, toilet</li>
            <li>Dermaga & penyewaan perahu</li>
            <li>Kuliner & souvenir</li>
            <li>Pusat informasi</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- RUTE & TRANSPORTASI + PETA -->
  <section id="rute" class="py-10">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">Rute & Transportasi</h2>
        <div class="text-sm text-slate-600">Klik pin pada peta untuk navigasi</div>
      </div>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="rounded-2xl ring-1 ring-slate-200 bg-white p-4">
          <div class="flex gap-2 mb-3">
            <button data-tab="umum" class="tabbtn px-3 py-1.5 rounded-lg border text-sm">Transportasi Umum</button>
            <button data-tab="pribadi" class="tabbtn px-3 py-1.5 rounded-lg border text-sm">Kendaraan Pribadi</button>
          </div>
          <div id="tab-umum" class="text-sm space-y-2">
            <p>Dari Medan → naik bus/travel ke Parapat (±4–5 jam). Dari Parapat, gunakan <em>ferry</em> ke Pulau Samosir setiap 1 jam.</p>
            <ul class="list-disc pl-5 text-slate-700">
              <li>Terminal Amplas/Pinang Baris tersedia rute ke Parapat.</li>
              <li>Ojek online & becak motor untuk mobilitas lokal.</li>
            </ul>
          </div>
          <div id="tab-pribadi" class="hidden text-sm space-y-2">
            <p>Rute Tol Medan–Tebing Tinggi → keluar ke arah Pematang Siantar → Parapat. Estimasi 4–5 jam (tanpa macet).</p>
            <ul class="list-disc pl-5 text-slate-700">
              <li>Pastikan bahan bakar sebelum Siantar.</li>
              <li>Tempat istirahat: Tebing Tinggi, Siantar.</li>
            </ul>
          </div>
        </div>
        <div class="rounded-2xl ring-1 ring-slate-200 overflow-hidden">
          <div id="map" class="h-[420px]"></div>
          <div class="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-sm">
            <span>Gunakan Google Maps untuk navigasi turn-by-turn.</span>
            <a id="linkMaps" target="_blank" class="px-3 py-1.5 rounded-lg bg-blue-600 text-white">Buka Maps</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- GALERI -->
  <section id="galeri" class="py-10 bg-white border-y border-slate-200">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-xl font-semibold mb-4">Galeri Foto</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <img src="https://images.unsplash.com/photo-1589308078059-be1415eab4bd?q=80&w=1200&auto=format&fit=crop" class="aspect-square object-cover rounded-xl" alt="Danau Toba 1"/>
        <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop" class="aspect-square object-cover rounded-xl" alt="Danau Toba 2"/>
        <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop" class="aspect-square object-cover rounded-xl" alt="Danau Toba 3"/>
        <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop" class="aspect-square object-cover rounded-xl" alt="Danau Toba 4"/>
      </div>
      <p class="text-xs text-slate-500 mt-2">*Ganti URL foto dengan dokumentasi resmi destinasi Anda.</p>
    </div>
  </section>

  <!-- ITINERARY SEDERHANA -->
  <section class="py-10">
    <div class="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6">
      <div class="rounded-2xl ring-1 ring-slate-200 bg-slate-50 p-4">
        <label class="text-sm text-slate-600">Tambah rencana kunjungan (contoh: "Naik ferry ke Samosir, 10.00")</label>
        <div class="mt-2 flex gap-2">
          <input id="itinInput" type="text" class="flex-1 px-3 py-2 rounded-xl border border-slate-300" placeholder="Aktivitas & jam"/>
          <button id="itinAdd" class="px-3 py-2 rounded-xl bg-emerald-600 text-white">Tambah</button>
        </div>
      </div>
      <div class="rounded-2xl ring-1 ring-slate-200 bg-slate-50 p-4">
        <div class="flex items-center justify-between">
          <h3 class="font-medium">Rencana Kunjungan</h3>
          <button id="btnExport" class="px-3 py-1.5 text-sm rounded-lg border">Ekspor</button>
        </div>
        <ul id="itinList" class="mt-3 space-y-2 text-sm"></ul>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section id="faq" class="py-10 bg-white border-y border-slate-200">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-xl font-semibold mb-4">Pertanyaan yang Sering Diajukan</h2>
      <div class="space-y-3">
        <details class="rounded-xl ring-1 ring-slate-200 bg-white p-4">
          <summary class="font-medium cursor-pointer">Kapan waktu terbaik berkunjung?</summary>
          <p class="mt-2 text-sm text-slate-700">Musim kemarau (Mei–September) untuk cuaca cerah. Pagi hari cocok untuk foto, sore untuk menikmati sunset.</p>
        </details>
        <details class="rounded-xl ring-1 ring-slate-200 bg-white p-4">
          <summary class="font-medium cursor-pointer">Apakah tersedia penyewaan perahu?</summary>
          <p class="mt-2 text-sm text-slate-700">Ada. Tersedia di dermaga Parapat dan beberapa titik di Samosir. Negosiasikan tarif sebelum naik.</p>
        </details>
        <details class="rounded-xl ring-1 ring-slate-200 bg-white p-4">
          <summary class="font-medium cursor-pointer">Apakah ramah keluarga & lansia?</summary>
          <p class="mt-2 text-sm text-slate-700">Ya, banyak area datar dan fasilitas umum. Untuk trekking, pilih jalur mudah.</p>
        </details>
      </div>
    </div>
  </section>

  <!-- KONTAK / CTA -->
  <section id="kontak" class="py-10">
    <div class="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 items-start">
      <div class="md:col-span-2">
        <h2 class="text-xl font-semibold mb-2">Hubungi Kami</h2>
        <p class="text-slate-700">Kerja sama promosi, kunjungan rombongan, atau pertanyaan umum — kami siap membantu.</p>
        <form class="mt-4 grid md:grid-cols-2 gap-3">
          <input type="text" placeholder="Nama" class="px-3 py-2 rounded-xl border border-slate-300"/>
          <input type="email" placeholder="Email" class="px-3 py-2 rounded-xl border border-slate-300"/>
          <input type="text" placeholder="Subjek" class="md:col-span-2 px-3 py-2 rounded-xl border border-slate-300"/>
          <textarea rows="4" placeholder="Pesan" class="md:col-span-2 px-3 py-2 rounded-xl border border-slate-300"></textarea>
          <button type="button" class="md:col-span-2 px-4 py-2 rounded-xl bg-blue-600 text-white">Kirim</button>
        </form>
        <p class="mt-2 text-xs text-slate-500">Form ini contoh statis. Sambungkan ke Google Form/backend sesuai kebutuhan.</p>
      </div>
      <aside class="rounded-2xl ring-1 ring-slate-200 bg-white p-5 text-sm">
        <div class="font-medium">Pusat Informasi Danau Toba</div>
        <div class="text-slate-600 mt-1">Jl. Sisingamangaraja No. 10, Parapat</div>
        <div class="mt-2 space-x-2">
          <a target="_blank" href="https://wa.me/6281234567890" class="underline">WhatsApp</a>
          <a target="_blank" href="#" class="underline">Instagram</a>
          <a target="_blank" href="#" class="underline">Facebook</a>
        </div>
      </aside>
    </div>
  </section>

  <footer class="py-8 text-center text-sm text-slate-500">© <span id="year"></span> Danau Toba • Panduan Pengunjung</footer>

  <script>
    // ===== DATA DASAR (sesuaikan) =====
    const DEST = {
      nama: 'Danau Toba',
      lat: 2.685, lon: 98.875,
      maps: 'https://www.google.com/maps?q=Danau+Toba',
      alamat: 'Parapat, Kab. Simalungun, Sumatera Utara'
    };

    // ===== MAPS =====
    const map = L.map('map').setView([DEST.lat, DEST.lon], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19, attribution: '&copy; OpenStreetMap'}).addTo(map);
    const marker = L.marker([DEST.lat, DEST.lon]).addTo(map).bindPopup(`<b>${DEST.nama}</b><br>${DEST.alamat}`);

    const heroMap = L.map('heroMap', { zoomControl:false, attributionControl:false }).setView([DEST.lat, DEST.lon], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(heroMap);
    L.circleMarker([DEST.lat, DEST.lon]).addTo(heroMap);

    document.getElementById('linkMaps').href = DEST.maps;
    document.getElementById('gmapsBtn').href = DEST.maps;

    // ===== TABS TRANSPORT =====
    const tabs = document.querySelectorAll('.tabbtn');
    tabs.forEach(btn=>btn.addEventListener('click', ()=>{
      const id = btn.dataset.tab;
      document.querySelectorAll('[id^="tab-"]').forEach(el=>el.classList.add('hidden'));
      document.getElementById('tab-'+id).classList.remove('hidden');
      tabs.forEach(b=>b.classList.remove('bg-blue-600','text-white'));
      btn.classList.add('bg-blue-600','text-white');
    }));
    // default select first
    tabs[0].click();

    // ===== ITINERARY =====
    const itin = [];
    function renderItin(){
      const ul = document.getElementById('itinList');
      ul.innerHTML = itin.map((t,i)=>`<li class='flex items-center gap-2'><span class='flex-1'>${t}</span><button class='px-2 py-1 text-xs rounded-lg border' onclick='delItin(${i})'>Hapus</button></li>`).join('');
    }
    function addItin(v){ if(!v) return; itin.push(v); renderItin(); }
    function delItin(i){ itin.splice(i,1); renderItin(); }
    document.getElementById('itinAdd').addEventListener('click', ()=>{
      const v = document.getElementById('itinInput').value.trim();
      if(v){ addItin(v); document.getElementById('itinInput').value=''; }
    });
    document.getElementById('btnExport').addEventListener('click', ()=>{
      const blob = new Blob([itin.map((t,i)=>`${i+1}. ${t}`).join('\n')||'Rencana kosong'], {type:'text/plain'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href=url; a.download='rencana-kunjungan.txt'; a.click(); URL.revokeObjectURL(url);
    });

    // ===== UTIL =====
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('copyAlamat').addEventListener('click', async ()=>{
      try{ await navigator.clipboard.writeText(DEST.alamat); alert('Alamat disalin.'); }catch(e){ alert('Gagal menyalin.'); }
    });
  </script>
</body>
</html>
