<script setup>

import FrontLayout from "@/Layouts/FrontLayout.vue";
import ProductSection from "@/Components/ProductSection.vue";
import {useAttrs} from "vue";
import {Link} from "@inertiajs/vue3"

const attrs = useAttrs();
const props = defineProps({
    category: {
        type: Object,
    },
});


</script>

<template>
    <front-layout title="Pagina principală">

        <!--        <breadcrumb :product="product"/>-->
        <hr>
        <!-- component -->
        <section class="bg-white py-6 ">
            <div class="container mx-auto max-w-[1300px] ">
                <h1 class="font-mulish font-bold text-lg md:text-xl lg:text-2xl pb-10 border-b">{{
                        category.name
                    }}</h1>
                <div class="grid grid-cols-1 pt-12 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-28 lg:gap-y-16">
                    <div v-for="subcategory in category.subcategory"
                         class="relative group md:h-48 flex   flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <Link :href="route('subcategory_page', {slug: subcategory.slug})" class="block">
                            <div class="md:h-28">
                                <div
                                    class="md:absolute bg-cover md:-top-20 lg:top-[-10%] md:left-[5%]  md:group-hover:top-[-40%] md:group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 rounded-xl justify-items-center align-middle">
                                    <img :src="subcategory.image"
                                         class=" w-80 h-44 mt-6 m-auto mix-blend-multiply"
                                         :alt="subcategory.name"
                                         :title="subcategory.name"
                                         loading="lazy"
                                         width="200" height="200">
                                </div>
                            </div>
                            <div class="p-6 w-full ">
                                <p
                                    class="mb-2 text-tg text-center w-full  text-xl  font-sans md:hidden md:group-hover:inline-block  font-semibold leading-snug tracking-normal   antialiased">
                                    {{ subcategory.name }}
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        <hr>
        <product-section :title="__('latest_products')" :new_products="true" :products="attrs.latest_products"/>
        <product-section v-if="attrs.last_visited.length !== 0" :title="__('visited_products')" :new_products="true"
                         :products="attrs.last_visited"/>


    </front-layout>
</template>

<style scoped>

</style>
