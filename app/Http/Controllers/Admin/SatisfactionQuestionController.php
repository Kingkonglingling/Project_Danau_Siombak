<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SurveyQuestion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SatisfactionQuestionController extends Controller
{
    public function index()
    {
        $questions = SurveyQuestion::orderBy('sort_order')->get();
        return Inertia::render('Admin/Survey/Questions/Index', compact('questions'));
    }

    public function create()
    {
        return Inertia::render('Admin/Survey/Questions/Form');
    }

    public function store(Request $r)
    {
        $data = $r->validate([
            'prompt'      => ['required', 'string', 'max:255'],
            'type'        => ['required', 'in:stars,text'],
            'is_required' => ['boolean'],
            'is_active'   => ['boolean'],
            'sort_order'  => ['nullable', 'integer'],
            'max_stars'   => ['nullable', 'integer', 'between:3,10'],
            'placeholder' => ['nullable', 'string', 'max:255'],
        ]);

        if ($data['type'] === 'stars' && empty($data['max_stars'])) $data['max_stars'] = 5;
        if ($data['type'] === 'text') {
            $data['max_stars'] = 5;
        } // default aman

        SurveyQuestion::create($data);
        return redirect()->route('dashboard.survey.questions.index')->with('ok', 'Pertanyaan dibuat.');
    }

    public function edit(SurveyQuestion $q)
    {
        return Inertia::render('Admin/Survey/Questions/Form', ['question' => $q]);
    }

    public function update(Request $r, SurveyQuestion $q)
    {
        $data = $r->validate([
            'prompt'      => ['required', 'string', 'max:255'],
            'type'        => ['required', 'in:stars,text'],
            'is_required' => ['boolean'],
            'is_active'   => ['boolean'],
            'sort_order'  => ['nullable', 'integer'],
            'max_stars'   => ['nullable', 'integer', 'between:3,10'],
            'placeholder' => ['nullable', 'string', 'max:255'],
        ]);
        $q->update($data);
        return redirect()->route('dashboard.survey.questions.index')->with('ok', 'Pertanyaan diupdate.');
    }

    public function destroy(SurveyQuestion $q)
    {
        $q->delete();
        return back()->with('ok', 'Pertanyaan dihapus.');
    }
}
