import ApplicationLogo from "@/Components/ApplicationLogo";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), { onFinish: () => reset("password") });
    };

    return (
        <GuestLayout /* showLogo */>
            <Head title="Log in" />

            {/* === FULLSCREEN BACKGROUND (terpisah dari konten) === */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                {/* Foto */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/bg-auth.png')" }}
                    aria-hidden="true"
                />
                {/* Overlay buat kontras (foto terang jadi aman) */}
                <div className="absolute inset-0 bg-black/20" />
                {/* Glow halus di tengah agar card kebaca tanpa bikin gelap seluruh layar */}
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

                    {/* status */}
                    {status && (
                        <div className="mb-4 rounded-lg bg-emerald-500/15 px-3 py-2 text-sm font-medium text-emerald-100 ring-1 ring-emerald-400/25">
                            {status}
                        </div>
                    )}

                    {/* FORM */}
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel
                                htmlFor="name"
                                value="Username"
                                className="text-white/80"
                            />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full rounded-xl bg-white/90"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="yourusername"
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password"
                                value="Password"
                                className="text-white/80"
                            />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full rounded-xl bg-white/90"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="••••••••"
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-white/85">
                                    Remember me
                                </span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-white/85 hover:underline decoration-white/40 underline-offset-4 hover:text-white"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                        </div>

                        <PrimaryButton
                            className="w-full justify-center rounded-xl bg-[#0B4DA8] text-white hover:bg-[#0a4496]"
                            disabled={processing}
                        >
                            Sign in
                        </PrimaryButton>

                        {/* separator */}
                        <div className="relative py-3">
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-white/25" />
                            <span className="relative mx-auto block w-fit px-2 text-xs text-white/80">
                                or
                            </span>
                        </div>

                        <p className="pt-2 text-center text-xs text-white/80">
                            Don't have an account yet?{" "}
                            <Link
                                href={route("register")}
                                className="font-medium text-white hover:underline decoration-white/40 underline-offset-4"
                            >
                                Register for free
                            </Link>
                        </p>
                    </form>
                </div>
            </main>
        </GuestLayout>
    );
}
