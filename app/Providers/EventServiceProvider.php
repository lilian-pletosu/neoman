<?php

namespace App\Providers;

use App\Events\NewOrder;
use App\Events\NewSubcategory;
use App\Events\OrderStatusUpdated;
use App\Listeners\SendEmailNotificationAboutChangeOrderStatus;
use App\Listeners\SendEmailNotificationAboutNewOrder;
use App\Listeners\SubcategoryCreatedListener;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        NewOrder::class => [
            SendEmailNotificationAboutNewOrder::class,
        ],
        OrderStatusUpdated::class => [
            SendEmailNotificationAboutChangeOrderStatus::class,
        ],
        NewSubcategory::class => [
            SubcategoryCreatedListener::class,
        ],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
