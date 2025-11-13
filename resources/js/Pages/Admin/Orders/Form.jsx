import { Head, Link, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from "sweetalert2";

export default function Form({ packages }) {
    const { data, setData, post, processing, errors } = useForm({
        package_id: "",
        buyer_name: "",
        buyer_phone: "",
        buyer_email: "",
        adult_count: 1,
        child_count: 0,
        mark_as_paid: true,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("dashboard.orders.store"), {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Order dibuat",
                    text: "Tiket offline berhasil dibuat.",
                    confirmButtonText: "OK",
                    heightAuto: false,
                }).then(() => {
                    router.visit(route("dashboard.orders.index"));
                });
            },
            onError: (errs) => {
                const first = Object.values(errs)[0];
                if (first) {
                    Swal.fire({
                        icon: "error",
                        title: "Gagal menyimpan",
                        text: String(first),
                        confirmButtonText: "OK",
                        heightAuto: false,
                    });
                }
            },
        });
    };

    const selectedPackage = packages.find(
        (p) => String(p.id) === String(data.package_id)
    );

    const adultPrice = selectedPackage
        ? Number(selectedPackage.adult_price ?? 0)
        : 0;

    const childPrice = selectedPackage
        ? Number(
              selectedPackage.child_price != null
                  ? selectedPackage.child_price
                  : selectedPackage.adult_price ?? 0
          )
        : 0;

    const total =
        adultPrice * (Number(data.adult_count) || 0) +
        childPrice * (Number(data.child_count) || 0);

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Order" />

            <div className="px-4 pb-8 pt-2 sm:px-6 lg:px-8">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-slate-900">
                            Tambah Order Offline
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Buat tiket untuk pengunjung yang pesan langsung di
                            lokasi.
                        </p>
                    </div>
                    <Link
                        href={route("dashboard.orders.index")}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        ← Kembali
                    </Link>
                </div>

                <form
                    onSubmit={submit}
                    className="grid grid-cols-1 gap-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6"
                >
                    {/* Paket */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Paket
                        </label>
                        <select
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                            value={data.package_id}
                            onChange={(e) =>
                                setData("package_id", e.target.value)
                            }
                        >
                            <option value="">Pilih paket...</option>
                            {packages.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.title}
                                </option>
                            ))}
                        </select>
                        {errors.package_id && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.package_id}
                            </p>
                        )}
                        {selectedPackage && (
                            <p className="mt-1 text-xs text-slate-500">
                                Paket dipilih:{" "}
                                <span className="font-semibold">
                                    {selectedPackage.title}
                                </span>
                            </p>
                        )}
                    </div>

                    {/* Nama */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Nama Pemesan
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                            value={data.buyer_name}
                            onChange={(e) =>
                                setData("buyer_name", e.target.value)
                            }
                        />
                        {errors.buyer_name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.buyer_name}
                            </p>
                        )}
                    </div>

                    {/* HP */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Nomor WhatsApp
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                            placeholder="62812xxxx"
                            value={data.buyer_phone}
                            onChange={(e) =>
                                setData("buyer_phone", e.target.value)
                            }
                        />
                        {errors.buyer_phone && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.buyer_phone}
                            </p>
                        )}
                        <p className="mt-1 text-xs text-amber-600">
                            * Nomor WA harus aktif karena link e-ticket akan
                            dikirim ke sana.
                        </p>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Email (opsional)
                        </label>
                        <input
                            type="email"
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                            value={data.buyer_email}
                            onChange={(e) =>
                                setData("buyer_email", e.target.value)
                            }
                        />
                        {errors.buyer_email && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.buyer_email}
                            </p>
                        )}
                    </div>

                    {/* Jumlah pengunjung */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                Dewasa
                            </label>
                            <input
                                type="number"
                                min={0}
                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                value={data.adult_count}
                                onChange={(e) =>
                                    setData(
                                        "adult_count",
                                        Number(e.target.value)
                                    )
                                }
                            />
                            {errors.adult_count && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.adult_count}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                Anak
                            </label>
                            <input
                                type="number"
                                min={0}
                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                value={data.child_count}
                                onChange={(e) =>
                                    setData(
                                        "child_count",
                                        Number(e.target.value)
                                    )
                                }
                            />
                            {errors.child_count && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.child_count}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Ringkasan Paket & Total
                        </p>

                        {!selectedPackage ? (
                            <p className="mt-2 text-xs text-slate-500">
                                Pilih paket terlebih dahulu untuk melihat harga
                                dan total.
                            </p>
                        ) : (
                            <div className="mt-2 space-y-1 text-xs">
                                <p>
                                    Harga Dewasa:{" "}
                                    <span className="font-semibold">
                                        Rp {adultPrice.toLocaleString("id-ID")}
                                    </span>
                                </p>
                                <p>
                                    Harga Anak:{" "}
                                    <span className="font-semibold">
                                        {selectedPackage.child_price != null
                                            ? `Rp ${childPrice.toLocaleString(
                                                  "id-ID"
                                              )}`
                                            : "Sama seperti dewasa"}
                                    </span>
                                </p>
                                <p className="pt-1">
                                    Dewasa: {data.adult_count || 0} x Rp{" "}
                                    {adultPrice.toLocaleString("id-ID")}
                                </p>
                                <p>
                                    Anak: {data.child_count || 0} x Rp{" "}
                                    {childPrice.toLocaleString("id-ID")}
                                </p>
                                <p className="pt-1 text-sm font-semibold text-slate-900">
                                    Total: Rp {total.toLocaleString("id-ID")}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            id="mark_as_paid"
                            type="checkbox"
                            checked={data.mark_as_paid}
                            onChange={(e) =>
                                setData("mark_as_paid", e.target.checked)
                            }
                            className="h-4 w-4 rounded border-slate-300 text-blue-600"
                        />
                        <label
                            htmlFor="mark_as_paid"
                            className="text-sm text-slate-700"
                        >
                            Tandai sebagai{" "}
                            <span className="font-semibold">sudah bayar</span>{" "}
                            (langsung aktifkan tiket)
                        </label>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
                        >
                            Simpan Order
                        </button>
                        <p className="mt-2 text-xs text-slate-500">
                            Setelah disimpan, sistem akan menghitung total harga
                            berdasarkan harga paket. Jika ditandai sudah bayar,
                            tiket langsung bisa dipakai dan e-ticket akan
                            dikirim ke WhatsApp.
                        </p>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
