<script setup>

import {onMounted, ref} from "vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import {
    Bars3Icon,
    ChevronDownIcon,
    ChevronUpIcon,
    GiftIcon,
    HeartIcon,
    MagnifyingGlassIcon,
    ReceiptPercentIcon,
    ShoppingCartIcon,
    SparklesIcon,
    StarIcon
} from "@heroicons/vue/24/outline/index.js";
import SidebarMobile from "@/Components/SidebarMobile.vue";
import {Link} from "@inertiajs/vue3";
import {useCartStore} from "@/cartStore.js";

const cartStore = useCartStore()


const menu = ref(false);
const sidebar = ref(null)
const callModal = ref(false);
const isHovered = ref(false);


const toggleSidebar = () => {
    menu.value = !menu.value
}


// onMounted(async () => {
//     countCart.value = await fetchCount(); // așteptați rezolvarea promisiunii și actualizați countCart cu valoarea reală
// });
onMounted(async () => {
    await cartStore.fetchCount()
})

</script>

<template>
    <div id="header">
        <div class="px-2 py-2 flex justify-center  items-center space-x-1 xl:px-60">
            <div class="flex-1 flex justify-center">
                <Link :href="route('home')">
                    <application-logo class="flex w-56 "/>
                </Link>
            </div>
            <div class="flex flex-1 flex-col text-center ">
                <a href="tel:+37378107017"><p class="text-1 text-lg dark:text-white">078 107 017</p></a>
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
            <div class="flex  w-1/6  lg:w-1/12  justify-end space-x-6 dark:text-white">
                <heart-icon class="w-7"/>
                <div class="relative select-none">

                    <div @click="isHovered = !isHovered" @focusout="isHovered = !isHovered">

                    <span
                        class="absolute   inline-flex items-center justify-center w-3 h-3 p-2.5 -right-2 -top-2 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">{{
                            cartStore.countCart
                        }}</span>
                        <shopping-cart-icon class="w-7"/>
                    </div>

                    <section v-show="isHovered"
                             class="absolute  container-custom-rounded right-0  z-10 h-auto bg-gray-100 py-12 sm:py-16 lg:py-4"
                             :class="cartStore.products.length === 0 ? 'w-auto' : 'w-[650px]'">
                        <div class="mx-auto px-1 sm:px-6 lg:px-4">


                            <div class="mx-auto   max-w-2xl md:mt-0">
                                <div class="bg-white shadow container-custom-rounded">

                                    <div v-if="cartStore.products.length != 0" class="px-4 py-6 sm:px-8 sm:py-10">
                                        <div class="flow-root">
                                            <ul class="-my-8">
                                                <li v-for="product in cartStore.products"
                                                    class="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                                                    <div class="shrink-0">
                                                        <img class="h-24 w-24 max-w-full rounded-lg object-cover"
                                                             :src="product.images[0].image1"
                                                             alt=""/>
                                                    </div>

                                                    <div class="relative flex flex-1 flex-col justify-between">
                                                        <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                                            <div class="pr-8 sm:pr-5">
                                                                <p class="text-base font-semibold text-gray-900">
                                                                    {{ product.name }}</p>
                                                                <p class="mx-0 mt-1 mb-0 text-sm text-gray-400">Alb</p>
                                                            </div>

                                                            <div
                                                                class="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                                                <p class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                                                    {{ product.price.toFixed(2) }} {{ __('lei') }}</p>

                                                                <div class="sm:order-1">
                                                                    <div
                                                                        class="mx-auto flex h-8 items-stretch text-gray-600">
                                                                        <button
                                                                            class="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">
                                                                            -
                                                                        </button>
                                                                        <div
                                                                            class="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                                                            1
                                                                        </div>
                                                                        <button
                                                                            class="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div
                                                            class="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                                            <button type="button"
                                                                    @click="cartStore.removeProductInCart(product.id)"
                                                                    class="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                                                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                                     fill="none" viewBox="0 0 24 24"
                                                                     stroke="currentColor">
                                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                                          stroke-width="2" d="M6 18L18 6M6 6l12 12"
                                                                          class=""></path>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="mt-6 border-t border-b py-2">
                                            <div class="flex items-center justify-between">
                                                <p class="text-sm text-gray-400">{{ __('subtotal') }}</p>
                                                <p class="text-lg font-semibold text-gray-900">
                                                    {{ cartStore.totalPrice.toFixed(2) }} {{ __('lei') }}</p>
                                            </div>
                                            <div class="flex items-center justify-between">
                                                <p class="text-sm text-gray-400">{{ __('shipping') }}</p>
                                                <p class="text-lg font-semibold text-gray-900">{{ cartStore.shipping }}
                                                    {{ __('lei') }}</p>
                                            </div>
                                        </div>
                                        <div class="mt-6 flex items-center justify-between">
                                            <p class="text-sm font-medium text-gray-900">{{ __('total') }}</p>
                                            <p class="text-2xl font-semibold text-gray-900"><span
                                                class="text-xs font-normal text-gray-400 uppercase">{{
                                                    __('lei')
                                                }}</span>{{ cartStore.totalPrice + cartStore.shipping }}</p>
                                        </div>

                                        <div class="mt-6 text-center">
                                            <button type="button"
                                                    class="group inline-flex w-full items-center justify-center rounded-md bg-1 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-primary-blue">
                                                {{ __('checkout') }}
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     class="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div v-else class="px-4 py-6 sm:px-8 sm:py-10">
                                        <p class="whitespace-nowrap">
                                            {{ __('cart_is_empty') }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

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
            class="hidden md:flex flex-row h-10 md:h-16 md:border-t bg-1 dark:bg-[#011212] dark:md:border-slate-500 xl:px-60">
            <div class="relative z-20
             justify-center items-center bg-[#043B3D] md:w-3/12   dark:bg-dark"
                 @click="toggleSidebar">
                <div class="flex justify-center items-center space-x-3 py-5 z-20">
                    <bars3-icon class="w-[25px] h-[25px] text-black md:text-white dark:text-white"/>
                    <p class="text-2 flex items-center text-base text-black md:text-white dark:text-white uppercase">
                        Catalog</p>
                    <chevron-down-icon v-if="menu" class="w-5 animate-rotateUp text-blue-800"/>
                    <chevron-up-icon v-if="!menu" class="w-5 animate-rotateUp text-blue-800"/>
                </div>
                <div class="">
                    <div ref="sidebar" v-show="menu"
                         class="hidden md:block shadow-lg">
                        <div
                            class="static z-10 bg-2 h-[700px] hide-scrollbar overflow-y-scroll w-full h-auto pb-4 -mt-0.5 shadow-xl dark:bg-dark">
                            <div class="space-y-1 text-2 text-lg bg-gray-200 px-2 font-semibold pt-1">
                                <div
                                    class="flex flex-row space-x-2">
                                    <div
                                        class="w-7 bg-[#eef90a] circle rounded-2xl z-10 h-7 items-center flex justify-center shadow-xl">
                                        <receipt-percent-icon class="w-6"/>
                                    </div>
                                    <a href="">
                                        <div class="flex flex-col">
                                            <p>Atenție Produse</p>
                                            <p class=" text-2 text-sm text-gray-500 transition ease-in-out  hover:text-gray-900 duration-300">
                                                Nu rata
                                                profitul</p>
                                        </div>
                                    </a>

                                </div>
                                <div class="flex flex-row space-x-2">
                                    <star-icon class="w-6"/>
                                    <a href="">
                                        <div class="flex flex-col">
                                            <p>Hit Vânzări</p>
                                            <p class=" text-2 text-sm text-gray-500 transition ease-in-out  hover:text-gray-900 duration-300">
                                                Produse populare</p>
                                        </div>
                                    </a>

                                </div>
                                <div class="flex flex-row space-x-2">
                                    <sparkles-icon class="w-6"/>
                                    <a href="">
                                        <div class="flex flex-col">
                                            <p>Produse Sezoniere</p>
                                            <p class=" text-2 text-sm text-gray-500 transition ease-in-out  hover:text-gray-900 duration-300">
                                                Tot ce iți trebuie pentru toamnă!</p>
                                        </div>
                                    </a>
                                </div>
                                <div class="flex flex-row space-x-2">
                                    <gift-icon class="w-6"/>
                                    <a href="">
                                        <div class="flex flex-col">
                                            <p>Carduri Cadou</p>
                                            <p class=" text-2 text-sm text-gray-500 transition ease-in-out  hover:text-gray-900 duration-300">
                                                Oferă alegere!</p>
                                        </div>
                                    </a>
                                </div>

                            </div>
                            <div class=" text-lg" v-for="category in $page.props.categories">
                                <p class="px-2 py-1 hover:bg-emerald-950 hover:text-white cursor-pointer"
                                >{{
                                        category.name
                                    }}</p>
                            </div>
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
