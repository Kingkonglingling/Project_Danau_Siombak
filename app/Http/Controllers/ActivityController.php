<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;

class ActivityController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Activity/Index', [
            'activities' => Activity::latest()->paginate(12)
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Activity/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'date'        => 'nullable|date',
            'image'       => 'required|image|mimes:png,jpg,jpeg,webp|max:5120',
        ]);

        $path = $request->file('image')->store('activities', 'public');

        Activity::create([
            'title'       => $request->title,
            'description' => $request->description,
            'date'        => $request->date,
            'image'       => $path,
        ]);

        return back(303)->with('success', 'Aktivitas berhasil ditambahkan!');
    }

    public function edit(Activity $activity)
    {
        return Inertia::render('Admin/Activity/Edit', [
            'activity' => $activity->append('image_url')
        ]);
    }

    public function update(Request $request, Activity $activity)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'date'        => 'nullable|date',
            'image'       => 'nullable|image|mimes:png,jpg,jpeg,webp|max:5120',
        ]);

        $data = $request->only(['title', 'description', 'date']);

        if ($request->hasFile('image')) {
            if ($activity->image) {
                Storage::disk('public')->delete($activity->image);
            }
            $data['image'] = $request->file('image')->store('activities', 'public');
        }

        $activity->update($data);

        return back(303)->with('success', 'Aktivitas berhasil diperbarui!');
    }

    public function destroy(Activity $activity)
    {
        if ($activity->image) {
            Storage::disk('public')->delete($activity->image);
        }
        $activity->delete();

        return back(303)->with('success', 'Aktivitas berhasil dihapus');
    }
}
