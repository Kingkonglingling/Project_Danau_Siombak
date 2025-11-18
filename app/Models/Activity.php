<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Activity extends Model
{
    protected $tabel = 'activities';
    protected $fillable = ['title', 'description', 'image', 'date'];
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return $this->image ? Storage::url($this->image) : null;
    }

    public function getFormattedDateAttribute()
    {
        return $this->date?->isoFormat('D MMMM YYYY') ?? '-';
    }

    protected $casts = [
        'date' => 'date',   
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    
}
    