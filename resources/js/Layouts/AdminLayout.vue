<template>
  <div>
    <nav-bar @sidebar="toggleSidebar"/>
    <div class="flex  overflow-hidden bg-white pt-16">
      <Sidebar :hidden=sidebarHidden :current-route=currentRoute></Sidebar>
      <div class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
      <div id="main-content" class="h-screen w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
        <main>
          <div class="pt-6 px-4">
            <slot/>
          </div>
        </main>
        <footer
            class=" hover:content-around items-center bg-white  items-center md:justify-between lg:content-end shadow rounded-lg p-4 md:p-6 xl:p-8 my-6 mx-4">
          <div class="flex items-center sm:justify-center space-x-6">
            <p class="text-center text-sm text-gray-500 ">
              &copy; {{ currentYear }} <a href="https://itsimple.online" class="hover:underline" target="_blank">
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


export default defineComponent({
  components: {Notification, NotificationGroup, NavBar, Sidebar},
  props: {
    currentRoute: String
  },
  data() {
    return {
      sidebarHidden: Boolean
    };
  },
  methods: {
    toggleSidebar() {
      console.log(this.sidebarHidden);
      this.sidebarHidden = !this.sidebarHidden;
    }
  }

})
</script>



