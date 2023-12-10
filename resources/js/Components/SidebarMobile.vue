<script setup>
import {XMarkIcon} from "@heroicons/vue/24/outline/index.js";

const props = defineProps({
    show: Boolean
})
</script>

<template>
    <div v-if="show" @click="$emit('close')"
         class="h-screen fixed top-0 left-0 w-full"></div>
    <div
        class=" fixed bg-slate-100 w-8/12 h-screen top-0 left-0 z-10 transition-all duration-600 md:hidden"
        :class="show ? 'left-0' : '-left-full'">
        <x-mark-icon v-on:click="$emit('close')"
                     class="absolute right-0 cursor-pointer w-5 m-2 hover:text-red-500 transition"/>
        <slot></slot>
    </div>
</template>

<style scoped>

</style>
