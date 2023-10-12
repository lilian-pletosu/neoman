<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSpecification extends Model
{
    use HasFactory;

    protected $table = 'products_specifications';
    protected $fillable = [
        'destination',
        'volume',
        'type',
        'scope_of_use',
        'base',
        'standard_consumption',
        'dimensions',
        'material',
        'noise_level',
        'season',
        'thickness',
        'number_of_tanks',
        'drain_panel',
        'mounting_type',
        'field_of_use',
        'colors',
    ];

    protected $casts = [
        'colors' => 'array'
    ];
}
