<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Neoman</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet"/>

    <!-- Styles -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="antialiased max-h-screen bg-cover bg-no-repeat"
      style="background-image: url('https://img1.wsimg.com/isteam/ip/5c158d71-a84f-4738-a3ac-8ae9b4fc768f/gradient-top-A-0002.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1920,m')">

<div class="bg-gradient-to-r m-4">
    <img class="w-40 h-auto" src="{{asset('img/neo_logo_new.png')}}" alt="neoman.md">
</div>
<div class="flex flex-col justify-between">
    <div class="flex justify-center h-96 items-center">
        <h1 class="flex text-black font-normal text-lg md:text-2xl lg:text-7xl">Great things coming soon.</h1>
    </div>
    <div class="flex justify-center"><p>We are a small and growing shop with big ideas.</p></div>
</div>

</body>
</html>


