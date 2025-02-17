<script setup>
import FrontLayout from "@/Layouts/FrontLayout.vue";
import ProductSection from "@/Components/ProductSection.vue";
import { useAttrs } from "vue";
import { Link } from "@inertiajs/vue3";
import Breadcrumb from "@/Components/Breadcrumb.vue";

const attrs = useAttrs();
const props = defineProps({
    category: {
        type: Object,
    },
});
const steps = [{
    category: {
        name: props.category.name,
        url: route('category_page', {
            slug: props.category?.slug,
        }),
        type: "category",
        icon: "fa-solid fa-folder",
    },

}];
</script>

<template>
    <front-layout :title="category.name"
        :meta-description="`Cumpără ${category.name} la cele mai bune prețuri pe Neoman.md. Livrare rapidă în toată Moldova, garanție și calitate garantată.`"
        :meta-keywords="`${category.name}, ${category.name} moldova, ${category.name} chisinau, cumpara ${category.name}, pret ${category.name}, ${category.name} online`"
        :current-url="route('category_page', category.slug)" :current-language="$page.props.locale">
        <Breadcrumb :steps="steps" />
        <hr />
        <!-- component -->
        <section class="py-6 bg-white">
            <div class="container mx-auto max-w-[1300px]">
                <h1 class="pb-10 text-lg font-bold border-b font-mulish md:text-xl lg:text-2xl">
                    {{ category.name }}
                </h1>
                <div class="grid grid-cols-1 pt-12 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-28 lg:gap-y-16">
                    <div v-for="subcategory in category.children"
                        class="relative flex flex-col text-gray-700 bg-white shadow-md group md:h-48 rounded-xl bg-clip-border">
                        <Link :href="route('subcategory_page', {
                            slug: subcategory.slug,
                        })
                            " class="block">
                        <div class="md:h-28">
                            <div
                                class="md:absolute bg-cover md:-top-20 lg:top-[-10%] md:left-[5%] md:group-hover:top-[-40%] md:group-hover:opacity-[0.9] duration-300 w-[90%] h-48 rounded-xl justify-items-center align-middle">
                                <img :src="subcategory.image" class="m-auto mt-6 w-80 h-44 mix-blend-multiply"
                                    :alt="subcategory.name" :title="subcategory.name" loading="lazy" width="200"
                                    height="200" />
                            </div>
                        </div>
                        <div class="w-full p-6">
                            <p
                                class="w-full mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-center text-tg md:hidden md:group-hover:inline-block">
                                {{ subcategory.name }}
                            </p>
                        </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        <hr />
        <product-section :title="__('latest_products')" :new_products="true" :products="attrs.latest_products" />
        <product-section v-if="attrs.last_visited.length !== 0" :title="__('visited_products')" :new_products="true"
            :products="attrs.last_visited" />
    </front-layout>
</template>

<style scoped></style>
