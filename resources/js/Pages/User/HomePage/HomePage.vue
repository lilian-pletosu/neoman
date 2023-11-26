<script setup>

import FrontLayout from "@/Layouts/FrontLayout.vue";
import CarouselFront from "@/Components/CarouselFront.vue";
</script>

<template>
    <front-layout>
        <template v-slot:carousel>
            <carousel-front :images="['/img/slider.png','/img/slider2.png']"/>
        </template>
        <p>Content</p>
    </front-layout>
</template>

