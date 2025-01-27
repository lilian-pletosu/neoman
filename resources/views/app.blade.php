<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="og:title" content="Neoman.md - Alături la fiecare etapă în viață">
    <meta name="description" content="Alături la fiecare etapă în viață. Confortul tău - prioritatea noastră! Catalog complet de produse pentru casă și confort.">
    <meta property="og:url" content="https://neoman.md">
    <meta property="og:type" content="website">
    <meta name="robots" content="index, follow">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="theme-color" content="#ffffff">
    <meta name="author" content="Neoman">
    <meta name="keywords" content="neoman, mobila, casa, confort, catalog produse, moldova">



    <title inertia>{{ config('app.name', 'Neoman') }}</title>


    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet"/>

    <!-- Scripts -->
    @routes
    @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
    @inertiaHead
</head>
<body class="font-sans antialiased">
@inertia
</body>
</html>
