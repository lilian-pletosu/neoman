<?php

namespace App\Listeners;

use App\Models\Order;
use App\Events\NewOrder;
use App\Enum\OrderTypeEnum;
use App\Mail\NewOrderNotifyEmail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

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
        if ($event->order->type == OrderTypeEnum::FAST_ORDER->value) {
            return;
        } else {
            Log::info('New order', ['order' => $event->order]);
            $email = $event->order->email;
            Mail::to($email)->send(new NewOrderNotifyEmail($event->order));
        }
    }
}
