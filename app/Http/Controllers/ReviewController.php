<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\PackageReview;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function show(string $token)
    {
        $order = Order::with('package')
            ->where('review_token', $token)
            ->firstOrFail();

        if ($order->payment_status !== 'paid') {
            abort(403, 'Order belum paid.');
        }

        if ($order->reviewed_at) {
            return Inertia::render('Front/Review/Done', [
                'order_code' => $order->order_code,
            ]);
        }

        return Inertia::render('Front/Review/Form', [
            'order' => [
                'order_code' => $order->order_code,
                'buyer_name' => $order->buyer_name,
                'package_title' => $order->package?->title ?? '-',
            ],
            'token' => $token,
        ]);
    }

    public function store(Request $request, string $token)
    {
        $order = Order::with('package')
            ->where('review_token', $token)
            ->firstOrFail();

        if ($order->payment_status !== 'paid') {
            return response()->json(['message' => 'Order belum paid.'], 403);
        }

        if ($order->reviewed_at) {
            return response()->json(['message' => 'Review sudah pernah dikirim.'], 409);
        }

        $data = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string', 'max:500'],
            'reviewer_name' => ['nullable', 'string', 'max:60'],
        ]);

        PackageReview::create([
            'package_id' => $order->package_id,
            'order_id' => $order->id,
            'rating' => $data['rating'],
            'comment' => $data['comment'] ?? null,
            'reviewer_name' => $data['reviewer_name'] ?? $order->buyer_name,
        ]);

        $order->reviewed_at = now();
        $order->save();

        return response()->json(['message' => 'ok']);
    }
}
