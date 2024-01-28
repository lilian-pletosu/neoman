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
            $table->string('slug')->unique();
            $table->foreignId('sub_sub_category_id')->unsigned();
            $table->timestamps();

            $table->foreign('sub_sub_category_id')->references('id')->on('sub_subcategories')->cascadeOnDelete();
        });
// -------------------------------------------------------------------------------------------------------------------------------------
        Schema::create('attribute_translations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('attribute_id')->unsigned();
            $table->string('locale')->index();

            $table->unique(['attribute_id', 'locale']);
            $table->foreign('attribute_id')->references('id')->on('attributes')->cascadeOnDelete();
        });

// -------------------------------------------------------------------------------------------------------------------------------------
        Schema::create('attribute_values', function (Blueprint $table) {
            $table->id();
            $table->string('value')->nullable();
            $table->string('slug')->unique();
            $table->foreignId('attribute_id')->unsigned();

            $table->foreign('attribute_id')->references('id')->on('attributes')->cascadeOnDelete();
            $table->timestamps();
        });

// -------------------------------------------------------------------------------------------------------------------------------------
        Schema::create('attribute_value_translations', function (Blueprint $table) {
            $table->id();
            $table->string('locale')->index();
            $table->foreignId('attribute_value_id')->unsigned();

            $table->string('value');

            $table->unique(['locale', 'attribute_value_id']);
            $table->foreign('attribute_value_id')->references('id')->on('attribute_values')->cascadeOnDelete();
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
