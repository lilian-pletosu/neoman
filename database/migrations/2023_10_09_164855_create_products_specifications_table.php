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
        Schema::create('products_specifications', function (Blueprint $table) {
            $table->id();
            $table->string('destination')->nullable();
            $table->string('volume')->nullable();
            $table->string('type')->nullable();
            $table->string('scope_of_use')->nullable();
            $table->string('base')->nullable();
            $table->string('standard_consumption')->nullable();
            $table->string('dimensions')->nullable();
            $table->string('material')->nullable();
            $table->string('noise_level')->nullable();
            $table->string('season')->nullable();
            $table->string('thickness')->nullable();
            $table->string('number_of_tanks')->nullable();
            $table->string('drain_panel')->nullable();
            $table->string('mounting_type')->nullable();
            $table->string('field_of_use')->nullable();
            $table->json('colors')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products_specifications');
    }
};
