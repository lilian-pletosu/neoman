<template>
    <div class="bg-white border border-gray-300 rounded-xl p-2 py-3 my-2">
        <div class="flex items-start gap-4">
            <div class="w-7 ">
                <InformationCircleIcon class="text-blue-800"/>
            </div>

            <div class="flex-1">
                <p class="mt-1 text-sm text-gray-700">{{ message }}</p>
            </div>

            <button class="text-gray-500 transition hover:text-gray-600" @click="emit('remove')">
                <span class="sr-only">Dismiss popup</span>

                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    </div>

</template>

<script setup>
import {onMounted} from "vue";
import {InformationCircleIcon} from "@heroicons/vue/24/outline/index.js";

const emit = defineEmits(['remove'])

const props = defineProps({
    message: String
});

onMounted(() => {
    setTimeout(() => {
        emit('remove')
    }, 3000)
});


</script>
