import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useMemo, useState } from "react";

export default function Edit({ about }) {
    const { data, setData, post, processing, errors, transform } = useForm({
        title: about?.title ?? "",
        content: about?.content ?? "",
        location: about?.location ?? "",
        image: null,
    });

    const [preview, setPreview] = useState(null);

    const currentImage = useMemo(
        () => preview || about?.image_url || null,
        [preview, about]
    );

    const submit = (e) => {
        e.preventDefault();

        transform((d) => ({ ...d, _method: "put" }));

        post(route("dashboard.about.update"), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "Konten Tentang Kami sudah diupdate.",
                    confirmButtonText: "OK",
                    heightAuto: false,
                });
                setPreview(null);
            },
            onError: (errs) => {
                const first = Object.values(errs)[0];
                Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    text: first
                        ? String(first)
                        : "Cek input kamu. Ada yang belum valid.",
                    confirmButtonText: "OK",
                    heightAuto: false,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tentang Kami" />

            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold text-slate-900">
                        Tentang Kami
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Kelola 1 section: gambar, text, dan alamat lokasi.
                    </p>
                </div>

                <Link
                    href={route("dashboard")}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                    ← Kembali
                </Link>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-5">
                {/* Preview */}
                <div className="lg:col-span-2">
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                        <div className="border-b bg-slate-50 px-4 py-3">
                            <p className="text-sm font-semibold text-slate-800">
                                Preview
                            </p>
                            <p className="text-xs text-slate-500">
                                Biar nggak edit “pakai perasaan”.
                            </p>
                        </div>

                        <div className="p-4">
                            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200">
                                {currentImage ? (
                                    <img
                                        src={currentImage}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                                        Belum ada gambar
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 space-y-2">
                                <p className="text-sm font-semibold text-slate-900">
                                    {data.title || "Judul (title)"}
                                </p>

                                <p className="text-sm text-slate-600 whitespace-pre-line">
                                    {data.content || "Isi deskripsi..."}
                                </p>

                                <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 ring-1 ring-slate-200">
                                    <div className="font-semibold text-slate-800">
                                        Alamat Lokasi
                                    </div>
                                    <div className="mt-1">
                                        {data.location ||
                                            "Alamat belum diisi"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="lg:col-span-3">
                    <form
                        onSubmit={submit}
                        className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6"
                    >
                        <div className="grid gap-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Judul
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                />
                                {errors.title && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Deskripsi
                                </label>
                                <textarea
                                    rows={6}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                    value={data.content}
                                    onChange={(e) =>
                                        setData("content", e.target.value)
                                    }
                                />
                                {errors.content && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.content}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Alamat Lokasi
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                    value={data.location}
                                    onChange={(e) =>
                                        setData("location", e.target.value)
                                    }
                                />
                                {errors.location && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.location}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Gambar
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-black"
                                    onChange={(e) => {
                                        const file =
                                            e.target.files?.[0] || null;
                                        setData("image", file);

                                        if (file)
                                            setPreview(
                                                URL.createObjectURL(file)
                                            );
                                        else setPreview(null);
                                    }}
                                />
                                {errors.image && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.image}
                                    </p>
                                )}
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {processing
                                        ? "Menyimpan..."
                                        : "Simpan"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
