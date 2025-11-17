// resources/js/Pages/Dashboard/Galleri/Index.jsx
import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Plus, Pencil, Trash2, Image as ImageIcon, Upload } from "lucide-react";

export default function GalleriIndex({ galleri }) {
    const { flash } = usePage().props;
    const list = galleri?.data ?? [];
    const total = galleri?.total ?? 0;

    return (
        <AuthenticatedLayout>
            <Head title="Galleri Foto" />

            <div className="px-4 pb-8 pt-2 sm:px-6 lg:px-8 space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Galleri Foto</h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Kelola foto wisata dan aktivitas Kampung Wisata Mutiara
                        </p>
                    </div>
                    <Link
                        href={route("dashboard.galleri.create")}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                    >
                        <Upload className="h-4 w-4" />
                        Upload Foto
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
                            <ImageIcon className="h-12 w-12 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">Belum ada foto</h3>
                        <p className="mt-2 text-sm text-slate-500">Unggah foto pertama Anda sekarang.</p>
                        <Link
                            href={route("dashboard.galleri.create")}
                            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white"
                        >
                            <Plus className="h-4 w-4" /> Upload Foto Pertama
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
                                                <ImageIcon className="h-16 w-16 text-slate-300" />
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
                                            href={route("dashboard.galleri.edit", item.id)}
                                            className="rounded-lg bg-white/90 p-2 backdrop-blur shadow"
                                        >
                                            <Pencil className="h-4 w-4 text-blue-600" />
                                        </Link>
                                        <Link
                                            href={route("dashboard.galleri.destroy", item.id)}
                                            method="delete"
                                            as="button"
                                            className="rounded-lg bg-white/90 p-2 backdrop-blur shadow"
                                            onClick={(e) => !confirm("Hapus foto ini?") && e.preventDefault()}
                                        >
                                            <Trash2 className="h-4 w-4 text-red-600" />
                                        </Link>
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
                        {galleri.links?.length > 3 && (
                            <div className="mt-8 flex flex-wrap justify-center gap-2">
                                {galleri.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || "#"}
                                        preserveScroll
                                        className={`rounded-lg px-3 py-1.5 text-xs font-medium ${link.active ? "bg-blue-600 text-white" : "bg-white border text-slate-700 hover:bg-slate-50"} ${!link.url && "cursor-not-allowed opacity-50"}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                                <span className="ml-4 text-xs text-slate-500 self-center">
                                    Total: {total} foto
                                </span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}