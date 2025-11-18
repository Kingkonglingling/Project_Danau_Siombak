// resources/js/Pages/Dashboard/Galleri/Edit.jsx
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link, router } from "@inertiajs/react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Edit({ galleri }) {
    const { data, setData, processing, errors } = useForm({
        title: galleri.title || "",
        description: galleri.description || "",
        image: null,
    });

    const [preview, setPreview] = useState(galleri.image_url);

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
        formData.append("_method", "PUT");
        if (data.image) formData.append("image", data.image);

        router.post(route("dashboard.galleri.update", galleri.id), formData, { 
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil diperbarui!",
                    text: "Foto galeri telah diperbarui.",
                    confirmButtonText: "OK",
                    heightAuto: false,
                }).then(() => {
                    router.visit(route("dashboard.galleri.index"));
                });
            },
            onError: (errs) => {
                const firstError = Object.values(errs)[0];
                Swal.fire({
                    icon: "error",
                    title: "Gagal memperbarui",
                    text: firstError || "Terjadi kesalahan",
                    confirmButtonText: "OK",
                    heightAuto: false,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Foto" />

            <div className="mx-auto max-w-2xl py-8">
                <h1 className="mb-8 text-2xl font-bold text-slate-900">Edit Foto</h1>

                <form onSubmit={submit} className="space-y-6">
                    {/* Foto Saat Ini / Preview */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Foto</label>
                        <div className="relative rounded-xl overflow-hidden">
                            <img src={preview} alt="Current" className="w-full h-96 object-cover" />
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

                    {/* Title & Description */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Judul</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">Deskripsi</label>
                        <textarea
                            rows={4}
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Link
                            href={route("dashboard.galleri.index")}
                            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}