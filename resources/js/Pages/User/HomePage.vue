<script setup>
import FrontLayout from "@/Layouts/FrontLayout.vue";
import CarouselFront from "@/Components/CarouselFront.vue";
import ProductSection from "@/Components/ProductSection.vue";
import { useAttrs } from "vue";
import { Link } from "@inertiajs/vue3";
import { usePage } from "@inertiajs/vue3";

const page = usePage();

const attrs = useAttrs();

const props = defineProps({
    sales_products: {
        type: Object,
    },
    all_products: {
        type: Object,
    },
    latest_products: {
        type: Object,
    },
});
</script>

<template>
    <front-layout
        :current-language="attrs.current_locale"
        title="Pagina principală"
    >
        <template v-slot:carousel>
            <carousel-front />
        </template>

        <product-section
            :products="sales_products"
            :sale="true"
            :title="__('sales_products')"
            @addProductInCart="(args) => addProductIncart(args)"
        />
        <product-section
            :products="sales_products"
            :seasons_products="true"
            :title="__('season_products')"
        />
        <section class="relative h-[600px] flex rounded text-center">
            <img
                :src="`${page.props.ziggy.url}${page.props.call_action.image}`"
                class="absolute object-cover object-center w-full h-full rounded"
                alt="Neoman background"
            />
            <div class="absolute inset-0 bg-black bg-opacity-50 rounded"></div>
            <div
                class="relative flex flex-col mx-4 my-auto text-white md:mx-auto"
            >
                <h1
                    class="text-3xl font-extrabold text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text sm:text-5xl"
                >
                    Neoman
                    <span class="sm:block">
                        Alături la fiecare etapă în viață
                    </span>
                </h1>
                <div class="flex flex-wrap justify-center gap-4 mt-8">
                    <Link
                        class="block w-full px-12 py-3 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                        href="#"
                    >
                        {{ __("get_started") }}
                    </Link>
                    <Link
                        :href="route('about_page')"
                        class="block w-full px-12 py-3 text-sm font-medium text-white border border-blue-600 rounded hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                    >
                        {{ __("learn_more") }}
                    </Link>
                </div>
            </div>
        </section>

        <product-section
            :products="sales_products"
            :title="__('top_products')"
            :top_products="true"
        />
        <product-section
            v-if="latest_products"
            :new_products="true"
            :products="latest_products"
            :title="__('latest_products')"
        />
    </front-layout>
</template>
