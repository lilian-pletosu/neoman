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
        Schema::create('measurement_units', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->timestamps();

        });

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->text('description', 800)->nullable();
            $table->float('price', 8, 2);
            $table->string('product_code');
            $table->string('slug');
            $table->foreignId('brand_id')->nullable()->constrained('brands')->onDelete('set null');
            $table->foreignId('sub_sub_category_id')->nullable()->constrained('sub_subcategories')->onDelete('set null');
            $table->foreignId('measurement_unit_id')->nullable()->constrained('measurement_units')->onDelete('set null');

            $table->timestamps();


            $table->unique(['product_code', 'slug']);
        });

        Schema::create('measurement_unit_translations', function (Blueprint $table) {
            $table->id();
            $table->string('symbol');
            $table->string('locale')->index();
            $table->foreignId('measurement_unit_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create('product_translations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('description', 10000);
            $table->string('locale')->index();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();

            $table->unique(['product_id', 'locale']);
        });


        Schema::create('product_images', function (Blueprint $table) {
            $table->id();
            $table->string('image1')->nullable();
            $table->string('image2')->nullable();
            $table->string('image3')->nullable();
            $table->string('image4')->nullable();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();

            $table->unique(['product_id']);
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('measurement_units');
        Schema::dropIfExists('products');
        Schema::dropIfExists('measurement_unit_translations');
        Schema::dropIfExists('product_translations');
        Schema::dropIfExists('product_specifications');
        Schema::dropIfExists('product_images');
    }
};
