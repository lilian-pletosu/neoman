<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;

class SendEmailNotificationAboutNewOrder implements ShouldQueue
{
    /**ds
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
        //
    }
}
