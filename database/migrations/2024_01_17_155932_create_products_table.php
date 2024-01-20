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
            $table->foreignId('brand_id')->unsigned();
            $table->foreignId('sub_sub_category_id')->unsigned();
            $table->timestamps();


            $table->unique(['product_code', 'slug']);
            $table->foreign('brand_id')->references('id')->on('brands');
            $table->foreign('sub_sub_category_id')->references('id')->on('sub_subcategories');
        });

        Schema::create('product_translations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('locale')->index();
            $table->foreignId('product_id')->unsigned();

            $table->unique(['product_id', 'locale']);
            $table->foreign('product_id')->references('id')->on('products')->cascadeOnDelete();
        });


        Schema::create('product_specifications', function (Blueprint $table) {
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
        });

        Schema::create('product_images', function (Blueprint $table) {
            $table->id();
            $table->string('image1');
            $table->string('image2');
            $table->string('image3');
            $table->string('image4');
            $table->foreignId('product_id')->unsigned();

            $table->unique(['product_id']);
            $table->foreign('product_id')->references('id')->on('products')->cascadeOnDelete();
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
