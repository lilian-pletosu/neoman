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
        'status',
        'order_number'
    ];

    protected $casts = [
        'products' => 'json',
        'status' => StatusEnum::class
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($order) {
            do {
                $orderNumber = mt_rand(10000, 999999);
            } while (Order::where('order_number', $orderNumber)->exists());
            $order->order_number = "#$orderNumber";
        });

//        static::updating(function ($post) {
//            $post->slug = Str::slug($post->title);
//            // add other column as well
//        });

    }
}
