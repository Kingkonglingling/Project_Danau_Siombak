<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PackageController extends Controller
{
    public function index()
    {
        $packages = Package::latest()->get()->map(function ($p) {
            return [
                'id'           => $p->id,
                'title'        => $p->title,
                'slug'         => $p->slug,
                'image_url'    => $p->image_path ? Storage::url($p->image_path) : null,
                'adult_price'  => $p->adult_price,
                'child_price'  => $p->child_price,
            ];
        });

        return Inertia::render('Front/Packages/Index', [
            'packages' => $packages,
        ]);
    }

    public function show(string $slug)
    {
        $pkg = Package::where('slug', $slug)->firstOrFail();

        $reviewsQuery = $pkg->reviews()->latest();

        return Inertia::render('Front/Packages/Show', [
            'package' => [
                'id' => $pkg->id,
                'title' => $pkg->title,
                'slug' => $pkg->slug,
                'description' => $pkg->description,
                'image_url' => $pkg->image_path ? Storage::disk('public')->url($pkg->image_path) : null,
                'adult_price' => $pkg->adult_price,
                'child_price' => $pkg->child_price,
                'reviews' => $reviewsQuery->take(10)->get()->map(fn($r) => [
                    'id' => $r->id,
                    'rating' => $r->rating,
                    'comment' => $r->comment,
                    'reviewer_name' => $r->reviewer_name,
                    'created_at' => $r->created_at->toDateString(),
                ]),
                'rating_avg' => round((float) $reviewsQuery->avg('rating'), 1),
                'rating_count' => (int) $reviewsQuery->count(),
            ],
        ]);
    }
}
