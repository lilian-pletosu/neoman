<script setup>
import {onMounted, ref} from 'vue';
import {useScroll} from '@vueuse/core'

const props = defineProps({
    brands: {
        required: true,
        type: Object,
    }
})

const duplicatedBrands = ref([...props.brands, ...props.brands]);

onMounted(() => {
    const trackElement = document.querySelector('.carousel-track');

    trackElement.addEventListener('scroll', () => {
        const {scrollLeft, scrollWidth, clientWidth} = trackElement;

        if (scrollLeft + clientWidth >= scrollWidth) {
            duplicatedBrands.value = [...duplicatedBrands.value, ...props.brands];
        }
    });
});


let intervalId;

onMounted(() => {
    intervalId = setInterval(() => {
        x.value += 1;
    }, 30); // 1000 ms = 1 secundă
});

const el = ref(null);
const {x, y} = useScroll(el)
//

let isDragging = ref(false);
let startX = ref(0);
let scrollLeft = ref(0);

const startDrag = (e) => {
    isDragging.value = true;
    startX.value = e.pageX - el.value.offsetLeft;
    scrollLeft.value = el.value.scrollLeft;
};

const endDrag = () => {
    isDragging.value = false;
};

const drag = (e) => {
    if (!isDragging.value) return;
    const x = e.pageX - el.value.offsetLeft;
    const scroll = x - startX.value;
    el.value.scrollLeft = scrollLeft.value - scroll;
};
</script>

<template>
    <div ref="el" class="carousel-track gap-4 pt-2 w-full hide-scrollbar"
         @mousedown="startDrag"
         @mouseleave="endDrag"
         @mouseup="endDrag"
         @mousemove="drag"
    >
        <img
            v-for="(brand, index) in duplicatedBrands"
            :key="index"
            :src="brand.image"
            :alt="brand.name"
            @click="alert('click')"
            class="bg-3 p-3 object-contain flex-none border rounded-xl w-24 h-16 md:w-32 md:h-24 pointer-events-none"
        />
    </div>
</template>

<style scoped>
.carousel-track {
    display: inline-flex;
    animation: scroll 20s linear infinite;
    overflow-x: auto;
}


</style>
