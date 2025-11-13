import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ orders }) {
    const list = orders?.data ?? [];

    // 🔹 Hitung stats ringan di frontend
    const total = list.length;
    const paid = list.filter((o) => o.payment_status === "paid").length;
    const pending = list.filter((o) => o.payment_status === "pending").length;
    const failed = total - paid - pending;

    return (
        <AuthenticatedLayout>
            <Head title="Orders" />

            <div className="px-4 pb-8 pt-2 sm:px-6 lg:px-8 space-y-5">
                {/* Header + Action */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-slate-900">
                            Daftar Order
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Rekap pemesanan tiket, baik online maupun offline.
                        </p>
                    </div>
                    <Link
                        href={route("dashboard.orders.create")}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                    >
                        <span className="text-base leading-none">＋</span>
                        Tambah Order
                    </Link>
                </div>

                {/* 🔹 Summary kecil di atas tabel */}
                <div className="grid gap-3 text-xs sm:grid-cols-4">
                    <SummaryChip
                        label="Total Order"
                        value={total}
                        tone="slate"
                    />
                    <SummaryChip
                        label="Sudah Dibayar"
                        value={paid}
                        tone="emerald"
                    />
                    <SummaryChip
                        label="Menunggu Pembayaran"
                        value={pending}
                        tone="amber"
                    />
                    <SummaryChip
                        label="Gagal / Batal"
                        value={failed}
                        tone="rose"
                    />
                </div>

                {/* Tabel utama */}
                <div className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                    <table className="min-w-full divide-y divide-slate-200 text-sm">
                        <thead className="bg-slate-50/80">
                            <tr>
                                <Th>Kode</Th>
                                <Th>Paket</Th>
                                <Th>Pembeli</Th>
                                <Th>Sumber</Th>
                                <Th>Status Bayar</Th>
                                <Th>Status Tiket</Th>
                                <Th align="right">Total</Th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {list.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-4 py-6 text-center text-sm text-slate-500"
                                    >
                                        Belum ada order.
                                    </td>
                                </tr>
                            )}

                            {list.map((o, idx) => (
                                <tr
                                    key={o.id}
                                    className={
                                        idx % 2 === 1
                                            ? "bg-slate-50/40"
                                            : "bg-white"
                                    }
                                >
                                    <td className="px-4 py-2 align-middle">
                                        <div className="text-[11px] font-mono text-slate-700">
                                            {o.order_code}
                                        </div>
                                        <div className="mt-0.5 text-[10px] text-slate-400">
                                            {o.created_at}
                                        </div>
                                    </td>

                                    <td className="px-4 py-2 align-middle text-slate-800">
                                        <span className="line-clamp-2 text-xs sm:text-sm">
                                            {o.package}
                                        </span>
                                    </td>

                                    <td className="px-4 py-2 align-middle">
                                        <div className="text-sm text-slate-800">
                                            {o.buyer_name}
                                        </div>
                                        <div className="text-[11px] text-slate-400">
                                            {o.buyer_phone}
                                        </div>
                                    </td>

                                    <td className="px-4 py-2 align-middle">
                                        <SourceBadge source={o.source} />
                                    </td>

                                    <td className="px-4 py-2 align-middle">
                                        <PaymentBadge
                                            status={o.payment_status}
                                        />
                                    </td>

                                    <td className="px-4 py-2 align-middle">
                                        <TicketBadge status={o.ticket_status} />
                                    </td>

                                    <td className="px-4 py-2 align-middle text-right text-slate-900">
                                        <span className="whitespace-nowrap font-medium">
                                            Rp{" "}
                                            {Number(
                                                o.total_price ?? 0
                                            ).toLocaleString("id-ID")}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination sederhana */}
                {orders?.links && orders.links.length > 1 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {orders.links.map((l, i) => {
                            const isDisabled = !l.url;
                            const isActive = l.active;
                            return (
                                <Link
                                    key={i}
                                    href={l.url || "#"}
                                    className={[
                                        "rounded-lg px-3 py-1.5 text-xs",
                                        isActive
                                            ? "bg-blue-600 text-white"
                                            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                                        isDisabled &&
                                            "!cursor-not-allowed !opacity-50 hover:bg-white",
                                    ].join(" ")}
                                    dangerouslySetInnerHTML={{
                                        __html: l.label,
                                    }}
                                />
                            );
                        })}
                        {/* info kecil di kanan */}
                        {typeof orders.total === "number" && (
                            <span className="ml-auto text-[11px] text-slate-400">
                                Menampilkan {list.length} dari {orders.total}{" "}
                                data
                            </span>
                        )}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

/* ================= Small components ================= */

function Th({ children, align = "left" }) {
    return (
        <th
            className={[
                "px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600",
                align === "right" ? "text-right" : "text-left",
            ].join(" ")}
        >
            {children}
        </th>
    );
}

function SummaryChip({ label, value, tone = "slate" }) {
    const toneMap = {
        slate: "bg-slate-50 text-slate-800 ring-slate-200",
        emerald: "bg-emerald-50 text-emerald-800 ring-emerald-200",
        amber: "bg-amber-50 text-amber-800 ring-amber-200",
        rose: "bg-rose-50 text-rose-800 ring-rose-200",
    };

    return (
        <div
            className={[
                "rounded-2xl border bg-white px-3 py-2.5 shadow-sm ring-1",
                toneMap[tone] || toneMap.slate,
            ].join(" ")}
        >
            <p className="text-[11px] font-medium uppercase tracking-wide opacity-70">
                {label}
            </p>
            <p className="mt-1 text-lg font-semibold leading-none">{value}</p>
        </div>
    );
}

function SourceBadge({ source }) {
    const src = (source || "").toLowerCase();

    const isOnline = src === "online";
    const baseClass =
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium";

    if (isOnline) {
        return (
            <span className={`${baseClass} bg-blue-50 text-blue-700`}>
                Online
            </span>
        );
    }

    return (
        <span className={`${baseClass} bg-slate-100 text-slate-600`}>
            {source || "Unknown"}
        </span>
    );
}

function PaymentBadge({ status }) {
    const s = (status || "").toLowerCase();
    const baseClass =
        "inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold";

    if (s === "paid") {
        return (
            <span className={`${baseClass} bg-emerald-50 text-emerald-700`}>
                Paid
            </span>
        );
    }
    if (s === "pending") {
        return (
            <span className={`${baseClass} bg-amber-50 text-amber-700`}>
                Pending
            </span>
        );
    }
    return (
        <span className={`${baseClass} bg-slate-100 text-slate-600`}>
            {status || "Unknown"}
        </span>
    );
}

function TicketBadge({ status }) {
    const s = (status || "").toLowerCase();
    const baseClass =
        "inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold";

    if (s === "active") {
        return (
            <span className={`${baseClass} bg-emerald-50 text-emerald-700`}>
                Aktif (sudah check-in)
            </span>
        );
    }

    return (
        <span className={`${baseClass} bg-slate-100 text-slate-500`}>
            Belum aktif
        </span>
    );
}
