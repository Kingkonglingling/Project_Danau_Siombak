<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Package;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function store(Request $req, MidtransService $midtrans)
    {
        $data = $req->validate([
            'package_id'  => ['required', 'exists:packages,id'],
            'buyer_name'  => ['required', 'string', 'max:255'],
            'buyer_phone' => ['required', 'string', 'max:25'],
            'buyer_email' => ['nullable', 'email'],
            'adult_count' => ['required', 'integer', 'min:0'],
            'child_count' => ['required', 'integer', 'min:0'],
        ]);

        $package = Package::findOrFail($data['package_id']);

        $adultPrice = $package->adult_price;
        $childPrice = $package->child_price ?? $package->adult_price;

        $total = $data['adult_count'] * $adultPrice
            + $data['child_count'] * $childPrice;

        // 1. Buat order dengan status pending
        $order = Order::create([
            ...$data,
            // sebenarnya Order model sudah auto-generate order_code,
            // tapi ini tidak masalah, konsisten saja:
            'order_code'     => 'ORD-' . now()->format('Ymd') . '-' . Str::upper(Str::random(6)),
            'total_price'    => $total,
            'payment_status' => 'pending',
            'source'         => 'online',
        ]);

        // 2. Buat transaksi Midtrans Snap
        $snap = $midtrans->createTransaction($order); // <-- stdClass

        // 3. Simpan order_id & token dari Midtrans
        $order->update([
            // di params tadi kita sudah set order_id = $order->order_code
            // tapi kalau Midtrans balikin property order_id, kita pakai itu
            'midtrans_order_id'   => $snap->order_id ?? $order->order_code,
            'midtrans_snap_token' => $snap->token ?? null,
        ]);

        // 4. Kirim ke halaman Checkout
        return Inertia::render('Front/Checkout', [
            'order' => [
                'id'                  => $order->id,
                'order_code'          => $order->order_code,
                'total_price'         => $order->total_price,
                'adult_count'         => $order->adult_count,
                'child_count'         => $order->child_count,
                'midtrans_snap_token' => $order->midtrans_snap_token,
            ],
        ]);
    }
}
