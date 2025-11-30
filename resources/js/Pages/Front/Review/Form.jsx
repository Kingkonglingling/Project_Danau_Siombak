// resources/js/Pages/Front/Review/Form.jsx
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useMemo, useState } from "react";

function Star({ filled, onClick, onHover, onLeave, size = 28 }) {
    return (
        <button
            type="button"
            onClick={onClick}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className="p-1"
            aria-label={filled ? "Star filled" : "Star"}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill={filled ? "currentColor" : "none"}
                className={
                    filled ? "text-amber-400 drop-shadow-sm" : "text-slate-300"
                }
                stroke="currentColor"
                strokeWidth="1.5"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.75.75 0 0 1 1.04 0l2.72 2.62c.19.18.44.3.7.33l3.77.55c.68.1.95.94.46 1.42l-2.73 2.66c-.19.18-.28.44-.24.7l.64 3.75c.12.68-.6 1.21-1.21.9l-3.37-1.77a.75.75 0 0 0-.7 0l-3.37 1.77c-.61.32-1.33-.22-1.21-.9l.64-3.75a.75.75 0 0 0-.24-.7L3.8 8.399c-.5-.48-.22-1.32.46-1.42l3.77-.55c.26-.04.51-.15.7-.33l2.72-2.62Z"
                />
            </svg>
        </button>
    );
}

function ratingLabel(n) {
    if (n >= 5) return "Luar biasa ⭐";
    if (n === 4) return "Bagus banget";
    if (n === 3) return "Oke";
    if (n === 2) return "Kurang";
    if (n === 1) return "Buruk";
    return "Pilih rating";
}

export default function ReviewForm({ order, token }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewerName, setReviewerName] = useState(order?.buyer_name || "");
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const shown = hover || rating;

    const hint = useMemo(() => ratingLabel(shown), [shown]);

    const submit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (!rating) {
            setErrorMsg("Pilih rating bintang dulu ya 🙂");
            return;
        }

        setLoading(true);
        try {
            await axios.post(route("front.review.store", token), {
                rating,
                reviewer_name: reviewerName?.trim() || null,
                comment: comment?.trim() || null,
            });

            setSent(true);
        } catch (err) {
            const msg =
                err.response?.data?.message ||
                "Gagal mengirim review. Coba lagi ya.";
            setErrorMsg(msg);
        } finally {
            setLoading(false);
        }
    };

    if (sent) {
        // fallback kalau Done.jsx belum dipakai
        return (
            <>
                <Head title="Review Terkirim" />
                <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                            Terima kasih
                        </p>
                        <h1 className="mt-2 text-xl font-semibold text-slate-900">
                            Review kamu sudah terkirim ✅
                        </h1>
                        <p className="mt-2 text-sm text-slate-600">
                            Terima kasih sudah membantu kami jadi lebih baik.
                        </p>
                        <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-500">
                                    Order Code
                                </span>
                                <span className="font-mono text-xs">
                                    {order?.order_code}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Beri Review" />
            <div className="min-h-screen bg-slate-950">
                {/* top glow */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 left-1/2 h-80 w-[700px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
                    <div className="absolute top-24 right-[-120px] h-64 w-64 rounded-full bg-amber-400/15 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-6xl px-4 py-10">
                    <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-5">
                        {/* left info */}
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white shadow-xl backdrop-blur">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">
                                    Review Pengunjung
                                </p>
                                <h1 className="mt-2 text-xl font-semibold">
                                    {order?.package_title || "Paket Wisata"}
                                </h1>

                                <div className="mt-4 space-y-2 text-sm text-white/80">
                                    <Row
                                        label="Nama"
                                        value={order?.buyer_name || "-"}
                                    />
                                    <Row
                                        label="Order"
                                        value={
                                            <span className="font-mono text-[12px] text-white/90">
                                                {order?.order_code}
                                            </span>
                                        }
                                    />
                                </div>

                                <div className="mt-5 rounded-xl bg-white/5 p-3 text-xs text-white/70">
                                    Isi bintang + komentar singkat. Review kamu
                                    bakal tampil di halaman detail paket (biar
                                    calon pengunjung nggak tebak-tebakan).
                                </div>
                            </div>
                        </div>

                        {/* right form */}
                        <div className="lg:col-span-3">
                            <form
                                onSubmit={submit}
                                className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200"
                            >
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                                    Tulis Review
                                </p>
                                <h2 className="mt-2 text-xl font-semibold text-slate-900">
                                    Gimana pengalamanmu?
                                </h2>
                                <p className="mt-1 text-sm text-slate-600">
                                    Pilih rating bintang, lalu tulis komentar
                                    kalau mau.
                                </p>

                                {/* stars */}
                                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center">
                                            {[1, 2, 3, 4, 5].map((n) => (
                                                <Star
                                                    key={n}
                                                    filled={n <= shown}
                                                    onClick={() => setRating(n)}
                                                    onHover={() => setHover(n)}
                                                    onLeave={() => setHover(0)}
                                                />
                                            ))}
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xs font-semibold text-slate-900">
                                                {hint}
                                            </p>
                                            <p className="text-[11px] text-slate-500">
                                                {rating
                                                    ? `Dipilih: ${rating}/5`
                                                    : "Belum ada rating"}
                                            </p>
                                        </div>
                                    </div>

                                    {errorMsg && (
                                        <div className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-xs text-rose-700 ring-1 ring-rose-100">
                                            {errorMsg}
                                        </div>
                                    )}
                                </div>

                                {/* name */}
                                <div className="mt-4">
                                    <label className="mb-1 block text-xs font-medium text-slate-700">
                                        Nama (opsional)
                                    </label>
                                    <input
                                        type="text"
                                        value={reviewerName}
                                        onChange={(e) =>
                                            setReviewerName(e.target.value)
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                        placeholder="Misalnya: Budi"
                                    />
                                </div>

                                {/* comment */}
                                <div className="mt-4">
                                    <label className="mb-1 block text-xs font-medium text-slate-700">
                                        Komentar (opsional)
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={comment}
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                        placeholder="Contoh: tempatnya bersih, proses masuk cepat, recommended."
                                    />
                                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                                        <span>Max 500 karakter</span>
                                        <span>{comment.length}/500</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {loading ? "Mengirim..." : "Kirim Review"}
                                </button>

                                <p className="mt-2 text-[11px] text-slate-500">
                                    Dengan mengirim review, kamu membantu
                                    pengunjung lain mengambil keputusan. Dan ya,
                                    kamu juga membantu admin nggak stres.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function Row({ label, value }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <span className="text-white/60">{label}</span>
            <span className="text-white">{value}</span>
        </div>
    );
}
