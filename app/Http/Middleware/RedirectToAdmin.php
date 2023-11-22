<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectToAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if ($request->routeIs('admin')) {
            return redirect()->route('admin.dashboard');
        }
        if (auth()->check()) {
            if ($request->routeIs('login')) {
                return redirect()->intended(RouteServiceProvider::HOME);
            }
        }
        return $next($request);
    }
}
