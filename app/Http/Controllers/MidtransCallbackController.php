<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\FonnteService;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MidtransCallbackController extends Controller
{
    /**
     * CALLBACK RESMI DARI MIDTRANS (WEBHOOK)
     * URL: POST /midtrans/callback
     */
    public function handle(Request $request, MidtransService $midtransService, FonnteService $fonnte)
    {
        $payload = $request->all();
        Log::info('Midtrans callback payload', $payload);

        // Kalau cuma test manual tanpa order_id
        if (! isset($payload['order_id'])) {
            return response()->json(['message' => 'ok-test-no-order-id']);
        }

        // VALIDASI SIGNATURE HANYA DI SINI (WEBHOOK)
        if (! $midtransService->isSignatureValid($payload)) {
            Log::warning('Midtrans invalid signature', $payload);
            return response()->json(['message' => 'invalid-signature'], 403);
        }

        $orderId           = $payload['order_id'] ?? null;
        $transactionStatus = $payload['transaction_status'] ?? null;

        Log::info('Midtrans parsed notification', [
            'order_id'           => $orderId,
            'transaction_status' => $transactionStatus,
        ]);

        $order = Order::where('order_code', $orderId)->first();

        if (! $order) {
            Log::warning('Order not found for Midtrans callback', ['order_id' => $orderId]);
            return response()->json(['message' => 'order not found'], 404);
        }

        // Mapping status → paid / failed
        if (in_array($transactionStatus, ['capture', 'settlement'])) {
            // idempotent: jangan update kalau sudah paid
            if ($order->payment_status !== 'paid') {
                $order->payment_status = 'paid';
                $order->paid_at        = now();
                $order->save();

                // kirim WA berisi link tiket
                $fonnte->sendTicketLink($order);
            }
        } elseif (in_array($transactionStatus, ['cancel', 'expire', 'deny'])) {
            $order->payment_status = 'failed';
            $order->save();
        }

        return response()->json(['message' => 'ok']);
    }

    /**
     * KONFIRMASI DARI CLIENT (Snap onSuccess)
     * URL: POST /midtrans/confirm
     */
    public function confirmFromClient(Request $request)
    {
        $payload = $request->all();
        Log::info('Midtrans confirmFromClient payload', $payload);

        // IMPORTANT:
        // Payload dari Snap JS TIDAK punya signature_key,
        // jadi JANGAN pakai isSignatureValid di sini.

        $orderId           = $payload['order_id'] ?? null;
        $transactionStatus = $payload['transaction_status'] ?? null;

        if (! $orderId || ! $transactionStatus) {
            return response()->json(['message' => 'bad payload'], 400);
        }

        $order = Order::where('order_code', $orderId)->first();

        if (! $order) {
            Log::warning('Order not found in confirmFromClient', ['order_id' => $orderId]);
            return response()->json(['message' => 'order not found'], 404);
        }

        if (in_array($transactionStatus, ['capture', 'settlement'])) {
            if ($order->payment_status !== 'paid') {
                $order->payment_status = 'paid';
                $order->paid_at        = now();
                $order->save();

                // kirim WA (pakai container biar tetap lewat service)
                app(FonnteService::class)->sendTicketLink($order);
            }
        } elseif (in_array($transactionStatus, ['cancel', 'expire', 'deny'])) {
            $order->payment_status = 'failed';
            $order->save();
        }

        return response()->json(['message' => 'ok']);
    }
}
