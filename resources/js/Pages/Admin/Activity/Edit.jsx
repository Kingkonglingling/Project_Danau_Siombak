// resources/js/Pages/Admin/Activity/Edit.jsx  

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link, router } from "@inertiajs/react";
import { Upload } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Edit({ activity }) {
    const { data, setData, processing, errors } = useForm({
        title: activity.title || "",
        description: activity.description || "",
        date: activity.date || "",
        image: null,
    });

    const [preview, setPreview] = useState(activity.image_url);

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
        formData.append("description", data.description);
        formData.append("date", data.date);
        formData.append("_method", "PUT");

        if (data.image) {
            formData.append("image", data.image);
        }

        router.post(route("dashboard.activity.update", activity.id), formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil diperbarui!",
                    text: "Aktivitas telah diperbarui.",
                    heightAuto: false,
                }).then(() => {
                    router.visit(route("dashboard.activity.index"));
                });
            },
            onError: (errs) => {
                const firstError = Object.values(errs)[0];
                Swal.fire({
                    icon: "error",
                    title: "Gagal memperbarui",
                    text: firstError || "Terjadi kesalahan",
                    heightAuto: false,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Aktivitas" />

            <div className="mx-auto max-w-2xl py-8">
                <h1 className="mb-8 text-2xl font-bold text-slate-900">Edit Aktivitas</h1>

                <form onSubmit={submit} className="space-y-6">
                    {/* Foto Activity */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Foto Aktivitas</label>
                        <div className="relative rounded-xl overflow-hidden">
                            <img src={preview} alt="Preview" className="w-full h-96 object-cover" />
                            <label
                                htmlFor="replace-file"
                                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition cursor-pointer"
                            >
                                <div className="text-center text-white">
                                    <Upload className="h-10 w-10 mx-auto mb-2" />
                                    <span className="text-sm font-medium">Ganti Foto</span>
                                </div>
                                <input
                                    id="replace-file"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
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
                            required
                        />
                        {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
                    </div>

                    {/* Tanggal */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Tanggal Pelaksanaan</label>
                        <input
                            type="date"
                            value={data.date}
                            onChange={(e) => setData("date", e.target.value)}
                            className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                        {errors.date && <p className="mt-1 text-xs text-red-600">{errors.date}</p>}
                    </div>

                    {/* Deskripsi */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Deskripsi</label>
                        <textarea
                            rows={5}
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Link
                            href={route("dashboard.activity.index")}
                            className="px-6 py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition"
                        >
                            Batal
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="px-8 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition"
                        >
                            {processing ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
