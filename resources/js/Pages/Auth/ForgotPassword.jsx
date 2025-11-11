import ApplicationLogo from "@/Components/ApplicationLogo";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <GuestLayout /* showLogo */>
            <Head title="Forgot Password" />

            {/* === FULLSCREEN BACKGROUND (sama seperti login/register) === */}
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
                        Lupa kata sandi? Tenang. Masukkan email kamu dan kami
                        kirim tautan untuk setel ulang password.
                    </p>

                    {status && (
                        <div className="mb-4 rounded-lg bg-emerald-500/15 px-3 py-2 text-sm font-medium text-emerald-100 ring-1 ring-emerald-400/25">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-white/80"
                            >
                                Email
                            </label>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-xl bg-white/90 placeholder:text-gray-500"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                placeholder="username@gmail.com"
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <PrimaryButton
                            className="w-full justify-center rounded-xl bg-[#0B4DA8] text-white hover:bg-[#0a4496]"
                            disabled={processing}
                        >
                            Email Password Reset Link
                        </PrimaryButton>

                        <p className="pt-2 text-center text-xs text-white/80">
                            Ingat kembali?{" "}
                            <Link
                                href={route("login")}
                                className="font-medium text-white underline decoration-white/40 underline-offset-4"
                            >
                                Kembali ke login
                            </Link>
                        </p>
                    </form>
                </div>
            </main>
        </GuestLayout>
    );
}
