<template>
    <Head :title="title"/>
    <div>
        <nav-bar @sidebar="toggleSidebar"/>

        <div class="grid grid-cols-12 bg-gray-50 ">
            <NewToastList/>
            <Sidebar
                :current-route=currentRoute
                :hidden=sidebarHidden
                class="absolute z-10 mt-5 border rounded-t-lg shadow lg:mt-12 lg:col-span-3 xl:col-span-2 lg:relative "></Sidebar>
            <div id="main-content"
                 class="relative justify-between w-full h-screen col-span-12 lg:col-span-9 xl:col-span-10 ">

                <main>

                    <div class=" px-4 pt-[88px]">
                        <slot/>
                    </div>
                </main>
                <footer
                    class="items-center p-4 mx-4 my-6 bg-white rounded-lg shadow hover:content-around md:justify-between lg:content-end md:p-6 xl:p-8">
                    <div class="flex items-center space-x-6 sm:justify-center">
                        <p class="text-sm text-center text-gray-500 ">
                            &copy; {{ page.props.currentYear }} <a class="hover:underline"
                                                                   href="https://itsimple.online"
                                                                   target="_blank">
                            <b>ITSimple</b> </a>.
                            {{ __('rights_reserved') }}.
                        </p>
                    </div>
                </footer>

            </div>
        </div>
    </div>
</template>

<script setup>
import Sidebar from "@/Components/Sidebar.vue";
import NavBar from "@/Components/NavBar.vue";
import {ref} from "vue";
import {Head, usePage} from "@inertiajs/vue3";
import NewToastList from "@/Components/NewToastList.vue";


const props = defineProps({
    title: String,
    currentRoute: String
});

const sidebarHidden = ref(false);


const toggleSidebar = () => {
    sidebarHidden.value = !sidebarHidden.value;
}
const page = usePage()


</script>



