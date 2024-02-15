<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },

});
</script>

<template>
    <div class="pt-4 space-y-8 ">
        <div>
            <p class="text-2xl text-2">{{ title }}</p>
        </div>

        <div class="flex flex-row flex-nowrap space-x-2">
            <div class="basis-1/2 border container-simple flex justify-center ">
                <img class="bg-1" src="https://supraten.md/image/catalog/old/products/78095.jpg" alt="">
            </div>
            <div class="basis-1/4 border container-simple">
                <img class="bg-1" src="https://supraten.md/image/catalog/old/products/78095.jpg" alt="">
            </div>
            <div class="basis-1/4 border container-simple">
                <img class="bg-1" src="https://supraten.md/image/catalog/old/products/78095.jpg" alt="">
            </div>
            <div class="basis-1/4 border container-simple">
                <img class="bg-1" src="https://supraten.md/image/catalog/old/products/78095.jpg" alt="">
            </div>
            <div class="basis-1/4 border container-simple">
                <img class="bg-1" src="https://supraten.md/image/catalog/old/products/78095.jpg" alt="">
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>
