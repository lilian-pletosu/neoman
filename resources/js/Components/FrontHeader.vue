<script setup>

import {ref} from "vue";
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


const menu = ref(false);
const sidebar = ref(null)
const callModal = ref(false);


const toggleSidebar = () => {
    menu.value = !menu.value
}
// onClickOutside(sidebar, (event) => menu.value ? menu.value = false : menu.value = false)


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
            <div class="flex  w-1/6  lg:w-1/12 flex justify-end space-x-6 dark:text-white">
                <heart-icon class="w-7"/>
                <shopping-cart-icon class="w-7"/>
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
            class="flex hidden md:flex flex-row h-10 md:h-16 md:border-t bg-1 dark:bg-[#011212] dark:md:border-slate-500 xl:px-60">
            <div class="relative z-20
             justify-center items-center bg-[#043B3D] md:w-3/12   dark:bg-dark"
                 @click="toggleSidebar">
                <div class="flex justify-center items-center space-x-3 py-5">
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
