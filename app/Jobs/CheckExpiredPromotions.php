<?php

namespace App\Jobs;

use App\Models\Promotion;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class CheckExpiredPromotions implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct() {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Promotion::where('end_date', '<', now())
            ->where('status', Promotion::STATUS_ACTIVE)
            ->update(['status' => Promotion::STATUS_INACTIVE]);
    }
}
