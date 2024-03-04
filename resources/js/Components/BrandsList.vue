<script setup>

const props = defineProps({
    brands: {
        required: true,
        type: Object,
    }
})
</script>

<template>

    <div class="static w-16 md:h-20">
        <div
            class="bg-slate-100 dark:bg-white overflow-x-auto hide-scrollbar overflow-a absolute w-full left-0   whitespace-no-wrap ">
            <div class="flex space-x-16 px-4">
                <img v-for="brand in brands"
                     :src="brand.image" :alt="brand.name"
                     class="w-16 md:w-20 grayscale mix-blend-multiply hover:grayscale-0 hover:scale-105 transition-transform duration-300"/>
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>
