<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{
    protected $fillable = [
        'order_code',
        'package_id',
        'buyer_name',
        'buyer_phone',
        'buyer_email',
        'adult_count',
        'child_count',
        'total_price',
        'payment_status',
        'source',
        'midtrans_order_id',
        'midtrans_snap_token',
        'paid_at',
        'checked_in_at',
    ];

    protected $casts = [
        'paid_at'       => 'datetime',
        'checked_in_at' => 'datetime',
    ];

    protected $attributes = [
        'payment_status' => 'pending',
    ];

    protected static function booted()
    {
        static::creating(function ($order) {
            if (empty($order->order_code)) {
                $order->order_code = 'ORD-' . now()->format('Ymd') . '-' . Str::upper(Str::random(6));
            }
        });
    }

    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    // payload yang akan ditaruh dalam QR
    public function qrPayload(): string
    {
        return route('front.tickets.show', $this->order_code);
    }

    public function isPaid(): bool
    {
        return $this->payment_status === 'paid';
    }

    public function isCheckedIn(): bool
    {
        return ! is_null($this->checked_in_at);
    }
}
