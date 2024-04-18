<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Response;

class InertiaTableServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {

        Response::macro('loadData', function ($package) {

            //add this validation to avoid sorting by not allowed fields & exposing error
            request()->validate([
                'direction' => ['in:asc,desc'],
                'field' => ['in:' . implode(',', $package->resourceColumns)]
            ]);

            return $this
                ->with('resources', $package->run())
                ->with('editInModal', $package->editInModal)
                ->with('filters', $package->filters)
                ->with('columns', $package->resourceColumns)
                ->with('relationColumns', $package->relations)
                ->with('resourceRoute', $package->resourceRoute)
                ->with('searchRoute', $package->searchRoute)
                ->with('formatters', $package->formatters ?? [])
                ->with('columnsOrder', $package->columnsOrder ?? []);

        });
    }
}
