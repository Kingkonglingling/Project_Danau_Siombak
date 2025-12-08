<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $range = (int) $request->get('range', 14);
        $range = in_array($range, [7, 14, 30], true) ? $range : 14;

        $start = now()->startOfDay()->subDays($range - 1);

        $rows = Order::query()
            ->where('created_at', '>=', $start)
            ->selectRaw('DATE(created_at) as day, SUM(COALESCE(adult_count,0) + COALESCE(child_count,0)) as visitors')
            ->groupBy('day')
            ->orderBy('day')
            ->get()
            ->keyBy('day');

        $labels = [];
        $values = [];

        for ($i = 0; $i < $range; $i++) {
            $date = $start->copy()->addDays($i);
            $key  = $date->toDateString(); // YYYY-MM-DD

            $labels[] = $date->format('d M');
            $values[] = (int) ($rows[$key]->visitors ?? 0);
        }

        $todayStart = now()->startOfDay();

        $visitorsToday = (int) Order::query()
            ->where('created_at', '>=', $todayStart)
            ->sum(DB::raw('COALESCE(adult_count,0) + COALESCE(child_count,0)'));

        return Inertia::render('Dashboard', [
            'chart' => [
                'range'  => $range,
                'labels' => $labels,
                'values' => $values,
                'total'  => array_sum($values),
            ],
            'stats' => [
                'visitors_today' => $visitorsToday,
                'orders_today'   => (int) Order::where('created_at', '>=', $todayStart)->count(),
                'paid_today'     => (int) Order::where('created_at', '>=', $todayStart)->where('payment_status', 'paid')->count(),
                'pending_today'  => (int) Order::where('created_at', '>=', $todayStart)->where('payment_status', 'pending')->count(),
            ],
        ]);
    }
}
