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
        Schema::create('terms', function (Blueprint $table) {
            $table->id();
            $table->text('title')->nullable();
            $table->text('content')->nullable();
            $table->string('slug')->unique();
            $table->timestamps();
        });
        Schema::create('terms_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('terms_id')->constrained()->onDelete('cascade');
            $table->string('locale')->index();
            $table->text('title');
            $table->text('content');
            $table->unique(['terms_id', 'locale']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('terms');
        Schema::dropIfExists('terms_translations');
        Schema::enableForeignKeyConstraints();
    }
};
