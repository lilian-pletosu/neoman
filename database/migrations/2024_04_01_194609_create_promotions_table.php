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
        Schema::create('promotions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('discount');
            $table->enum('status', ['active', 'inactive']);
            $table->timestamps();
        });
        // În migration pentru promotion_product
        Schema::create('promotion_product', function (Blueprint $table) {
            $table->id();
            $table->foreignId('promotion_id')->constrained();
            $table->foreignId('product_id')->constrained();
            $table->timestamps();
        });

// În migration pentru promotion_brand
        Schema::create('promotion_brand', function (Blueprint $table) {
            $table->id();
            $table->foreignId('promotion_id')->constrained();
            $table->foreignId('brand_id')->constrained();
            $table->timestamps();
        });

// În migration pentru promotion_subsubcategory
        Schema::create('promotion_sub_sub_category', function (Blueprint $table) {
            $table->id();
            $table->foreignId('promotion_id')->constrained();
            $table->foreignId('sub_subcategory_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotions');
        Schema::dropIfExists('promotion_product');
        Schema::dropIfExists('promotion_brand');
        Schema::dropIfExists('promotion_sub_sub_category');

    }
};
