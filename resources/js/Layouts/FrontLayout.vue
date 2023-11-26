<template>
    <Head :title="title"/>

    <FrontNavBar/>

    <div class="w-full ">


        <div class="">
            <front-header/>
        </div>

        <div id="main-content" class="   flex-col justify-between h-screen ">
            <main class="">
                <div class="">
                    <slot name="carousel"/>
                </div>
                <div class="px-4 sm:px-[80px] md:px-[100px] lg:px-60 ">
                    <slot/>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import {defineComponent} from "vue";
import FrontHeader from "@/Components/FrontHeader.vue";
import FrontNavBar from "@/Components/FrontNavBar.vue";
import CarouselFront from "@/Components/CarouselFront.vue";


export default defineComponent({
    components: {CarouselFront, FrontNavBar, FrontHeader},
    props: {
        currentRoute: String,
        title: String
    },


})
</script>



