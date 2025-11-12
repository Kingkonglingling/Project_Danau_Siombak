<?php

use App\Http\Controllers\Admin\PackageController;
use App\Http\Controllers\Admin\SatisfactionQuestionController;
use App\Http\Controllers\Admin\SurveyAnalyticsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\HomePageController;
use App\Http\Controllers\Public\SurveyController;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    // ===== Paket Wisata/Tiketing =====
    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        // path utama: /dashboard/package-ticket
        Route::get('package-ticket',        [PackageController::class, 'index'])->name('package.index');
        Route::get('package-ticket/create', [PackageController::class, 'create'])->name('package.create');
        Route::post('package-ticket',       [PackageController::class, 'store'])->name('package.store');
        Route::get('package-ticket/{package}/edit', [PackageController::class, 'edit'])->name('package.edit');
        Route::put('package-ticket/{package}',      [PackageController::class, 'update'])->name('package.update');
        Route::delete('package-ticket/{package}',   [PackageController::class, 'destroy'])->name('package.destroy');

        // path utama: /dashboard/survey/questions
        Route::get('survey/questions',        [SatisfactionQuestionController::class, 'index'])->name('survey.questions.index');
        Route::get('survey/questions/create', [SatisfactionQuestionController::class, 'create'])->name('survey.questions.create');
        Route::post('survey/questions',       [SatisfactionQuestionController::class, 'store'])->name('survey.questions.store');
        Route::get('survey/questions/{q}/edit', [SatisfactionQuestionController::class, 'edit'])->name('survey.questions.edit');
        Route::put('survey/questions/{q}',    [SatisfactionQuestionController::class, 'update'])->name('survey.questions.update');
        Route::delete('survey/questions/{q}', [SatisfactionQuestionController::class, 'destroy'])->name('survey.questions.destroy');

        // Insights ringkasan semua pertanyaan
        Route::get('survey/insights', [SurveyAnalyticsController::class, 'index'])->name('survey.insights');
        Route::get('survey/questions/{question}/answers', [SurveyAnalyticsController::class, 'showQuestion'])->name('survey.questions.answers');
        Route::get('survey/questions/{question}/answers/export', [SurveyAnalyticsController::class, 'exportQuestionCsv'])->name('survey.questions.answers.export');
    });

    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/* ================== PUBLIC (homepage) ================== */
// Halaman utama homepage
Route::permanentRedirect('/', '/homepage');
Route::get('/homepage', [HomePageController::class, 'index'])->name('homepage');

// Survey dipindah ke /homepage/survey
Route::prefix('homepage')->name('homepage.')->group(function () {
    Route::get('/survey',  [SurveyController::class, 'showForm'])->name('survey.show');
    Route::post('/survey', [SurveyController::class, 'submit'])->name('survey.submit');
});
Route::permanentRedirect('/survey', '/homepage/survey');

require __DIR__ . '/auth.php';
