<?php

namespace App\Providers;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Blade::directive('tr', function ($expression) {
            return "<?php echo __($expression); ?>";
        });
        /** Force https for secure connections generated by functions: url() and route() **/
        if (in_array(env('APP_ENV'), ['stg', 'production'])) {
            URL::forceScheme('https');

            //this setting was forcing to https the links generated by the paginator; otherwise not changed by forceScheme
            $this->app['request']->server->set('HTTPS', 'on');
        }
    }
}
