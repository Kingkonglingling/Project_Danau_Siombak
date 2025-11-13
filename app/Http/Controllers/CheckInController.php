<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CheckInController extends Controller
{
    /**
     * Halaman Check-in (admin)
     * URL: GET /dashboard/checkin
     */
    public function index()
    {
        return Inertia::render('Admin/Checkin/Index');
    }

    /**
     * API Check-in (dipanggil saat scan / submit kode)
     * URL: POST /api/checkin/{order_code}
     */
    public function store(Request $request, $order_code)
    {
        Log::info('Check-in request', ['order_code' => $order_code]);

        $order = Order::where('order_code', $order_code)->first();

        if (! $order) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Tiket tidak ditemukan.',
            ], 404);
        }

        // wajib sudah dibayar
        if ($order->payment_status !== 'paid') {
            return response()->json([
                'status'  => 'error',
                'message' => 'Tiket belum dibayar / belum terkonfirmasi.',
            ], 422);
        }

        // kalau sudah pernah check-in, jangan dobel
        if ($order->checked_in_at) {
            return response()->json([
                'status'      => 'already',
                'message'     => 'Tiket ini sudah check-in sebelumnya.',
                'checked_in_at' => $order->checked_in_at->format('Y-m-d H:i:s'),
            ], 200);
        }

        // set sebagai check-in
        $order->checked_in_at = now();
        $order->save();

        return response()->json([
            'status'  => 'success',
            'message' => 'Check-in berhasil.',
            'order'   => [
                'order_code'   => $order->order_code,
                'buyer_name'   => $order->buyer_name,
                'buyer_phone'  => $order->buyer_phone,
                'paid_at'      => optional($order->paid_at)->format('Y-m-d H:i:s'),
                'checked_in_at' => $order->checked_in_at->format('Y-m-d H:i:s'),
            ],
        ]);
    }
}
