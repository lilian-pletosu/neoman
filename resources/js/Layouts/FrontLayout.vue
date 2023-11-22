<template>
    <Head :title="title"/>

    <FrontNavBar/>

    <div class="w-full sm:px-[80px] md:px-[100px] lg:px-60">
        <div id="main-content" class=" flex-col justify-between h-screen ">
            <FrontHeader/>
            <main class="border-2">
                <div class="px-4 ">
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


export default defineComponent({
    components: {FrontNavBar, FrontHeader},
    props: {
        currentRoute: String,
        title: String
    },


})
</script>



