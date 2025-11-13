<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Package;
use App\Services\FonnteService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminOrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('package')->latest()->paginate(20);

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders->through(function ($o) {
                return [
                    'id'             => $o->id,
                    'order_code'     => $o->order_code,
                    'package'        => $o->package->title ?? '-',
                    'buyer_name'     => $o->buyer_name,
                    'buyer_phone'    => $o->buyer_phone,
                    'payment_status' => $o->payment_status,
                    'source'         => $o->source,
                    'total_price'    => $o->total_price,
                    'created_at'     => optional($o->created_at)->toDateTimeString(),
                    'ticket_status'  => $o->checked_in_at ? 'active' : 'inactive',
                ];
            }),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Orders/Form', [
            'packages' => Package::select('id', 'title', 'adult_price', 'child_price')
                ->orderBy('title')
                ->get(),
        ]);
    }

    public function store(Request $req, FonnteService $fonnte)
    {
        $data = $req->validate([
            'package_id'   => ['required', 'exists:packages,id'],
            'buyer_name'   => ['required', 'string'],
            'buyer_phone'  => ['required', 'string'],
            'buyer_email'  => ['nullable', 'email'],
            'adult_count'  => ['required', 'integer', 'min:0'],
            'child_count'  => ['required', 'integer', 'min:0'],
            'mark_as_paid' => ['nullable', 'boolean'],
        ]);

        $package = Package::findOrFail($data['package_id']);

        // ===== Normalisasi nomor WA: 08xxx -> 628xxx =====
        $phone = preg_replace('/\D+/', '', $data['buyer_phone']);
        if (str_starts_with($phone, '0')) {
            $phone = '62' . substr($phone, 1);
        }

        // ===== Hitung total =====
        $adultPrice = $package->adult_price;
        $childPrice = $package->child_price ?? $package->adult_price;

        $total = ($data['adult_count'] * $adultPrice)
            + ($data['child_count'] * $childPrice);

        // ===== Buat order offline =====
        $isPaid = !empty($data['mark_as_paid']);

        $order = Order::create([
            'package_id'     => $package->id,
            'buyer_name'     => $data['buyer_name'],
            'buyer_phone'    => $phone,
            'buyer_email'    => $data['buyer_email'] ?? null,
            'adult_count'    => $data['adult_count'],
            'child_count'    => $data['child_count'],
            'order_code'     => 'OFF-' . now()->format('Ymd') . '-' . Str::upper(Str::random(6)),
            'total_price'    => $total,
            'source'         => 'offline',
            'payment_status' => $isPaid ? 'paid' : 'pending',
            'paid_at'        => $isPaid ? now() : null,
        ]);

        if ($order->payment_status === 'paid') {
            $fonnte->sendTicketLink($order);
        }

        return redirect()
            ->route('dashboard.orders.index')
            ->with('success', 'Order offline berhasil dibuat');
    }
}
