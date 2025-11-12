<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('survey_questions', function (Blueprint $t) {
            $t->id();
            $t->string('prompt');                 // teks pertanyaan
            $t->enum('type', ['stars', 'text']);   // jenis
            $t->boolean('is_required')->default(true);
            $t->boolean('is_active')->default(true);
            $t->unsignedTinyInteger('max_stars')->default(5); // hanya untuk stars
            $t->string('placeholder')->nullable();            // hanya untuk text
            $t->integer('sort_order')->default(0);
            $t->timestamps();
        });

        Schema::create('survey_submissions', function (Blueprint $t) {
            $t->id();
            $t->uuid('session_id')->unique();     // untuk mengelompokkan 1 kali submit
            $t->string('ip')->nullable();
            $t->timestamps();
        });

        Schema::create('survey_answers', function (Blueprint $t) {
            $t->id();
            $t->foreignId('survey_submission_id')->constrained('survey_submissions')->cascadeOnDelete();
            $t->foreignId('survey_question_id')->constrained('survey_questions')->cascadeOnDelete();
            $t->unsignedTinyInteger('value_int')->nullable(); // utk stars
            $t->text('value_text')->nullable();               // utk text
            $t->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('survey_answers');
        Schema::dropIfExists('survey_submissions');
        Schema::dropIfExists('survey_questions');
    }
};
