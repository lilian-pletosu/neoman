<?php

namespace App\Console\Commands;

use App\Jobs\SeedInDatabaseUltraProducts;
use Illuminate\Console\Command;

class RunSeed extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:run-seed';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            SeedInDatabaseUltraProducts::dispatch();
            $this->info('Ultra products have been seeded in the database');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }
}
