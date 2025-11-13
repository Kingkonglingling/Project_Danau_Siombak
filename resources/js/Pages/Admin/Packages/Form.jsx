import { useForm, Link, router } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import RichTextEditor from "@/Components/RichTextEditor";
import { useEffect, useRef, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from "sweetalert2";

export default function Form({ package: pkg }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        title: pkg?.title ?? "",
        description: pkg?.description ?? "",
        image: null,
        whatsapp_number: pkg?.whatsapp_number ?? "",
        adult_price: pkg?.adult_price ?? "",
        child_price: pkg?.child_price ?? "",
        _method: pkg ? "put" : undefined,
    });

    const [preview, setPreview] = useState(pkg?.image_url ?? null);
    const fileRef = useRef(null);

    const submit = (e) => {
        e.preventDefault();

        const url = pkg
            ? route("dashboard.package.update", pkg.id)
            : route("dashboard.package.store");

        post(url, {
            preserveScroll: true,
            onSuccess: () => {
                // tampilkan notifikasi
                Swal.fire({
                    icon: "success",
                    title: pkg ? "Berhasil diperbarui!" : "Berhasil disimpan!",
                    text: "Data paket sudah tersimpan.",
                    confirmButtonText: "OK",
                    heightAuto: false, // biar ga ‘loncat’ di mobile
                }).then(() => {
                    // redirect ke index
                    router.visit(route("dashboard.package.index"));
                });
            },
            onError: (errs) => {
                const first = Object.values(errs)[0];
                if (first) {
                    Swal.fire({
                        icon: "error",
                        title: "Gagal menyimpan",
                        text: String(first),
                        confirmButtonText: "OK",
                        heightAuto: false,
                    });
                }
            },
        });
    };

    useEffect(() => {
        if (!data.image) {
            // kalau user klik Hapus, bersihin preview juga
            if (!pkg?.image_url) setPreview(null);
            return;
        }
        const url = URL.createObjectURL(data.image);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [data.image]);

    const normalizedWa = (data.whatsapp_number || "")
        .replace(/\D+/g, "")
        .replace(/^0/, "62");
    const waLink = `https://wa.me/${normalizedWa}?text=${encodeURIComponent(
        "Halo, saya tertarik paket " + (data.title || "")
    )}`;

    // helper
    const pickFile = () => fileRef.current?.click();
    const removeFile = () => {
        setData("image", null);
        setPreview(null);
        if (fileRef.current) fileRef.current.value = "";
    };
    const fileMeta =
        data.image &&
        `${data.image.name} • ${(data.image.size / 1024).toFixed(0)} KB`;

    return (
        <AuthenticatedLayout>
            <Head title="Package Ticket" />

            <style>{`
        .quill-card .ql-toolbar{border:0!important;border-bottom:1px solid rgb(226 232 240)!important;border-top-left-radius:.75rem;border-top-right-radius:.75rem}
        .quill-card .ql-container{border:0!important;min-height:20rem;max-height:60vh;border-bottom-left-radius:.75rem;border-bottom-right-radius:.75rem}
        .quill-card .ql-editor{min-height:20rem}
      `}</style>

            <div className="px-4 pb-8 pt-2 sm:px-6 lg:px-8">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-slate-900">
                            {pkg ? "Edit Paket" : "Tambah Paket"}
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Masukkan judul, deskripsi, gambar, dan nomor
                            WhatsApp untuk pemesanan cepat.
                        </p>
                    </div>
                    <Link
                        href={route("dashboard.package.index")}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        ← Kembali
                    </Link>
                </div>

                <form onSubmit={submit} className="grid grid-cols-1 gap-6">
                    {/* Judul */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Judul
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                            placeholder="Contoh: Paket Wisata Bromo Sunrise"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Deskripsi */}
                    <div className="quill-card rounded-xl ring-1 ring-slate-200">
                        <div className="rounded-t-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                            Deskripsi
                        </div>
                        <RichTextEditor
                            value={data.description}
                            onChange={(v) => setData("description", v)}
                            className="rounded-b-xl"
                        />
                    </div>
                    {errors.description && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.description}
                        </p>
                    )}

                    {/* ==== Gambar (Preview rapi) ==== */}
                    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
                        <h3 className="mb-3 text-sm font-semibold text-slate-800">
                            Gambar
                        </h3>

                        {/* Area preview dengan aspect ratio agar tidak gepeng */}
                        <div className="mb-3 overflow-hidden rounded-xl ring-1 ring-slate-200">
                            <div className="relative w-full aspect-[3/2] sm:aspect-video bg-slate-100">
                                {preview ? (
                                    <>
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                        {/* Controls overlay */}
                                        <div className="absolute right-2 top-2 flex gap-2">
                                            <button
                                                type="button"
                                                onClick={pickFile}
                                                className="rounded-lg bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700 shadow hover:bg-white"
                                            >
                                                Ganti
                                            </button>
                                            <button
                                                type="button"
                                                onClick={removeFile}
                                                className="rounded-lg bg-white/90 px-2.5 py-1 text-xs font-medium text-red-600 shadow hover:bg-white"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="absolute inset-0 grid place-items-center text-slate-400">
                                        Belum ada gambar
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Picker + metadata */}
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={pickFile}
                                className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                Pilih Gambar
                            </button>
                            {fileMeta && (
                                <span className="text-xs text-slate-500 truncate">
                                    {fileMeta}
                                </span>
                            )}
                        </div>

                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                                setData("image", e.target.files?.[0] ?? null)
                            }
                        />

                        {progress && (
                            <div className="mt-2 text-xs text-slate-500">
                                Upload {progress.percentage}%
                            </div>
                        )}
                        {errors.image && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.image}
                            </p>
                        )}
                    </div>

                    {/* WhatsApp */}
                    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
                        <h3 className="mb-3 text-sm font-semibold text-slate-800">
                            Kontak WhatsApp
                        </h3>
                        <label className="mb-1 block text-sm text-slate-600">
                            Nomor (contoh: 628123456789)
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                            placeholder="6285xxxxxxx"
                            value={data.whatsapp_number}
                            onChange={(e) =>
                                setData("whatsapp_number", e.target.value)
                            }
                        />
                        {errors.whatsapp_number && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.whatsapp_number}
                            </p>
                        )}
                        {data.whatsapp_number && (
                            <a
                                href={waLink}
                                target="_blank"
                                className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-green-700 underline"
                            >
                                Tes link WA
                            </a>
                        )}
                    </div>

                    {/* Harga Dewasa */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Harga Dewasa (per orang)
                        </label>
                        <input
                            type="number"
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                            placeholder="contoh: 100000"
                            value={data.adult_price}
                            onChange={(e) =>
                                setData("adult_price", e.target.value)
                            }
                        />
                        {errors.adult_price && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.adult_price}
                            </p>
                        )}
                    </div>

                    {/* Harga Anak (opsional) */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Harga Anak (opsional, per orang)
                        </label>
                        <input
                            type="number"
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                            placeholder="kosongkan kalau sama dengan dewasa"
                            value={data.child_price ?? ""}
                            onChange={(e) =>
                                setData("child_price", e.target.value)
                            }
                        />
                        {errors.child_price && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.child_price}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
                        <button
                            disabled={processing}
                            className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
                        >
                            {pkg ? "Update" : "Simpan"}
                        </button>
                        <p className="mt-2 text-xs text-slate-500">
                            Pastikan semua data sudah benar sebelum disimpan.
                        </p>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
