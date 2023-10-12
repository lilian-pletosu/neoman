<?php

namespace Database\Seeders;

use App\Models\ProductSpecification;
use Illuminate\Database\Seeder;


class ProductSpecificationsSeeder extends Seeder
{
    public function run()
    {
        $data = [
            'colors' => ["silver", "white", "black"]
        ];
        ProductSpecification::create($data);
    }
}
