<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PackageReview extends Model
{
    protected $fillable = [
        'package_id',
        'order_id',
        'rating',
        'comment',
        'reviewer_name',
    ];

    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
