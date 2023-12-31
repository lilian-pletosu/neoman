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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description', 800);
            $table->float('price', 8,2);
            $table->string('product_code')->unique();
            $table->string('slug')->unique();
            $table->unsignedBigInteger('brand_id');
            $table->unsignedBigInteger('sub_subcategory_id');
            $table->unsignedBigInteger('specifications_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
