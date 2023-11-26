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
    <!--    <div-->
    <!--        class="flex items-center  relative transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"-->
    <!--        data-carousel="slide">-->
    <!--        <img :class="{'-translate-x-6' : nextSlide}" class="object-fill -mr-[100%] block w-full "-->
    <!--             :src="images[currentSlideIndex]">-->
    <!--        <div class="flex justify-between w-full  absolute px-4 ">-->
    <!--            <chevron-left-icon class=" w-6 bg-gray-200 cursor-pointer rounded hover:scale-125"-->
    <!--                               @click="changeSlide('back')"/>-->
    <!--            <chevron-right-icon class="w-6 bg-gray-200 cursor-pointer rounded hover:scale-125"-->
    <!--                                @click="changeSlide('next')"/>-->
    <!--        </div>-->
    <!--        <div class="absolute flex justify-center mt-80 z-10  w-full px-4 space-x-3">-->
    <!--            <button v-for="(image, index) in images" type="button"-->
    <!--                    :class="{'bg-sky-400' : currentSlideIndex === index, 'bg-white': currentSlideIndex != index}"-->
    <!--                    class="w-3 h-3 rounded-full border-2 border-white "-->
    <!--                    aria-current="false" aria-label="Slide 1" :key="index" @click="currentSlideIndex = index"/>-->
    <!--        </div>-->
    <!--    </div>-->

    <carousel :autoplay="2000" :wrap-around="true" :items-to-show="1" class="w-full" :transition="500">
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
