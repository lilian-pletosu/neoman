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

</script>
<template>
    <admin-layout :current-route="initialRoute" title="Promotions">
        <div class="w-full grid grid-cols-1  gap-4">
            <div class="container-rounded ">

                <div class="mb-4 flex items-center justify-between">
                    <div>
                        <h3 class="primary-text">{{ __('settings') }}</h3>
                        <span class="secondary-text">{{ __('here_is_all_settings') }}</span>
                    </div>
                    <div class="flex-shrink-0">
                        <primary-button @click="openModal" class="mx-2">{{
                                __('create')
                            }}
                        </primary-button>
                    </div>
                </div>
                <div class="flex flex-col mt-8 ">
                    <div class="overflow-x-auto rounded-lg ">
                        <div class="flex-shrink-0 ">
                            <div class="flex flex-col mt-8 ">
                                <div class="overflow-x-auto rounded-lg p-2 ">
                                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 ">
                                        <section>
                                            <span class="font-medium text-lg">{{ __('credit_info') }}</span>
                                            <div
                                                class="container-custom-rounded  border border-1 border-slate-300 p-2 bg-slate-100/50 min-h-[150px]">
                                                <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                    <div v-for="credit in resources.credit">
                                                        <Installments :credit="credit" :key="credit.id"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        <section>

                                            <span class="font-medium text-lg">{{ __('installments_info') }}</span>
                                            <div
                                                class="container-custom-rounded border border-1 border-slate-300 p-2 bg-slate-100/50  min-h-[150px]">
                                                <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                    <div v-for="installments in resources.installments">
                                                        <Installments :credit="installments" :key="installments.id"/>
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
                <Modal :show="isOpen" @close="closeModal" :actions="false" :closeable="true">
                    <div class="flex flex-col gap-4 p-4 ">
                        <div class="flex justify-between">
                            <h3 class="primary-text">{{ __('add_new_credit') }}</h3>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div>
                                <black-input v-model="form.num_of_installments"
                                             :type="'number'"
                                             :error-message="__(form.errors.num_of_installments)"
                                             :label="__('num_of_installments')"/>
                            </div>
                            <div>
                                <black-input v-model="form.interest_rate"
                                             :type="'number'"
                                             :error-message="__(form.errors.interest_rate)"
                                             :label="__('interest_rate')"/>
                            </div>
                            <div class="col-span-2">
                                <black-selector v-model="form.type"
                                                @update:status="form.type = $event"
                                                :options="[
                                                    {id: 'credit', value: 'credit', label: 'Credit'},
                                                    {id: 'installments', value: 'installments', label: 'Installments'}
                                                ]"
                                                :value="form.type"
                                                :error-message="__(form.errors.type)"
                                                :label="__('type')"/>
                            </div>
                        </div>
                        <div class="mt-6  flex justify-end">
                            <SecondaryButton class="mx-2" @click="closeModal"> {{
                                    __('cancel')
                                }}
                            </SecondaryButton>
                            <PrimaryButton @click="submit" class="mx-2">{{ __('submit') }}</PrimaryButton>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    </admin-layout>
</template>

