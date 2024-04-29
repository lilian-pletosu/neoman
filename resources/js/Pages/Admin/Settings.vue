<script setup>
import AdminLayout from "@/Layouts/AdminLayout.vue";
import Modal from "@/Components/Modal.vue";
import {getCurrentInstance, ref} from "vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import BlackInput from "@/Components/BlackInput.vue";
import {useForm} from "@inertiajs/vue3";

const app = getCurrentInstance();


const props = defineProps({
    resources: Object
});


let isModalOpen = ref(false);

const form = useForm({});

const openModal = () => {
    isModalOpen.value = true;
};

const editCreditSection = ref(false);
const newCredit = ref(false);
const closeModal = () => {
    isModalOpen.value = false;
    form.reset();
};

const cancelNewCredit = () => {
    newCredit.value = false;
    form.installments = null;
    form.interest_rate = null;
};
const cancelEditCredit = () => {
    editCreditSection.value = false;
    form.installments = null;
    form.interest_rate = null;
};

const addPromotion = async () => {
    await form.post(route('admin.promotions.store'), {
        preserveScroll: true,
        onSuccess: () => {
            closeModal();

        }
    });

    // Reîncărcați promoțiile...
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
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 ">
                                        <section>
                                            <div class="flex justify-between">
                                                <span>{{ __('credit_info') }}</span>
                                                <div class="flex gap-2">
                                                    <span @click="editCreditSection = !editCreditSection"
                                                          class="font-medium cursor-pointer">{{ __('edit') }}</span>
                                                    <span @click="newCredit = !newCredit"
                                                          class="font-medium cursor-pointer">{{ __('add') }}</span>
                                                </div>
                                            </div>


                                            <div
                                                class="container-custom-rounded  border border-1 border-slate-300 p-2 bg-slate-100/50 min-h-[150px]">
                                                <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                    <div v-for="credit in resources.credit" v-if="editCreditSection"
                                                         class="grid grid-cols-1 container-custom-rounded p-2 border border-1 border-slate-300">
                                                        <div>
                                                            <black-input :model-value="credit.num_of_installments"
                                                                         @update:modelValue="form.installments = $event"
                                                                         type="text"/>
                                                            <black-input :model-value="credit.interest_rate"
                                                                         @update:modelValue="form.interest_rate = $event"
                                                                         type="text"/>
                                                        </div>
                                                        <div class="flex gap-1">
                                                            <span>{{ __('submit') }}</span>
                                                            <span @click="cancelEditCredit()">{{ __('cancel') }}</span>
                                                        </div>
                                                    </div>
                                                    <div v-if="newCredit && !editCreditSection"
                                                         class="grid grid-cols-1 gap-2 justify-between container-custom-rounded p-2 border border-1 border-slate-300">
                                                        <div>
                                                            <black-input :model-value="form.installments"
                                                                         @update:modelValue="form.installments = $event"
                                                                         :label="__('installments')"
                                                                         type="text"/>
                                                            <black-input :model-value="form.interest_rate"
                                                                         @update:modelValue="form.interest_rate = $event"
                                                                         :label="__('interest_rate')"
                                                                         type="text"/>
                                                        </div>
                                                        <div class="flex gap-1">
                                                            <span>{{ __('submit') }}</span>
                                                            <span @click="cancelNewCredit()">{{ __('cancel') }}</span>
                                                        </div>

                                                    </div>

                                                    <div v-if="!editCreditSection" v-for="credit in resources.credit"
                                                         class="flex  justify-between container-custom-rounded p-2 border border-1 border-slate-300">
                                                        <span>{{
                                                                credit.num_of_installments
                                                            }} {{ __('installments') }}</span>
                                                        <span>{{ credit.interest_rate }}%</span>
                                                    </div>

                                                </div>
                                            </div>
                                        </section>
                                        <section>
                                            <div class="flex justify-between">
                                                <span>{{ __('installments_info') }}</span>
                                                <div class="flex gap-2">
                                                    <span class="font-medium cursor-pointer">{{
                                                            __('edit')
                                                        }}</span>
                                                    <span class="font-medium cursor-pointer">{{ __('add') }}</span>
                                                </div>
                                            </div>
                                            <div
                                                class="container-custom-rounded border border-1 border-slate-300 p-2 bg-slate-100/50  min-h-[150px]">
                                                <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                    <!--                                                    <black-input model-value="form.name" label="name" type="text"/>-->
                                                    <div v-for="installments in resources.installments"
                                                         class="flex  justify-between container-custom-rounded p-2 border border-1 border-slate-300">
                                                        <span>{{
                                                                installments.num_of_installments
                                                            }} {{ __('installments') }}</span>
                                                        <span>{{ installments.interest_rate }}% </span>
                                                    </div>

                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <Modal :show="isModalOpen" :actions="false" @close="closeModal" max-width="6xl"
                           :margin-top="0">
                        <div class="grid grid-cols-2 p-4 mt-5 gap-2">
                            <div class="col-span-2">
                                <label class="block mb-2 text-sm font-medium text-gray-900 ">{{
                                        __('name')
                                    }}</label>
                                <input
                                    class="bg-gray-50   border border-gray-300 text-gray-900 text-sm rounded-lg
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    :class="{'border-2 dark:border-red-600' :form.errors.name}"
                                    type="text"
                                    v-model="form.name"
                                    min="1"
                                    max="100"
                                    :placeholder="__('name')"
                                    ref="input">
                                <div v-if="form.errors.name">
                                    <p class="text-sm text-red-500">
                                        {{ __(form.errors.name) }}*
                                    </p>
                                </div>
                            </div>
                            <div class="col-span-2">
                                <label class="block mb-2 text-sm font-medium text-gray-900 ">{{
                                        __('description')
                                    }}</label>
                                <textarea
                                    v-model="form.description"
                                    :placeholder="__('description')"
                                    class="scroll-smooth bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full"/>
                            </div>
                            <div class="flex flex-col">
                                <label class="block mb-2 text-sm font-medium text-gray-900 ">{{
                                        __('start_date')
                                    }}</label>
                                <input type="date" id="start_date"
                                       class="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
                                       v-model="form.start_date">
                            </div>
                            <div class="flex flex-col">
                                <label class="block mb-2 text-sm font-medium text-gray-900 ">{{
                                        __('end_date')
                                    }}</label>
                                <input type="date"
                                       class="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
                                       v-model="form.end_date">
                            </div>


                            <div>
                                <label for="status" class="block mb-2 mt-4 text-sm font-medium text-gray-900">{{
                                        __('status')
                                    }}</label>
                                <select id="status" @change="form.status = $event.target.value"
                                        :class="{'border-2 dark:border-red-600' : form.errors.status}"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected disabled :value="null">{{ __('select_status') }}</option>
                                    <template
                                        v-for="(option, key) in [{id:1, value: 'active'},{id: 0, value: 'inactive'}]">

                                        <option :value="option.id">{{ __(`${option.value}`) }}</option>
                                    </template>
                                </select>
                                <div v-if="form.errors.status">
                                    <p class="text-sm text-red-500">
                                        {{ __(form.errors.status) }}*
                                    </p>
                                </div>
                            </div>
                            <div class="col-span-1 mt-4">
                                <label class="block mb-2 text-sm font-medium text-gray-900 ">{{
                                        __('discount')
                                    }}</label>
                                <input
                                    class="bg-gray-50   border border-gray-300 text-gray-900 text-sm rounded-lg
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    :class="{'border-2 dark:border-red-600' :form.errors.discount}"
                                    type="number"
                                    v-model="form.discount"
                                    min="1"
                                    max="100"
                                    :placeholder="__('discount')"
                                    ref="input">
                                <div v-if="form.errors.name">
                                    <p class="text-sm text-red-500">
                                        {{ __(form.errors.discount) }}*
                                    </p>
                                </div>
                            </div>


                            <!-- Select pentru branduri -->
                            <div class="col-span-1 w-full">
                                <label for="status" class="block mb-2 mt-1 text-sm font-medium text-gray-900">{{
                                        __('brands')
                                    }}</label>

                                <select
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    @change="form.brand = $event.target.value"
                                    :class="{'border-2 dark:border-red-600' : form.errors.brand}">
                                    <option selected disabled>{{ __('select_brand') }}</option>
                                    <option v-for="brand in app.appContext.config.globalProperties.$page.props.brands"
                                            :value="brand.id">
                                        {{ brand.name }}
                                    </option>
                                </select>
                            </div>

                            <!-- Select pentru subsubcategorii -->
                            <div class="col-span-1 w-full">
                                <label for="status" class="block mb-2 mt-1 text-sm font-medium text-gray-900">{{
                                        __('sub_subcategory')
                                    }}</label>
                                <select
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    @change="form.sub_subcategory = $event.target.value"
                                    :class="{'border-2 dark:border-red-600' : form.errors.sub_subcategory}">
                                    <option selected disabled>{{ __('select_sub_subcategory') }}</option>
                                    <option
                                        v-for="sub_subcategory in app.appContext.config.globalProperties.$page.props.sub_subcategories"
                                        :value="sub_subcategory.id">
                                        {{ sub_subcategory.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-span-1 w-full">
                                <label for="status" class="block mb-2 mt-1 text-sm font-medium text-gray-900">{{
                                        __('subcategory')
                                    }}</label>
                                <select
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    @change="form.subcategory = $event.target.value"
                                    :class="{'border-2 dark:border-red-600' : form.errors.subcategory}">
                                    <option selected disabled>{{ __('select_subcategory') }}</option>
                                    <option
                                        v-for="subcategory in app.appContext.config.globalProperties.$page.props.subcategories"
                                        :value="subcategory.id">
                                        {{ subcategory.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-span-1 w-full">
                                <label for="status" class="block mb-2 mt-1 text-sm font-medium text-gray-900">{{
                                        __('category')
                                    }}</label>
                                <select
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    @change="form.category = $event.target.value"
                                    :class="{'border-2 dark:border-red-600' : form.errors.category}">
                                    <option selected disabled>{{ __('select_category') }}</option>
                                    <option
                                        v-for="category in app.appContext.config.globalProperties.$page.props.categories"
                                        :value="category.id">
                                        {{ category.name }}
                                    </option>
                                </select>
                            </div>
                            <hr class="col-span-2 mb-4 mt-1">


                            <button type="submit"
                                    @click="addPromotion()"
                                    class="btn btn-primary mx-auto w-full bg-slate-200 p-3 rounded-lg col-span-2 flex justify-center cursor-pointer">
                                {{ __('create') }}
                            </button>
                        </div>

                    </Modal>
                </div>
            </div>
        </div>
    </admin-layout>
</template>

