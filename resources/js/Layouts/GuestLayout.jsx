import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children, showLogo = false }) {
    return (
        <div className="relative min-h-dvh w-full">
            {showLogo && (
                <div className="fixed left-6 top-6 z-20 hidden sm:block">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center"
                    >
                        <ApplicationLogo className="h-8 w-8 rounded-md" />
                    </Link>
                </div>
            )}
            {children}
        </div>
    );
}
