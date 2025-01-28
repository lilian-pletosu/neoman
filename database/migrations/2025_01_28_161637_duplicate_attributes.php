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
        // Grupăm atributele duplicate după nume
        $duplicates = DB::table('attribute_translations')
            ->select('name')
            ->groupBy('name')
            ->havingRaw('COUNT(*) > 1')
            ->get();

        foreach ($duplicates as $duplicate) {
            // Găsim toate ID-urile atributelor cu același nume
            $attributeIds = DB::table('attribute_translations')
                ->where('name', $duplicate->name)
                ->pluck('attribute_id');

            // Păstrăm primul ID ca referință principală
            $mainAttributeId = $attributeIds->first();
            $duplicateIds = $attributeIds->except(0);

            // Actualizăm referințele în product_attributes
            DB::table('product_attributes')
                ->whereIn('attribute_id', $duplicateIds)
                ->update(['attribute_id' => $mainAttributeId]);

            // Actualizăm referințele în attribute_values
            DB::table('attribute_values')
                ->whereIn('attribute_id', $duplicateIds)
                ->update(['attribute_id' => $mainAttributeId]);

            // Ștergem traducerile duplicate
            DB::table('attribute_translations')
                ->whereIn('attribute_id', $duplicateIds)
                ->delete();

            // Ștergem atributele duplicate
            DB::table('attributes')
                ->whereIn('id', $duplicateIds)
                ->delete();
        }

        Schema::table('attributes', function (Blueprint $table) {
            $table->dropColumn('category_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
