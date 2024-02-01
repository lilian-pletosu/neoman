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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->text('description', 800)->nullable();
            $table->float('price', 8, 2);
            $table->string('product_code');
            $table->string('slug');
            $table->foreignId('brand_id')->constrained('brands');
            $table->foreignId('sub_sub_category_id')->constrained('sub_subcategories');
            $table->timestamps();


            $table->unique(['product_code', 'slug']);
        });

        Schema::create('product_translations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description', 1500);
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
        Schema::dropIfExists('products');
        Schema::dropIfExists('product_translations');
        Schema::dropIfExists('product_specifications');
        Schema::dropIfExists('product_images');
    }
};
