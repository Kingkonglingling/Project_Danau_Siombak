// resources/js/Pages/Dashboard/Activity/Index.jsx
import { Head, Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Plus, Pencil, Trash2, Compass, Upload } from "lucide-react";
import Swal from "sweetalert2";

export default function ActivityIndex({ activities }) {
    const { flash } = usePage().props;
    const list = activities?.data ?? [];
    const total = activities?.total ?? 0;

    const handleDelete = (id) => {
        Swal.fire({
            title: "Yakin hapus Aktivitas ini?",
            text: "Data akan dihapus permanen dan tidak bisa dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
            reverseButtons: true,
            heightAuto: false,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("dashboard.activity.destroy", id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        Swal.fire({
                            icon: "success",
                            title: "Terhapus!",
                            text: "Aktivitas telah dihapus.",
                            timer: 2000,
                            showConfirmButton: false,
                            heightAuto: false,
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            icon: "error",
                            title: "Gagal",
                            text: "Terjadi kesalahan saat menghapus Aktivitas.",
                            heightAuto: false,
                        });
                    },
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Wisata Aktivitas" />

            <div className="px-4 pb-8 pt-2 sm:px-6 lg:px-8 space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Aktivitas Wisata</h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Kelola aktivitas dan pengalaman di Kampung Wisata Mutiara
                        </p>
                    </div>
                    <Link
                        href={route("dashboard.activity.create")}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                    >
                        <Upload className="h-4 w-4" />
                        Tambah Aktivitas
                    </Link>
                </div>

                {/* Flash */}
                {flash?.success && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
                        {flash.success}
                    </div>
                )}

                {/* Empty State */}
                {list.length === 0 ? (
                    <div className="py-20 text-center">
                        <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                            <Compass className="h-12 w-12 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">Belum ada aktivitas</h3>
                        <p className="mt-2 text-sm text-slate-500">Tambahkan aktivitas pertama Anda sekarang.</p>
                        <Link
                            href={route("dashboard.activity.create")}
                            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white"
                        >
                            <Plus className="h-4 w-4" /> Tambah Aktivitas Pertama
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Grid */}
                        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {list.map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200 transition-all hover:shadow-xl"
                                >
                                    <div className="aspect-square">
                                        {item.image_url ? (
                                            <img
                                                src={item.image_url}
                                                alt={item.title || "Gallery"}
                                                className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center bg-slate-100">
                                                <Compass className="h-16 w-16 text-slate-300" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Hover Actions */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                            {item.title && <p className="font-medium">{item.title}</p>}
                                        </div>
                                    </div>

                                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                        <Link
                                            href={route("dashboard.activity.edit", item.id)}
                                            className="rounded-lg bg-white/90 p-2 backdrop-blur shadow"
                                        >
                                            <Pencil className="h-4 w-4 text-blue-600" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="rounded-lg bg-white/90 p-2 backdrop-blur shadow hover:bg-red-50"
                                        >
                                            <Trash2 className="h-4 w-4 text-red-600" />
                                        </button>
                                    </div>

                                    {item.title && (
                                        <div className="border-t px-3 py-2">
                                            <p className="truncate text-xs font-medium text-slate-700">{item.title}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {activities.links?.length > 3 && (
                            <div className="mt-8 flex flex-wrap justify-center gap-2">
                                {activities.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || "#"}
                                        preserveScroll
                                        className={`rounded-lg px-3 py-1.5 text-xs font-medium ${link.active ? "bg-blue-600 text-white" : "bg-white border text-slate-700 hover:bg-slate-50"} ${!link.url && "cursor-not-allowed opacity-50"}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                                <span className="ml-4 text-xs text-slate-500 self-center">
                                    Total: {total} aktivitas
                                </span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}