<template>
    <body class=" dark:bg-dark">
    <Head :title="title"/>

    <FrontNavBar :is-dark="isDark" @darkMode="toggleDark"/>

    <div class="w-full ">


        <div class="">
            <front-header/>
        </div>

        <div id="main-content" class="flex-col justify-between h-screen">
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
    </body>
</template>

<script setup>
import FrontHeader from "@/Components/FrontHeader.vue";
import FrontNavBar from "@/Components/FrontNavBar.vue";
import {useDark, useToggle} from "@vueuse/core";
import {ref} from "vue";


const isDark = ref();
const setDark = useDark();
const changeTheme = useDark({
    onChanged(dark) {
        useToggle(setDark)
        isDark.value = dark;
    }
})

const toggleDark = useToggle(changeTheme);

const props = defineProps({
    currentRoute: String,
    title: String
});


</script>



