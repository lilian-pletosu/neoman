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
        <div class="px-2 py-2 flex flex-row items-center space-x-1 xl:px-60">
            <div class="flex-1 flex justify-center">
                <a href="/home">
                    <application-logo class="flex w-56 "/>
                </a>
            </div>
            <div class="flex flex-1 flex-col text-center ">
                <a href="tel:+40770247678"><p class="text-1 text-lg">022 268 000</p></a>
                <p class="cursor-pointer underline text-b-link text-xs pointer md:text-sm">Revenim cu un apel?</p>
            </div>
            <div class="hidden md:flex flex-1 flex justify-center space-x-2">
                <div class="flex flex-col text-3 text-[#868686]">
                    <p>Lu - Vi</p>
                    <p>Sâmbătă</p>
                    <p>Duminică</p>
                </div>
                <div class="grid grid-cols-1 items-center font-mulish font-normal text-xs">
                    <p class="">08.00 - 19.00</p>
                    <p>08.00 - 17.00</p>
                    <p>10.00 - 15.00</p>
                </div>
            </div>
            <div class="hidden lg:flex flex-1  flex-col text-center">
                <p class="text-1 text-sm 2xl:text-xl">
                    Alături la fiecare etapă în viață</p>
                <p class="text-2 text-sm ">Confortul tău - prioritatea noastră!</p>
            </div>
            <div class="flex-initial lg:w-1/12 flex justify-end space-x-6">
                <heart-icon class="w-6"/>
                <shopping-cart-icon class="w-6"/>
            </div>
        </div>
        <div class="flex flex-row h-10 md:h-16 md:border-t xl:px-60">
            <div class="flex-initial cursor-pointer w-full bg-1 flex
             justify-center items-center space-x-2 md:w-3/12 md:border-r md:bg-white "
                 @click="openMenu">
                <bars3-icon class="w-[25px] h-[25px] text-white md:text-black"/>
                <p class="text-2 text-base text-white md:text-black">Catalog</p>
                <chevron-down-icon v-if="menu" class="w-3 text-blue-800"/>
                <chevron-up-icon v-if="!menu" class="w-3 text-blue-800"/>
            </div>
            <div class=" hidden md:flex flex-1 items-center justify-end pl-4 md:pr-2 xl:pr-0">
                <div class="relative h-10  w-full ">
                    <div
                        class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
                        <magnifying-glass-icon class="w-6"/>
                    </div>
                    <input
                        class=" h-full w-full rounded-md  px-3 py-2.5 !pr-9 font-mulish text-sm font-normal  focus:border-none focus:outline-none"
                        placeholder="Caută un produs..."
                    />
                </div>
            </div>
        </div>
    </div>


    <div ref="sidebar" v-show="menu" class="flex md:hidden ease-in duration-300">
        <div
            class="fixed z-10 top-0 bg-2 h-5/6  overflow-y-scroll flex flex-col space-y-2 px-4 pt-2 shadow-xl dark:bg-dark rounded-r-xl w-3/4  sm:w-1/2 ">
            <div class="flex justify-between">
                <p class="text-2 text-lg uppercase dark:text-white">Catalog</p>
                <x-mark-icon class="w-5 dark:text-white cursor-pointer" @click="openMenu"/>
            </div>
            <hr>
            <div class="space-y-1 text-2 text-lg font-semibold">
                <div
                    class="flex flex-row space-x-2">
                    <receipt-percent-icon class="w-6"/>
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
            <div class="space-y-2">
                <p v-for="(item) in 20">{{ 'item' + ' ' + item }}</p>
            </div>
        </div>
    </div>


    <!--    <div class="py-3 items-center">-->
    <!--        <div class="flex flex-row space-x-4 justify-center justify-around sm:px-4">-->
    <!--            &lt;!&ndash;        <div class="flex flex-row space-x-4 justify-center sm:px-[80px] md:px-[100px] lg:px-60  2xl:px-96">&ndash;&gt;-->
    <!--            &lt;!&ndash;     logo, phone and graphic    &ndash;&gt;-->
    <!--            <div class="w-2/4 sm:w-auto flex justify-between flex-row space-x-4">-->
    <!--                <div class="flex items-center justify-center">-->
    <!--                    <application-logo :w="'w-60'"/>-->
    <!--                </div>-->
    <!--                <div class="hidden xl:flex flex-col text-center     justify-center items-center">-->
    <!--                    <p class="text-1">022 268 000</p>-->
    <!--                    <div class="cursor-pointer text-b-link ">Revenim cu un apel?</div>-->
    <!--                </div>-->

    <!--            </div>-->
    <!--            <div-->
    <!--                class="hidden  lg:flex flex-row lg:flex-2 w-2/5 justify-center  xl:flex  flex-row space-x-3 justify-center items-center">-->
    <!--                <div class="flex flex-col text-3 text-[#868686]">-->
    <!--                    <p>Lu - Vi</p>-->
    <!--                    <p>Sâmbătă</p>-->
    <!--                    <p>Duminică</p>-->
    <!--                </div>-->
    <!--                <div class="grid grid-cols-1 items-center font-mulish font-normal text-xs">-->
    <!--                    <p class="">08.00 - 19.00</p>-->
    <!--                    <p>08.00 - 17.00</p>-->
    <!--                    <p>10.00 - 15.00</p>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--            &lt;!&ndash;           slogan  &ndash;&gt;-->
    <!--            <div class="hidden sm:flex  lg:flex-1  justify-center flex-row ">-->
    <!--                <div class="w-auto w-2/3  border-red-600 flex justify-center text-center items-center">-->
    <!--                    <div class="flex flex-col items-center justify-center">-->
    <!--                        <p class="text-1 text-xs md:text-sm lg:text-base  xl:text-lg 2xl:text-xl ">Alături la fiecare-->
    <!--                            etapă-->
    <!--                            în-->
    <!--                            viață</p>-->
    <!--                        <p class="text-2 text-xs">Confortul tău - prioritatea noastră!</p>-->
    <!--                    </div>-->
    <!--                </div>-->

    <!--            </div>-->
    <!--            &lt;!&ndash;            wishlist and basket&ndash;&gt;-->
    <!--            <div class="w-1/8  border-red-600 flex  justify-between   space-x-8">-->
    <!--                <heart-icon class="w-6"/>-->
    <!--                <shopping-cart-icon class="w-6"/>-->
    <!--            </div>-->
    <!--        </div>-->

    <!--    </div>-->
    <!--    &lt;!&ndash;  Search input  &ndash;&gt;-->
    <!--    <div class="py-2 px-4 lg:hidden">-->
    <!--        <div class="w-full">-->
    <!--            <div class="relative h-10 w-full ">-->
    <!--                <div-->
    <!--                    class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">-->
    <!--                    <magnifying-glass-icon class="w-6 text-red-600"/>-->
    <!--                </div>-->
    <!--                <input-->
    <!--                    class=" h-full w-full rounded-full  px-3 py-2.5 !pr-9 font-mulish text-sm font-normal  focus:border-none focus:outline-none"-->
    <!--                    placeholder="Caută un produs..."-->
    <!--                />-->
    <!--            </div>-->
    <!--        </div>-->
    <!--    </div>-->
    <!--    &lt;!&ndash;    Menu&ndash;&gt;-->
    <!--    <div class="">-->
    <!--        <div class="flex flex-row justify-center  2xl:px-60 ">-->
    <!--            &lt;!&ndash;            <div class="relative w-full h-24 md:h-12  lg:w-96 h-auto flex justify-center  border-r  bg-gray-100">&ndash;&gt;-->
    <!--            <div-->
    <!--                class="relative  w-full flex justify-center text-white bg-1 h-12 lg:h-auto lg:text-black  lg:bg-white border-r">-->
    <!--                &lt;!&ndash;                class="relative bg-gray-200 w-full flex justify-center h-12 text-white border-r lg:text-black bg-black&ndash;&gt;-->
    <!--                <div class="flex justify-between space-x-4 items-center cursor-pointer" @click="openMenu">-->
    <!--                    <div class=" flex justify-center space-x-4">-->
    <!--                        <bars3-icon class="w-[28px] h-[28px]"/>-->
    <!--                        <p class="font-mulish font-semibold text-xl uppercase">Catalog</p>-->
    <!--                    </div>-->
    <!--                    <div class="flex">-->
    <!--                        <chevron-down-icon v-if="onHover" class="text-cyan-600 w-[18px] h-[18px]"/>-->
    <!--                        <chevron-up-icon v-if="!onHover" class="text-cyan-600 w-[18px] h-[18px]"/>-->
    <!--                    </div>-->
    <!--                </div>-->


    <!--                &lt;!&ndash;                sidebar&ndash;&gt;-->
    <!--                &lt;!&ndash; component &ndash;&gt;-->
    <!--                <div v-if="onHover" ref="sidebar" class="flex lg:hidden">-->
    <!--                    <div-->
    <!--                        class="fixed top-0 left-0 z-10 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(100vh-2rem)] max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">-->
    <!--                        <div class="cursor-pointer text-gray-300 text-2xl flex justify-end"-->
    <!--                             @click="openMenu">×-->
    <!--                        </div>-->

    <!--                        <div class="mb-2 p-4 flex justify-between">-->
    <!--                            <h5 class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">-->
    <!--                                Catalog</h5>-->

    <!--                        </div>-->
    <!--                        <nav-->
    <!--                            class="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">-->
    <!--                            <div role="button" tabindex="0"-->
    <!--                                 class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">-->
    <!--                                <div class="grid place-items-center mr-4">-->
    <!--                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"-->
    <!--                                         aria-hidden="true" class="h-5 w-5">-->
    <!--                                        <path fill-rule="evenodd"-->
    <!--                                              d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"-->
    <!--                                              clip-rule="evenodd"></path>-->
    <!--                                    </svg>-->
    <!--                                </div>-->
    <!--                                Blocks-->
    <!--                            </div>-->
    <!--                            <div role="button" tabindex="0"-->
    <!--                                 class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">-->
    <!--                                <div class="grid place-items-center mr-4">-->
    <!--                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"-->
    <!--                                         aria-hidden="true" class="h-5 w-5">-->
    <!--                                        <path fill-rule="evenodd"-->
    <!--                                              d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"-->
    <!--                                              clip-rule="evenodd"></path>-->
    <!--                                    </svg>-->
    <!--                                </div>-->
    <!--                                Books-->
    <!--                            </div>-->
    <!--                            <div role="button" tabindex="0"-->
    <!--                                 class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">-->
    <!--                                <div class="grid place-items-center mr-4">-->
    <!--                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"-->
    <!--                                         aria-hidden="true" class="h-5 w-5">-->
    <!--                                        <path fill-rule="evenodd"-->
    <!--                                              d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z"-->
    <!--                                              clip-rule="evenodd"></path>-->
    <!--                                    </svg>-->
    <!--                                </div>-->
    <!--                                Example Pages-->
    <!--                                <div class="grid place-items-center ml-auto justify-self-end">-->
    <!--                                    <div-->
    <!--                                        class="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-blue-500/20 text-blue-900 py-1 px-2 text-xs rounded-full"-->
    <!--                                        style="opacity: 1;">-->
    <!--                                        <span class="">14</span>-->
    <!--                                    </div>-->
    <!--                                </div>-->
    <!--                            </div>-->
    <!--                            <div role="button" tabindex="0"-->
    <!--                                 class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">-->
    <!--                                <div class="grid place-items-center mr-4">-->
    <!--                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"-->
    <!--                                         aria-hidden="true" class="h-5 w-5">-->
    <!--                                        <path fill-rule="evenodd"-->
    <!--                                              d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"-->
    <!--                                              clip-rule="evenodd"></path>-->
    <!--                                    </svg>-->
    <!--                                </div>-->
    <!--                                Profile-->
    <!--                            </div>-->
    <!--                            <div role="button" tabindex="0"-->
    <!--                                 class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">-->
    <!--                                <div class="grid place-items-center mr-4">-->
    <!--                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"-->
    <!--                                         aria-hidden="true" class="h-5 w-5">-->
    <!--                                        <path fill-rule="evenodd"-->
    <!--                                              d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"-->
    <!--                                              clip-rule="evenodd"></path>-->
    <!--                                    </svg>-->
    <!--                                </div>-->
    <!--                                Settings-->
    <!--                            </div>-->
    <!--                            <div role="button" tabindex="0"-->
    <!--                                 class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">-->
    <!--                                <div class="grid place-items-center mr-4">-->
    <!--                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"-->
    <!--                                         aria-hidden="true" class="h-5 w-5">-->
    <!--                                        <path fill-rule="evenodd"-->
    <!--                                              d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"-->
    <!--                                              clip-rule="evenodd"></path>-->
    <!--                                    </svg>-->
    <!--                                </div>-->
    <!--                                Log Out-->
    <!--                            </div>-->
    <!--                        </nav>-->
    <!--                    </div>-->
    <!--                </div>-->
    <!--                &lt;!&ndash;                end sidebar&ndash;&gt;-->

    <!--                <div v-if="onHover"-->
    <!--                     class="hidden lg:block mt-[88px] transition duration-700  ease-in-out w-full bg-white mt-[48px] absolute z-10">-->
    <!--                    <ul class="px-4 h-auto max-h-96 border-x border-b divide-y overflow-auto">-->
    <!--                        <li class="text-2 font-semibold  text-lg">Atentie Promotie</li>-->

    <!--                        <li class="text-2 font-semibold  text-lg">Hit Vanzari</li>-->
    <!--                        <li class="text-2 font-semibold  text-lg">Produse Sezoniere</li>-->
    <!--                        <li>sss</li>-->
    <!--                        <li>sss</li>-->
    <!--                        <li>sss</li>-->
    <!--                    </ul>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--            &lt;!&ndash;            <div class="hidden  lg:flex py-6 w-full  xl:w-full px-4 w-2/3 pl-8 justify-center">&ndash;&gt;-->
    <!--            <div class="hidden   lg:flex lg:px-24 py-6 w-full px-36 xl:px-24  w-2/3 pl-8">-->
    <!--                <div class="w-full">-->
    <!--                    <div class="relative h-10 w-full ">-->
    <!--                        <div-->
    <!--                            class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">-->
    <!--                            <magnifying-glass-icon class="w-6"/>-->
    <!--                        </div>-->
    <!--                        <input-->
    <!--                            class=" h-full w-full rounded-md  px-3 py-2.5 !pr-9 font-mulish text-sm font-normal  focus:border-none focus:outline-none"-->
    <!--                            placeholder="Caută un produs..."-->
    <!--                        />-->
    <!--                    </div>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--        </div>-->
    <!--    </div>-->
</template>

<style scoped>

</style>
