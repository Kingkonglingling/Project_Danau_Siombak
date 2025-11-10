<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

use Illuminate\Http\Request;

class HomePageController extends Controller
{
    public function index()
    {
        return Inertia::render('HomePage', [
            'nama' => 'Pengguna Inertia',
        ]);
    }
}
