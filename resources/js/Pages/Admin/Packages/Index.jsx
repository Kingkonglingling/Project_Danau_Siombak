import { Link, router, Head } from "@inertiajs/react";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ packages }) {
    const list = packages?.data ?? [];
    const [q, setQ] = useState("");

    const filtered = useMemo(() => {
        const key = q.trim().toLowerCase();
        if (!key) return list;
        return list.filter(
            (p) =>
                String(p.title || "")
                    .toLowerCase()
                    .includes(key) ||
                String(p.created_at || "")
                    .toLowerCase()
                    .includes(key)
        );
    }, [q, list]);

    const handleDelete = async (pkg) => {
        const res = await Swal.fire({
            icon: "warning",
            title: "Hapus paket ini?",
            text: pkg.title || "Paket wisata",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal",
            confirmButtonColor: "#dc2626",
            reverseButtons: true,
            heightAuto: false,
        });
        if (!res.isConfirmed) return;

        router.delete(route("dashboard.package.destroy", pkg.id), {
            onSuccess: () =>
                Swal.fire({
                    icon: "success",
                    title: "Terhapus!",
                    timer: 1500,
                    showConfirmButton: false,
                    heightAuto: false,
                }),
            onError: () =>
                Swal.fire({
                    icon: "error",
                    title: "Gagal menghapus",
                    heightAuto: false,
                }),
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Package Ticket" />

            <div className="px-4 pb-10 pt-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Paket Wisata
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Kelola daftar paket wisata / tiket dengan gambar,
                            deskripsi, dan kontak WhatsApp.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <input
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Cari judul / tanggal…"
                                className="w-64 rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300"
                            />
                            <svg
                                className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="11" cy="11" r="7" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </div>

                        <Link
                            href={route("dashboard.package.create")}
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                        >
                            <PlusIcon className="h-4 w-4" />
                            Tambah
                        </Link>
                    </div>
                </div>

                {/* Grid */}
                <div
                    className={`
          grid gap-6
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        `}
                >
                    {filtered.length === 0 && <EmptyState query={q} />}

                    {filtered.map((p) => (
                        <Card
                            key={p.id}
                            pkg={p}
                            onDelete={() => handleDelete(p)}
                        />
                    ))}
                </div>

                {/* Pagination */}
                {packages?.links && packages.links.length > 1 && (
                    <div className="mt-8 flex flex-wrap items-center gap-2">
                        {packages.links.map((l, i) => {
                            const isDisabled = !l.url;
                            const isActive = l.active;
                            return (
                                <Link
                                    key={i}
                                    href={l.url || "#"}
                                    className={[
                                        "rounded-lg px-3 py-1.5 text-sm",
                                        isActive
                                            ? "bg-blue-600 text-white"
                                            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                                        isDisabled &&
                                            "!cursor-not-allowed !opacity-60 hover:bg-white",
                                    ].join(" ")}
                                    dangerouslySetInnerHTML={{
                                        __html: l.label,
                                    }}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

/* ---------- Card component ---------- */

function Card({ pkg, onDelete }) {
    const created = pkg.created_at;

    return (
        <div className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:shadow-md">
            {/* media */}
            <div className="relative aspect-[16/9] w-full bg-slate-100">
                {pkg.image_url ? (
                    <>
                        <img
                            src={pkg.image_url}
                            alt={pkg.title}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent opacity-0 transition group-hover:opacity-100" />
                    </>
                ) : (
                    <div className="absolute inset-0 grid place-items-center text-slate-400">
                        <ImageIcon className="h-8 w-8" />
                    </div>
                )}

                {/* quick actions on hover */}
                <div className="absolute right-2 top-2 flex gap-2 opacity-0 transition group-hover:opacity-100">
                    <Link
                        href={route("dashboard.package.edit", pkg.id)}
                        className="rounded-lg bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700 shadow hover:bg-white"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={onDelete}
                        className="rounded-lg bg-white/90 px-2.5 py-1 text-xs font-medium text-red-600 shadow hover:bg-white"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* body */}
            <div className="p-4">
                <div className="mb-1 flex items-start justify-between gap-3">
                    <h3 className="line-clamp-2 text-base font-semibold text-slate-900">
                        {pkg.title || "Tanpa judul"}
                    </h3>
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{created}</span>
                </div>

                {/* actions (mobile) */}
                <div className="mt-4 flex gap-2 sm:hidden">
                    <Link
                        href={route("dashboard.package.edit", pkg.id)}
                        className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={onDelete}
                        className="flex-1 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-center text-sm font-medium text-red-700 hover:bg-red-100"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ---------- Empty state ---------- */

function EmptyState({ query }) {
    return (
        <div className="col-span-full rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-400">
                <BoxIcon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
                Tidak ada paket
            </h3>
            <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
                {query ? (
                    <>
                        Pencarian <span className="font-medium">“{query}”</span>{" "}
                        tidak ditemukan.
                    </>
                ) : (
                    <>Mulai dengan menambahkan paket baru.</>
                )}
            </p>
            <div className="mt-4">
                <Link
                    href={route("dashboard.package.create")}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                    <PlusIcon className="h-4 w-4" />
                    Tambah Paket
                </Link>
            </div>
        </div>
    );
}

/* ---------- tiny inline icons (SVG) ---------- */

function PlusIcon({ className }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M12 5v14M5 12h14" />
        </svg>
    );
}
function ImageIcon({ className }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 16l5-5 4 4 5-6 4 5" />
            <circle cx="8" cy="8" r="1.5" />
        </svg>
    );
}
function CalendarIcon({ className }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
    );
}
function BoxIcon({ className }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z" />
            <path d="M3.27 6.96 12 12l8.73-5.04" />
            <path d="M12 22V12" />
        </svg>
    );
}
