<script setup>

import 'vue3-carousel/dist/carousel.css'
import {Carousel, Navigation, Slide} from 'vue3-carousel'

const props = defineProps({
    images: {
        type: Object,
        required: true
    },
})
</script>

<template>
    <carousel :autoplay="5000" :wrap-around="true" :items-to-show="1" class="w-full" :transition="500">
        <slide v-for="(slide, index) in images" :key="index">
            <img class="object-cover  block w-full flex"
                 :src="slide">
        </slide>
        <template #addons>
            <navigation/>
        </template>
    </carousel>


</template>-

<style scoped>

</style>
