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
        Schema::create('privacy', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->text('content')->nullable();
            $table->string('slug')->unique();
            $table->timestamps();
        });
        Schema::create('privacy_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('privacy_id')->constrained()->on('privacy')->cascadeOnDelete();
            $table->string('locale')->index();
            $table->string('title');
            $table->text('content');
            $table->unique(['privacy_id', 'locale']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        Schema::dropIfExists('privacy_translations');
        Schema::dropIfExists('privacy');


    }
};
