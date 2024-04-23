<script setup>
import {getCurrentInstance, onMounted, reactive, ref} from "vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import {
    ArrowPathIcon,
    Bars3Icon,
    ChevronDownIcon,
    ChevronUpIcon,
    HeartIcon,
    MagnifyingGlassIcon,
    ShoppingCartIcon
} from "@heroicons/vue/24/outline/index.js";
import SidebarMobile from "@/Components/SidebarMobile.vue";
import {Link} from "@inertiajs/vue3";
import {useCartStore} from "@/stores/cartStore.js";
import {useWishlistStore} from "@/stores/wishlistStore.js";
import Cart from "@/Components/Cart.vue";
import Wishlist from "@/Components/Wishlist.vue";
import {onClickOutside} from "@vueuse/core";
import BigMenu from "@/Components/BigMenu.vue";
import axios from "axios";
import {route} from "ziggy-js";
import {debounce} from "chart.js/helpers";

const app = getCurrentInstance();

const cartStore = useCartStore()
const wishlistStore = useWishlistStore();

const openSearch = ref(false);
const searchElement = ref(null);
const searchedProducts = reactive({});

const loadSearch = ref(false);

const menu = ref(false);
const sidebar = ref(null)
const callModal = ref(false);
const openCart = ref(false);
const openWishlist = ref(false);

const searchProduct = (value) => {

    debounce(() => {
        if (value.length > 1) {
            loadSearch.value = true;
            axios.get(route('api.search_product', {query: value})).then((response) => {

                searchedProducts.value = response.data;

            }).finally(() => {
                loadSearch.value = false;
            })
        } else {
            searchedProducts.value = {};
        }
    }, 500)()
}

onClickOutside(searchElement, () => {
    openSearch.value = false;
    loadSearch.value = false;

})


const toggleSidebar = () => {
    menu.value = !menu.value
}

const randomColorClass = () => {
    const colorClasses = [
        'bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400',
        'bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-400',
        'bg-gradient-to-r from-green-500 via-green-400 to-teal-400',
        'bg-gradient-to-r from-pink-500 via-pink-400 to-purple-400',
        'bg-gradient-to-r from-red-500 via-red-400 to-pink-400',
        'bg-gradient-to-r from-yellow-500 via-yellow-400 to-green-400',
        'bg-gradient-to-r from-indigo-500 via-indigo-400 to-blue-400',
        'bg-gradient-to-r from-purple-500 via-purple-400 to-pink-400',
        'bg-gradient-to-r from-teal-500 via-teal-400 to-green-400',
        'bg-gradient-to-r from-gray-500 via-gray-400 to-gray-400',
        'bg-gradient-to-r from-blue-500 via-blue-400 to-blue-400',
        'bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-400',
        // Adăugați aici mai multe clase de culori
    ];

    const randomIndex = Math.floor(Math.random() * colorClasses.length);
    return colorClasses[randomIndex];
}

onMounted(async () => {
    await cartStore.fetchCount()
    await wishlistStore.fetchCount();
})

</script>

<template>

    <Toast/>
    <div id="header" class="px-2 md:px-0">
        <div class="px-2 md:px-0 py-2 flex justify-center  items-center space-x-1 xl:px-60">
            <div class="flex md:w-3/12 justify-center">
                <Link :href="route('home')">
                    <application-logo class="flex w-56 "/>
                </Link>
            </div>
            <div class="hidden 3xs:flex flex-1 flex-col text-center ">
                <a href="tel:+37378107017"><p class="text-1 text-sm 3xs:text-lg dark:text-white">078 107 017</p></a>
                <p @click="$emit('call')" class="cursor-pointer underline text-b-link text-xs pointer md:text-sm">
                    {{ __('return_with_call') }}?</p>
            </div>
            <div class="hidden md:flex flex-1  justify-center space-x-2">
                <div class="flex flex-col text-3 text-[#868686]">
                    <p>{{ __('monday_friday') }}</p>
                    <p>{{ __('saturday') }}</p>
                    <p>{{ __('sunday') }}</p>
                </div>
                <div class="grid grid-cols-1 items-center font-mulish font-normal text-xs dark:text-white">
                    <p class="">08.00 - 19.00</p>
                    <p>08.00 - 17.00</p>
                    <p>10.00 - 15.00</p>
                </div>
            </div>
            <div class="hidden lg:flex flex-1  flex-col text-center dark:text-white">
                <p class="text-1 text-sm 2xl:text-xl">
                    Alături la fiecare etapă în viață</p>
                <p class="text-2 text-sm ">Confortul tău - prioritatea noastră!</p>
            </div>
            <div class="flex   px-2.5 lg:w-1/12  justify-end space-x-6 dark:text-white">
                <div class="relative select-none">
                    <div @click="openWishlist = !openWishlist">
                        <span v-if="wishlistStore.wishlistCount !== 0"
                              class="absolute inline-flex items-center justify-center w-3 h-3 p-2.5 -right-2 -top-2 text-sm font-medium text-white bg-[#DB4444] rounded-full dark:bg-blue-900 dark:text-blue-200">{{
                                wishlistStore.wishlistCount
                            }}
                    </span>
                        <heart-icon class="w-7"/>
                    </div>
                    <Wishlist :is-open="openWishlist"
                              @fetchCart="cartStore.fetchCount()"
                              @close="openWishlist = !openWishlist"/>
                </div>
                <div class="relative select-none">

                    <div @click="openCart = !openCart" @focusout="openCart = !openCart">
                        <span v-if="cartStore.countCart !== 0"
                              class="absolute cursor-pointer inline-flex items-center justify-center w-3 h-3 p-2.5 -right-2 -top-2 text-sm font-medium text-white bg-[#DB4444] rounded-full dark:bg-blue-900 dark:text-blue-200">{{
                                cartStore.countCart
                            }}
                        </span>
                        <shopping-cart-icon class="w-7 cursor-pointer"/>
                    </div>
                    <Cart :is-open="openCart" @close="openCart = !openCart"/>
                </div>
            </div>
        </div>
        <div class="sm:flex items-center p-2 md:hidden">
            <div class="relative h-10  w-full ">
                <div
                    class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
                    <magnifying-glass-icon class="w-6 dark:text-white"/>
                </div>
                <input
                    class=" h-full w-full rounded-md dark:border-slate-500 dark:bg-dark dark:text-white  px-3 py-2.5 !pr-9 font-mulish text-sm font-normal  focus:border-none focus:outline-none"
                    placeholder="Caută un produs..."
                />
            </div>

        </div>
        <div
            class="relative hidden md:flex flex-row h-10 md:h-16 md:border-t bg-1 dark:bg-[#011212] dark:md:border-slate-500 xl:px-60 ">
            <BigMenu>
                <template v-slot:children>
                    <div class="">
                        <div class="flex justify-center items-center space-x-3 py-5">
                            <bars3-icon class="w-[25px] h-[25px] text-black md:text-white dark:text-white"/>
                            <p class="text-2 flex items-center text-base text-black md:text-white dark:text-white uppercase">
                                Catalog</p>
                            <chevron-down-icon v-if="menu" class="w-5 animate-rotateUp text-blue-800"/>
                            <chevron-up-icon v-if="!menu" class="w-5 animate-rotateUp text-blue-800"/>
                        </div>
                    </div>
                </template>
            </BigMenu>
            <div class=" hidden md:flex flex-1 items-center justify-end pl-4 md:pr-2 xl:pr-0">
                <div class="relative h-10  w-full " ref="searchElement">
                    <div
                        class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
                        <magnifying-glass-icon v-if="!loadSearch" class="w-6 dark:text-white"/>
                        <arrow-path-icon v-if="loadSearch" class="w-6 dark:text-white"/>
                    </div>
                    <input
                        @focus="openSearch = true"
                        @change="openSearch = true"
                        @input="searchProduct($event.target.value)"
                        class=" h-full w-full rounded-md dark:border-slate-500 dark:bg-dark dark:text-white  px-3 py-2.5 !pr-9 font-mulish text-sm font-normal  focus:border-none focus:outline-none"
                        :placeholder="__('search_product') + '...'"
                    />
                    <div v-show="openSearch"
                         class="absolute w-full  max-h-[500px] overflow-y-scroll z-50 shadow bg-white border rounded-b-lg ">
                        <div class="flex flex-col space-y-2 p-4">
                            <div v-for="product in searchedProducts.value"
                                 class="flex items-center space-x-2 ">

                                <div
                                    class="w-full flex rounded-xl border border-gray-100 p-4 text-left text-gray-600 shadow-lg sm:p-8">
                                    <Link :href="route('product_page', {slug: product.slug})">
                                        <img
                                            class="mr-5 block h-8 w-8 max-w-full text-left align-middle sm:h-16 sm:w-16"
                                            :src="product.image"
                                            alt="Profile Picture"/></Link>
                                    <div class="w-full text-left">
                                        <div class="mb-2 flex flex-col justify-between text-gray-600 sm:flex-row">
                                            <Link :href="route('product_page', {slug: product.slug})">
                                                <h3 class="font-medium">{{ product.name }}</h3>
                                            </Link>
                                            <time class="text-xs" datetime="2022-11-13T20:00Z">
                                                {{ product.brand.name }}
                                            </time>
                                        </div>
                                        <p class="text-sm">{{ product.description.slice(0, 80) }}</p>
                                        <div class="mt-5 flex items-center justify-between text-gray-600">
                                            <Link :href="route('product_page', {slug: product.slug})"
                                                  class="cursor-pointer border py-2 px-8 text-center text-xs leading-tight transition-colors duration-150 ease-in-out hover:border-gray-500 rounded-lg">
                                                {{ __('buy') }}
                                            </Link>
                                            <a title="Likes" href="#"
                                               class="group flex cursor-pointer items-center justify-around">
                                                {{ product.price }} {{ __('lei') }}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div v-if="loadSearch || searchProducts != {}"
                                 class="flex items-center space-x-2 ">

                                <div class="mx-auto max-w-screen-xl px-4 md:px-8">
                                    <!-- Heading -->
                                    <div class="text-center">
                                        <div class='flex flex-col  p-4'>
                                          <span
                                              class="w-8 h-8 border-t-blue-600 border-solid animate-spin rounded-full border-slate-300 border-4"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <SidebarMobile :show="menu" @close="toggleSidebar">
        <div class="flex flex-col justify-center px-4 py-2  group text-lg">
            <p v-for="category in  $page.props.categories">{{ category.name }}</p>
        </div>
    </SidebarMobile>


</template>

<style scoped>

</style>
