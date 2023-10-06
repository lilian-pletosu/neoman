<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Session::get('locale') != null) {
            App::setLocale(Session::get('locale'));
//            dump(\session()->get('locale'));
        } else{
            Session::put('locale', 'ro');
            App::setLocale(Session::get('locale'));
        }



        return $next($request);
    }

}
