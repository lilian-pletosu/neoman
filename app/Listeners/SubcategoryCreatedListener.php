<?php

namespace App\Listeners;

use App\Events\NewSubcategory;
use App\Models\SubCategory;
use Illuminate\Support\Facades\Cache;

class SubcategoryCreatedListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(NewSubcategory $event): void
    {
        Cache::remember('subcategories', 10000, function () {
            return SubCategory::orderBy('name')->get();
        });
    }
}
