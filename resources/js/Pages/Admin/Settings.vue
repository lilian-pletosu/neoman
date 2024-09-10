<script setup>
import AdminLayout from "@/Layouts/AdminLayout.vue";
import {getCurrentInstance, ref} from "vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import {useForm} from "@inertiajs/vue3";
import {route} from "ziggy-js";
import Installments from "@/Components/Installments.vue";
import Modal from "@/Components/Modal.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import BlackInput from "@/Components/BlackInput.vue";
import BlackSelector from "@/Components/BlackSelector.vue";
import MultiSelect from 'primevue/multiselect';

const app = getCurrentInstance();


const props = defineProps({
    resources: Object
});

const form = useForm({
    num_of_installments: '',
    interest_rate: '',
    type: ''
});
const isOpen = ref(false);

const openModal = () => {
    isOpen.value = true;
};

const closeModal = () => {
    isOpen.value = false;
    form.reset();
};

const submit = (type) => {
    form.post(route('admin.settings.store'), {
        preserveScroll: true,
        onSuccess: () => {
            closeModal();
        }
    });
};

const selectedCredits = ref([])

const cities = [
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
];

</script>
<template>
    <admin-layout :current-route="initialRoute" title="Promotions">
        <div class="grid w-full grid-cols-1 gap-4">
            <div class="container-rounded ">

                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="primary-text">{{ __('settings') }}</h3>
                        <span class="secondary-text">{{ __('here_is_all_settings') }}</span>
                    </div>
                    <div class="flex-shrink-0">
                        <primary-button class="mx-2" @click="openModal">{{
                                __('create')
                            }}
                        </primary-button>
                    </div>
                </div>
                <MultiSelect v-model="selectedCredits" :maxSelectedLabels="3" :options="cities" class="w-full md:w-80"
                             display="chip"
                             filter
                             optionLabel="name" placeholder="Select Cities"/>
                <div class="flex flex-col mt-8 ">
                    <div class="overflow-x-auto rounded-lg ">
                        <div class="flex-shrink-0 ">
                            <div class="flex flex-col mt-8 ">
                                <div class="p-2 overflow-x-auto rounded-lg ">
                                    <div class="grid grid-cols-2 gap-3 lg:grid-cols-2 ">
                                        <section class="cols">
                                            <span class="text-lg font-medium">{{ __('credit_info') }}</span>
                                            <div
                                                class="container-custom-rounded  border border-1 border-slate-300 p-2 bg-slate-100/50 min-h-[150px] mt-2">
                                                <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
                                                    <div v-for="credit in resources.credit">
                                                        <Installments :key="credit.id" :credit="credit"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        <section>

                                            <span class="text-lg font-medium">{{ __('installments_info') }}</span>
                                            <div
                                                class="container-custom-rounded border border-1 border-slate-300 p-2 bg-slate-100/50  min-h-[150px] mt-2">
                                                <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
                                                    <div v-for="installments in resources.installments">
                                                        <Installments :key="installments.id" :credit="installments"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal :actions="false" :closeable="true" :show="isOpen" @close="closeModal">
                    <div class="flex flex-col gap-4 p-4 ">
                        <div class="flex justify-between">
                            <h3 class="primary-text">{{ __('add_new_credit') }}</h3>
                        </div>
                        <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
                            <div>
                                <black-input v-model="form.num_of_installments"
                                             :error-message="__(form.errors.num_of_installments)"
                                             :label="__('num_of_installments')"
                                             :type="'number'"/>
                            </div>
                            <div>
                                <black-input v-model="form.interest_rate"
                                             :error-message="__(form.errors.interest_rate)"
                                             :label="__('interest_rate')"
                                             :type="'number'"/>
                            </div>
                            <div class="col-span-2">
                                <black-selector v-model="form.type"
                                                :error-message="__(form.errors.type)"
                                                :label="__('type')"
                                                :options="[
                                                    {id: 'credit', value: 'credit', label: 'Credit'},
                                                    {id: 'installments', value: 'installments', label: 'Installments'}
                                                ]"
                                                :value="form.type"
                                                @update:status="form.type = $event"/>
                            </div>
                        </div>
                        <div class="flex justify-end mt-6">
                            <SecondaryButton class="mx-2" @click="closeModal"> {{
                                    __('cancel')
                                }}
                            </SecondaryButton>
                            <PrimaryButton class="mx-2" @click="submit">{{ __('submit') }}</PrimaryButton>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    </admin-layout>
</template>

