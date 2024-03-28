<script setup>
import FrontLayout from "@/Layouts/FrontLayout.vue";
import {useWishlistStore} from "@/stores/wishlistStore.js";
import {useCartStore} from "@/stores/cartStore.js";


const cartStore = useCartStore();
const wishlistStore = useWishlistStore();


const props = defineProps({
    products: Object
})

</script>

<template>
    <FrontLayout>
        <div class="py-4">
            <h1 class="text-2xl font-bold font-mulish">Cart</h1>

            <section class="pt-4">
                <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-4">
                    <!-- Lista produselor -->
                    <div class="lg:col-span-2 space-y-4">
                        <div v-for="product in cartStore.products" :key="product.id"
                             class="flex container-simple border bg-white dark:bg-1 rounded-md items-start gap-4  p-4 ">
                            <img class="w-24 h-24 rounded-md bg-slate-100" :src="product.images[0].image1"
                                 :alt="product.name">
                            <p class="text-sm">{{ product.name }}</p>
                        </div>
                    </div>
                    <!-- Al doilea element -->
                    <div
                        class="container-simple bg-slate-500 rounded-md text-red p-4">
                        <p>s</p>
                    </div>
                </div>
            </section>

        </div>

    </FrontLayout>
</template>

