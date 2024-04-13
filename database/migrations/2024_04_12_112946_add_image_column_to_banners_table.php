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
        Schema::table('banners', function (Blueprint $table) {
            $table->string('image')->nullable();
            $table->string('link')->nullable();
            $table->string('title')->nullable();
            $table->boolean('is_active')->default(true);
            $table->string('page')->default('home');

            $table->index('is_active');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('banners', function (Blueprint $table) {
            $table->dropColumn('image');
            $table->dropColumn('link');
            $table->dropColumn('title');
            $table->dropColumn('is_active');
            $table->dropColumn('page');
        });
    }
};
