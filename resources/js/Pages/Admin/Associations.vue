<template>
    <admin-layout :current-route="initialRoute" :title="Products">
        <div class="w-full grid grid-cols-1  gap-4">
            <div class="container-rounded ">

                <div class="mb-4 flex items-center justify-between">
                    <div>
                        <h3 class="primary-text">{{ __('associations') }}</h3>
                        <span class="secondary-text">This is a list of latest transactions</span>
                    </div>
                    <div class="flex-shrink-0">
                        <a href="#" class="text-link-blue">View all</a>
                    </div>
                </div>
                <div class="flex flex-col mt-8">
                    <div class="overflow-x-auto rounded-lg">
                        <!--                            <data-table/>-->
                    </div>
                </div>


            </div>

        </div>
    </admin-layout>
</template>

<script setup>
import {defineComponent} from 'vue'
import AdminLayout from "@/Layouts/AdminLayout.vue";
import {Link} from "@inertiajs/vue3";


defineProps({
    initialRoute: {
        type: String
    },
});
defineComponent({
    name: "Products",

    components: {
        AdminLayout,
        Link,
    },

    data() {
        return {
            data: Array
        }
    }
})
</script>
