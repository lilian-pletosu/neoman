<?php

namespace App\Console\Commands;

use App\Models\Promotion;
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
        Promotion::where('end_date', '<', now())
            ->where('status', Promotion::STATUS_ACTIVE)
            ->update(['status' => Promotion::STATUS_INACTIVE]);

        $this->info('Expired promotions have been deactivated');
    }
}
