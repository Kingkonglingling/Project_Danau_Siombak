<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FonnteService
{
    public function sendTicketLink(Order $order): void
    {
        if (! $order->buyer_phone) {
            Log::warning('No phone to send WA', ['order_id' => $order->order_code]);
            return;
        }

        // pastikan buyer_phone sudah 628xxx (normalisasi di controller)
        $url = route('front.tickets.show', $order->order_code);

        $message = "Halo {$order->buyer_name},\n\n"
            . "Tiket kamu untuk *{$order->package->title}* sudah aktif.\n"
            . "Total: Rp " . number_format($order->total_price, 0, ',', '.') . "\n"
            . "Kode Pesanan: {$order->order_code}\n\n"
            . "Buka link ini untuk melihat QR e-ticket:\n{$url}\n\n"
            . "Tunjukkan QR di pintu masuk.";

        $response = Http::withHeaders([
            'Authorization' => env('FONNTE_TOKEN'),
        ])
            ->asForm()
            ->post(env('FONNTE_URL', 'https://api.fonnte.com/send'), [
                'target'  => $order->buyer_phone,
                'message' => $message,
            ]);

        Log::info('Fonnte response', [
            'order_id' => $order->order_code,
            'status'   => $response->status(),
            'body'     => $response->json(),
        ]);
    }
}
