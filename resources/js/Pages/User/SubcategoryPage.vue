<script setup>
import FrontLayout from "@/Layouts/FrontLayout.vue";
import ProductSection from "@/Components/ProductSection.vue";
import { useAttrs } from "vue";
import { Link } from "@inertiajs/vue3";

const attrs = useAttrs();
const props = defineProps({
    subcategory: {
        type: Object,
    },
});
</script>

<template>
    <front-layout title="Pagina principală">
        <!--        <breadcrumb :product="product"/>-->
        <hr />
        <!-- component -->
        <section class="py-6 bg-white">
            <div class="container mx-auto max-w-[1300px]">
                <h1
                    class="pb-10 text-lg font-bold border-b font-mulish md:text-xl lg:text-2xl"
                >
                    {{ subcategory.name }}
                </h1>
                <div
                    class="grid grid-cols-1 pt-12 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-28 lg:gap-y-16"
                >
                    <div
                        v-for="subSubcategory in subcategory.sub_subcategory"
                        class="relative flex flex-col h-48 text-gray-700 bg-white shadow-md group rounded-xl bg-clip-border"
                    >
                        <Link
                            :href="
                                route('products_page', {
                                    subSubcategory: subSubcategory.slug,
                                })
                            "
                            class="block"
                        >
                            <div class="h-28">
                                <div
                                    class="absolute bg-cover -top-20 lg:top-[-10%] left-[5%] group-hover:top-[-40%] group-hover:opacity-[0.9] duration-300 w-[90%] h-48 rounded-xl justify-items-center align-middle"
                                >
                                    <img
                                        :src="subSubcategory.image"
                                        class="m-auto mt-6 w-80 h-44 mix-blend-multiply"
                                        alt="Automotive"
                                        title="Automotive"
                                        loading="lazy"
                                        width="200"
                                        height="200"
                                    />
                                </div>
                            </div>

                            <div class="w-full p-6">
                                <p
                                    class="w-full mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-center text-tg md:hidden md:group-hover:inline-block"
                                >
                                    {{ subSubcategory.name }}
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        <hr />
        <product-section
            :title="__('latest_products')"
            :new_products="true"
            :products="attrs.latest_products"
        />
        <product-section
            v-if="attrs.last_visited.length !== 0"
            :title="__('visited_products')"
            :new_products="true"
            :products="attrs.last_visited"
        />
    </front-layout>
</template>

<style scoped></style>
