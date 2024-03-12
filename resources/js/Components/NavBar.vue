<template>
    <nav class="bg-white  fixed z-30 w-full">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
                <div class="flex items-center justify-start">
                    <button @click="$emit('sidebar')" v-on:click="changeMenuIcon" aria-expanded="true"
                            aria-controls="sidebar"
                            class="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                        <svg :class="{'hidden' : isOpen}" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                  clip-rule="evenodd"></path>
                        </svg>
                        <svg :class="{'hidden' : !isOpen}" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clip-rule="evenodd"></path>
                        </svg>

                    </button>
                    <a href="/admin/dashboard" class="text-2xl font-bold flex items-center lg:ml-2.5">
                        <short-logo w="w-7" class="mr-2"/>
                        <span class="self-center whitespace-nowrap">Neoman</span>
                    </a>
                    <form action="#" method="GET" class="hidden lg:block lg:pl-32">
                        <label for="topbar-search" class="sr-only">Search</label>
                        <div class="mt-1 relative lg:w-64">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                          clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <input type="text" name="email" id="topbar-search"
                                   class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5"
                                   placeholder="Search">
                        </div>
                    </form>
                </div>

                <div class="flex items-center">

                    <div class="flex items-center">
                        <div class="hidden lg:flex items-center">
                            <span class="text-base font-normal text-gray-500 mr-5">Hello, {{
                                    $page.props.auth.user.name
                                }} ❤️</span>
                        </div>
                        <span class="text-base font-normal text-gray-500 mr-5 ">
                                <Dropdown :align='left'>
                                <template #trigger>
                                            <span class="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    <img :src="'/flags/' + $page.props.currentLocale + '_64.png'"
                                                         class="w-5 inline mr-2">

                                                    <svg
                                                        class=" -mr-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clip-rule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                </template>
                                <template #content>
                                    <ul class="px-2">
                                        <li class="hover:bg-gray-100"><a :href="route('language', {'locale': 'ru'})">Русский</a></li>
                                        <li class="hover:bg-gray-100"><a :href="route('language', {'locale': 'ro'})">Română</a></li>
                                    </ul>
                                </template>
                            </Dropdown></span>

                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import Dropdown from "@/Components/Dropdown.vue";
import {defineComponent} from "vue";
import ShortLogo from "@/Components/ShortLogo.vue";

export default defineComponent({

    components: {
        ShortLogo,
        Dropdown
    },

    data() {
        return {
            isOpen: false,
        }
    },

    methods: {
        changeMenuIcon() {
            this.isOpen = !this.isOpen
        }
    }
})

</script>

