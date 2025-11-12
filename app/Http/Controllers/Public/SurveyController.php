<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\SurveyAnswer;
use App\Models\SurveyQuestion;
use App\Models\SurveySubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SurveyController extends Controller
{
    public function showForm()
    {
        $questions = SurveyQuestion::where('is_active', true)
            ->orderBy('sort_order')->get();

        return Inertia::render('Public/Survey/Fill', compact('questions'));
    }

    public function submit(Request $r)
    {
        $questions = SurveyQuestion::where('is_active', true)->get()->keyBy('id');

        // Build rules dinamis
        $rules = [];
        foreach ($questions as $q) {
            if ($q->type === 'stars') {
                $rules["answers.{$q->id}.value_int"] = [$q->is_required ? 'required' : 'nullable', 'integer', "between:1,{$q->max_stars}"];
            } else {
                $rules["answers.{$q->id}.value_text"] = [$q->is_required ? 'required' : 'nullable', 'string', 'max:2000'];
            }
        }

        $data = $r->validate($rules);

        $sub = SurveySubmission::create([
            'session_id' => (string) Str::uuid(),
            'ip' => $r->ip(),
        ]);

        foreach ($data['answers'] ?? [] as $qid => $ans) {
            SurveyAnswer::create([
                'survey_submission_id' => $sub->id,
                'survey_question_id'   => $qid,
                'value_int'  => $ans['value_int']  ?? null,
                'value_text' => $ans['value_text'] ?? null,
            ]);
        }

        return redirect()
            ->route('homepage.survey.show')
            ->with('ok', 'Terima kasih! Jawaban Anda tersimpan.');
    }
}
