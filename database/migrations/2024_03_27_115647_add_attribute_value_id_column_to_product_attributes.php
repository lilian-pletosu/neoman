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
        Schema::table('product_attributes', function (Blueprint $table) {
            $table->foreignId('attribute_value_id')->nullable()->after('attribute_id')->unsigned()->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_attributes', function (Blueprint $table) {
            $table->dropForeign(['attribute_value_id']);
            $table->dropColumn('attribute_value_id');
        });
    }
};
