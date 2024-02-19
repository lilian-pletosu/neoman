<script setup>

import FrontLayout from "@/Layouts/FrontLayout.vue";
import CarouselFront from "@/Components/CarouselFront.vue";
import ProductSection from "@/Components/ProductSection.vue";


const props = defineProps({
    sales_products: {
        type: Object,
    },

});


</script>

<template>
    <front-layout>
        <template v-slot:carousel>
            <carousel-front :images="['/img/slider.png','/img/slider2.png']"/>
        </template>
        <product-section title="Produse cu reduceri" :products="sales_products" :sale="true" :sale-percents="20"/>
        <product-section title="Produse cu sezoniere"/>
        <carousel-front class="mt-20" :images="['/img/slider.png','/img/slider2.png']"/>
        <product-section title="Produse cu TOP"/>
        <product-section title="Recent adăugate"/>

    </front-layout>
</template>

