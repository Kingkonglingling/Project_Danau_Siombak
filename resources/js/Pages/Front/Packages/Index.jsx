import Footer from "@/Components/HomePageComponents/Footer";
import Navbar from "@/Components/HomePageComponents/Navbar";
import { Head, Link } from "@inertiajs/react";
import { MapPin, Sailboat, Menu } from "lucide-react";

export default function Index({ packages }) {
    const list = packages ?? [];

    return (
        <>
            <Head title="Paket Wisata" />
            <Navbar Sailboat={Sailboat} Menu={Menu} />

            <div className="min-h-screen bg-slate-50">

                <main className="mx-auto max-w-7xl px-4 py-8">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Pilih Paket Tiket
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Klik paket yang ingin dipesan, lalu lanjutkan ke form
                        pemesanan.
                    </p>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                        {list.length === 0 && (
                            <div className="col-span-full rounded-2xl bg-white p-6 text-center text-sm text-slate-500 shadow-sm ring-1 ring-slate-200">
                                Belum ada paket tersedia.
                            </div>
                        )}

                        {list.map((p) => (
                            <article
                                key={p.id}
                                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
                            >
                                {/* 🔹 Gambar dengan tinggi fixed */}
                                <div className="relative h-40 w-full overflow-hidden bg-slate-100 sm:h-44">
                                    {p.image_url ? (
                                        <img
                                            src={p.image_url}
                                            alt={p.title}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                                            Tidak ada gambar
                                        </div>
                                    )}
                                </div>

                                {/* 🔹 Konten card, fleksibel & button nempel bawah */}
                                <div className="flex flex-1 flex-col p-4">
                                    <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
                                        {p.title}
                                    </h3>

                                    <div className="mt-3 space-y-1 text-xs text-slate-600">
                                        <p>
                                            Dewasa:{" "}
                                            <span className="font-semibold">
                                                Rp{" "}
                                                {Number(
                                                    p.adult_price ?? 0
                                                ).toLocaleString("id-ID")}
                                            </span>
                                        </p>
                                        <p>
                                            Anak:{" "}
                                            <span className="font-semibold">
                                                {p.child_price != null
                                                    ? `Rp ${Number(
                                                          p.child_price
                                                      ).toLocaleString(
                                                          "id-ID"
                                                      )}`
                                                    : "Sama seperti dewasa"}
                                            </span>
                                        </p>
                                    </div>

                                    {/* mt-auto biar tombol selalu di bawah */}
                                    <div className="mt-auto pt-4 flex justify-end">
                                        <Link
                                            href={route(
                                                "front.packages.show",
                                                p.slug
                                            )}
                                            className="inline-flex items-center rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
                                        >
                                            Lihat Paket
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </main>
                <Footer MapPin={MapPin} />
            </div>
        </>
    );
}
