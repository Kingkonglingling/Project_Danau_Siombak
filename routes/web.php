<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\ChatBotController;
use App\Http\Controllers\CheckInController;
use App\Http\Controllers\ProfileController;

use App\Http\Controllers\HomePageController;
use App\Http\Controllers\Admin\PackageController;

// ===== Tambahan controller untuk fitur e-ticketing =====
use App\Http\Controllers\Public\SurveyController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\MidtransCallbackController;
use App\Http\Controllers\Admin\SurveyAnalyticsController;
use App\Http\Controllers\Admin\SatisfactionQuestionController;
use App\Http\Controllers\Front\PackageController as FrontPackageController;

/*
|--------------------------------------------------------------------------
| ROUTES YANG BUTUH LOGIN (ADMIN)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('package-ticket',        [PackageController::class, 'index'])->name('package.index');
        Route::get('package-ticket/create', [PackageController::class, 'create'])->name('package.create');
        Route::post('package-ticket',       [PackageController::class, 'store'])->name('package.store');
        Route::get('package-ticket/{package}/edit', [PackageController::class, 'edit'])->name('package.edit');
        Route::put('package-ticket/{package}',      [PackageController::class, 'update'])->name('package.update');
        Route::delete('package-ticket/{package}',   [PackageController::class, 'destroy'])->name('package.destroy');

        Route::get('orders',         [AdminOrderController::class, 'index'])->name('orders.index');
        Route::get('orders/create',  [AdminOrderController::class, 'create'])->name('orders.create');
        Route::post('orders',        [AdminOrderController::class, 'store'])->name('orders.store');

        // 🔹 Halaman check-in admin (input / scan kode)
        Route::get('checkin', [CheckInController::class, 'index'])->name('checkin.index');

        Route::get('survey/questions',        [SatisfactionQuestionController::class, 'index'])->name('survey.questions.index');
        Route::get('survey/questions/create', [SatisfactionQuestionController::class, 'create'])->name('survey.questions.create');
        Route::post('survey/questions',       [SatisfactionQuestionController::class, 'store'])->name('survey.questions.store');
        Route::get('survey/questions/{q}/edit', [SatisfactionQuestionController::class, 'edit'])->name('survey.questions.edit');
        Route::put('survey/questions/{q}',    [SatisfactionQuestionController::class, 'update'])->name('survey.questions.update');
        Route::delete('survey/questions/{q}', [SatisfactionQuestionController::class, 'destroy'])->name('survey.questions.destroy');

        Route::get('survey/insights', [SurveyAnalyticsController::class, 'index'])->name('survey.insights');
        Route::get('survey/questions/{question}/answers', [SurveyAnalyticsController::class, 'showQuestion'])->name('survey.questions.answers');
        Route::get('survey/questions/{question}/answers/export', [SurveyAnalyticsController::class, 'exportQuestionCsv'])->name('survey.questions.answers.export');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| PUBLIC (HOMEPAGE, SURVEY, E-TICKETING FRONT)
|--------------------------------------------------------------------------
*/

// homepage
Route::permanentRedirect('/', '/homepage');
Route::get('/homepage', [HomePageController::class, 'index'])->name('homepage');

// survey
Route::prefix('homepage')->name('homepage.')->group(function () {
    Route::get('/survey',  [SurveyController::class, 'showForm'])->name('survey.show');
    Route::post('/survey', [SurveyController::class, 'submit'])->name('survey.submit');
});
Route::permanentRedirect('/survey', '/homepage/survey');

// ===== FRONT E-TICKETING =====
// List paket di website (user lihat paket)
Route::get('/paket', [FrontPackageController::class, 'index'])->name('front.packages.index');

// Detail paket + form pemesanan
Route::get('/paket/{slug}', [FrontPackageController::class, 'show'])->name('front.packages.show');

// Submit pemesanan (online) → buat Order + Snap Midtrans (POST)
Route::post('/orders', [OrderController::class, 'store'])->name('front.orders.store');

// OPTIONAL: biar kalau user iseng GET /orders nggak 405 lagi
Route::get('/orders', function () {
    return redirect()->route('homepage');
});

// Halaman e-ticket (link yang dikirim ke WA) - GET
Route::get('/t/{order_code}', [TicketController::class, 'showTicket'])->name('front.tickets.show');

// ===== MIDTRANS CALLBACK (WEBHOOK DARI SERVER MIDTRANS) =====
Route::post('/midtrans/callback', [MidtransCallbackController::class, 'handle'])->name('midtrans.callback');

// ===== MIDTRANS CONFIRM DARI CLIENT (onSuccess Snap) =====
Route::post('/midtrans/confirm', [MidtransCallbackController::class, 'confirmFromClient'])->name('midtrans.confirm');

// route API check-in kamu ini sudah oke:
Route::post('/api/checkin/{order_code}', [CheckInController::class, 'store'])->name('checkin.store');


// route Chat Bot
Route::post('/chatbot', [ChatBotController::class, 'ask'])->name('ask');

require __DIR__ . '/auth.php';
