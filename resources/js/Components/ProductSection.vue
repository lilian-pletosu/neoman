<script setup>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Slide} from 'vue3-carousel'
import {ArrowLeftIcon, ArrowRightIcon, HeartIcon} from "@heroicons/vue/24/outline/index.js";


const props = defineProps({
    products: {
        type: Object,
    },
    title: String,
    sale: {
        type: Boolean,
        default: false,
    },
    salePercents: {
        type: Number,
        default: 0
    }

});
</script>


<template>
    <div class="mb-6 py-12  space-y-10">
        <div class="flex  items-center justify-between px-4 sm:px-6 lg:px-0">
            <div class="flex">
                <h2 class="text-2xl font-bold tracking-tight text-gray-900">{{ title }}</h2>
            </div>
            <div class="flex">
                <arrow-left-icon/>
                <arrow-right-icon/>
            </div>
        </div>
        <carousel :items-to-show="4">
            <slide v-for="(product, index) in products" :key="index">
                <div class="border w-full relative px-2">
                    <div class="">
                        <img :src="asset(product.image)" alt="">

                    </div>
                    <div v-if="sale"
                         class="text-[#A41313] flex items-center absolute border border-[#A41313] rounded-full px-2 py-0.5 shadow-xl bg-[#FFDCDC] left-1.5 top-1.5">
                        <p>-20%</p>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="w-24"><img :src="product.brand.image" :alt="product.brand.name"></div>
                        <div class="rounded-3xl border border-slate-600 p-1">
                            <heart-icon class="w-5  "/>
                        </div>
                    </div>
                    <div class="flex flex-col items-start ">
                        <div class="text-secondary text-left font-semibold">{{ product.name }}</div>
                        <div class="text-sm text-slate-500 line-through">{{ product.price }} MDL
                        </div>
                        <div v-if="sale" class="text-lg text-slate-900 font-bold">{{
                                (product.price - (product.price * 20 / 100)).toFixed(2)
                            }} MDL

                        </div>
                    </div>
                </div>
            </slide>
        </carousel>

    </div>
</template>


