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
        $p = Package::where('slug', $slug)->firstOrFail();

        return Inertia::render('Front/Packages/Show', [
            'package' => [
                'id'           => $p->id,
                'title'        => $p->title,
                'description'  => $p->description,
                'image_url'    => $p->image_path ? Storage::url($p->image_path) : null,
                'adult_price'  => $p->adult_price,
                'child_price'  => $p->child_price,
            ],
        ]);
    }
}
