<?php

namespace App\Console;

use App\Jobs\SeedInDatabaseUltraProducts;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command('queue:work --tries=3 --timeout=10000')->dailyAt('23:58');
        $schedule->command('run:import-ultra')->dailyAt('00:00');
        $schedule->job(new SeedInDatabaseUltraProducts())->dailyAt('02:30');

    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
