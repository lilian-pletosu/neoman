<script setup>

import 'vue3-carousel/dist/carousel.css'
import {Carousel, Slide} from 'vue3-carousel'
import {getCurrentInstance} from "vue";

const app = getCurrentInstance();

const props = defineProps({
    images: {
        type: Object,
        required: true
    },
})
</script>

<template>
    <carousel :autoplay="5000" :wrap-around="true" :items-to-show="1" class="w-full z-0"
              :transition="500">
        <slide v-for="(slide, index) in app.appContext.config.globalProperties.$page.props.home_banners" :key="index">
            <img class="object-cover w-full flex"
                 :src="slide.image" :alt="index">
        </slide>

    </carousel>


</template>-

<style scoped>
.no-padding {
    padding: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
}
</style>
