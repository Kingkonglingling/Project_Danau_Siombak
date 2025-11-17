<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;

class GalleryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Galleri/Index', [
            'galleri' => Gallery::latest()->paginate(12)
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Galleri/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image'       => 'required|image|mimes:png,jpg,jpeg,webp|max:5120',
        ]);

        $path = $request->file('image')->store('galleri', 'public');

        Gallery::create([
            'title'       => $request->title,
            'description' => $request->description,
            'image'       => $path,
        ]);

        return redirect()->route('dashboard.galleri.index')
            ->with('success', 'Foto berhasil ditambahkan ke galeri!');
    }

    public function edit(Gallery $galleri) // ← route model binding otomatis pakai "galleri"
    {
        return Inertia::render('Admin/Galleri/Edit', [
            'galleri' => $galleri
        ]);
    }

    public function update(Request $request, Gallery $galleri)
    {
        $request->validate([
            'title'       => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image'       => 'nullable|image|mimes:png,jpg,jpeg,webp|max:5120',
        ]);

        $data = $request->only(['title', 'description']);

        if ($request->hasFile('image')) {
            if ($galleri->image) {
                Storage::disk('public')->delete($galleri->image);
            }
            $data['image'] = $request->file('image')->store('galleri', 'public');
        }

        $galleri->update($data);

        return redirect()->route('dashboard.galleri.index')
            ->with('success', 'Galeri berhasil diperbarui');
    }

    public function destroy(Gallery $galleri)
    {
        if ($galleri->image) {
            Storage::disk('public')->delete($galleri->image);
        }
        $galleri->delete();

        return back()->with('success', 'Foto berhasil dihapus');
    }
}
