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
        Schema::create('categories_new', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->integer('level')->default(1);
            $table->string('name')->nullable();
            $table->string('slug');
            $table->text('icon')->nullable();
            $table->integer('order')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['slug', 'level']);
        });

        Schema::create('category_translations_new', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories_new')->onDelete('cascade');
            $table->string('locale');
            $table->string('name');
            $table->text('description')->nullable();
            $table->unique(['category_id', 'locale']);
        });

        // Inițializează hărțile pentru ID-urile vechi și noi
        $categoryMap = [];
        $subcategoryMap = [];
        $subsubcategoryMap = [];

        // Migrare categorii principale
        DB::table('categories')->get()->each(function ($category) use (&$categoryMap) {
            $newId = DB::table('categories_new')->insertGetId([
                'level' => 1,
                'icon' => $category->icon,
                'order' => $category->order,
                'is_active' => $category->is_active,
                'created_at' => $category->created_at,
                'updated_at' => $category->updated_at,
                'name' => null,
                'slug' => $category->slug,
            ]);

            $categoryMap[$category->id] = $newId;

            DB::table('category_translations')->where('category_id', $category->id)
                ->get()->each(function ($translation) use ($newId) {
                    DB::table('category_translations_new')->insert([
                        'category_id' => $newId,
                        'locale' => $translation->locale,
                        'name' => $translation->name,
                    ]);
                });
        });

        // Migrare subcategorii
        DB::table('subcategories')->get()->each(function ($subcategory) use (&$categoryMap, &$subcategoryMap) {
            $newId = DB::table('categories_new')->insertGetId([
                'parent_id' => $categoryMap[$subcategory->category_id] ?? null, // Mapare corectă
                'level' => 2,
                'image' => $subcategory->image,
                'is_active' => $subcategory->is_active,
                'created_at' => $subcategory->created_at,
                'updated_at' => $subcategory->updated_at,
                'name' => null,
                'slug' => $subcategory->slug,
            ]);

            $subcategoryMap[$subcategory->id] = $newId;

            DB::table('subcategory_translations')->where('sub_category_id', $subcategory->id)
                ->get()->each(function ($translation) use ($newId) {
                    DB::table('category_translations_new')->insert([
                        'category_id' => $newId,
                        'locale' => $translation->locale,
                        'name' => $translation->name,
                    ]);
                });
        });

        // Migrare sub-subcategorii
        DB::table('sub_subcategories')->get()->each(function ($subsubcategory) use (&$subcategoryMap, &$subsubcategoryMap) {
            $newId = DB::table('categories_new')->insertGetId([
                'parent_id' => $subcategoryMap[$subsubcategory->subcategory_id] ?? null, // Mapare corectă
                'level' => 3,
                'image' => $subsubcategory->image,
                'is_active' => $subsubcategory->is_active,
                'created_at' => $subsubcategory->created_at,
                'updated_at' => $subsubcategory->updated_at,
                'name' => null,
                'slug' => $subsubcategory->slug,
            ]);

            $subsubcategoryMap[$subsubcategory->id] = $newId;

            DB::table('sub_subcategories_translations')->where('sub_sub_category_id', $subsubcategory->id)
                ->get()->each(function ($translation) use ($newId) {
                    DB::table('category_translations_new')->insert([
                        'category_id' => $newId,
                        'locale' => $translation->locale,
                        'name' => $translation->name,
                    ]);
                });
        });

        // Dezactivăm verificarea cheilor străine
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        // Actualizăm produsele cu noile ID-uri
        DB::table('products')->get()->each(function ($product) use ($subsubcategoryMap) {
            if (isset($subsubcategoryMap[$product->sub_sub_category_id])) {
                DB::table('products')
                    ->where('id', $product->id)
                    ->update(['sub_sub_category_id' => $subsubcategoryMap[$product->sub_sub_category_id]]);
            }
        });
        DB::table('imported_products')->get()->each(function ($product) use ($subsubcategoryMap) {
            if (isset($subsubcategoryMap[$product->sub_sub_category_id])) {
                DB::table('imported_products')
                    ->where('id', $product->id)
                    ->update(['sub_sub_category_id' => $subsubcategoryMap[$product->sub_sub_category_id]]);
            }
        });


        // Șterge tabelele vechi
        Schema::drop('sub_subcategories_translations');
        Schema::drop('subcategory_translations');
        Schema::drop('category_translations');
        Schema::drop('sub_subcategories');
        Schema::drop('subcategories');
        Schema::drop('categories');

        // Redenumește noile tabele
        Schema::rename('categories_new', 'categories');
        Schema::rename('category_translations_new', 'category_translations');

        // Re-activează verificările de chei străine
        DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }


    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::drop('category_translations');
        Schema::drop('categories');
    }
};
