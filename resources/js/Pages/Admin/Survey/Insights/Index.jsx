import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ filters, questions, stats, latestText }) {
    const [dateFrom, setDateFrom] = useState(filters?.date_from || "");
    const [dateTo, setDateTo] = useState(filters?.date_to || "");
    const [type, setType] = useState(filters?.type || "all");

    const apply = () => {
        const params = new URLSearchParams();
        if (dateFrom) params.set("date_from", dateFrom);
        if (dateTo) params.set("date_to", dateTo);
        if (type !== "all") params.set("type", type);
        window.location =
            route("dashboard.survey.insights") + "?" + params.toString();
    };

    return (
        <AuthenticatedLayout>
            <Head title="Survey Insights" />
            <div className="px-4 pb-8 pt-2 sm:px-6 lg:px-8">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">
                            Survey Insights
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Lihat ringkasan jawaban tiap pertanyaan (rata-rata
                            bintang, distribusi, contoh komentar).
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-4">
                    <input
                        className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                    />
                    <input
                        className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                    />
                    <select
                        className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="all">Semua tipe</option>
                        <option value="stars">Bintang</option>
                        <option value="text">Text Area</option>
                    </select>
                    <button
                        onClick={apply}
                        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
                    >
                        Terapkan
                    </button>
                </div>

                {/* Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {questions.map((q) => {
                        const s = stats?.[q.id] || {};
                        const total = s.total ?? 0;
                        const avg =
                            q.type === "stars"
                                ? s.avg_stars
                                    ? Number(s.avg_stars).toFixed(2)
                                    : "—"
                                : "—";
                        const dist = [
                            s.s1 || 0,
                            s.s2 || 0,
                            s.s3 || 0,
                            s.s4 || 0,
                            s.s5 || 0,
                        ];
                        const samples = latestText?.[q.id] || [];

                        return (
                            <div
                                key={q.id}
                                className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
                            >
                                <div className="mb-1 flex items-center gap-2">
                                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                                        #{q.sort_order ?? q.id}
                                    </span>
                                    <span
                                        className={`rounded-md px-2 py-0.5 text-[11px] font-medium
                    ${
                        q.type === "stars"
                            ? "bg-yellow-50 text-yellow-800 ring-1 ring-yellow-100"
                            : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                    }`}
                                    >
                                        {q.type === "stars"
                                            ? `Stars (max ${q.max_stars})`
                                            : "Text"}
                                    </span>
                                    {!q.is_active && (
                                        <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                                            Nonaktif
                                        </span>
                                    )}
                                </div>

                                <div className="line-clamp-2 text-sm font-semibold text-slate-900">
                                    {q.prompt}
                                </div>

                                <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                                    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                                        <div className="text-slate-500">
                                            Total
                                        </div>
                                        <div className="text-sm font-semibold text-slate-900">
                                            {total}
                                        </div>
                                    </div>
                                    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                                        <div className="text-slate-500">
                                            Avg
                                        </div>
                                        <div className="text-sm font-semibold text-slate-900">
                                            {avg}
                                        </div>
                                    </div>
                                    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                                        <div className="text-slate-500">
                                            Aktif
                                        </div>
                                        <div className="text-sm font-semibold text-slate-900">
                                            {q.is_active ? "Ya" : "Tidak"}
                                        </div>
                                    </div>
                                </div>

                                {/* Distribusi bintang (kecil) */}
                                {q.type === "stars" && (
                                    <div className="mt-3 space-y-1">
                                        {[5, 4, 3, 2, 1].map((star, idx) => {
                                            const count = dist[5 - star]; // s5..s1
                                            const pct = total
                                                ? Math.round(
                                                      (count / total) * 100
                                                  )
                                                : 0;
                                            return (
                                                <div
                                                    key={star}
                                                    className="flex items-center gap-2 text-xs"
                                                >
                                                    <span className="w-6 text-right">
                                                        {star}★
                                                    </span>
                                                    <div className="h-2 flex-1 rounded bg-slate-100">
                                                        <div
                                                            className="h-2 rounded bg-yellow-400"
                                                            style={{
                                                                width: `${pct}%`,
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="w-10 text-right text-slate-600">
                                                        {pct}%
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Sampel komentar */}
                                {q.type === "text" && samples.length > 0 && (
                                    <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                                        <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                            Sampel Komentar
                                        </div>
                                        <ul className="space-y-1">
                                            {samples.map((s) => (
                                                <li
                                                    key={s.id}
                                                    className="truncate text-sm text-slate-700"
                                                >
                                                    • {s.value_text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="mt-4 flex gap-2">
                                    <Link
                                        href={route(
                                            "dashboard.survey.questions.answers",
                                            q.id
                                        )}
                                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                    >
                                        Lihat Jawaban
                                    </Link>
                                    {q.type === "text" && (
                                        <Link
                                            href={route(
                                                "dashboard.survey.questions.answers.export",
                                                q.id
                                            )}
                                            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                        >
                                            Export CSV
                                        </Link>
                                    )}
                                    {q.type === "stars" && (
                                        <Link
                                            href={route(
                                                "dashboard.survey.questions.answers.export",
                                                q.id
                                            )}
                                            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                        >
                                            Export CSV
                                        </Link>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
