<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Gallery extends Model
{
    protected $table = 'galleries'; // penting jika pakai nama non-standar
    protected $fillable = ['title', 'description', 'image'];
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return $this->image ? Storage::url($this->image) : null;
    }
}