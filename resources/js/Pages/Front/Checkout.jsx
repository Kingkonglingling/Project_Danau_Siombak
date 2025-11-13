import { Head } from "@inertiajs/react";
import { useState } from "react";
import axios from "axios";

export default function Checkout({ order }) {
    const [paying, setPaying] = useState(false);

    const handlePay = () => {
        if (!window.snap) {
            alert("Snap JS belum termuat. Coba refresh halaman.");
            return;
        }

        const snapToken = order.midtrans_snap_token;

        if (!snapToken) {
            console.error(
                "midtrans_snap_token tidak tersedia di props order",
                order
            );
            alert("Token pembayaran tidak tersedia. Coba ulangi pemesanan.");
            return;
        }

        setPaying(true);

        window.snap.pay(snapToken, {
            onSuccess: function (result) {
                axios
                    .post(route("midtrans.confirm"), result)
                    .then(() => {
                        window.location.href = route(
                            "front.tickets.show",
                            order.order_code
                        );
                    })
                    .catch((err) => {
                        console.error("midtrans.confirm error", err);
                        window.location.href = route(
                            "front.tickets.show",
                            order.order_code
                        );
                    })
                    .finally(() => {
                        setPaying(false);
                    });
            },
            onPending: function (result) {
                console.log("Payment pending", result);
                setPaying(false);
            },
            onError: function (result) {
                console.error("Payment error", result);
                setPaying(false);
                alert("Pembayaran gagal atau terjadi error.");
            },
            onClose: function () {
                console.log(
                    "Popup Snap ditutup tanpa menyelesaikan pembayaran."
                );
                setPaying(false);
            },
        });
    };

    const adultCount = order.adult_count ?? 0;
    const childCount = order.child_count ?? 0;

    return (
        <>
            <Head title={`Checkout ${order.order_code}`} />

            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <h1 className="text-lg font-semibold text-slate-900">
                        Checkout
                    </h1>
                    <p className="mt-1 text-xs text-slate-500">
                        Order ID:{" "}
                        <span className="font-mono">{order.order_code}</span>
                    </p>

                    {/* Total pembayaran */}
                    <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm">
                        <div className="flex justify-between">
                            <span>Total Pembayaran</span>
                            <span className="font-semibold">
                                Rp{" "}
                                {Number(order.total_price).toLocaleString(
                                    "id-ID"
                                )}
                            </span>
                        </div>
                    </div>

                    {/* 🔹 Rincian tiket */}
                    <div className="mt-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 p-3 text-xs text-slate-700">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                            Rincian Tiket
                        </p>
                        <div className="mt-1 space-y-0.5">
                            <p>
                                Dewasa:{" "}
                                <span className="font-semibold">
                                    {adultCount} tiket
                                </span>
                            </p>
                            <p>
                                Anak:{" "}
                                <span className="font-semibold">
                                    {childCount} tiket
                                </span>
                            </p>
                        </div>
                        <p className="mt-2 text-[11px] text-slate-400">
                            Pastikan jumlah tiket sudah sesuai sebelum
                            melanjutkan pembayaran.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handlePay}
                        disabled={paying}
                        className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
                    >
                        {paying ? "Memproses..." : "Bayar Sekarang"}
                    </button>

                    <p className="mt-2 text-[11px] text-slate-500">
                        Kamu akan dialihkan ke Snap Midtrans untuk menyelesaikan
                        pembayaran.
                    </p>
                </div>
            </div>
        </>
    );
}
