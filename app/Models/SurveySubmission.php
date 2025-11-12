<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SurveySubmission extends Model
{
    protected $fillable = ['session_id', 'ip'];

    public function answers()
    {
        return $this->hasMany(SurveyAnswer::class, 'survey_submission_id');
    }
}
