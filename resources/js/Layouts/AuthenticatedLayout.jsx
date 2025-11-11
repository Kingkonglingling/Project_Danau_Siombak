import ApplicationLogo from "@/Components/ApplicationLogo";
import Swal from "sweetalert2";
import { Link, usePage, router } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;

    // mobile drawer (overlay)
    const [drawerOpen, setDrawerOpen] = useState(false);
    // desktop collapse (sidebar kiri)
    const [collapsed, setCollapsed] = useState(false); // false = w-64, true = w-20

    const sidebarW = collapsed ? "w-20" : "w-64";
    const contentPad = collapsed ? "lg:pl-20" : "lg:pl-64";

    return (
        <div className="h-auto bg-slate-50">
            {/* ===== Sidebar desktop (kiri, collapsible) ===== */}
            <aside
                className={`fixed inset-y-0 left-0 z-20 hidden border-r border-slate-200 bg-white/95 backdrop-blur lg:block
          ${sidebarW} transition-[width] duration-300 ease-out`}
            >
                <SidebarContent user={user} collapsed={collapsed} />
            </aside>

            {/* ===== Toggle (kanan atas) ===== */}
            <button
                onClick={() =>
                    window.innerWidth < 1024
                        ? setDrawerOpen(true)
                        : setCollapsed((v) => !v)
                }
                className={`fixed right-4 top-4 z-50 rounded-lg bg-white/80 p-2 text-slate-700 shadow ring-1 ring-slate-200
                    hover:bg-white transition lg:right-3
                    ${
                        drawerOpen
                            ? "opacity-0 pointer-events-none"
                            : "opacity-100"
                    }`}
                aria-label="Toggle menu"
            >
                <BurgerIcon
                    className={`h-6 w-6 transition-transform duration-300 ${
                        collapsed ? "rotate-90" : ""
                    }`}
                />
            </button>

            {/* ===== Drawer mobile (kanan, animated) ===== */}
            <div
                className={`fixed inset-0 z-40 lg:hidden ${
                    drawerOpen ? "pointer-events-auto" : "pointer-events-none"
                }`}
                onClick={() => setDrawerOpen(false)}
            >
                {/* backdrop */}
                <div
                    className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                        drawerOpen ? "opacity-100" : "opacity-0"
                    }`}
                />
                {/* panel dari kanan */}
                <div
                    className={`absolute right-0 top-0 h-full w-72 bg-white p-4 shadow-xl transition-transform duration-300 ease-out
                      ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ApplicationLogo className="h-8 w-8 rounded-md" />
                            <span className="text-sm font-semibold text-slate-800">
                                Admin
                            </span>
                        </div>
                        <button
                            onClick={() => setDrawerOpen(false)}
                            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                            aria-label="Close"
                        >
                            <CloseIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <SidebarNav
                        mobile
                        onNavigate={() => setDrawerOpen(false)}
                    />

                    <div className="mt-6 border-t pt-4 space-y-2">
                        <Link
                            href={route("profile.edit")}
                            className="block w-full rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        >
                            Profile
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="mt-1 block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== Content ===== */}
            <main className={`${contentPad}`}>
                <div className="px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-8">
                    <div className="h-auto rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
                        {children}
                    </div>
                    <footer className="mt-6 text-xs text-slate-500">
                        © {new Date().getFullYear()} — Dashboard
                    </footer>
                </div>
            </main>
        </div>
    );
}

/* ================= Sidebar content ================= */

function SidebarContent({ user, collapsed = false }) {
    return (
        <div className="flex h-full flex-col">
            {/* Brand */}
            <div className="flex h-16 items-center gap-2 px-4">
                <Link
                    href={route("dashboard")}
                    className="flex items-center gap-2"
                >
                    <ApplicationLogo className="h-9 w-9 rounded-md" />
                    <span
                        className={`text-base font-semibold text-slate-800 transition-opacity duration-200
                        ${
                            collapsed
                                ? "opacity-0 pointer-events-none w-0"
                                : "opacity-100"
                        }`}
                    >
                        Admin
                    </span>
                </Link>
            </div>

            {/* Nav */}
            <div className="flex-1 overflow-y-auto px-2 py-4">
                <SidebarNav collapsed={collapsed} />
            </div>

            {/* User */}
            <div className="border-t border-slate-200 p-3">
                <div
                    className={`mt-3 flex gap-2 ${
                        collapsed ? "hidden" : "flex"
                    }`}
                >
                    <Link
                        href={route("profile.edit")}
                        className="flex-1 rounded-lg border px-3 py-2 text-center text-sm text-slate-700 hover:bg-slate-50"
                    >
                        Profile
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-center text-sm text-white hover:bg-black"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}

function SidebarNav({
    collapsed = false,
    mobile = false,
    onNavigate = () => {},
}) {
    return (
        <nav className="space-y-6">
            <div>
                <SectionTitle collapsed={collapsed}>Overview</SectionTitle>
                <SideItem
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                    icon={HomeIcon}
                    collapsed={collapsed}
                    onClick={onNavigate}
                >
                    Dashboard
                </SideItem>
            </div>

            <div>
                <SectionTitle collapsed={collapsed}>Content</SectionTitle>
                <SideItem
                    href={route("dashboard.package.index")}
                    active={route().current("dashboard.package.*")}
                    icon={TicketIcon}
                    collapsed={collapsed}
                    onClick={onNavigate}
                >
                    Package Ticket
                </SideItem>
            </div>
        </nav>
    );
}

/* ================= Bits ================= */

function SectionTitle({ children, collapsed }) {
    return (
        <div
            className={`px-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500 transition-opacity duration-200
        ${collapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100"}`}
        >
            {children}
        </div>
    );
}

function SideItem({ href, active, icon: Icon, children, onClick, collapsed }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`mt-1 flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition
        ${
            active
                ? "bg-blue-50 font-semibold text-blue-700 ring-1 ring-blue-100"
                : "text-slate-700 hover:bg-slate-100"
        }`}
            title={collapsed ? String(children) : undefined}
        >
            <Icon
                className={`h-5 w-5 ${
                    active ? "text-blue-600" : "text-slate-400"
                }`}
            />
            <span className={`${collapsed ? "sr-only" : "inline"}`}>
                {children}
            </span>
        </Link>
    );
}

/* ================= Icons ================= */

function BurgerIcon({ className }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
    );
}
function CloseIcon({ className }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    );
}
function HomeIcon({ className }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="m3 11 9-7 9 7" />
            <path d="M9 21V9h6v12" />
        </svg>
    );
}
function TicketIcon({ className }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M3 9h18v6H3z" />
            <path d="M7 9v6M17 9v6" />
            <path d="M3 12a2 2 0 1 0 0 0" />
        </svg>
    );
}

function handleLogout() {
    Swal.fire({
        title: "Log out?",
        text: "Kamu akan keluar dari sesi ini.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, log out",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        confirmButtonColor: "#111827", // slate-900
    }).then((res) => {
        if (res.isConfirmed) {
            router.post(route("logout")); // kirim POST ke route logout
        }
    });
}
