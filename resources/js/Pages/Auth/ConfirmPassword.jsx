import ApplicationLogo from "@/Components/ApplicationLogo";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.confirm"), { onFinish: () => reset("password") });
    };

    return (
        <GuestLayout /* showLogo */>
            <Head title="Confirm Password" />

            {/* === FULLSCREEN BACKGROUND (konsisten dengan halaman lain) === */}
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
                        This is a secure area of the application. Please confirm
                        your password before continuing.
                    </p>

                    <form onSubmit={submit} className="space-y-4">
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
                                isFocused={true}
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

                        <PrimaryButton
                            className="w-full justify-center rounded-xl bg-[#0B4DA8] text-white hover:bg-[#0a4496]"
                            disabled={processing}
                        >
                            Confirm
                        </PrimaryButton>
                    </form>
                </div>
            </main>
        </GuestLayout>
    );
}
