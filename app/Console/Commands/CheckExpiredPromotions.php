<?php

namespace App\Console\Commands;

use App\Jobs\CheckExpiredPromotions as JobsCheckExpiredPromotions;
use Illuminate\Console\Command;

class CheckExpiredPromotions extends Command
{
    protected $signature = 'promotions:check-expired';
    protected $description = 'Check and deactivate expired promotions';


    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Expired promotions have been activated');
        JobsCheckExpiredPromotions::dispatch();
        $this->info('Expired promotions have been deactivated');
    }
}
