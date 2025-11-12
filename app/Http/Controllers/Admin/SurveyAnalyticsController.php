<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SurveyAnswer;
use App\Models\SurveyQuestion;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SurveyAnalyticsController extends Controller
{
    // Ringkasan semua pertanyaan
    public function index(Request $request)
    {
        $from = $request->date_from; // optional: '2025-11-01'
        $to   = $request->date_to;   // optional: '2025-11-12'
        $type = $request->type;      // 'stars' | 'text' | null

        $questions = SurveyQuestion::orderBy('sort_order')->get();

        // ambil stats per pertanyaan
        $stats = SurveyAnswer::when($from, fn($q) => $q->whereDate('created_at', '>=', $from))
            ->when($to, fn($q) => $q->whereDate('created_at', '<=', $to))
            ->select([
                'survey_question_id',
                DB::raw('COUNT(*) as total'),
                DB::raw('AVG(value_int) as avg_stars'),
                DB::raw('SUM(CASE WHEN value_int=1 THEN 1 ELSE 0 END) as s1'),
                DB::raw('SUM(CASE WHEN value_int=2 THEN 1 ELSE 0 END) as s2'),
                DB::raw('SUM(CASE WHEN value_int=3 THEN 1 ELSE 0 END) as s3'),
                DB::raw('SUM(CASE WHEN value_int=4 THEN 1 ELSE 0 END) as s4'),
                DB::raw('SUM(CASE WHEN value_int=5 THEN 1 ELSE 0 END) as s5'),
            ])
            ->groupBy('survey_question_id')
            ->get()
            ->keyBy('survey_question_id');

        // Ambil sampel 3 text terbaru per pertanyaan (buat preview)
        $latestText = SurveyAnswer::with('question:id')
            ->when($from, fn($q) => $q->whereDate('created_at', '>=', $from))
            ->when($to, fn($q) => $q->whereDate('created_at', '<=', $to))
            ->whereNotNull('value_text')
            ->orderByDesc('id')
            ->get()
            ->groupBy('survey_question_id')
            ->map(fn($g) => $g->take(3)->map(fn($a) => [
                'id' => $a->id,
                'value_text' => $a->value_text,
                'created_at' => $a->created_at
            ])->values());

        // filter type di frontend gampang; tapi kalau mau server-side:
        if ($type) {
            $questions = $questions->where('type', $type)->values();
        }

        return Inertia::render('Admin/Survey/Insights/Index', [
            'filters'   => ['date_from' => $from, 'date_to' => $to, 'type' => $type],
            'questions' => $questions,
            'stats'     => $stats,
            'latestText' => $latestText,
        ]);
    }

    // Detail per-pertanyaan: list jawaban + distribusi + pagination + search
    public function showQuestion(Request $request, SurveyQuestion $question)
    {
        $from = $request->date_from;
        $to   = $request->date_to;
        $q    = $request->q; // keyword untuk text

        // distribusi stars
        $dist = SurveyAnswer::where('survey_question_id', $question->id)
            ->when($from, fn($w) => $w->whereDate('created_at', '>=', $from))
            ->when($to, fn($w) => $w->whereDate('created_at', '<=', $to))
            ->select([
                DB::raw('SUM(CASE WHEN value_int=1 THEN 1 ELSE 0 END) as s1'),
                DB::raw('SUM(CASE WHEN value_int=2 THEN 1 ELSE 0 END) as s2'),
                DB::raw('SUM(CASE WHEN value_int=3 THEN 1 ELSE 0 END) as s3'),
                DB::raw('SUM(CASE WHEN value_int=4 THEN 1 ELSE 0 END) as s4'),
                DB::raw('SUM(CASE WHEN value_int=5 THEN 1 ELSE 0 END) as s5'),
                DB::raw('COUNT(*) as total'),
                DB::raw('AVG(value_int) as avg'),
            ])->first();

        // daftar jawaban
        $answers = SurveyAnswer::with('submission:id,session_id,ip')
            ->where('survey_question_id', $question->id)
            ->when($from, fn($w) => $w->whereDate('created_at', '>=', $from))
            ->when($to, fn($w) => $w->whereDate('created_at', '<=', $to))
            ->when($q && $question->type === 'text', fn($w) => $w->where('value_text', 'like', '%' . $q . '%'))
            ->orderByDesc('id')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Admin/Survey/Insights/QuestionAnswers', [
            'question' => $question,
            'filters'  => ['date_from' => $from, 'date_to' => $to, 'q' => $q],
            'dist'     => $dist,
            'answers'  => $answers,
        ]);
    }

    // Export CSV jawaban per-pertanyaan
    public function exportQuestionCsv(Request $request, SurveyQuestion $question): StreamedResponse
    {
        $filename = 'survey_answers_q' . $question->id . '.csv';
        $from = $request->date_from;
        $to   = $request->date_to;

        $stream = function () use ($question, $from, $to) {
            $out = fopen('php://output', 'w');
            fputcsv($out, ['answer_id', 'question_id', 'type', 'value_int', 'value_text', 'submission_id', 'ip', 'created_at']);

            SurveyAnswer::with('submission:id,ip')
                ->where('survey_question_id', $question->id)
                ->when($from, fn($w) => $w->whereDate('created_at', '>=', $from))
                ->when($to, fn($w) => $w->whereDate('created_at', '<=', $to))
                ->orderBy('id')
                ->chunk(500, function ($rows) use ($out, $question) {
                    foreach ($rows as $r) {
                        fputcsv($out, [
                            $r->id,
                            $question->id,
                            $question->type,
                            $r->value_int,
                            $r->value_text,
                            $r->survey_submission_id,
                            optional($r->submission)->ip,
                            $r->created_at,
                        ]);
                    }
                });

            fclose($out);
        };

        return response()->streamDownload($stream, $filename, [
            'Content-Type' => 'text/csv',
        ]);
    }
}
