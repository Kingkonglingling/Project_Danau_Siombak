import ApplicationLogo from "@/Components/ApplicationLogo";
import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <GuestLayout /* showLogo */>
            <Head title="Email Verification" />

            {/* === FULLSCREEN BACKGROUND (konsisten) === */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/bg-auth.png')" }}
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
            </div>

            {/* === CONTENT === */}
            <main className="relative z-10 grid min-h-dvh place-items-center p-4">
                <div className="w-full max-w-md rounded-3xl bg-white/20 backdrop-blur-2xl ring-1 ring-white/30 shadow-[0_10px_40px_rgba(0,0,0,0.25)] p-6 sm:p-8">
                    {/* header kecil */}
                    <div className="mb-6 text-center">
                        <ApplicationLogo
                            src="/apple-touch-icon.png"
                            alt="Brand Logo"
                            className="mx-auto h-36 w-36"
                        />
                    </div>

                    <p className="mb-4 text-sm text-white/85">
                        Thanks for signing up! We’ve sent a verification link to
                        your email. Click the link to activate your account.
                        Didn’t get it? You can send another one below.
                    </p>

                    {status === "verification-link-sent" && (
                        <div className="mb-4 rounded-lg bg-emerald-500/15 px-3 py-2 text-sm font-medium text-emerald-100 ring-1 ring-emerald-400/25">
                            A new verification link has been sent to the email
                            address you provided during registration.
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-3">
                        <PrimaryButton
                            disabled={processing}
                            className="w-full justify-center rounded-xl bg-[#0B4DA8] text-white hover:bg-[#0a4496]"
                        >
                            Resend Verification Email
                        </PrimaryButton>

                        <div className="flex items-center justify-center gap-3 pt-1">
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="text-sm text-white/85 hover:underline decoration-white/40 underline-offset-4"
                            >
                                Log Out
                            </Link>
                            <span className="text-white/30">•</span>
                            <Link
                                href={route("login")}
                                className="text-sm text-white/85 hover:underline decoration-white/40 underline-offset-4"
                            >
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </GuestLayout>
    );
}
