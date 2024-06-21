<script setup>

import 'vue3-carousel/dist/carousel.css'
import {Carousel, Navigation, Slide} from 'vue3-carousel'
import {getCurrentInstance} from "vue";
import {Link} from "@inertiajs/vue3";

const app = getCurrentInstance();
</script>

<template>
    <carousel :autoplay="5000" :wrap-around="true" :items-to-show="1" class="w-screen z-0"
              :transition="500">
        <slide v-for="(slide, index) in app.appContext.config.globalProperties.$page.props.home_banners" :key="index">
            <Link :href="slide.link">
                <img class="object-cover w-screen flex"
                     :src="slide.image" :alt="slide.title">
            </Link>
        </slide>
        <template #addons>
            <Navigation/>
            <Pagination/>
        </template>

    </carousel>


</template>-

<style scoped>
.no-padding {
    padding: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
}
</style>
