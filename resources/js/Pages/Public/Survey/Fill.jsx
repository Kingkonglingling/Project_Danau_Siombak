import Footer from "@/Components/HomePageComponents/Footer";
import Navbar from "@/Components/HomePageComponents/Navbar";
import { Head, useForm, router } from "@inertiajs/react";
import { useMemo, useRef, useState } from "react";
import { MapPin, Sailboat, Menu } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Fill({ questions = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        answers: {},
    });
    const [clientErrors, setClientErrors] = useState({});
    const firstErrorRef = useRef(null);

    const requiredIds = useMemo(
        () => questions.filter((q) => q.is_required).map((q) => q.id),
        [questions]
    );

    const validateClient = () => {
        const errs = {};
        for (const q of questions) {
            if (!q.is_required) continue;
            const v = data.answers[q.id] || {};
            const ok =
                q.type === "stars"
                    ? typeof v.value_int === "number" && v.value_int > 0
                    : (v.value_text || "").trim().length > 0;
            if (!ok) errs[q.id] = "Wajib diisi.";
        }
        setClientErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!validateClient()) {
            Swal.fire({
                icon: "warning",
                title: "Lengkapi dulu ya",
                text: "Masih ada pertanyaan wajib yang kosong.",
                confirmButtonText: "Oke",
            }).then(() => {
                firstErrorRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            });
            return;
        }

        post(route("homepage.survey.submit"), {
            preserveScroll: true,
            onSuccess: () => {
                let tick;
                Swal.fire({
                    icon: "success",
                    title: "Terima kasih!",
                    html: 'Jawaban Anda sudah terkirim.<br/><b id="sec-left">5</b> detik menuju beranda…',
                    timer: 5000,
                    timerProgressBar: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        const el = document.getElementById("sec-left");
                        tick = setInterval(() => {
                            const left = Math.ceil(
                                (Swal.getTimerLeft() || 0) / 1000
                            );
                            if (el) el.textContent = String(left);
                        }, 200);
                    },
                    willClose: () => {
                        clearInterval(tick);
                        router.visit("/");
                    },
                });
            },
            onError: () => {
                Swal.fire({
                    icon: "error",
                    title: "Gagal mengirim",
                    text: "Terjadi kendala saat mengirim jawaban. Coba lagi sebentar.",
                    confirmButtonText: "Mengerti",
                }).then(() => {
                    firstErrorRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                });
            },
        });
    };

    const firstErrorId = useMemo(() => {
        const ids = [
            ...requiredIds.filter((id) => clientErrors[id]),
            ...Object.keys(errors || {})
                .map((k) => Number(k))
                .filter(Boolean),
        ];
        return ids[0];
    }, [clientErrors, errors, requiredIds]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans antialiased flex flex-col">
            <Head title="Survey Kepuasan" />
            <Navbar Sailboat={Sailboat} Menu={Menu} />

            <main className="w-full flex-1">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    <div className="mb-4 sm:mb-6">
                        <h1 className="text-2xl font-bold text-slate-900">
                            Survey Kepuasan
                        </h1>
                        <p className="mt-1 text-slate-600">
                            Nilai pengalaman Anda.{" "}
                            <span className="text-pink-600">*</span> wajib
                        </p>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-6">
                        {questions.map((q, idx) => {
                            const isFirstError = firstErrorId === q.id;
                            return (
                                <div
                                    key={q.id}
                                    ref={
                                        isFirstError ? firstErrorRef : undefined
                                    }
                                >
                                    <Question
                                        q={q}
                                        idx={idx}
                                        value={data.answers[q.id] || {}}
                                        onChange={(v) => {
                                            if (clientErrors[q.id]) {
                                                const { [q.id]: _, ...rest } =
                                                    clientErrors;
                                                setClientErrors(rest);
                                            }
                                            setData("answers", {
                                                ...data.answers,
                                                [q.id]: v,
                                            });
                                        }}
                                        errorMsg={clientErrors[q.id]}
                                    />
                                </div>
                            );
                        })}

                        <div className="sticky bottom-4 sm:static">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? "Mengirim..." : "Kirim"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer MapPin={MapPin} />
        </div>
    );
}

function Question({ q, idx, value, onChange, errorMsg }) {
    const hasError = Boolean(errorMsg);
    return (
        <section
            className={`rounded-2xl border bg-white p-4 sm:p-5 shadow-sm ${
                hasError ? "border-pink-400" : "border-slate-200"
            }`}
        >
            <div className="mb-3 flex items-start gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                    {idx + 1}
                </span>
                <div className="font-medium text-slate-900">
                    {q.prompt}{" "}
                    {q.is_required && <span className="text-pink-600">*</span>}
                </div>
            </div>

            {q.type === "stars" ? (
                <StarPicker
                    max={q.max_stars || 5}
                    value={
                        typeof value.value_int === "number"
                            ? value.value_int
                            : 0
                    }
                    onChange={(v) => onChange({ value_int: v })}
                />
            ) : (
                <textarea
                    className={`mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 ${
                        hasError
                            ? "border-pink-400 ring-pink-200"
                            : "border-slate-200 ring-blue-200"
                    }`}
                    rows={4}
                    placeholder={
                        q.placeholder || "Tulis saran atau masukan Anda..."
                    }
                    value={value.value_text || ""}
                    onChange={(e) => onChange({ value_text: e.target.value })}
                />
            )}

            {hasError && (
                <div className="mt-2 text-sm text-pink-600">{errorMsg}</div>
            )}
        </section>
    );
}

function StarPicker({ max = 5, value = 0, onChange }) {
    const [hover, setHover] = useState(0);
    const stars = Array.from({ length: max }, (_, i) => i + 1);

    return (
        <div className="select-none">
            <div className="flex gap-1">
                {stars.map((n) => {
                    const active = (hover || value) >= n;
                    return (
                        <button
                            key={n}
                            type="button"
                            onMouseEnter={() => setHover(n)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => onChange(n)}
                            className="p-1"
                            aria-label={`Pilih ${n} bintang`}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="h-7 w-7"
                                fill={active ? "#F59E0B" : "none"}
                                stroke="#FBBF24"
                                strokeWidth="1.5"
                            >
                                <path d="M12 2.5l2.93 5.94 6.56.95-4.74 4.62 1.12 6.53L12 17.9l-5.87 3.11 1.12-6.53L2.5 9.39l6.56-.95L12 2.5z" />
                            </svg>
                        </button>
                    );
                })}
            </div>
            <div className="mt-1 text-xs text-slate-500">
                Klik bintang untuk menilai
            </div>
        </div>
    );
}
