<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Response;

class InertiaTableServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Response::macro('loadData', function($package) {

            //add this validation to avoid sorting by not allowed fields & exposing error
            request()->validate([
                'direction' => ['in:asc,desc'],
                'field' => ['in:' . implode(',', $package->resourceColumns)]
            ]);

            return $this
                ->with('resources', $package->run())
                ->with('filters', $package->filters)
                ->with('columns', $package->resourceColumns)
                ->with('relationColumns', $package->relations)
                ->with('resourceRoute', $package->resourceRoute)
                ->with('searchRoute', $package->searchRoute)
                ->with('formatters', $package->formatters??[])
                ->with('columnsOrder', $package->columnsOrder??[]);

        });
    }
}
