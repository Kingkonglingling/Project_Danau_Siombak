import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head, router } from "@inertiajs/react";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Index({ questions }) {
    const [q, setQ] = useState("");
    const [typeFilter, setTypeFilter] = useState("all"); // all | stars | text
    const [statusFilter, setStatusFilter] = useState("all"); // all | active | inactive

    const list = Array.isArray(questions) ? questions : [];

    const filtered = useMemo(() => {
        const key = q.trim().toLowerCase();
        return list.filter((it) => {
            const byKey = !key || it.prompt?.toLowerCase().includes(key);
            const byType = typeFilter === "all" || it.type === typeFilter;
            const byStatus =
                statusFilter === "all" ||
                (statusFilter === "active" ? it.is_active : !it.is_active);
            return byKey && byType && byStatus;
        });
    }, [list, q, typeFilter, statusFilter]);

    const handleDelete = async (id) => {
        const res = await Swal.fire({
            title: "Hapus pertanyaan?",
            text: "Tindakan ini tidak bisa dibatalkan.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal",
            reverseButtons: true,
            confirmButtonColor: "#dc2626",
        });
        if (!res.isConfirmed) return;

        router.delete(route("dashboard.survey.questions.destroy", id), {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    title: "Terhapus!",
                    text: "Pertanyaan berhasil dihapus.",
                    icon: "success",
                    timer: 1400,
                    showConfirmButton: false,
                });
            },
            onError: () => {
                Swal.fire({
                    title: "Gagal",
                    text: "Ada masalah saat menghapus. Coba lagi.",
                    icon: "error",
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Survey Questions" />

            <div className="px-4 pb-8 pt-2 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">
                            Pertanyaan Survei
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Kelola pertanyaan untuk form kepuasan — bintang atau
                            text area.
                        </p>
                    </div>
                    <Link
                        href={route("dashboard.survey.questions.create")}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                    >
                        <PlusIcon className="h-4 w-4" />
                        Tambah Pertanyaan
                    </Link>
                </div>

                {/* Toolbar */}
                <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div className="relative">
                        <input
                            type="search"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Cari pertanyaan…"
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 pl-9 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                        />
                        <SearchIcon className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    </div>

                    <div className="flex gap-2">
                        <select
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            <option value="all">Semua Tipe</option>
                            <option value="stars">Bintang</option>
                            <option value="text">Text Area</option>
                        </select>

                        <select
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">Semua Status</option>
                            <option value="active">Aktif</option>
                            <option value="inactive">Nonaktif</option>
                        </select>
                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-3 gap-2">
                        <StatPill label="Total" value={list.length} />
                        <StatPill
                            label="Aktif"
                            value={list.filter((x) => x.is_active).length}
                        />
                        <StatPill
                            label="Bintang"
                            value={
                                list.filter((x) => x.type === "stars").length
                            }
                        />
                    </div>
                </div>

                {/* List */}
                {filtered.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((item) => (
                            <Card key={item.id}>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <Badge muted>
                                            #{item.sort_order ?? item.id}
                                        </Badge>
                                        <TypeChip
                                            type={item.type}
                                            max={item.max_stars}
                                        />
                                        {!item.is_active && (
                                            <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                                                Nonaktif
                                            </span>
                                        )}
                                    </div>
                                    {/* Quick actions */}
                                    <div className="flex gap-1">
                                        <Link
                                            href={route(
                                                "dashboard.survey.questions.edit",
                                                item.id
                                            )}
                                            className="rounded-lg px-2 py-1 text-xs text-slate-600 hover:bg-slate-100"
                                            title="Edit"
                                        >
                                            <EditIcon className="h-4 w-4" />
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                            className="rounded-lg px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                                            title="Delete"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-2 line-clamp-2 text-sm font-medium text-slate-900">
                                    {item.prompt}
                                </div>

                                {/* Meta row */}
                                <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                                    <span className="inline-flex items-center gap-1">
                                        <ClockIcon className="h-3.5 w-3.5" />
                                        {formatDate(
                                            item.updated_at || item.created_at
                                        )}
                                    </span>
                                    {item.type === "text" &&
                                        item.placeholder && (
                                            <span className="truncate">
                                                • “{item.placeholder}”
                                            </span>
                                        )}
                                </div>

                                {/* Footer actions */}
                                <div className="mt-4 flex gap-2">
                                    <Link
                                        href={route(
                                            "dashboard.survey.questions.edit",
                                            item.id
                                        )}
                                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                    >
                                        <EditIcon className="h-4 w-4" />
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                        Delete
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

/* === Small UI bits === */
function Card({ children }) {
    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md">
            {children}
        </div>
    );
}
function Badge({ children, muted = false }) {
    return (
        <span
            className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${
                muted
                    ? "bg-slate-100 text-slate-600"
                    : "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
            }`}
        >
            {children}
        </span>
    );
}
function TypeChip({ type, max }) {
    if (type === "stars") {
        return (
            <span className="inline-flex items-center gap-1 rounded-md bg-yellow-50 px-2 py-0.5 text-[11px] font-medium text-yellow-800 ring-1 ring-yellow-100">
                <StarIcon className="h-3.5 w-3.5" />
                Stars
                <span className="text-[10px] text-yellow-700/80">
                    max {max ?? 5}
                </span>
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-100">
            <TextIcon className="h-3.5 w-3.5" />
            Text
        </span>
    );
}
function StatPill({ label, value }) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2">
            <span className="text-[11px] text-slate-500">{label}</span>
            <span className="text-sm font-semibold text-slate-900">
                {value}
            </span>
        </div>
    );
}
function EmptyState() {
    return (
        <div className="grid place-items-center rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
            <div className="mx-auto mb-2 h-10 w-10 rounded-xl bg-slate-100" />
            <p className="text-sm text-slate-600">
                Belum ada pertanyaan yang cocok dengan filter.
            </p>
            <p className="mt-1 text-xs text-slate-500">
                Coba ubah pencarian atau tambahkan pertanyaan baru.
            </p>
            <Link
                href={route("dashboard.survey.questions.create")}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
                <PlusIcon className="h-4 w-4" />
                Tambah Pertanyaan
            </Link>
        </div>
    );
}

/* === Icons (inline SVG, nol dependensi) === */
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
function SearchIcon({ className }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}
function EditIcon({ className }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M12 20h9" />
            <path d="M16.5 3.5 20.5 7.5 7 21H3v-4L16.5 3.5z" />
        </svg>
    );
}
function TrashIcon({ className }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M3 6h18" />
            <path d="M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4h6v2" />
        </svg>
    );
}
function StarIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
            <path d="m12 17.27 5.18 3.05-1.64-5.81L20.9 9.5l-6-.26L12 3.5 9.1 9.24l-6 .26 5.36 4.99-1.64 5.81L12 17.27z" />
        </svg>
    );
}
function TextIcon({ className }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M4 6h16M8 12h8M10 18h4" />
        </svg>
    );
}
function ClockIcon({ className }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
        </svg>
    );
}

/* === tiny util === */
function formatDate(str) {
    if (!str) return "—";
    try {
        const d = new Date(str);
        return d.toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return str;
    }
}
