<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateAboutSectionRequest;
use App\Models\AboutSection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class AboutSectionController extends Controller
{
    public function edit()
    {
        // cuma 1 data: ambil pertama atau bikin default
        $about = AboutSection::first() ?? AboutSection::create([
            'title' => 'Judul Tentang Kami',
            'content' => 'Isi deskripsi...',
            'location' => 'Alamat lokasi...',
            'image_path' => null,
        ]);

        return Inertia::render('Admin/About/Edit', [
            'about' => [
                'id' => $about->id,
                'title' => $about->title,
                'content' => $about->content,
                'location' => $about->location,
                'image_url' => $about->image_url,
            ],
        ]);
    }

    public function update(UpdateAboutSectionRequest $request)
    {
        $about = AboutSection::firstOrFail();
        $data = $request->validated();

        if ($request->hasFile('image')) {
            // delete old file (if it exists and is in public/)
            if ($about->image_path && File::exists(public_path($about->image_path))) {
                File::delete(public_path($about->image_path));
            }

            $file = $request->file('image');

            $dir = public_path('storage/about');
            if (!File::exists($dir)) {
                File::makeDirectory($dir, 0755, true);
            }

            $filename = 'about-' . now()->format('YmdHis') . '-' . Str::random(6) . '.' . $file->getClientOriginalExtension();

            // move file into public/storage/about/<filename>
            $file->move($dir, $filename);

            // store path in DB as "storage/about/<filename>" so URL works
            $data['image_path'] = 'storage/about/' . $filename;
        }

        $about->update($data);

        return back()->with('success', 'About section updated.');
    }
}
