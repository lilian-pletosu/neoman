<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import {
    ArrowPathIcon,
    Bars3Icon,
    Bars4Icon,
    ChevronDownIcon,
    ChevronUpIcon,
    DevicePhoneMobileIcon,
    HeartIcon,
    MagnifyingGlassIcon,
    ShoppingCartIcon,
} from "@heroicons/vue/24/outline/index.js";
import { Link, router } from "@inertiajs/vue3";
import { useCartStore } from "@/stores/cartStore.js";
import { useWishlistStore } from "@/stores/wishlistStore.js";
import Cart from "@/Components/Cart.vue";
import Wishlist from "@/Components/Wishlist.vue";
import { onClickOutside, watchDebounced } from "@vueuse/core";
import BigMenu from "@/Components/BigMenu.vue";
import axios from "axios";
import { route } from "ziggy-js";
import ReusableSidebar from "@/Components/ReusableSidebar.vue";
import Dropdown from "@/Components/Dropdown.vue";

const app = getCurrentInstance();

const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const openSearch = ref(false);
const searchElement = ref(null);
const searchedProducts = reactive({});

const loadSearch = ref(false);

const menu = ref(false);
const sidebar = ref(null);
const callModal = ref(false);
const openCart = ref(false);
const openWishlist = ref(false);

const searchString = ref("");

watchDebounced(
    searchString,
    () => {
        loadSearch.value = true;
        axios
            .get(route("api.search_product", { query: searchString.value }))
            .then((response) => {
                searchedProducts.value = response.data;
            })
            .finally(() => {
                loadSearch.value = false;
            })
            .catch((error) => {
                searchedProducts.value = [];
            });
    },
    { debounce: 500, maxWait: 1000 }
);

onClickOutside(searchElement, () => {
    openSearch.value = false;
    loadSearch.value = false;
});

const toggleSidebar = () => {
    menu.value = !menu.value;
};

const randomColorClass = () => {
    const colorClasses = [
        "bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400",
        "bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-400",
        "bg-gradient-to-r from-green-500 via-green-400 to-teal-400",
        "bg-gradient-to-r from-pink-500 via-pink-400 to-purple-400",
        "bg-gradient-to-r from-red-500 via-red-400 to-pink-400",
        "bg-gradient-to-r from-yellow-500 via-yellow-400 to-green-400",
        "bg-gradient-to-r from-indigo-500 via-indigo-400 to-blue-400",
        "bg-gradient-to-r from-purple-500 via-purple-400 to-pink-400",
        "bg-gradient-to-r from-teal-500 via-teal-400 to-green-400",
        "bg-gradient-to-r from-gray-500 via-gray-400 to-gray-400",
        "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-400",
        "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-400",
        // Adăugați aici mai multe clase de culori
    ];

    const randomIndex = Math.floor(Math.random() * colorClasses.length);
    return colorClasses[randomIndex];
};

onMounted(async () => {
    await cartStore.fetchCount();
    await wishlistStore.fetchCount();
});
</script>

<template>
    <Toast />
    <div id="header" class="px-2 md:px-0">
        <div class="flex items-center justify-between px-2 py-2 space-x-1 md:px-0 xl:px-60">
            <div class="flex justify-center md:w-3/12">
                <Link :href="route('home')">
                <application-logo class="flex w-56" />
                </Link>
            </div>
            <div class="flex-col flex-1 hidden text-center 3xs:flex">
                <a href="tel:+37378107017">
                    <p class="text-sm text-1 3xs:text-lg dark:text-white">
                        078 107 017
                    </p>
                </a>
                <p @click="$emit('call')" class="text-xs underline cursor-pointer text-b-link pointer md:text-sm">
                    {{ __("return_with_call") }}?
                </p>
            </div>
            <div class="justify-center flex-1 hidden space-x-2 md:flex">
                <div class="flex flex-col text-3 text-[#868686]">
                    <p>{{ __("monday_friday") }}</p>
                    <p>{{ __("saturday") }}</p>
                    <p>{{ __("sunday") }}</p>
                </div>
                <div class="grid items-center grid-cols-1 text-xs font-normal font-mulish dark:text-white">
                    <p class="">08.00 - 19.00</p>
                    <p>08.00 - 17.00</p>
                    <p>10.00 - 15.00</p>
                </div>
            </div>
            <div class="flex-col flex-1 hidden text-center lg:flex dark:text-white">
                <p class="text-sm text-1 2xl:text-xl">
                    Alături la fiecare etapă în viață
                </p>
                <p class="text-sm text-2">
                    Confortul tău - prioritatea noastră!
                </p>
            </div>
            <div class="flex justify-center px-2 space-x-6 dark:text-white">
                <div class="flex 3xs:hidden">
                    <a href="tel:+37378107017">
                        <device-phone-mobile-icon class="w-7" />
                    </a>
                </div>
                <div class="relative select-none">
                    <div @click="openWishlist = !openWishlist">
                        <span v-if="wishlistStore.wishlistCount !== 0"
                            class="absolute inline-flex items-center justify-center w-3 h-3 p-2.5 -right-2 -top-2 text-sm font-medium text-white bg-[#DB4444] rounded-full dark:bg-blue-900 dark:text-blue-200">{{
                                wishlistStore.wishlistCount }}
                        </span>
                        <heart-icon class="w-7" />
                    </div>
                    <Wishlist :is-open="openWishlist" @fetchCart="cartStore.fetchCount()"
                        @close="openWishlist = !openWishlist" />
                </div>
                <div class="relative select-none">
                    <div @click="openCart = !openCart" @focusout="openCart = !openCart">
                        <span v-if="cartStore.countCart !== 0"
                            class="absolute cursor-pointer inline-flex items-center justify-center w-3 h-3 p-2.5 -right-1 -top-2 text-sm font-medium text-white bg-[#DB4444] rounded-full dark:bg-blue-900 dark:text-blue-200">{{
                                cartStore.countCart }}
                        </span>
                        <shopping-cart-icon class="cursor-pointer w-7" />
                    </div>
                    <Cart :is-open="openCart" @close="openCart = !openCart" />
                </div>
                <div class="flex md:hidden">
                    <bars4-icon @click="menu = true" class="w-7" />
                </div>
            </div>
        </div>
        <div class="items-center p-2 sm:flex md:hidden">
            <div class="relative w-full h-10">
                <div
                    class="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                    <magnifying-glass-icon @click="
                        router.get(
                            route('search_page', {
                                search: searchString,
                            })
                        )
                        " class="w-6 dark:text-white" />
                </div>
                <input @keydown.enter="
                    router.get(
                        route('search_page', { search: searchString })
                    )
                    " v-model="searchString" :enterkeyhint="__('search')"
                    class="h-full w-full rounded-md dark:border-slate-500 dark:bg-dark dark:text-white px-3 py-2.5 !pr-9 font-mulish text-sm font-normal focus:border-none focus:outline-none"
                    :placeholder="__('search_product') + '...'" />
            </div>
        </div>
        <div
            class="relative hidden md:flex flex-row h-10 md:h-16 md:border-t bg-1 dark:bg-[#011212] dark:md:border-slate-500 xl:px-60">
            <BigMenu>
                <template v-slot:children>
                    <div class="">
                        <div class="flex items-center justify-center py-5 space-x-3">
                            <bars3-icon class="w-[25px] h-[25px] text-black md:text-white dark:text-white" />
                            <p
                                class="flex items-center text-base text-black uppercase text-2 md:text-white dark:text-white">
                                {{ __("catalog") }}
                            </p>
                            <chevron-down-icon v-if="menu" class="w-5 text-blue-800 animate-rotateUp" />
                            <chevron-up-icon v-if="!menu" class="w-5 text-blue-800 animate-rotateUp" />
                        </div>
                    </div>
                </template>
            </BigMenu>
            <div class="items-center justify-end flex-1 hidden pl-4 md:flex md:pr-2 xl:pr-0">
                <div class="relative w-full h-10" ref="searchElement">
                    <div
                        class="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                        <magnifying-glass-icon @click="
                            router.get(
                                route('search_page', {
                                    search: searchString,
                                })
                            )
                            " v-if="!loadSearch" class="w-6 dark:text-white" />
                        <arrow-path-icon v-if="loadSearch" class="w-6 dark:text-white" />
                    </div>
                    <input @focus="openSearch = true" @change="openSearch = true" v-model="searchString" @keydown.enter="
                        router.get(
                            route('search_page', { search: searchString })
                        )
                        "
                        class="h-full w-full rounded-md dark:border-slate-500 dark:bg-dark dark:text-white px-3 py-2.5 !pr-9 font-mulish text-sm font-normal focus:border-none focus:outline-none"
                        :placeholder="__('search_product') + '...'" />
                    <div v-show="openSearch"
                        class="absolute w-full max-h-[500px] overflow-y-scroll z-50 shadow bg-white border rounded-b-lg">
                        <div class="flex flex-col p-4 space-y-2">
                            <div v-for="product in searchedProducts.value" class="flex items-center space-x-2">
                                <div
                                    class="flex w-full p-4 text-left text-gray-600 border border-gray-100 shadow-lg rounded-xl sm:p-8">
                                    <Link :href="route('product_page', {
                                        slug: product.slug,
                                    })
                                        ">
                                    <img class="block w-8 h-8 max-w-full mr-5 text-left align-middle sm:h-16 sm:w-16"
                                        :src="product.image" alt="Profile Picture" /></Link>
                                    <div class="w-full text-left">
                                        <div class="flex flex-col justify-between mb-2 text-gray-600 sm:flex-row">
                                            <Link :href="route('product_page', {
                                                slug: product.slug,
                                            })
                                                ">
                                            <h3 class="font-medium">
                                                {{ product.name }}
                                            </h3>
                                            </Link>
                                            <time class="text-xs" datetime="2022-11-13T20:00Z">
                                                {{ product.brand.name }}
                                            </time>
                                        </div>
                                        <p class="text-sm">
                                            {{ product.description }}
                                        </p>
                                        <div class="flex items-center justify-between mt-5 text-gray-600">
                                            <Link :href="route('product_page', {
                                                slug: product.slug,
                                            })
                                                "
                                                class="px-8 py-2 text-xs leading-tight text-center transition-colors duration-150 ease-in-out border rounded-lg cursor-pointer hover:border-gray-500">
                                            {{ __("buy") }}
                                            </Link>
                                            <a title="Likes" href="#"
                                                class="flex items-center justify-around cursor-pointer group">
                                                {{ product.price }}
                                                {{ __("lei") }}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="
                                searchProducts &&
                                searchProducts.length === 0
                            " class="flex items-center space-x-2">
                                <div class="max-w-screen-xl px-4 mx-auto md:px-8">
                                    <!-- Heading -->
                                    <div class="text-center">
                                        <div class="flex flex-col p-4">
                                            <p>
                                                {{
                                                    __(
                                                        "no_product_meets_search_criteria"
                                                    )
                                                }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="!searchString" class="flex items-center space-x-2">
                                <div class="max-w-screen-xl px-4 mx-auto md:px-8">
                                    <!-- Heading -->
                                    <div class="text-center">
                                        <div class="flex flex-col p-4">
                                            <p>
                                                {{
                                                    __("search_in_all_products")
                                                }}
                                            </p>
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

    <ReusableSidebar :title="__('menu')" :open="menu" @close="menu = false">
        <template v-slot:content>
            <div class="flex flex-col h-screen">
                <ul class="py-2 space-y-1 border-y">
                    <li v-for="category in app.appContext.config
                        .globalProperties.$page.props.menu">
                        <Link v-if="category.children <= 0" :href="route('category_page', { slug: category.slug })
                            "
                            class="flex items-center gap-2 px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                        <span v-html="category.icon" />
                        <span class="text-sm font-medium">
                            {{ category.name }}</span>
                        </Link>

                        <details class="group [&_summary::-webkit-details-marker]:hidden"
                            v-if="category.children.length > 0">
                            <summary
                                class="flex items-center justify-between px-4 py-2 text-gray-500 rounded-lg group hover:bg-gray-100 hover:text-gray-700">
                                <Link :href="route('category_page', {
                                    slug: category.slug,
                                })
                                    ">
                                <div class="flex items-center gap-2">
                                    <span v-html="category.icon" />
                                    <span class="text-sm font-medium">{{ category.name }}
                                    </span>
                                </div>
                                </Link>
                                <span class="transition duration-300 shrink-0 group-open:-rotate-180">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </span>
                            </summary>

                            <ul class="px-4 mt-2 space-y-1">
                                <li v-for="subcategory in category.children">
                                    <Link v-if="subcategory.children.length <= 0" :href="route('subcategory_page', {
                                        slug: subcategory.slug,
                                    })
                                        "
                                        class="flex items-center gap-2 px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                                    <span class="text-sm font-medium">
                                        {{ subcategory.name }}</span>
                                    </Link>

                                    <details class="group/two" v-if="subcategory.children.length > 0">
                                        <summary
                                            class="flex items-center justify-between px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                                            <Link :href="route('subcategory_page', {
                                                slug: subcategory.slug,
                                            })
                                                ">
                                            <div class="flex items-center gap-2">
                                                <span class="text-sm font-medium">{{ subcategory.name }}
                                                </span>
                                            </div>
                                            </Link>

                                            <span class="transition duration-300 shrink-0 group-open/two:-rotate-180">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
                                                    viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </span>
                                        </summary>

                                        <ul class="px-4 mt-2 space-y-1">
                                            <li v-for="subSubcategory in subcategory.children">
                                                <Link :href="route('products_page', {
                                                    subSubcategory:
                                                        subSubcategory.slug,
                                                })
                                                    "
                                                    class="block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                                                {{ subSubcategory.name }}
                                                </Link>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>

                <div class="px-4 border">
                    <span class="text-base font-normal text-gray-500">
                        <Dropdown :align="left">
                            <template #trigger>
                                <span class="inline-flex rounded-md">
                                    <button type="button"
                                        class="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none">
                                        <img :src="'/flags/' +
                                            $page.props.current_locale +
                                            '_64.png'
                                            " class="inline w-5 mr-2" />

                                        <svg class="-mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </span>
                            </template>
                            <template #content>
                                <ul class="flex flex-col px-2">
                                    <li class="hover:bg-gray-100">
                                        <a :href="route('language', {
                                            locale: 'ru',
                                        })
                                            ">Русский</a>
                                    </li>
                                    <li class="hover:bg-gray-100">
                                        <a :href="route('language', {
                                            locale: 'ro',
                                        })
                                            ">Română</a>
                                    </li>
                                </ul>
                            </template>
                        </Dropdown>
                    </span>
                </div>
            </div>
        </template>
    </ReusableSidebar>
</template>

<style scoped></style>
