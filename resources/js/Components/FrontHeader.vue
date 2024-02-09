<script setup>

import {ref} from "vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import {HeartIcon, MagnifyingGlassIcon, ShoppingCartIcon} from "@heroicons/vue/24/outline/index.js";
import SidebarMobile from "@/Components/SidebarMobile.vue";


const menu = ref(false);
const sidebar = ref(null)


const toggleSidebar = () => {
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
                <a href="tel:+37378107017"><p class="text-1 text-lg dark:text-white">078 107 017</p></a>
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

    </div>


    <SidebarMobile :show="menu" @close="toggleSidebar">
        <div class="flex flex-col justify-center px-4 py-2  group text-lg">
            <p v-for="category in  $page.props.categories">{{ category.name }}</p>
            <span>test</span>
        </div>
    </SidebarMobile>


</template>

<style scoped>

</style>
