<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SurveyQuestion extends Model
{
    protected $fillable = [
        'prompt',
        'type',
        'is_required',
        'is_active',
        'max_stars',
        'placeholder',
        'sort_order'
    ];

    public function answers()
    {
        return $this->hasMany(SurveyAnswer::class, 'survey_question_id');
    }
}
