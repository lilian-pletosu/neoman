<script setup>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Slide} from 'vue3-carousel'


const props = defineProps({
    products: {
        type: Object,
    },
    title: String,

});
</script>


<template>
    <div class="mb-6 py-12 space-y-10">
        <div class="flex items-center justify-between px-4 sm:px-6 lg:px-0">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">{{ title }}</h2>
            <a href="#" class="hidden text-sm font-semibold text-blue-600 hover:text-cyan-500 sm:block">
                {{ __('see_all') }}
                <span aria-hidden="true"> &rarr;</span>
            </a>
        </div>
        <carousel :items-to-show="4">
            <slide v-for="product in products" :key="slide">
                <div class="max-w-sm rounded overflow-hidden shadow-lg ">
                    <img class="w-full" :src="asset(product.image)" alt="Card image">
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">{{ product.name }}</div>
                        <p class="text-gray-700 text-base">
                            Card description goes here. Lorem ipsum dolor siteeesssssssssssssssss amet, consectetur
                            adipiscing elit.
                        </p>
                        <div class="mt-4 flex justify-between">
                            <a href="#"
                               class="inline-block px-4 py-2 rounded-full bg-blue-500 text-white font-bold shadow-md hover:bg-blue-700">Button
                                Text</a>
                            <div class="text-gray-500 font-bold">$19.99</div>
                        </div>
                    </div>
                </div>

            </slide>


        </carousel>
    </div>
</template>


