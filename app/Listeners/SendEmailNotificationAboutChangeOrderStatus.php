<?php

namespace App\Listeners;

use App\Mail\NotifyEmailAboutChangeOrderStatus;
use App\Models\Order;
use Illuminate\Support\Facades\Mail;

class SendEmailNotificationAboutChangeOrderStatus
{
    private Order $order;

    /**
     * Create the event listener.
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
    }


    /**
     * Handles the event triggered when an order status changes.
     *
     * @param object $event The event object containing the order details.
     *
     * @return void
     */
    public function handle(object $event): void
    {
        $order = $event->order;

        if (empty($order->email) || !filter_var($order->email, FILTER_VALIDATE_EMAIL)) {
            \Log::warning("Order #{$order->id} nu are email valid. Emailul nu va fi trimis.");
            return;
        }

        Mail::to($order->email)->send(new NotifyEmailAboutChangeOrderStatus($order));
    }

}
