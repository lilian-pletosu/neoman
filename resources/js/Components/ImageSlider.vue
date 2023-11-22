<script setup>
import {onMounted, ref} from "vue";

const props = defineProps({
    images: {
        type: Object,
        required: true,
    },
    columns: {
        type: Array,
        required: true
    },
    resourceType: {
        type: String,
        required: true
    }
})

const currentSlideIndex = ref(0);
const maxSlideIndex = ref(0);

const nextSlide = () => {
    if (currentSlideIndex.value >= maxSlideIndex.value - 1) {
        currentSlideIndex.value = 0
    } else {
        currentSlideIndex.value++;
    }
}
const previousSlide = () => {
    if (currentSlideIndex.value <= 0) {
        return currentSlideIndex.value = maxSlideIndex.value - 1;
    }
    return currentSlideIndex.value--;
}

const indexes = () => {
    for (let column of props.columns) {
        if (['image', 'images'].includes(column.label)) {
            for (let columnElement of column.fields) {
                if (props.images[columnElement] != null) {
                    maxSlideIndex.value++
                }
            }
        }
    }
}

onMounted(() => {
    indexes()
})
</script>

<template>
    <div id="default-carousel" class="relative w-full" data-carousel="slide">
        <!-- Carousel wrapper -->
        <div class="relative h-56 overflow-hidden rounded-lg md:h-96 ">
            <!-- Item 1 -->
            <div class="duration-700 ease-in-out" data-carousel-item>
                <template v-for="column in columns">
                    <template v-if="['image', 'images'].includes(column.label)">
                        <template v-if="images[column.fields[currentSlideIndex]] != null">
                            <img
                                :src="asset(`/storage/${resourceType}s/${images[column.fields[currentSlideIndex]]}`)"
                                class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                alt="">
                        </template>
                        <template v-if="images[column.fields[currentSlideIndex]] === null">
                            <img
                                :src="'/img/no_image.svg'"
                                class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                alt="">
                        </template>
                    </template>
                </template>
            </div>
        </div>
        <!-- Slider indicators -->
        <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
            <div v-for="(image, index) in images" :key="index">
                <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1"
                        data-carousel-slide-to="0"></button>
            </div>
        </div>
        <!-- Slider controls -->
        <button type="button"
                @click="previousSlide"
                class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev>
        <span
            class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
        </span>
        </button>
        <button type="button"
                @click="nextSlide"
                class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next>
        <span
            class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
        </span>
        </button>
    </div>
</template>


