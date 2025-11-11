<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePackageRequest;
use App\Http\Requests\UpdatePackageRequest;
use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $packages = Package::latest()->paginate(12)->through(function ($p) {
            return [
                'id' => $p->id,
                'title' => $p->title,
                'slug' => $p->slug,
                'image_url' => $p->image_path ? Storage::url($p->image_path) : null,
                'wa' => $p->whatsapp_number,
                'created_at' => $p->created_at->toDateString(),
            ];
        });

        return Inertia::render('Admin/Packages/Index', ['packages' => $packages]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Packages/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePackageRequest $req)
    {
        $data = $req->validated();
        if ($req->hasFile('image')) {
            $data['image_path'] = $req->file('image')->store('packages', 'public');
        }
        Package::create($data);
        return back()->with('success', 'Package created');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Package $package)
    {
        return Inertia::render('Admin/Packages/Form', [
            'package' => [
                'id' => $package->id,
                'title' => $package->title,
                'description' => $package->description,
                'image_url' => $package->image_path ? Storage::url($package->image_path) : null,
                'whatsapp_number' => $package->whatsapp_number,
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePackageRequest $req, Package $package)
    {
        $data = $req->validated();
        if ($req->hasFile('image')) {
            if ($package->image_path) Storage::disk('public')->delete($package->image_path);
            $data['image_path'] = $req->file('image')->store('packages', 'public');
        }
        $package->update($data);
        return back()->with('success', 'Package updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Package $package)
    {
        if ($package->image_path) Storage::disk('public')->delete($package->image_path);
        $package->delete();
        return back()->with('success', 'Package deleted');
    }
}
