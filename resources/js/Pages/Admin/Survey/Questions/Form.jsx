import { useForm, Link, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useMemo } from "react";

/* --- tiny helpers --- */
const cx = (...a) => a.filter(Boolean).join(" ");
const ErrorMsg = ({ children }) =>
    children ? <p className="mt-1 text-sm text-rose-600">{children}</p> : null;

export default function Form({ question }) {
    const isEdit = !!question;

    const { data, setData, post, put, processing, errors } = useForm({
        prompt: question?.prompt ?? "",
        type: question?.type ?? "stars", // 'stars' | 'text'
        is_required: question?.is_required ?? true,
        is_active: question?.is_active ?? true,
        sort_order: question?.sort_order ?? 0,
        max_stars: question?.max_stars ?? 5,
        placeholder: question?.placeholder ?? "",
    });

    const submit = (e) => {
        e.preventDefault();
        isEdit
            ? put(route("dashboard.survey.questions.update", question.id))
            : post(route("dashboard.survey.questions.store"));
    };

    const liveHint = useMemo(() => {
        if (data.type === "stars")
            return "Pengguna akan menilai dengan bintang.";
        return "Pengguna akan mengisi jawaban dalam kotak teks.";
    }, [data.type]);

    return (
        <AuthenticatedLayout>
            <Head title={isEdit ? "Edit Question" : "Tambah Pertanyaan"} />

            {/* Page header */}
            <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/70 backdrop-blur">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <Link
                                href={route("dashboard.survey.questions.index")}
                                className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-800"
                            >
                                <span>←</span> Kembali
                            </Link>
                            <h1 className="text-xl font-semibold text-slate-900">
                                {isEdit
                                    ? "Edit Pertanyaan"
                                    : "Tambah Pertanyaan"}
                            </h1>
                        </div>

                        <button
                            form="q-form"
                            disabled={processing}
                            className={cx(
                                "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition",
                                processing
                                    ? "bg-slate-400"
                                    : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                            )}
                        >
                            {processing ? "Menyimpan…" : "Simpan"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_22rem]">
                    {/* Left: Form Card */}
                    <form id="q-form" onSubmit={submit} className="space-y-6">
                        {/* Pertanyaan */}
                        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                            <label className="block text-sm font-medium text-slate-700">
                                Pertanyaan
                            </label>
                            <input
                                className={cx(
                                    "mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none",
                                    "focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                )}
                                placeholder="Contoh: Bagaimana keramahan petugas?"
                                value={data.prompt}
                                onChange={(e) =>
                                    setData("prompt", e.target.value)
                                }
                            />
                            <ErrorMsg>{errors.prompt}</ErrorMsg>

                            <p className="mt-2 text-xs text-slate-500">
                                {liveHint}
                            </p>
                        </div>

                        {/* Tipe & pengaturan dasar */}
                        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">
                                        Tipe Jawaban
                                    </label>
                                    <select
                                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                        value={data.type}
                                        onChange={(e) =>
                                            setData("type", e.target.value)
                                        }
                                    >
                                        <option value="stars">
                                            Bintang (1–10)
                                        </option>
                                        <option value="text">Text Area</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700">
                                        Urutan
                                    </label>
                                    <input
                                        type="number"
                                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                        value={data.sort_order}
                                        onChange={(e) =>
                                            setData(
                                                "sort_order",
                                                Number(e.target.value || 0)
                                            )
                                        }
                                    />
                                </div>

                                <div className="flex items-end gap-4">
                                    <label className="inline-flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                            checked={!!data.is_required}
                                            onChange={(e) =>
                                                setData(
                                                    "is_required",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <span className="text-sm">Wajib</span>
                                    </label>
                                    <label className="inline-flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                            checked={!!data.is_active}
                                            onChange={(e) =>
                                                setData(
                                                    "is_active",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <span className="text-sm">Aktif</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Kondisional: Stars */}
                        {data.type === "stars" && (
                            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                                <label className="block text-sm font-medium text-slate-700">
                                    Maksimal Bintang
                                </label>
                                <div className="mt-1 flex items-center gap-3">
                                    <input
                                        type="number"
                                        min={3}
                                        max={10}
                                        className="w-32 rounded-xl border border-slate-200 bg-white px-3 py-2 focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                        value={data.max_stars}
                                        onChange={(e) =>
                                            setData(
                                                "max_stars",
                                                Number(e.target.value || 5)
                                            )
                                        }
                                    />

                                    {/* mini preview inline */}
                                    <div className="flex select-none items-center gap-1 text-amber-400">
                                        {Array.from({
                                            length: Math.max(
                                                1,
                                                Number(data.max_stars || 5)
                                            ),
                                        }).map((_, i) => (
                                            <svg
                                                key={i}
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.09 3.355a1 1 0 00.95.69h3.525c.969 0 1.371 1.24.588 1.81l-2.853 2.072a1 1 0 00-.364 1.118l1.09 3.355c.3.921-.755 1.688-1.54 1.118l-2.853-2.072a1 1 0 00-1.176 0l-2.853 2.072c-.784.57-1.84-.197-1.54-1.118l1.09-3.355a1 1 0 00-.364-1.118L2.796 8.782c-.783-.57-.38-1.81.588-1.81h3.525a1 1 0 00.95-.69l1.09-3.355z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Kondisional: Text */}
                        {data.type === "text" && (
                            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                                <label className="block text-sm font-medium text-slate-700">
                                    Placeholder
                                </label>
                                <input
                                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                    placeholder="Tulis saran atau masukan Anda…"
                                    value={data.placeholder}
                                    onChange={(e) =>
                                        setData("placeholder", e.target.value)
                                    }
                                />
                            </div>
                        )}
                    </form>

                    {/* Right: Live Preview */}
                    <aside className="space-y-4">
                        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Preview
                            </div>

                            {/* nomor + prompt */}
                            <div className="mb-3 flex items-start gap-3">
                                <span className="grid h-6 w-6 place-items-center rounded-full bg-violet-600 text-[11px] font-semibold text-white">
                                    1
                                </span>
                                <div className="flex-1">
                                    <div className="font-medium text-slate-900">
                                        {data.prompt ||
                                            "Pertanyaan akan muncul di sini"}
                                        {data.is_required && (
                                            <span className="ml-1 text-rose-600">
                                                *
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        {data.type === "stars"
                                            ? "Klik bintang untuk menilai"
                                            : "Tulis jawaban Anda di bawah ini"}
                                    </p>
                                </div>
                            </div>

                            {data.type === "stars" ? (
                                <div className="flex select-none items-center gap-2">
                                    {Array.from({
                                        length: Math.max(
                                            1,
                                            Number(data.max_stars || 5)
                                        ),
                                    }).map((_, idx) => (
                                        <svg
                                            key={idx}
                                            className="h-8 w-8 text-amber-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.09 3.355a1 1 0 00.95.69h3.525c.969 0 1.371 1.24.588 1.81l-2.853 2.072a1 1 0 00-.364 1.118l1.09 3.355c.3.921-.755 1.688-1.54 1.118l-2.853-2.072a1 1 0 00-1.176 0l-2.853 2.072c-.784.57-1.84-.197-1.54-1.118l1.09-3.355a1 1 0 00-.364-1.118L2.796 8.782c-.783-.57-.38-1.81.588-1.81h3.525a1 1 0 00.95-.69l1.09-3.355z" />
                                        </svg>
                                    ))}
                                </div>
                            ) : (
                                <textarea
                                    disabled
                                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600"
                                    rows={4}
                                    placeholder={
                                        data.placeholder ||
                                        "Tulis saran atau masukan Anda…"
                                    }
                                />
                            )}
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                            <div className="text-sm font-medium text-slate-800">
                                Tips cepat
                            </div>
                            <ul className="mt-2 list-disc pl-5 text-xs text-slate-600 space-y-1">
                                <li>Urutan kecil → tampil lebih atas.</li>
                                <li>
                                    Gunakan “Text Area” untuk saran panjang.
                                </li>
                                <li>
                                    “Wajib” memaksa user memberi jawaban (tanpa
                                    drama).
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
