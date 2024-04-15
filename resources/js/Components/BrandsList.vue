<script setup>

const props = defineProps({
    brands: {
        required: true,
        type: Object,
    }
})

const randomColorClass = () => {
    const colorClasses = [
        'bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400',
        'bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-400',
        'bg-gradient-to-r from-green-500 via-green-400 to-teal-400',
        'bg-gradient-to-r from-pink-500 via-pink-400 to-purple-400',
        'bg-gradient-to-r from-red-500 via-red-400 to-pink-400',
        'bg-gradient-to-r from-yellow-500 via-yellow-400 to-green-400',
        'bg-gradient-to-r from-indigo-500 via-indigo-400 to-blue-400',
        'bg-gradient-to-r from-purple-500 via-purple-400 to-pink-400',
        'bg-gradient-to-r from-teal-500 via-teal-400 to-green-400',
        'bg-gradient-to-r from-gray-500 via-gray-400 to-gray-400',
        'bg-gradient-to-r from-blue-500 via-blue-400 to-blue-400',
        'bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-400',
        // Adăugați aici mai multe clase de culori
    ];

    const randomIndex = Math.floor(Math.random() * colorClasses.length);
    return colorClasses[randomIndex];
}
</script>

<template>

    <div
        class="w-full bg-slate-100 p-3 dark:bg-white overflow-x-auto hide-scrollbar flex gap-5">
        <img v-for="brand in brands"
             :src="brand.image" :alt="brand.name"
             class=" p-1 object-contain flex-none w-24 h-16"/>

    </div>

</template>

<style scoped>

</style>

<!--<div class="static w-16 md:h-20">-->
<!--<div-->
<!--    class="bg-slate-100 dark:bg-white overflow-x-auto hide-scrollbar overflow-a absolute w-full left-0   whitespace-no-wrap ">-->
<!--    <div class="flex space-x-16 px-4">-->
<!--        <img v-for="brand in brands"-->
<!--             :src="brand.image" :alt="brand.name"-->
<!--             class="container-custom-rounded p-2 bg-1 bg-[#00000012]  object-cover w-16 md:w-20   mix-blend-multiply"/>-->
<!--    </div>-->
<!--</div>-->
<!--</div>-->
