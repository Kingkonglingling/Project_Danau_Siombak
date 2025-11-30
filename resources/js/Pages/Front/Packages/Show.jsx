import AppLayout from "@/Layouts/AppLayout";
import { Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Show({ package: pkg }) {
    const { data, setData, post, processing, errors } = useForm({
        package_id: pkg?.id ?? "",
        buyer_name: "",
        buyer_phone: "",
        buyer_email: "",
        adult_count: 1,
        child_count: 0,
    });

    const [submitting, setSubmitting] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        post(route("front.orders.store"), {
            preserveScroll: true,
            onFinish: () => setSubmitting(false),
        });
    };

    const adultPrice = pkg?.adult_price ?? 0;
    const childPrice = pkg?.child_price ?? pkg?.adult_price ?? 0;
    const total =
        (Number(data.adult_count) || 0) * adultPrice +
        (Number(data.child_count) || 0) * childPrice;

    return (
        <>
            <AppLayout title={pkg?.title ?? "Paket"}>
                <div className="min-h-screen bg-slate-50">
                    <header className="border-b bg-white">
                        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                            <Link
                                href={route("front.packages.index")}
                                className="text-base text-blue-600 hover:underline"
                            >
                                ← Kembali ke daftar paket
                            </Link>
                        </div>
                    </header>

                    <main className="mx-auto max-w-7xl px-4 py-8 space-y-6">
                        {/* Kartu info paket */}
                        <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                            <div className="bg-slate-900/90 px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-100 sm:px-5">
                                Detail Paket
                            </div>

                            <div className="bg-slate-950/80">
                                <div className="mx-auto max-w-7xl">
                                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-800">
                                        {pkg.image_url ? (
                                            <img
                                                src={pkg.image_url}
                                                alt={pkg.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                                                Tidak ada gambar
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 p-4 sm:p-5">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                                        {pkg.title}
                                    </h2>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Silakan baca detail paket sebelum
                                        mengisi form pemesanan.
                                    </p>
                                </div>

                                <div className="text-sm text-slate-700">
                                    <div
                                        className="rich-text prose prose-sm max-w-none prose-slate"
                                        dangerouslySetInnerHTML={{
                                            __html: pkg.description || "",
                                        }}
                                    />
                                </div>

                                <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                                    <div className="rounded-xl bg-slate-50 p-3">
                                        <p className="text-xs text-slate-500">
                                            Harga Dewasa
                                        </p>
                                        <p className="text-base font-semibold text-slate-900">
                                            Rp{" "}
                                            {Number(
                                                pkg.adult_price ?? 0
                                            ).toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-slate-50 p-3">
                                        <p className="text-xs text-slate-500">
                                            Harga Anak
                                        </p>
                                        <p className="text-base font-semibold text-slate-900">
                                            {pkg.child_price != null
                                                ? `Rp ${Number(
                                                      pkg.child_price
                                                  ).toLocaleString("id-ID")}`
                                                : "Sama seperti dewasa"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <ReviewSlider reviews={pkg?.reviews ?? []} />

                        {/* Kartu form pemesanan */}
                        <section>
                            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                                    <div>
                                        <h3 className="text-base font-semibold text-slate-900">
                                            Form Pemesanan
                                        </h3>
                                        <p className="mt-1 text-xs text-slate-500">
                                            Isi data pemesan dan jumlah
                                            pengunjung. Setelah itu lanjut ke
                                            pembayaran online.
                                        </p>
                                    </div>
                                </div>

                                <form
                                    onSubmit={submit}
                                    className="mt-4 space-y-4 text-sm"
                                >
                                    <input
                                        type="hidden"
                                        value={data.package_id}
                                        name="package_id"
                                    />

                                    {/* Nama */}
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-slate-700">
                                            Nama Lengkap
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                            value={data.buyer_name}
                                            onChange={(e) =>
                                                setData(
                                                    "buyer_name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.buyer_name && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.buyer_name}
                                            </p>
                                        )}
                                    </div>

                                    {/* WA */}
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-slate-700">
                                            Nomor WhatsApp
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                            placeholder="62812xxxx"
                                            value={data.buyer_phone}
                                            onChange={(e) =>
                                                setData(
                                                    "buyer_phone",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.buyer_phone && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.buyer_phone}
                                            </p>
                                        )}

                                        {/* 🔹 NB: nomor WA harus aktif */}
                                        <p className="mt-2 text-[11px] text-amber-600">
                                            * NB: Nomor WhatsApp harus aktif
                                            karena link e-ticket akan dikirim ke
                                            sana.
                                        </p>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-slate-700">
                                            Email (opsional)
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                            value={data.buyer_email}
                                            onChange={(e) =>
                                                setData(
                                                    "buyer_email",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.buyer_email && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.buyer_email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Jumlah pengunjung */}
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-1 block text-xs font-medium text-slate-700">
                                                Dewasa
                                            </label>
                                            <input
                                                type="number"
                                                min={0}
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                                value={data.adult_count}
                                                onChange={(e) =>
                                                    setData(
                                                        "adult_count",
                                                        Number(e.target.value)
                                                    )
                                                }
                                            />
                                            {errors.adult_count && (
                                                <p className="mt-1 text-xs text-red-600">
                                                    {errors.adult_count}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-xs font-medium text-slate-700">
                                                Anak
                                            </label>
                                            <input
                                                type="number"
                                                min={0}
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                                value={data.child_count}
                                                onChange={(e) =>
                                                    setData(
                                                        "child_count",
                                                        Number(e.target.value)
                                                    )
                                                }
                                            />
                                            {errors.child_count && (
                                                <p className="mt-1 text-xs text-red-600">
                                                    {errors.child_count}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Ringkasan */}
                                    <div className="mt-2 space-y-1 rounded-xl bg-slate-50 p-3 text-xs text-slate-700">
                                        <p className="font-semibold text-slate-900">
                                            Ringkasan
                                        </p>
                                        <p>
                                            Dewasa: {data.adult_count || 0} x Rp{" "}
                                            {adultPrice.toLocaleString("id-ID")}
                                        </p>
                                        <p>
                                            Anak: {data.child_count || 0} x Rp{" "}
                                            {childPrice.toLocaleString("id-ID")}
                                        </p>
                                        <p className="pt-1 text-sm font-semibold text-slate-900">
                                            Total: Rp{" "}
                                            {total.toLocaleString("id-ID")}
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing || submitting}
                                        className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {processing || submitting
                                            ? "Memproses..."
                                            : "Lanjut ke Pembayaran"}
                                    </button>

                                    <p className="mt-2 text-[11px] text-slate-500">
                                        Setelah pembayaran berhasil, e-ticket
                                        dan barcode akan dikirim ke WhatsApp /
                                        email yang kamu isi.
                                    </p>
                                </form>
                            </div>
                        </section>
                    </main>
                </div>
            </AppLayout>
        </>
    );
}

function Stars({ value = 0 }) {
    const v = Math.max(0, Math.min(5, Number(value) || 0));
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < v;
                return (
                    <svg
                        key={i}
                        viewBox="0 0 24 24"
                        className={`h-4 w-4 ${
                            filled ? "text-amber-400" : "text-slate-300"
                        }`}
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                );
            })}
        </div>
    );
}

function ReviewSlider({ reviews = [] }) {
    // Avoid any SSR/hydration weirdness
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const hasReviews = Array.isArray(reviews) && reviews.length > 0;

    const fallback = [
        {
            rating: 5,
            reviewer_name: "Pengunjung",
            comment: "Tempatnya nyaman, tiketnya cepat, scan QR beres. Mantap.",
        },
        {
            rating: 5,
            reviewer_name: "Pengunjung",
            comment: "Bayar online gampang. Link tiket masuk WA. Simple.",
        },
        {
            rating: 4,
            reviewer_name: "Pengunjung",
            comment: "Anak-anak senang, proses masuknya cepat banget.",
        },
    ];

    const list = hasReviews ? reviews : fallback;

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Testimoni Pengunjung
                    </p>
                    <h4 className="mt-1 text-base font-semibold text-slate-900">
                        Biar kamu nggak beli tiket “berdasarkan perasaan”
                    </h4>
                    <p className="mt-1 text-xs text-slate-500">
                        {hasReviews
                            ? "Review asli dari pengunjung paket ini."
                            : "Contoh tampilan (belum ada review)."}
                    </p>
                </div>

                <div className="hidden sm:block rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600">
                    <span className="font-semibold">
                        {hasReviews ? reviews.length : 0}
                    </span>{" "}
                    review
                </div>
            </div>

            <div className="mt-4">
                <Swiper
                    modules={[Pagination, Autoplay, A11y]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2600, disableOnInteraction: false }}
                    spaceBetween={12}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1.2 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 2.2 },
                    }}
                >
                    {list.map((r, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="h-full rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                                <div className="flex items-start justify-between gap-3">
                                    <Stars value={r.rating} />
                                    <span className="text-[11px] text-slate-500">
                                        {r.created_at ? r.created_at : ""}
                                    </span>
                                </div>

                                <p className="mt-3 line-clamp-4 text-sm text-slate-700">
                                    {r.comment || "—"}
                                </p>

                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-xs font-semibold text-slate-900">
                                        {r.reviewer_name || "Anonim"}
                                    </p>
                                    <span className="text-[11px] text-slate-500">
                                        Verified buyer*
                                    </span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <p className="mt-2 text-[11px] text-slate-400">
                    *Verified buyer = review dari link review setelah pembelian
                    (kalau kamu pakai sistem token).
                </p>
            </div>
        </div>
    );
}
