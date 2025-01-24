<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Meintenance
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if (env('MEINTENANCE_MODE') == true) {
            if ($request->routeIs('meintenance') || $request->routeIs('admin.*')) {
                return $next($request);
            }
            return redirect()->route('meintenance');
        }

        return $next($request);
    }
}
