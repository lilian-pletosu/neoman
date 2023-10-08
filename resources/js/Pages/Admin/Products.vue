<template>
    <admin-layout :current-route="initialRoute" :title="Products">
        <div class="w-full grid grid-cols-1  gap-4">
            <div class="container-rounded ">

                    <div class="mb-4 flex items-center justify-between">
                        <div>
                            <h3 class="primary-text">{{__('products')}}</h3>
                            <span class="secondary-text">This is a list of latest transactions</span>
                        </div>
                        <div class="flex-shrink-0">
                            <secondary-button @click="showModal" class="text-link-blue">{{ __('add_products') }}</secondary-button>
                        </div>
                    </div>
                    <div v-if="resources.data.length != 0" class="flex flex-col mt-8">
                        <data-table :resources="resources" :columns="$page.props.columnsOrder" />
                    </div>
                <div>
                    <h2 class="flex justify-center" v-if="resources.data.length === 0">{{__('no_products')}}...</h2>
                </div>

                <Modal class="w-full" :show="isOpen" @close="isOpen">
                    <div class="p-6 container-rounded">
                        <h2 class="text-lg font-medium text-gray-900">
                            {{__('select_file_csv')}}
                        </h2>


                        <div class="my-4 text-sm text-gray-600">
                                <form @submit.prevent="submit">
                                    <input @input="form.file = $event.target.files[0]" class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="default_size" type="file">
                                    <progress v-if="form.progress" :value="form.progress.percentage" max="100">
                                        {{ form.progress.percentage }}%
                                    </progress>
                                    <button type="submit">Submit</button>
                                </form>
                        </div>



                        <div class="mt-6  flex justify-end">
                            <SecondaryButton class="mx-2" @click="showModal"> Cancel </SecondaryButton>
                            <PrimaryButton class="mx-2">Submit</PrimaryButton>
                        </div>
                    </div>
                </Modal>
            </div>



        </div>
    </admin-layout>
</template>

<script setup>
import {defineComponent} from 'vue'
import AdminLayout from "@/Layouts/AdminLayout.vue";
import {Link, router} from "@inertiajs/vue3";
import vSelect from 'vue-select'
import DataTable from "@/Components/DataTable.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import Modal from "@/Components/Modal.vue";
import {ref} from "vue";
import { useForm } from '@inertiajs/vue3';
import PrimaryButton from "@/Components/PrimaryButton.vue";


defineProps({
    initialRoute: {
       type: String
   },
    resources: {
        type: Object
    }
});
const isOpen = ref(false);

const form = useForm({
    file: null,
})
function submit() {
    form.post(route('importCSV'))
}

const showModal = () => {
    console.log('test')
    isOpen.value = !isOpen.value;
};

 defineComponent({
    name: "Products",

    components: {
        AdminLayout,
        Link,
        vSelect,
        Modal,
        useForm

    },
})
</script>
