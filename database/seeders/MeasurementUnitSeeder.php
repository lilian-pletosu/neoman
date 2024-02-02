<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MeasurementUnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $measurementUnits = [
            ['slug' => 'bucata', 'symbol' => ['ro' => 'Buc', 'ru' => 'Шт']],
            ['slug' => 'kilogram', 'symbol' => ['ro' => 'Kg', 'ru' => 'Кг']],
            ['slug' => 'metru', 'symbol' => ['ro' => 'M', 'ru' => 'M']],
            ['slug' => 'litru', 'symbol' => ['ro' => 'L', 'ru' => 'Л']],
            ['slug' => 'm2', 'symbol' => ['ro' => 'M2', 'ru' => 'М2']],
            ['slug' => 'ml', 'symbol' => ['ro' => 'M.L', 'ru' => 'М.П.']],
            ['slug' => 'placa', 'symbol' => ['ro' => 'Placă', 'ru' => 'Лист']],
            // Adăugați mai multe unități de măsură după nevoie
        ];
        foreach ($measurementUnits as $unit) {
            $measurementUnitId = DB::table('measurement_units')->insertGetId([
                'slug' => $unit['slug'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($unit['symbol'] as $locale => $symbol) {
                DB::table('measurement_unit_translations')->insert([
                    'symbol' => $symbol,
                    'locale' => $locale,
                    'measurement_unit_id' => $measurementUnitId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
