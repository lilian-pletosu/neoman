<script setup>
import {Head} from "@inertiajs/vue3";
</script>

<template>
  <Head title="Welcome"/>
  <div class="antialiased max-h-screen bg-cover bg-no-repeat">

    <div class="bg-gradient-to-r m-4">
      <img class="w-40 h-auto" src="img/neo_logo_new.png" alt="neoman.md">
    </div>
    <div class="flex flex-col justify-between">
      <div class="flex justify-center h-96 items-center">
        <h1 class="flex text-black font-normal text-lg md:text-2xl lg:text-7xl">Great things coming soon.</h1>
      </div>
      <div class="flex justify-center"><p>We are a small and growing shop with big ideas.</p></div>
    </div>

  </div>

</template>
<style>
body {
  background-image: url('/img/background_welcome.webp');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

