<?php

use App\Http\Controllers\Admin\PackageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\HomePageController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

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
    });

    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('/homepage', [HomePageController::class, 'index'])->name('homepage');

require __DIR__ . '/auth.php';
