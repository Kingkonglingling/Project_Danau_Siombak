<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Gallery;
use App\Models\Activity;
use Illuminate\Support\Str;
use Carbon\Carbon;

use Illuminate\Http\Request;

class HomePageController extends Controller
{
    public function index()
   {
        return Inertia::render('HomePage', [
            // GALERI — 12 foto terbaru
            'galleries' => Gallery::latest()
                ->take(12)
                ->get()
                ->map(fn($item) => [
                    'id'        => $item->id,
                    'image_url' => $item->image_url,
                    'title'     => $item->title ?? 'Keindahan Alam',
                ]),

            // AKTIVITAS — 6 aktivitas terbaru
            'activities' => Activity::latest()
                ->take(6)
                ->get()
                ->map(fn($act) => [
                    'id'          => $act->id,
                    'title'       => $act->title,
                    'description' => $act->description 
                        ? Str::limit(strip_tags($act->description), 120) 
                        : 'Aktivitas seru menanti Anda di Kampung Wisata Mutiara.',
                    'date'        => $act->formatted_date,
                    'image_url'   => $act->image_url,
                ]),
        ]);
    }
}
