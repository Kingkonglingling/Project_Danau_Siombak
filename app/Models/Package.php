<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Package extends Model
{
    protected $fillable = ['title', 'slug', 'description', 'image_path', 'whatsapp_number'];

    protected static function booted()
    {
        static::creating(function ($pkg) {
            if (empty($pkg->slug)) $pkg->slug = Str::slug($pkg->title) . '-' . Str::random(5);
            $pkg->whatsapp_number = self::normalizeWa($pkg->whatsapp_number);
        });
        static::updating(function ($pkg) {
            $pkg->whatsapp_number = self::normalizeWa($pkg->whatsapp_number);
        });
    }

    public static function normalizeWa(string $raw = ''): string
    {
        // ambil digit saja; ganti 0 di awal -> 62 (atau ubah sesuai negara)
        $digits = preg_replace('/\D+/', '', $raw);
        if (str_starts_with($digits, '0')) $digits = '62' . substr($digits, 1);
        return $digits;
    }

    public function waLink(string $text = ''): string
    {
        $q = $text ? ('?text=' . urlencode($text)) : '';
        return "https://wa.me/{$this->whatsapp_number}{$q}";
    }
}
