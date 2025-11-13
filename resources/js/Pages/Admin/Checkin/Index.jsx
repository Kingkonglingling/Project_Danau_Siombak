import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { QrCode, ScanLine, Info } from "lucide-react";

export default function CheckinPage() {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!code.trim()) return;

        setLoading(true);

        axios
            .post(route("checkin.store", code.trim()))
            .then((res) => {
                const data = res.data;
                if (data.status === "success") {
                    Swal.fire({
                        icon: "success",
                        title: "Check-in Berhasil",
                        html: `
                            <div style="text-align:left;font-size:13px">
                              <div><b>Order ID:</b> ${
                                  data.order.order_code
                              }</div>
                              <div><b>Nama:</b> ${data.order.buyer_name}</div>
                              <div><b>Telp:</b> ${
                                  data.order.buyer_phone ?? "-"
                              }</div>
                              <div><b>Dibayar:</b> ${
                                  data.order.paid_at ?? "-"
                              }</div>
                              <div><b>Check-in:</b> ${
                                  data.order.checked_in_at
                              }</div>
                            </div>
                        `,
                    });
                } else if (data.status === "already") {
                    Swal.fire({
                        icon: "info",
                        title: "Sudah Check-in",
                        text: data.message,
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Gagal",
                        text: data.message ?? "Terjadi kesalahan.",
                    });
                }
            })
            .catch((err) => {
                const message =
                    err.response?.data?.message ||
                    "Terjadi error saat check-in.";
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: message,
                });
            })
            .finally(() => {
                setLoading(false);
                setCode("");
            });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Check-in Tiket" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                            <ScanLine className="h-3 w-3" />
                            Mode Gate - Check-in
                        </div>
                        <h1 className="mt-3 text-xl font-semibold text-slate-900">
                            Check-in Tiket Pengunjung
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Scan QR dari e-ticket atau ketik kode pemesanan
                            untuk menandai pengunjung sudah masuk.
                        </p>
                    </div>
                </div>

                {/* Main content */}
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                    {/* Form check-in */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex items-center justify-between gap-3">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-800">
                                    <QrCode className="h-4 w-4 text-slate-500" />
                                    Kode Tiket / Order ID
                                </label>
                                {code && (
                                    <span className="rounded-full bg-slate-900/90 px-3 py-0.5 text-[11px] font-mono text-slate-50">
                                        {code}
                                    </span>
                                )}
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    autoFocus
                                    className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-mono tracking-wide shadow-sm outline-none ring-0 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    placeholder="ORD-20251113-ABCDEF"
                                    value={code}
                                    onChange={(e) =>
                                        setCode(e.target.value.toUpperCase())
                                    }
                                />
                                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[11px] uppercase text-slate-400">
                                    Scan / Enter
                                </span>
                            </div>

                            <p className="text-xs text-slate-500">
                                Barcode scanner USB biasanya{" "}
                                <span className="font-semibold">
                                    mengisi field ini otomatis
                                </span>{" "}
                                lalu mengirim tombol{" "}
                                <span className="font-mono">Enter</span>.
                                Pastikan kursor berada di kotak input ini
                                sebelum scan.
                            </p>

                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={loading || !code.trim()}
                                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {loading
                                        ? "Memproses..."
                                        : "Check-in Sekarang"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setCode("")}
                                    className="text-xs text-slate-500 underline-offset-2 hover:underline"
                                >
                                    Bersihkan input
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Side info panel */}
                    <div className="space-y-3">
                        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 sm:px-5">
                            <div className="mb-2 flex items-center gap-2">
                                <Info className="h-4 w-4 text-slate-500" />
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Panduan Cepat
                                </p>
                            </div>
                            <ul className="space-y-2 text-xs text-slate-600">
                                <li>
                                    • Format kode yang dipakai:{" "}
                                    <span className="font-mono">
                                        ORD-YYYYMMDD-XXXXXX
                                    </span>
                                </li>
                                <li>
                                    • Pastikan tiket sudah{" "}
                                    <span className="font-semibold">paid</span>{" "}
                                    sebelum melakukan check-in.
                                </li>
                                <li>
                                    • Jika tiket sudah pernah check-in, sistem
                                    akan memberi tahu bahwa tiket{" "}
                                    <span className="font-semibold">
                                        sudah digunakan
                                    </span>
                                    .
                                </li>
                                <li>
                                    • Untuk verifikasi manual, cocokan nama
                                    pengunjung di popup dengan identitas di
                                    lapangan.
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-xs text-slate-500 sm:px-5">
                            <p className="font-semibold text-slate-700">
                                Tips penggunaan scanner
                            </p>
                            <p className="mt-1">
                                • Pasang scanner seperti keyboard biasa. <br />•
                                Arahkan ke QR di e-ticket sampai bunyi beep.{" "}
                                <br />• Kode akan muncul di input, lalu tekan{" "}
                                <span className="font-mono">Enter</span> jika
                                scanner tidak mengirim otomatis.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
