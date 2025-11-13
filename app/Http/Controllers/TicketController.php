<?php

namespace App\Http\Controllers;

use App\Models\Order;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function showTicket(string $orderCode)
    {
        $order = Order::where('order_code', $orderCode)->firstOrFail();

        $ticketUrl = route('front.tickets.show', $order->order_code);

        // PAKSA jadi string HTML SVG
        $qrSvg = (string) QrCode::format('svg')
            ->size(180)
            ->margin(1)
            ->generate($ticketUrl);

        return Inertia::render('Front/TicketShow', [
            'order'  => [
                'order_code'   => $order->order_code,
                'buyer_name'   => $order->buyer_name,
                'adult_count'  => $order->adult_count,
                'child_count'  => $order->child_count,
                'total_price'  => $order->total_price,
                'package_name' => $order->package->title,
                'paid_at'      => optional($order->paid_at)->toDateTimeString(),
            ],
            'qr_svg' => $qrSvg, // sudah string murni
        ]);
    }
}
