<script setup>

import FrontLayout from "@/Layouts/FrontLayout.vue";
import CarouselFront from "@/Components/CarouselFront.vue";
import ProductSection from "@/Components/ProductSection.vue";
import BrandsList from "@/Components/BrandsList.vue";
import {useAttrs} from "vue";
import {useLanguageStore} from "@/stores/language.js";


const attrs = useAttrs()
const useLang = useLanguageStore();

const props = defineProps({
    sales_products: {
        type: Object,
    },

});


</script>


<template>

    <front-layout title="Pagina principală" :current-language="attrs.current_locale">
        <template v-slot:carousel>
            <carousel-front :images="['/img/slider.png','/img/slider2.png']"/>
        </template>


        <product-section :title="__('sales_products')" :products="sales_products" :sale="true" :sale-percents="20"/>

        <product-section :title="__('season_products')" :seasons_products="true" :products="sales_products"/>
        <carousel-front class="mt-20" :images="['/img/slider.png','/img/slider2.png']"/>
        <product-section :title="__('top_products')" :top_products="true" :products="sales_products"/>
        <product-section :title="__('latest_products')" :new_products="true" :products="attrs.latest_products"/>

        <brands-list :brands="attrs.brands"/>
    </front-layout>
</template>

