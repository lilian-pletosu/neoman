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
     * Handle the event.
     */
    public function handle(object $event): void
    {
        $email = $event->order->email;
        Mail::to($email)->send(new NotifyEmailAboutChangeOrderStatus($event->order));
    }
}
