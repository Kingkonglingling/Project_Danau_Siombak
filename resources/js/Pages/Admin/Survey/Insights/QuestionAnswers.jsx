import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function QuestionAnswers({ question, filters, dist, answers }) {
    const [dateFrom, setDateFrom] = useState(filters?.date_from || "");
    const [dateTo, setDateTo] = useState(filters?.date_to || "");
    const [q, setQ] = useState(filters?.q || "");

    const apply = () => {
        const params = new URLSearchParams();
        if (dateFrom) params.set("date_from", dateFrom);
        if (dateTo) params.set("date_to", dateTo);
        if (q) params.set("q", q);
        window.location =
            route("dashboard.survey.questions.answers", question.id) +
            "?" +
            params.toString();
    };

    const exportCsv = () => {
        const params = new URLSearchParams();
        if (dateFrom) params.set("date_from", dateFrom);
        if (dateTo) params.set("date_to", dateTo);
        window.location =
            route("dashboard.survey.questions.answers.export", question.id) +
            "?" +
            params.toString();
    };

    const total = dist?.total || 0;

    return (
        <AuthenticatedLayout>
            <Head title={`Jawaban — ${question.prompt}`} />
            <div className="px-4 pb-8 pt-2 sm:px-6 lg:px-8">
                <div className="mb-4">
                    <Link
                        href={route("dashboard.survey.insights")}
                        className="text-sm text-slate-600 underline"
                    >
                        ← Kembali ke Insights
                    </Link>
                    <h1 className="mt-2 text-xl font-semibold text-slate-900">
                        {question.prompt}
                    </h1>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-600">
                            #{question.sort_order ?? question.id}
                        </span>
                        <span
                            className={`rounded-md px-2 py-0.5 ${
                                question.type === "stars"
                                    ? "bg-yellow-50 text-yellow-800 ring-1 ring-yellow-100"
                                    : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                            }`}
                        >
                            {question.type === "stars"
                                ? `Stars (max ${question.max_stars})`
                                : "Text"}
                        </span>
                        {!question.is_active && (
                            <span className="rounded-md bg-amber-100 px-2 py-0.5 text-amber-700">
                                Nonaktif
                            </span>
                        )}
                    </div>
                </div>

                {/* Statistik */}
                <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <Stat title="Total Jawaban" value={total} />
                    {question.type === "stars" ? (
                        <>
                            <Stat
                                title="Rata-rata"
                                value={
                                    dist?.avg
                                        ? Number(dist.avg).toFixed(2)
                                        : "—"
                                }
                            />
                            <Stat title="5★" value={dist?.s5 || 0} />
                            <Stat title="1★" value={dist?.s1 || 0} />
                        </>
                    ) : (
                        <>
                            <Stat title="Komentar" value={total} />
                            <Stat
                                title="Contoh Placeholder"
                                value={question.placeholder || "—"}
                            />
                            <div />
                        </>
                    )}
                </div>

                {/* Filter */}
                <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-5">
                    <input
                        type="date"
                        className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                    />
                    <input
                        type="date"
                        className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                    />
                    {question.type === "text" ? (
                        <input
                            type="search"
                            placeholder="Cari kata di komentar…"
                            className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                    ) : (
                        <div />
                    )}
                    <button
                        onClick={apply}
                        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
                    >
                        Terapkan
                    </button>
                    <button
                        onClick={exportCsv}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        Export CSV
                    </button>
                </div>

                {/* Tabel jawaban */}
                <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
                    <table className="w-full border-separate border-spacing-0 text-sm">
                        <thead className="bg-slate-50 text-left text-slate-600">
                            <tr>
                                <Th className="w-16">#</Th>
                                {question.type === "stars" ? (
                                    <Th>Rating</Th>
                                ) : (
                                    <Th>Komentar</Th>
                                )}
                                <Th className="w-40">Waktu</Th>
                                <Th className="w-40">IP</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {answers.data.map((a) => (
                                <tr key={a.id} className="border-t">
                                    <Td>{a.id}</Td>
                                    <Td>
                                        {question.type === "stars" ? (
                                            <span className="rounded-md bg-yellow-50 px-2 py-1 text-yellow-800 ring-1 ring-yellow-100">
                                                {a.value_int}★
                                            </span>
                                        ) : (
                                            <span className="text-slate-800">
                                                {a.value_text || "—"}
                                            </span>
                                        )}
                                    </Td>
                                    <Td>
                                        {new Date(
                                            a.created_at
                                        ).toLocaleString()}
                                    </Td>
                                    <Td>{a.submission?.ip || "—"}</Td>
                                </tr>
                            ))}
                            {answers.data.length === 0 && (
                                <tr>
                                    <Td
                                        colSpan={4}
                                        className="text-center text-slate-500 py-8"
                                    >
                                        Belum ada data.
                                    </Td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {answers.links.map((l, i) => (
                        <Link
                            key={i}
                            href={l.url || "#"}
                            className={`rounded-lg px-3 py-1.5 text-sm ${
                                l.active
                                    ? "bg-blue-600 text-white"
                                    : "border border-slate-200 bg-white text-slate-700"
                            }`}
                            dangerouslySetInnerHTML={{ __html: l.label }}
                        />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function Stat({ title, value }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <div className="text-xs text-slate-500">{title}</div>
            <div className="text-lg font-semibold text-slate-900">{value}</div>
        </div>
    );
}
function Th({ children, className = "" }) {
    return (
        <th
            className={`border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide ${className}`}
        >
            {children}
        </th>
    );
}
function Td({ children, className = "", colSpan }) {
    return (
        <td
            colSpan={colSpan}
            className={`px-4 py-3 align-top text-sm text-slate-700 ${className}`}
        >
            {children}
        </td>
    );
}
