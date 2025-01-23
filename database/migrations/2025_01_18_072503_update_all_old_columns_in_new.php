<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        // Drop foreign key constraints first
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign('products_sub_sub_category_id_foreign');
        });

        // Update products table
        Schema::table('products', function (Blueprint $table) {
            // Add new column
            $table->unsignedBigInteger('category_id')->nullable()->after('sub_sub_category_id');
        });

        // Transfer data
        DB::table('products')->whereNotNull('sub_sub_category_id')->update([
            'category_id' => DB::raw('sub_sub_category_id')
        ]);


        // Drop old columns
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('sub_sub_category_id');
        });


        Schema::table('imported_products', function (Blueprint $table) {
            $table->dropForeign('imported_products_sub_sub_category_id_foreign');
        });
        Schema::table('attributes', function (Blueprint $table) {
            $table->dropForeign('attributes_sub_sub_category_id_foreign');
        });

        Schema::table('imported_products', function (Blueprint $table) {
            // Drop old columns
            $table->unsignedBigInteger('category_id')->nullable()->after('sub_sub_category_id');
        });
        Schema::table('attributes', function (Blueprint $table) {
            $table->unsignedBigInteger('category_id')->nullable()->after('sub_sub_category_id');
        });


        // Transfer data
        DB::table('attributes')->whereNotNull('sub_sub_category_id')->update([
            'category_id' => DB::raw('sub_sub_category_id')
        ]);
        DB::table('imported_products')->whereNotNull('sub_sub_category_id')->update([
            'category_id' => DB::raw('sub_sub_category_id')
        ]);

        Schema::table('imported_products', function (Blueprint $table) {
            $table->dropColumn('sub_sub_category_id');
        });

        Schema::table('attributes', function (Blueprint $table) {
            $table->dropColumn('sub_sub_category_id');
        });

        //Drop table
        Schema::dropIfExists('promotion_sub_category');
        Schema::dropIfExists('promotion_sub_sub_category');
        //

        DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('new', function (Blueprint $table) {
            //
        });
    }
};
