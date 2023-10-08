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
        Schema::create('brands', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('website')->nullable();
            $table->text('description')->nullable();
            $table->string('position')->default(0);
            $table->boolean('is_enabled')->default(false);
            $table->string('seo_title', 60)->nullable();
            $table->string('seo_description', 160)->nullable();
            $table->string('image');
            $table->timestamps();
        });

        \Illuminate\Support\Facades\Artisan::call('db:seed', ['--class' => \Database\Seeders\BrandsSeeder::class]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('brands');
    }
};
