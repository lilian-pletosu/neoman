<?php

namespace App\Listeners;

use App\Events\NewOrder;
use App\Mail\NewOrderNotifyEmail;
use App\Models\Order;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendEmailNotificationAboutNewOrder implements ShouldQueue
{
    use InteractsWithQueue;

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
    public function handle(NewOrder $event): void
    {
        $email = $event->order->email;
        Mail::to($email)->send(new NewOrderNotifyEmail($event->order));

    }
}
