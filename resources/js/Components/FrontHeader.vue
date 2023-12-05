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
    StarIcon,
    XMarkIcon
} from "@heroicons/vue/24/outline/index.js";


const menu = ref(false);
const sidebar = ref(null)


const openMenu = () => {
    console.log('menu')
    menu.value = !menu.value
}

// onClickOutside(sidebar, (event) => menu.value ? menu.value = false : menu.value = false)


</script>

<template>
    <div id="header">
        <div class="px-2 py-2 flex justify-center  items-center space-x-1 xl:px-60">
            <div class="flex-1 flex justify-center">
                <a href="/home">
                    <application-logo class="flex w-56 "/>
                </a>
            </div>
            <div class="flex flex-1 flex-col text-center ">
                <a href="tel:+40770247678"><p class="text-1 text-lg dark:text-white">022 268 000</p></a>
                <p class="cursor-pointer underline text-b-link text-xs pointer md:text-sm">Revenim cu un apel?</p>
            </div>
            <div class="hidden md:flex flex-1 flex justify-center space-x-2">
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
        <div class="flex flex-row h-10 md:h-16 md:border-t dark:md:border-slate-500 xl:px-60">
            <div class="flex-initial cursor-pointer w-full bg-1 flex
             justify-center items-center space-x-2 md:w-3/12 md:border-x dark:md:border-slate-500 md:bg-white dark:bg-dark "
                 @click="openMenu">
                <bars3-icon class="w-[25px] h-[25px] text-white md:text-black dark:text-white"/>
                <p class="text-2 text-base text-white md:text-black dark:text-white uppercase">Catalog</p>
                <chevron-down-icon v-if="menu" class="w-5 text-blue-800"/>
                <chevron-up-icon v-if="!menu" class="w-5 text-blue-800"/>
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


    <div ref="sidebar" v-show="menu" class="flex md:hidden ease-in duration-300">
        <div
            class="fixed z-10 top-0 bg-2 h-full hide-scrollbar overflow-y-scroll  flex flex-col   shadow-xl dark:bg-dark rounded-r-xl w-3/4  sm:w-1/2 ">
            <x-mark-icon class="absolute right-2 top-2 w-5 dark:text-white cursor-pointer" @click="openMenu"/>
            <div class="flex p-2 ">
                <application-logo/>
            </div>
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
            <div class="space-y-2 px-2 ">
                <p v-for="(item) in 20">{{ 'Categorie' + ' ' + item }}</p>
            </div>
        </div>
    </div>
    <div ref="sidebar" v-show="menu" class="hidden  md:flex ease-in duration-300">
        <div
            class="fixed z-10 bg-2 h-full hide-scrollbar overflow-y-scroll  shadow-xl dark:bg-dark rounded-r-xl  sm:w-1/2 ">
            <x-mark-icon class="absolute right-2 top-2 w-5 dark:text-white cursor-pointer" @click="openMenu"/>

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
            <div class="space-y-2 px-2 ">
                <p v-for="(item) in 20">{{ 'Categorie' + ' ' + item }}</p>
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>
