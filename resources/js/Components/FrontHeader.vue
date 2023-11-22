<script setup>

import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import {Bars3Icon, ChevronDownIcon, HeartIcon, ShoppingCartIcon} from "@heroicons/vue/24/outline/index.js";
</script>

<template>
    <div class="h-[94px] bg-2 flex flex-row justify-center border-b ">
        <div class="w-2/4 flex flex-row ">
            <div class="w-2/3  flex items-center justify-center">
                <application-logo :w="'w-60'"/>
            </div>
            <div class="w-2/3  flex flex-col justify-center  items-center">
                <p class="text-1">022 268 000</p>
                <div class="cursor-pointer text-b-link ">Revenim cu un apel?</div>
            </div>
            <div class="w-2/3  flex flex-row space-x-3 justify-center items-center">
                <div class="flex flex-col text-3 text-[#868686]">
                    <p>Lu - Vi</p>
                    <p>Sâmbătă</p>
                    <p>Duminică</p>
                </div>
                <div class="flex flex-col items-center text-3">
                    <p>08.00 - 19.00</p>
                    <p>08.00 - 17.00</p>
                    <p>10.00 - 15.00</p>
                </div>
            </div>
        </div>
        <div class="w-2/6 flex flex-row ">
            <div class="w-2/3  border-red-600 flex justify-center items-center">
                <div class="flex flex-col items-center justify-center">
                    <p class="text-1 text-xl">Alături la fiecare etapă în viață</p>
                    <p class="text-1-secondary">Confortul tău - prioritatea noastră!</p>
                </div>
            </div>
            <div class="w-2/6  border-red-600 flex flex-row justify-center  space-x-8">
                <heart-icon class="w-6"/>
                <shopping-cart-icon class="w-6"/>
            </div>
        </div>
    </div>
    <div class="flex flex-row h-20 ">
        <div class="w-2/6 flex justify-center items-center border-x">
            <div class="space-x-2 flex justify-center w-1/2">
                <bars3-icon class="w-[28px] h-[28px]"/>
                <p class="font-mulish font-semibold text-xl uppercase">Catalog</p>
            </div>
            <div class="flex">
                <chevron-down-icon class="w-[18px] h-[18px]"/>
            </div>

        </div>
        <div class="w-2/3 py-6 pl-8  flex justify-center">
            <input class="w-full rounded-md p-4 ">
        </div>
    </div>
</template>

<style scoped>

</style>
