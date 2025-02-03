<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use App\Imports\ProductsImport;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class ExcelImportProductsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $timeout = 3600; // 1 hour in seconds

    protected string $fileName;

    public function __construct(string $fileName)
    {
        $this->fileName = $fileName;
    }

    public function handle()
    {
        (new ProductsImport($this->fileName))($this->fileName);
    }
}
