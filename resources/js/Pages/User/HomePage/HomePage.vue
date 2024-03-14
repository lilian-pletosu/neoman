<script setup>

import FrontLayout from "@/Layouts/FrontLayout.vue";
import CarouselFront from "@/Components/CarouselFront.vue";
import ProductSection from "@/Components/ProductSection.vue";
import BrandsList from "@/Components/BrandsList.vue";
import {useAttrs} from "vue";


const attrs = useAttrs()

const props = defineProps({
    sales_products: {
        type: Object,
    },

});


</script>


<template>

    <front-layout title="Pagina principală">
        <template v-slot:carousel>
            <carousel-front :images="['/img/slider.png','/img/slider2.png']"/>
        </template>


        <product-section title="Produse cu reduceri" :products="sales_products" :sale="true" :sale-percents="20"/>

        <hr class="relative w-full">


        <product-section title="Produse cu sezoniere" :products="sales_products"/>
        <carousel-front class="mt-20" :images="['/img/slider.png','/img/slider2.png']"/>
        <product-section title="Produse cu TOP" :products="sales_products"/>
        <product-section title="Recent adăugate" :products="sales_products"/>

        <brands-list :brands="attrs.brands"/>

    </front-layout>
</template>

