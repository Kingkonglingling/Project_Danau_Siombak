// resources/js/Pages/Front/Review/Done.jsx
import { Head, Link } from "@inertiajs/react";

export default function ReviewDone({ order_code }) {
    return (
        <>
            <Head title="Review Selesai" />
            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
                <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Selesai
                    </p>
                    <h1 className="mt-2 text-xl font-semibold text-slate-900">
                        Review sudah pernah dikirim ✅
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Makasih ya. Kalau ini kamu yang kedua kali buka linknya,
                        berarti sistemnya jalan. Kalau kamu yang ketiga kali… ya
                        tetap jalan sih.
                    </p>

                    <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-500">Order Code</span>
                            <span className="font-mono text-xs">
                                {order_code}
                            </span>
                        </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                        <Link
                            href={route("front.packages.index")}
                            className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                            Lihat Paket
                        </Link>
                        <button
                            type="button"
                            onClick={() => window.close?.()}
                            className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
                        >
                            Tutup
                        </button>
                    </div>

                    <p className="mt-2 text-[11px] text-slate-500">
                        Kalau tombol “Tutup” nggak ngaruh, itu bukan bug
                        aplikasi kamu. Itu browser yang sok tegas.
                    </p>
                </div>
            </div>
        </>
    );
}
