// resources/js/Pages/Admin/Activity/Create.jsx  

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link, router } from "@inertiajs/react";
import { Upload, X } from "lucide-react";
import Swal from "sweetalert2";
import { useState } from "react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        date: "",
        image: null,
    });

    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description || "");
        formData.append("date", data.date || "");
        if (data.image) formData.append("image", data.image);

        post(route("dashboard.activity.store"), {
            data: formData,
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Aktivitas berhasil ditambahkan.",
                    confirmButtonText: "OK",
                    heightAuto: false,
                }).then(() => {
                    router.visit(route("dashboard.activity.index"));
                });
            },
            onError: (errs) => {
                const firstError = Object.values(errs)[0];
                Swal.fire({
                    icon: "error",
                    title: "Gagal menyimpan",
                    text: firstError || "Terjadi kesalahan",
                    confirmButtonText: "OK",
                    heightAuto: false,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Aktivitas Baru" />

            <div className="mx-auto max-w-2xl py-8">
                <h1 className="mb-8 text-2xl font-bold text-slate-900">Tambah Aktivitas Baru</h1>

                <form onSubmit={submit} className="space-y-6">
                    {/* Foto Upload */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Foto Aktivitas</label>
                        <div className="mt-1">
                            {!preview ? (
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition"
                                >
                                    <Upload className="h-12 w-12 text-slate-400" />
                                    <p className="mt-3 text-sm text-slate-600">
                                        Klik untuk upload atau drag & drop
                                    </p>
                                    <p className="text-xs text-slate-500">PNG, JPG, WEBP hingga 5MB</p>
                                    <input
                                        id="dropzone-file"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            ) : (
                                <div className="relative rounded-xl overflow-hidden">
                                    <img src={preview} alt="Preview" className="w-full h-96 object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreview(null);
                                            setData("image", null);
                                        }}
                                        className="absolute top-3 right-3 rounded-full bg-white/90 p-2 shadow-lg hover:bg-white"
                                    >
                                        <X className="h-5 w-5 text-red-600" />
                                    </button>
                                </div>
                            )}
                        </div>
                        {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
                    </div>

                    {/* Judul */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Judul Aktivitas</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                            placeholder="Contoh: Tracking Sungai Mutiara"
                            required
                        />
                        {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
                    </div>

                    {/* Tanggal */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Tanggal Pelaksanaan (opsional)</label>
                        <input
                            type="date"
                            value={data.date}
                            onChange={(e) => setData("date", e.target.value)}
                            className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                    </div>

                    {/* Deskripsi */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Deskripsi</label>
                        <textarea
                            rows={5}
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                            placeholder="Jelaskan aktivitas ini, durasi, lokasi, dll..."
                        />
                    </div>

                    {/* Tombol */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Link
                            href={route("dashboard.activity.index")}
                            className="px-6 py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing || !data.image}
                            className="px-8 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            {processing ? "Menyimpan..." : "Simpan Aktivitas"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}