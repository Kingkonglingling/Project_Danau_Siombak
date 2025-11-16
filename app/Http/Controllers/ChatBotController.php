<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatBotController extends Controller
{

    public function ask(Request $request)
    {

        $request->validate([
            'message' =>  'required|string',
        ]);

        $apiKey = env('GEMINI_API_KEY');

        $systemPrompt = "Anda adalah pemandu wisata virtual yang ramah dan informatif tentang Kampung Wisata Mutiara di Medan, Sumatera Utara. Jawab semua pertanyaan wisatawan dalam Bahasa Indonesia, berikan detail spesifik tentang tempat wisata tersebut (sejarah, aktivitas, harga tiket jika ada, jam buka, dll.). Jawablah dengan ringkas dan langsung ke intinya. Jika Anda merujuk pada informasi eksternal (dari search grounding), berikan kutipan sumber di akhir jawaban.";

        $payload = [
            "contents" => [
                [
                    "parts" => [
                        ["text" => $request->message]
                    ]
                ]
            ],
            "systemInstruction" => [
                "parts" => [
                    ["text" => $systemPrompt]
                ]
            ],
            "tools" => [
                ["google_search" => (object)[]]
            ]
        ];

        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={$apiKey}";

        $response = Http::post($url, $payload);

        $json = $response->json();

        $text = $json['candidates'][0]['content']['parts'][0]['text'] ??
            "Maaf, terjadi kesalahan memproses permintaan.";

        return response()->json([
            "reply" => $text
        ]);
    }
}
