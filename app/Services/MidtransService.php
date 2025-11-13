<?php

namespace App\Services;

use App\Models\Order;
use Midtrans\Config;
use Midtrans\Snap;

class MidtransService
{
    public function __construct()
    {
        Config::$serverKey    = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production', false);
        Config::$isSanitized  = true;
        Config::$is3ds        = true;
    }

    /**
     * Buat transaksi Snap dan balikin object (stdClass) dari Midtrans
     */
    public function createTransaction(Order $order): \stdClass
    {
        $params = [
            'transaction_details' => [
                // kita make sure order_id di Midtrans = order_code di DB
                'order_id'     => $order->order_code,
                'gross_amount' => (int) $order->total_price,
            ],
            'customer_details'    => [
                'first_name' => $order->buyer_name,
                'email'      => $order->buyer_email,
                'phone'      => $order->buyer_phone,
            ],
        ];

        // return stdClass dengan property ->token, ->redirect_url, dll
        return Snap::createTransaction($params);
    }

    /**
     * Validasi signature untuk CALLBACK (webhook)
     */
    public function isSignatureValid(array $payload): bool
    {
        $serverKey = config('services.midtrans.server_key');

        if (! isset($payload['order_id'], $payload['status_code'], $payload['gross_amount'], $payload['signature_key'])) {
            return false;
        }

        $expected = hash(
            'sha512',
            $payload['order_id'] .
                $payload['status_code'] .
                $payload['gross_amount'] .
                $serverKey
        );

        return hash_equals($expected, $payload['signature_key']);
    }
}
