<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FonnteService
{
    private function sendMessage(string $target, string $message): void
    {
        $response = Http::withHeaders([
            'Authorization' => env('FONNTE_TOKEN'),
        ])
            ->asForm()
            ->post(env('FONNTE_URL', 'https://api.fonnte.com/send'), [
                'target'  => $target,
                'message' => $message,
            ]);

        Log::info('Fonnte response', [
            'target' => $target,
            'status' => $response->status(),
            'body'   => $response->json(),
        ]);
    }

    public function sendTicketLink(Order $order): void
    {
        if (! $order->buyer_phone) {
            Log::warning('No phone to send WA', ['order_id' => $order->order_code]);
            return;
        }

        $url = route('front.tickets.show', $order->order_code);

        $message = "Halo {$order->buyer_name},\n\n"
            . "Tiket kamu untuk *{$order->package->title}* sudah aktif.\n"
            . "Total: Rp " . number_format($order->total_price, 0, ',', '.') . "\n"
            . "Kode Pesanan: {$order->order_code}\n\n"
            . "Buka link ini untuk melihat QR e-ticket:\n{$url}\n\n"
            . "Tunjukkan QR di pintu masuk.";

        $this->sendMessage($order->buyer_phone, $message);
    }

    public function sendReviewLink(Order $order): void
    {
        if (! $order->buyer_phone) {
            Log::warning('No phone to send review link', ['order_id' => $order->order_code]);
            return;
        }

        if (! $order->review_token) {
            Log::warning('Review token missing', ['order_id' => $order->order_code]);
            return;
        }

        $url = route('front.review.show', $order->review_token);

        $msg =
            "Terima kasih sudah membeli tiket 🙌\n\n" .
            "Bantu kami dengan review singkat ya:\n" .
            $url . "\n\n" .
            "⭐ Beri bintang + komentar (opsional).";

        $this->sendMessage($order->buyer_phone, $msg);
    }
}
