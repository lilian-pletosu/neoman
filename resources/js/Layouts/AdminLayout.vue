<template>
    <Head :title="title"/>
    <div>
        <nav-bar @sidebar="toggleSidebar"/>

        <div class="grid grid-cols-12 bg-white ">
            <Sidebar class="col-span-2" :hidden=sidebarHidden :current-route=currentRoute></Sidebar>
            <div id="main-content "
                 class="col-span-10 flex flex-col justify-between h-screen w-full bg-gray-50 relative ">
                <main>
                    <div class=" px-4 pt-[88px]">
                        <slot/>
                    </div>
                </main>
                <footer
                    class=" hover:content-around  bg-white items-center md:justify-between lg:content-end shadow rounded-lg p-4 md:p-6 xl:p-8 my-6 mx-4">
                    <div class="flex items-center sm:justify-center space-x-6">
                        <p class="text-center text-sm text-gray-500 ">
                            &copy; {{ currentYear }} <a href="https://itsimple.online" class="hover:underline"
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

<script>
import Sidebar from "@/Components/Sidebar.vue";
import NavBar from "@/Components/NavBar.vue";
import {defineComponent} from "vue";
import {Notification, NotificationGroup} from "notiwind";
import {Head} from "@inertiajs/vue3";
import CustomNotification from "@/Components/CustomNotification.vue";


export default defineComponent({
    components: {CustomNotification, Notification, NotificationGroup, NavBar, Sidebar, Head},
    props: {
        currentRoute: String,
        title: String
    },
    data() {
        return {
            sidebarHidden: Boolean
        };
    },
    methods: {
        toggleSidebar() {
            this.sidebarHidden = !this.sidebarHidden;
        }
    }

})
</script>



