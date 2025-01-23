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
        Schema::table('terms_translations', function (Blueprint $table) {
            $table->renameColumn('term_id', 'terms_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('terms_translations', function (Blueprint $table) {
            $table->renameColumn('terms_id', 'term_id');
        });
    }
};
