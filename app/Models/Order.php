<?php

namespace App\Models;

use App\Enum\StatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Order extends Model
{
    use HasFactory;
    use Notifiable;


    protected $table = 'orders';

    protected $fillable = [
        'full_name',
        'phone',
        'email',
        'city',
        'address',
        'message',
        'products',
        'total_price',
        'delivery_price',
        'status',
        'order_number',
        'type',
        'credit_id'
    ];

    protected $casts = [
        'products' => 'json',
        'status' => StatusEnum::class
    ];
    /**
     * The $dispatchesEvents property is an array that maps Eloquent event names to their corresponding event classes.
     * Eloquent events are dispatched when certain actions are performed on the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        /**
         * The 'created' event is dispatched when a new model is saved for the first time using the `save` method or the `create` method.
         * The \App\Events\NewOrder::class event class is dispatched for this event.
         */
        'created' => \App\Events\NewOrder::class,

        /**
         * The 'updated' event is dispatched when an existing model is saved using the `save` method.
         * This event is only dispatched if at least one of the model's attributes has been changed.
         * The \App\Events\OrderStatusUpdated::class event class is dispatched for this event.
         */
//        'updated' => \App\Events\OrderStatusUpdated::class,

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

        static::updating(function ($order) {
            if ($order->isDirty('status')) {
                event(new \App\Events\OrderStatusUpdated($order));
            }
        });

    }


    public function credit()
    {
        return $this->belongsTo(Credit::class, 'credit_id', 'id');
    }
}
