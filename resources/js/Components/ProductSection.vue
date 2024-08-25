<script setup>
import {HeartIcon} from "@heroicons/vue/24/outline/index.js";
import {Swiper, SwiperSlide} from "swiper/vue";
import 'swiper/css';
import {Link} from "@inertiajs/vue3";
import {useCartStore} from "@/stores/cartStore.js";
import {useWishlistStore} from "@/stores/wishlistStore.js"
import {Navigation} from 'swiper/modules';
import {formatPrice} from "../helpers/helper.js";

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()


const props = defineProps({
    products: {
        type: Object,
    },
    title: String,
    sale: {
        type: Boolean,
        default: false,
    },
    seasons_products: {
        type: Boolean,
        default: false
    },
    top_products: {
        type: Boolean,
        default: false
    },
    new_products: {
        type: Boolean,
        default: false
    },
});

const modules = [Navigation]

</script>

<style>
.swiper {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: none;


    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
}


:root {
    --swiper-navigation-size: 3vh;
    /*
    --swiper-navigation-top-offset: 50%;
    --swiper-navigation-sides-offset: 10px;
    --swiper-navigation-color: var(--swiper-theme-color);
    */
}

.swiper-button-prev,
.swiper-button-next {
    position: absolute;
    top: var(--swiper-navigation-top-offset, 50%);
    width: 1vw;
    height: var(--swiper-navigation-size);
    margin-top: calc(0px - (var(--swiper-navigation-size) / 2));
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1a202c;
}

p
.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
    opacity: 0.35;
    cursor: auto;
    pointer-events: none;
}

.swiper-button-prev.swiper-button-hidden,
.swiper-button-next.swiper-button-hidden {
    opacity: 0;
    cursor: auto;
    pointer-events: none;
}

.swiper-navigation-disabled .swiper-button-prev,
.swiper-navigation-disabled .swiper-button-next {
    display: none !important;
}

.swiper-button-prev svg,
.swiper-button-next svg {
    width: 1vh;
    height: 5vh;
    object-fit: contain;
    transform-origin: center;
}

.swiper-rtl .swiper-button-prev svg,
.swiper-rtl .swiper-button-next svg {
    transform: rotate(180deg);
}

.swiper-button-prev,
.swiper-rtl .swiper-button-next {
    left: var(--swiper-navigation-sides-offset, 10px);
    right: auto;
}

.swiper-button-next,
.swiper-rtl .swiper-button-prev {
    right: var(--swiper-navigation-sides-offset, 10px);
    left: auto;
}

.swiper-button-lock {
    display: none;
}

/* Navigation font start */
.swiper-button-prev:after,
.swiper-button-next:after {
    font-family: swiper-icons;
    font-size: var(--swiper-navigation-size);
    text-transform: none !important;
    letter-spacing: 0;
    font-variant: initial;
    line-height: 1;
}

.swiper-button-prev:after,
.swiper-rtl .swiper-button-next:after {
    content: 'prev';
}

.swiper-button-next,
.swiper-rtl .swiper-button-prev {
    right: var(--swiper-navigation-sides-offset, 10px);
    left: auto;
}

.swiper-button-next:after,
.swiper-rtl .swiper-button-prev:after {
    content: 'next';
}

/* Navigation font end */

</style>
<template>

    <div class="mb-6 py-12  space-y-6 ">
        <div class="flex  items-center justify-between px-0">
            <div class="flex items-center space-x-2">
                <div v-if="sale">
                    <svg class="dark:text-white" height="2em" viewBox="0 0 24 24" width="2em"
                         xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" stroke="currentColor">
                            <path
                                d="M10.51 3.665a2 2 0 0 1 2.98 0l.7.782a2 2 0 0 0 1.601.663l1.05-.058a2 2 0 0 1 2.107 2.108l-.058 1.049a2 2 0 0 0 .663 1.6l.782.7a2 2 0 0 1 0 2.981l-.782.7a2 2 0 0 0-.663 1.601l.058 1.05a2 2 0 0 1-2.108 2.107l-1.049-.058a2 2 0 0 0-1.6.663l-.7.782a2 2 0 0 1-2.981 0l-.7-.782a2 2 0 0 0-1.601-.663l-1.05.058a2 2 0 0 1-2.107-2.108l.058-1.049a2 2 0 0 0-.663-1.6l-.782-.7a2 2 0 0 1 0-2.981l.782-.7a2 2 0 0 0 .663-1.601l-.058-1.05A2 2 0 0 1 7.16 5.053l1.049.058a2 2 0 0 0 1.6-.663z"
                                stroke-width="2"/>
                            <path d="M9.5 9.5h.01v.01H9.5zm5 5h.01v.01h-.01z" stroke-linejoin="round" stroke-width="3"/>
                            <path d="m15 9l-6 6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </g>
                    </svg>
                </div>
                <div v-if="seasons_products">
                    <svg class="dark:text-white" height="2em" viewBox="0 0 20 20" width="2em"
                         xmlns="http://www.w3.org/2000/svg">
                        <g clip-rule="evenodd" fill="currentColor" fill-rule="evenodd">
                            <path
                                d="M2.624 7.954c.567 2.204 1.763 4.474 3.162 5.873c1.913 1.913 3.77 2.665 5.347 2.726c1.571.06 2.966-.564 3.988-1.588c.46-.462.756-1.13.88-1.96c.125-.827.075-1.78-.118-2.767c-.736-3.775-4.25-6.777-8.588-7.833c-1.924-.468-3.392-.391-4.194.413c-.448.45-.724 1.156-.803 2.07c-.077.908.043 1.967.326 3.066m-1.396-3.11c.086-1.012.4-1.947 1.064-2.614c1.272-1.275 3.37-1.186 5.32-.711c4.67 1.137 8.518 4.38 9.33 8.546c.205 1.05.266 2.095.124 3.035c-.14.936-.488 1.803-1.137 2.454a6.482 6.482 0 0 1-4.87 1.918c-1.955-.074-4.06-1.001-6.095-3.036c-1.538-1.538-2.795-3.956-3.389-6.263c-.298-1.157-.435-2.31-.347-3.33"/>
                            <path
                                d="M11.105 6.912c.293.043.49.28.439.53l-.511 2.538l2.41 2.758l1.517 2.024l2.007 3.01c.147.221.057.502-.201.627c-.258.126-.586.049-.733-.172l-1.993-2.99l-1.362-1.815l-4.002-.528c-.293-.039-.494-.274-.449-.524c.045-.25.32-.423.613-.384l2.943.389l-1.727-1.978l-3.92-3.36a.414.414 0 0 1 .001-.65a.605.605 0 0 1 .76.002l3.213 2.754l.374-1.856c.05-.25.328-.418.621-.375"/>
                        </g>
                    </svg>
                </div>
                <div v-if="top_products">
                    <svg class="dark:text-white" height="2em" viewBox="0 0 24 24" width="2em"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m12 2l3.104 6.728l7.358.873l-5.44 5.03l1.444 7.268L12 18.28L5.534 21.9l1.444-7.268L1.538 9.6l7.359-.873z"
                            fill="none" stroke="currentColor" stroke-linejoin="round"
                            stroke-width="1.5"/>
                    </svg>
                </div>
                <div v-if="new_products">
                    <svg class="dark:text-white" height="2em" viewBox="0 0 16 16" width="2em"
                         xmlns="http://www.w3.org/2000/svg">
                        <g fill="currentColor">
                            <path
                                d="M7.001 11a1 1 0 1 1 2 0a1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0z"/>
                            <path
                                d="m10.273 2.513l-.921-.944l.715-.698l.622.637l.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89l.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622l.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01l-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637l-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89l-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622l-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01l.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944l-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318l-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92l-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016l.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944l1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318l.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92l.016-1.32a1.89 1.89 0 0 0-1.912-1.911z"/>
                        </g>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ title }}</h2>
            </div>

        </div>

        <swiper
            :breakpoints="{
                  '400': {
                    slidesPerView: 2,
                    spaceBetween: 20
                  },
                  '832': {
                    slidesPerView: 3,
                    spaceBetween: 20
                  },
                  '1020':{
                      slidesPerView: 4,
                      spaceBetween: 10
                  },
                  '1900':{
                        slidesPerView: 5,
                        spaceBetween: 10
                  }

                }"
            :modules="modules"
            :navigation="true"
            :slidesPerView="1"
            :spaceBetween="20"
            class="relative"

            direction="horizontal">
            <swiper-slide v-for="(product, key) in products" class="p-2">
                <div
                    class="container-rounded flex items-center justify-center bg-white border border-slate-100 dark:bg-slate-100  w-96 h-[100px] xs:h-[350px] 1xs:h-[400px] 2xs:h-80 3xs:h-96  md:h-[380px]  2xl:h-[450px]  3xl:h-[450px]  relative group/card">
                    <div
                        class="absolute z-20 flex items-center  rounded-b-xl  -top-0 bg-gradient-to-r  from-pink-500 via-purple-500  to-indigo-500  w-auto px-7 py-0.4 p  h-auto shadow border-1 border-slate-600">
                        <span class=" text-xs text-white font-semibold">{{ __('credit') }} 0%</span>
                    </div>
                    <div class="hover:cursor-pointer ">
                        <div>
                            <div class="static">
                                <div class="w-12 absolute left-2 top-2 z-10">
                                    <img :alt="product.brand.name" :src="product.brand.image"
                                         class="mix-blend-multiply">
                                </div>
                                <div
                                    class=" absolute group right-2 top-2 bg-white rounded-xl p-2 bg-opacity-40 cursor-pointer"
                                    @click="wishlistStore.addProductInWishlist(product.id)">
                                    <heart-icon
                                        :class="{'text-red-500 fill-red-500': wishlistStore.checkIfProductExistInWishlist(product.id)}"
                                        class="w-4 group-hover:text-red-500 group-hover:fill-red-500"/>
                                </div>
                            </div>
                        </div>
                        <Link :href="route('product_page', {slug: product.slug})">
                            <div>
                                <div class="mt-2 ">
                                    <img :src="product.image" alt="Product Image"
                                         class="transition  hover:scale-110 aspect-square object-contain opacity-100 mix-blend-multiply ">
                                </div>
                            </div>
                            <div class="relative mt-3" style="margin-bottom: 5vh">
                                <p class="font-mulish font-bold text-shadow-lg text-xs md:text-lg text-black ">{{
                                        product.name.slice(0, 42) + '...'
                                    }}</p>
                            </div>
                        </Link>
                    </div>

                    <div class="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                        <div class="flex flex-col items-start">
                            <template v-if="sale">
                                <div class="flex flex-row space-x-1">
                                    <p class="font-mulish text-sm line-through font-medium">
                                        {{ formatPrice(product.price) }}
                                        {{ __('lei') }}</p>
                                    <span
                                        class="bg-red-400 text-white text-xs font-medium me-2 px-0.5 sm:px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">{{
                                            product.sale
                                        }}</span>

                                </div>
                            </template>
                            <template v-if="product.final_price">
                                <p class="font-mulish text-xl font-medium">{{ formatPrice(product.final_price) }}
                                    {{ __('lei') }}</p>
                            </template>
                            <template v-else>
                                <p class="font-mulish text-xl font-medium">{{ product.price }} {{ __('lei') }}</p>
                            </template>
                        </div>
                        <div
                            :class="cartStore.checkIfProductExistInCart(product.id) ? 'bg-[#1FC8F3]' : 'bg-white'"
                            class="shadow rounded-lg transition p-4 sm:p-4 hover:scale-110 hover:bg-[#1FC8F3]
                            cursor-pointer group/cart"
                            @click="cartStore.addProductInCart(product.id, 'default')">
                            <svg :class="cartStore.checkIfProductExistInCart(product.id) ? 'text-white' : 'text-black'"
                                 class="h-4 w-4  group-hover/cart:text-white"
                                 fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                            </svg>
                        </div>
                    </div>

                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

