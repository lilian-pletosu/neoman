<?php

namespace App\Services;

use App\Models\MeasurementUnit;
use Illuminate\Support\Str;

class MeasurementUnitService
{
    private $currentLocale;
    private $rereserveLanguage;

    public function __construct()
    {
        $currentLocale = app()->currentLocale();
        $reserveLanguage = $currentLocale == 'ru' ? 'ro' : 'ru';
    }

    public function associateToProduct($data)
    {
        $data['slug'] = array_key_exists('mu', $data) ? Str::slug($data["mu"], '_') : Str::slug('No name', '_');
        $mu = MeasurementUnit::where(['slug' => $data['slug']])->first();
        return $mu;
    }


}
