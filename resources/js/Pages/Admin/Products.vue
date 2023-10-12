<template>
    <admin-layout :current-route="initialRoute" :title="Products">
        <div class="w-full grid grid-cols-1  gap-4">
            <div class="container-rounded ">

                <div class="mb-4 flex items-center justify-between">
                    <div>
                        <h3 class="primary-text">{{ __('products') }}</h3>
                        <span class="secondary-text">{{ __('products_description_admin') }}</span>
                    </div>
                    <div class="flex-shrink-0">
                        <secondary-button @click="showModal" class="text-link-blue">{{
                                __('import')
                            }}
                        </secondary-button>
                    </div>
                </div>
                <div class="flex flex-col mt-8">
                    <data-table :resources="resources" :columnsOrder="$page.props.columnsOrder"
                                :columns="$page.props.columns"/>
                </div>
                <div>
                    <h2 class="flex justify-center" v-if="resources.data.length === 0">{{ __('no_products') }}...</h2>
                </div>

                <Modal class="w-full" :show="isOpen" @close="isOpen">
                    <div class="p-6 container-rounded">
                        <h2 class="text-lg font-medium text-gray-900">
                            {{ __('select_file_csv') }}
                        </h2>

                        <form @submit.prevent="submit">
                            <div class="my-4 text-sm text-gray-600">

                                <input @input="form.file = $event.target.files[0]"
                                       class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                       id="default_size" type="file">
                                <progress v-if="form.progress" :value="form.progress.percentage" max="100"
                                          class="flex w-full">
                                    {{ form.progress.percentage }}%
                                </progress>
                                <div class="text-red-500" v-if="form.errors.file">{{ __(form.errors.file) }}*</div>

                            </div>


                            <div class="mt-6  flex justify-end">
                                <SecondaryButton class="mx-2" @click="showModal"> {{ __('cancel') }}</SecondaryButton>
                                <PrimaryButton type="submit" class="mx-2">{{ __('submit') }}</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>


        </div>
    </admin-layout>
</template>

<script setup>
import {defineComponent, ref} from 'vue'
import AdminLayout from "@/Layouts/AdminLayout.vue";
import {Link, useForm} from "@inertiajs/vue3";
import vSelect from 'vue-select'
import DataTable from "@/Components/DataTable.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import Modal from "@/Components/Modal.vue";
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
    form.post(route('importCSV'), {
        onSuccess() {
            showModal();
            form.reset();
        }, onError() {
            form.reset()
        }
    });
}

const showModal = () => {
    isOpen.value = !isOpen.value;
    form.reset()
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
