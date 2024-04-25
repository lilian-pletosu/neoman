<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('about', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->timestamps();
        });
        Schema::create('about_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('about_id')->constrained()->on('about')->onDelete('cascade');
            $table->string('locale')->index();
            $table->string('title');
            $table->text('content');
            $table->unique(['about_id', 'locale']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about');
        Schema::dropIfExists('about_translations');
    }
};
