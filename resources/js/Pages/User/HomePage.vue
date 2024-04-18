<script setup>

import FrontLayout from "@/Layouts/FrontLayout.vue";
import CarouselFront from "@/Components/CarouselFront.vue";
import ProductSection from "@/Components/ProductSection.vue";
import {getCurrentInstance, useAttrs} from "vue";
import {useLanguageStore,} from "@/stores/language.js";
import {Carousel, Slide} from "vue3-carousel";


const attrs = useAttrs()
const useLang = useLanguageStore();
const app = getCurrentInstance();

const props = defineProps({
    sales_products: {
        type: Object,
    },
});

</script>


<template>

    <front-layout :current-language="attrs.current_locale" title="Pagina principală">
        <template v-slot:carousel>
            <carousel-front :images="['/img/slider.png','/img/slider2.png']"/>
        </template>

        <product-section :products="sales_products" :sale="true"
                         :title="__('sales_products')" @addProductInCart="args => addProductIncart(args)"/>
        <product-section :products="sales_products" :seasons_products="true" :title="__('season_products')"/>
        <div class="static h-8 2xs:h-20 sm:h-44 lg:h-60 xl:h-72 2xl:h-80 3xl:mb-24 4xl:mb-32">
            <div
                class="bg-slate-100 dark:bg-white overflow-x-auto hide-scrollbar overflow-a absolute w-full left-0    whitespace-no-wrap ">
                <div class="flex space-x-16 ">
                    <carousel :autoplay="5000" :wrap-around="true" :items-to-show="1" class="w-full z-0 "
                              :transition="500">
                        <slide v-for="(slide, index) in app.appContext.config.globalProperties.$page.props.home_banners"
                               :key="index">
                            <img class="object-cover w-full flex"
                                 :src="slide.image" :alt="index">
                        </slide>

                    </carousel>
                </div>
            </div>
        </div>
        <product-section :products="sales_products" :title="__('top_products')" :top_products="true"/>
        <product-section :new_products="true" :products="attrs.latest_products" :title="__('latest_products')"/>

    </front-layout>
</template>

