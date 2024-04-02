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

    <front-layout :current-language="attrs.current_locale" title="Pagina principală">
        <template v-slot:carousel>
            <carousel-front :images="['/img/slider.png','/img/slider2.png']"/>
        </template>


        <product-section :products="sales_products" :sale="true"
                         :title="__('sales_products')" @addProductInCart="args => addProductIncart(args)"/>
        <product-section :products="sales_products" :seasons_products="true" :title="__('season_products')"/>
        <carousel-front :images="['/img/slider.png','/img/slider2.png']" class="mt-20"/>
        <product-section :products="sales_products" :title="__('top_products')" :top_products="true"/>
        <product-section :new_products="true" :products="attrs.latest_products" :title="__('latest_products')"/>

        <brands-list :brands="attrs.brands"/>
    </front-layout>
</template>

