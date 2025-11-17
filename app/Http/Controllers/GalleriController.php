<?php

namespace App\Http\Controllers;

use App\Models\Galleri;
use Illuminate\Support\Facades\Storage;

use Illuminate\Http\Request;

class GalleriController extends Controller
{
    public function index()
    {
        return Galleri::orderBy('id', 'desc')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image'       => 'required|image|mimes:png,jpg,jpeg,webp|max:2048',
        ]);

        $imagePath = $request->file('image')->store('galleri', 'public');

        $data = Galleri::create([
            'title'       => $request->title,
            'description' => $request->description,
            'image'       => $imagePath,
        ]);

        return response()->json([
            'message' => 'Berhasil menambahkan galeri',
            'data'    => $data
        ], 201);
    }

    public function show($id)
    {
        return Galleri::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $galleri = Galleri::findOrFail($id);

        $request->validate([
            'title'       => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image'       => 'nullable|image|mimes:png,jpg,jpeg,webp|max:2048',
        ]);

        // Jika ada foto baru → hapus foto lama
        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($galleri->image);

            $imagePath = $request->file('image')->store('galleri', 'public');

            $galleri->update([
                'image' => $imagePath,
            ]);
        }

        $galleri->update([
            'title'       => $request->title,
            'description' => $request->description,
        ]);

        return response()->json([
            'message' => 'Galeri berhasil diperbarui',
            'data'    => $galleri
        ]);
    }

    public function destroy($id)
    {
        $galleri = Galleri::findOrFail($id);

        // hapus file dari storage
        Storage::disk('public')->delete($galleri->image);

        $galleri->delete();

        return response()->json([
            'message' => 'Galeri berhasil dihapus'
        ]);
    }
}
