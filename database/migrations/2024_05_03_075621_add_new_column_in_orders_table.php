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
        Schema::table('orders', function (Blueprint $table) {
            $table->enum('type', ['credit', 'installments', 'fast_order', 'simple'])->default('simple')->after('order_number');
            $table->foreignId('credit_id')->after('type')->nullable()->constrained('credits')->nullOnDelete();
            $table->string('full_name')->nullable()->change();
            $table->string('email')->nullable()->change();
            $table->string('city')->nullable()->change();
            $table->string('address')->nullable()->change();

            $table->index(['credit_id', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('type');
            $table->dropIndex(['credit_id', 'type']);
            $table->dropColumn('credit_id');
        });
    }
};
