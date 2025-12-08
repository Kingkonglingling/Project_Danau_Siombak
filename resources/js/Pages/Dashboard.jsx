import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useMemo } from "react";

// Chart.js
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export default function Dashboard({ chart, stats }) {
    const range = chart?.range ?? 14;

    const data = useMemo(() => {
        return {
            labels: chart?.labels ?? [],
            datasets: [
                {
                    label: "Pengunjung",
                    data: chart?.values ?? [],
                    tension: 0.35,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                },
            ],
        };
    }, [chart]);

    const options = useMemo(() => {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { precision: 0 },
                    grid: { drawBorder: false },
                },
                x: { grid: { display: false } },
            },
        };
    }, []);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="px-4 pb-8 pt-2 sm:px-6 lg:px-8 space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-slate-900">
                            Dashboard
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Ringkasan pengunjung & order. Biar admin nggak hidup
                            dalam ketidakpastian.
                        </p>
                    </div>

                    {/* range switch */}
                    <div className="flex gap-2">
                        {[7, 14, 30].map((r) => (
                            <button
                                key={r}
                                type="button"
                                onClick={() =>
                                    router.get(
                                        route("dashboard"),
                                        { range: r },
                                        { preserveScroll: true }
                                    )
                                }
                                className={[
                                    "rounded-xl px-3 py-2 text-xs font-semibold ring-1 transition",
                                    r === range
                                        ? "bg-blue-600 text-white ring-blue-600"
                                        : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50",
                                ].join(" ")}
                            >
                                {r} hari
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stat cards */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        label="Pengunjung Hari Ini"
                        value={stats?.visitors_today ?? 0}
                    />
                    <StatCard
                        label="Order Hari Ini"
                        value={stats?.orders_today ?? 0}
                    />
                    <StatCard
                        label="Paid Hari Ini"
                        value={stats?.paid_today ?? 0}
                        tone="emerald"
                    />
                    <StatCard
                        label="Pending Hari Ini"
                        value={stats?.pending_today ?? 0}
                        tone="amber"
                    />
                </div>

                {/* Chart */}
                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-sm font-semibold text-slate-900">
                                Grafik Pengunjung ({range} hari terakhir)
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                Pengunjung = adult_count + child_count (per
                                hari).
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-[11px] text-slate-500">
                                Total {range} hari
                            </p>
                            <p className="text-lg font-semibold text-slate-900">
                                {chart?.total ?? 0}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 h-72">
                        <Line data={data} options={options} />
                    </div>
                </div>

                {/* Extra section biar dashboard makin "OK" */}
                <div className="grid gap-6 lg:grid-cols-3">
                    <QuickActionCard />
                    <TipsCard />
                    <HealthCard />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

/* ================= Components ================= */

function StatCard({ label, value, tone = "slate" }) {
    const toneMap = {
        slate: "bg-slate-50 text-slate-900 ring-slate-200",
        emerald: "bg-emerald-50 text-emerald-900 ring-emerald-200",
        amber: "bg-amber-50 text-amber-900 ring-amber-200",
    };

    return (
        <div
            className={[
                "rounded-2xl px-4 py-3 shadow-sm ring-1",
                toneMap[tone] || toneMap.slate,
            ].join(" ")}
        >
            <p className="text-[11px] font-semibold uppercase tracking-wide opacity-70">
                {label}
            </p>
            <p className="mt-1 text-2xl font-semibold">{value}</p>
        </div>
    );
}

function QuickActionCard() {
    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold text-slate-900">
                Quick Actions
            </p>
            <p className="mt-1 text-xs text-slate-500">
                Shortcut biar admin nggak klik-klik kayak main game RPG.
            </p>

            <div className="mt-4 grid gap-2">
                <a
                    href={route("dashboard.orders.create")}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700"
                >
                    + Tambah Order
                </a>
                <a
                    href={route("dashboard.checkin.index")}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                    Buka Check-in
                </a>
            </div>
        </div>
    );
}

function TipsCard() {
    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold text-slate-900">
                Catatan Cepat
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Grafik naik = ramai. Grafik nol = cek marketing 😅</li>
                <li>• Mau akurat? chart bisa difilter “paid” saja.</li>
                <li>• Tambah KPI lain: revenue per hari, top paket, dll.</li>
            </ul>
        </div>
    );
}

function HealthCard() {
    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold text-slate-900">
                System Status
            </p>
            <p className="mt-2 text-sm text-slate-600">
                Ini dummy section, tapi nanti bisa kamu isi:
            </p>
            <div className="mt-3 grid gap-2 text-xs text-slate-600">
                <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
                    • Midtrans callback: OK (atau not OK, tergantung hidupmu)
                </div>
                <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
                    • Storage public: OK (symlink: public/storage)
                </div>
            </div>
        </div>
    );
}
