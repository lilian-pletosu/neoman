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
        Schema::create('sub_subcategories_translations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('sub_sub_category_id')->unsigned();
            $table->string('locale')->index();

            $table->unique(['sub_sub_category_id', 'locale']);
            $table->foreign('sub_sub_category_id')->references('id')->on('sub_subcategories')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_subcategories_translations');
    }
};
