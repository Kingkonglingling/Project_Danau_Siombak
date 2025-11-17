// resources/js/Pages/Dashboard/Galleri/Create.jsx
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
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
        formData.append("description", data.description);
        if (data.image) formData.append("image", data.image);

        post(route("dashboard.galleri.store"), {
            data: formData,
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Upload Foto Baru" />

            <div className="mx-auto max-w-2xl py-8">
                <h1 className="mb-8 text-2xl font-bold text-slate-900">Upload Foto Baru</h1>

                <form onSubmit={submit} className="space-y-6">
                    {/* Drag & Drop Area */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Foto</label>
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

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Judul (opsional)</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Contoh: Sunset di Danau"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Deskripsi (opsional)</label>
                        <textarea
                            rows={4}
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Ceritakan tentang foto ini..."
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <Link
                            href={route("dashboard.galleri.index")}
                            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing || !data.image}
                            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? "Menyimpan..." : "Simpan Foto"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}