<script setup>
import {onMounted, ref} from "vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import {
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


const cartStore = useCartStore()
const wishlistStore = useWishlistStore();


const menu = ref(false);
const sidebar = ref(null)
const callModal = ref(false);
const openCart = ref(false);
const openWishlist = ref(false);


const toggleSidebar = () => {
    menu.value = !menu.value
}

onMounted(async () => {
    await cartStore.fetchCount()
    await wishlistStore.fetchCount();
})

</script>

<template>
    <div id="header" class="px-2 md:px-0">
        <div class="px-2 md:px-0 py-2 flex justify-center  items-center space-x-1 xl:px-60">
            <div class="flex md:w-3/12 justify-center">
                <Link :href="route('home')">
                    <application-logo class="flex w-56 "/>
                </Link>
            </div>
            <div class=" hidden 3xs:flex flex-1 flex-col text-center ">
                <a href="tel:+37378107017"><p class="text-1 text-sm 3xs:text-lg dark:text-white">078 107 017</p></a>
                <p @click="$emit('call')" class="cursor-pointer underline text-b-link text-xs pointer md:text-sm">
                    Revenim cu un apel?</p>
            </div>
            <div class="hidden md:flex flex-1  justify-center space-x-2">
                <div class="flex flex-col text-3 text-[#868686]">
                    <p>Lu - Vi</p>
                    <p>Sâmbătă</p>
                    <p>Duminică</p>
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
            <div class="relative
             justify-center items-center bg-[#043B3D] md:w-3/12   dark:bg-dark"
                 @click="toggleSidebar">
                <div class="flex justify-center items-center space-x-3 py-5">
                    <bars3-icon class="w-[25px] h-[25px] text-black md:text-white dark:text-white"/>
                    <p class="text-2 flex items-center text-base text-black md:text-white dark:text-white uppercase">
                        Catalog</p>
                    <chevron-down-icon v-if="menu" class="w-5 animate-rotateUp text-blue-800"/>
                    <chevron-up-icon v-if="!menu" class="w-5 animate-rotateUp text-blue-800"/>
                </div>
                <div ref="sidebar" v-show="menu"
                     class="relative hidden   sm:block shadow-lg">
                    <div id="mega-menu-icons-dropdown"
                         class="bg-white z-20 absolute   w-full  text-sm  border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-3 dark:bg-gray-700">
                        <div class="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                            <ul class="space-y-4" aria-labelledby="mega-menu-icons-dropdown-button">
                                <li v-for="category in  $page.props.categories"
                                    class="py-2 hover:cursor-pointer">
                                    <Link :href="route('category_page', {slug: category.slug})"
                                          class="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group">
                                        <span class="sr-only">{{ category.name }}</span>
                                        <svg
                                            class="w-3 h-3 me-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                        </svg>
                                        {{ category.name }}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            <div class=" hidden md:flex flex-1 items-center justify-end pl-4 md:pr-2 xl:pr-0">
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
