<?php

namespace App\Models;

use App\Enum\StatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'products',
        'total_price',
        'status'
    ];

    protected $casts = [
        'products' => 'json',
        'status' => StatusEnum::class
    ];
}
