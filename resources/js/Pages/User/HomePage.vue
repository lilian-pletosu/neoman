<script setup>

import FrontLayout from "@/Layouts/FrontLayout.vue";
import CarouselFront from "@/Components/CarouselFront.vue";
import ProductSection from "@/Components/ProductSection.vue";
import {getCurrentInstance, useAttrs} from "vue";
import {useLanguageStore,} from "@/stores/language.js";


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
        <section
            class="bg-gray-900 text-white h-[600px] flex rounded  text-center bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat">
            <div class="flex flex-col mx-4 md:mx-auto my-auto">
                <h1
                    class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                >
                    Neoman

                    <span class="sm:block"> Alături la fiecare etapă în viață </span>
                </h1>
                <div class="mt-8 flex flex-wrap justify-center gap-4">
                    <a
                        class="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                        href="#"
                    >
                        Get Started
                    </a>

                    <a
                        class="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                        href="#"
                    >
                        Learn More
                    </a>
                </div>
            </div>

        </section>
        <product-section :products="sales_products" :title="__('top_products')" :top_products="true"/>
        <product-section :new_products="true" :products="attrs.latest_products" :title="__('latest_products')"/>

    </front-layout>
</template>

