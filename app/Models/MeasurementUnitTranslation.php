<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MeasurementUnitTranslation extends Model
{
    use HasFactory;

    protected $table = 'measurement_unit_translations';

    protected $fillable = [
        'symbol',
        'locale'
    ];
}
