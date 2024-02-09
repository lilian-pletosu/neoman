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
        Schema::create('attributes', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('slug');
            $table->foreignId('sub_sub_category_id')->nullable()->constrained('sub_subcategories')->nullOnDelete();
            $table->timestamps();
        });
// -------------------------------------------------------------------------------------------------------------------------------------
        Schema::create('attribute_translations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('attribute_id')->constrained()->cascadeOnDelete();
            $table->string('locale')->index();
            $table->unique(['attribute_id', 'locale']);
        });

// -------------------------------------------------------------------------------------------------------------------------------------
        Schema::create('attribute_values', function (Blueprint $table) {
            $table->id();
            $table->string('value')->nullable();
            $table->string('slug');
            $table->foreignId('attribute_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });

// -------------------------------------------------------------------------------------------------------------------------------------
        Schema::create('attribute_value_translations', function (Blueprint $table) {
            $table->id();
            $table->string('locale')->index();
            $table->foreignId('attribute_value_id')->constrained('attribute_values')->cascadeOnDelete();
            $table->string('value');
            $table->unique(['locale', 'attribute_value_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attribute_value_translations');
        Schema::dropIfExists('attribute_values');
        Schema::dropIfExists('attribute_translations');
        Schema::dropIfExists('attributes');


    }
};
