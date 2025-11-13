import { Head } from "@inertiajs/react";

export default function TicketShow({ order, qr_svg }) {
    return (
        <>
            <Head title={`Tiket ${order.order_code}`} />

            <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
                <div className="flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl md:flex-row">
                    {/* kiri: detail */}
                    <div className="md:w-1/2 border-b md:border-b-0 md:border-r border-slate-200 p-6">
                        <h2 className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
                            E-Ticket
                        </h2>
                        <h1 className="mt-2 text-xl font-bold text-slate-900">
                            {order.package_name}
                        </h1>

                        <div className="mt-4 space-y-1 text-sm text-slate-700">
                            <p>
                                <span className="font-semibold">Nama:</span>{" "}
                                {order.buyer_name}
                            </p>
                            <p>
                                <span className="font-semibold">
                                    Pengunjung:
                                </span>{" "}
                                {order.adult_count} dewasa, {order.child_count}{" "}
                                anak
                            </p>
                            <p>
                                <span className="font-semibold">Total:</span> Rp{" "}
                                {Number(order.total_price ?? 0).toLocaleString(
                                    "id-ID"
                                )}
                            </p>
                            {order.paid_at && (
                                <p className="text-xs text-slate-500 mt-2">
                                    Dibayar: {order.paid_at}
                                </p>
                            )}
                            <p className="text-xs text-slate-500">
                                Kode Pesanan:{" "}
                                <span className="font-mono">
                                    {order.order_code}
                                </span>
                            </p>
                        </div>

                        <p className="mt-4 text-xs text-slate-500">
                            Simpan screenshot halaman ini atau buka ulang lewat
                            link yang dikirim ke WhatsApp / email.
                        </p>
                    </div>

                    {/* kanan: QR */}
                    <div className="md:w-1/2 flex flex-col items-center justify-center bg-slate-50 p-6">
                        <div
                            className="bg-white p-3 rounded-xl shadow"
                            dangerouslySetInnerHTML={{ __html: qr_svg }}
                        />
                        <p className="mt-3 max-w-xs text-center text-xs text-slate-500">
                            Tunjukkan QR ini kepada petugas di pintu masuk.
                            Mereka akan melakukan scan untuk check-in.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
