<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BrandsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i <= 10; $i++) {
            DB::table('brands')->insert([
                'name' => fake()->jobTitle,
                'slug' => fake()->slug,
                'website' => fake()->url,
                'description' => fake()->sentence,
                'position' => fake()->numberBetween(),
                'is_enabled' => fake()->boolean,
                'seo_title' => fake()->title,
                'seo_description' => fake()->sentence,
                'image' => fake()->image,
            ]);
        }
    }
}
