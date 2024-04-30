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
        Schema::table('categories', function (Blueprint $table) {
            $table->boolean('is_active')->default(true)->after('icon');
        });
        Schema::table('subcategories', function (Blueprint $table) {
            $table->boolean('is_active')->default(true)->after('image');
        });
        Schema::table('sub_subcategories', function (Blueprint $table) {
            $table->boolean('is_active')->default(true)->after('image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });
        Schema::table('subcategories', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });
        Schema::table('sub_subcategories', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });
    }
};
