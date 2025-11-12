<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SurveyAnswer extends Model
{
    protected $fillable = ['survey_submission_id', 'survey_question_id', 'value_int', 'value_text'];


    public function question()
    {
        return $this->belongsTo(SurveyQuestion::class, 'survey_question_id');
    }

    public function submission()
    {
        return $this->belongsTo(SurveySubmission::class, 'survey_submission_id');
    }
}
