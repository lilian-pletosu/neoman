<script setup>
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import CreditContent from "@/Components/CreditContent.vue";
import {useScrollLock} from '@vueuse/core'
import PrimaryButton from "@/Components/PrimaryButton.vue";
import {Link} from "@inertiajs/vue3";

const body = ref(document.body);
const isLocked = useScrollLock(body);

const emit = defineEmits(['close', 'select'])

const props = defineProps({
    title: {
        required: false,
        type: String,
        default: null
    },
    visible: {
        required: true,
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        required: true,
        default: 'call'
    },
    product: {
        type: Object,
        required: false,
        default: null

    },
    maxWidth: {
        type: String,
        default: '2xl',
    },
})


const maxWidthClass = computed(() => {
    return {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '3xl': 'sm:max-w-3xl',
        '4xl': 'sm:max-w-4xl',
        '6xl': 'sm:max-w-6xl',
    }[props.maxWidth];
});


function close() {
    isLocked.value = false;
    emit('close')
}

const selectedTab = ref('credit')

const showTabContent = () => {
    if (selectedTab.value === 'credit') {
        return props.product.credits.credit;
    } else {
        return props.product.credits.installments;
    }
}


watch(() => props.visible, (value) => {
    if (value) {
        isLocked.value = true;
    } else
        isLocked.value = false;
});

onMounted(() => {
    document.addEventListener('handleClick', close);
});

onUnmounted(() => {
    document.body.style.overflow = null;

});
</script>

<template>
    <div @click.self="close" v-if="visible" id="authentication-modal"
         class="fixed inset-0  z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-x-scroll">
        <div class="relative  w-full max-h-full" :class="maxWidthClass">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5  rounded-t dark:border-gray-600"
                     :class="{ 'border-b': title }">
                    <h3 v-if="title" class="text-xl font-semibold text-gray-900 dark:text-white">
                        {{ title }}
                    </h3>
                    <button type="button"
                            @click="close"
                            class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="authentication-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                  stroke-width="2"
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:px-5">
                    <template v-if="type === 'call'">
                        <form class="space-y-4" action="#">
                            <div>
                                <label for="name"
                                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                        __('your_name')
                                    }}</label>
                                <input type="text" name="name" id="name"
                                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                       placeholder=""/>
                            </div>
                            <div>
                                <label for="phone"
                                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                        __('phone')
                                    }}</label>
                                <input type="tel" name="phone" id="phone" placeholder=""
                                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
                            </div>

                            <PrimaryButton type="submit"
                                           class="w-full h-10 flex justify-center hover:bg-slate-400">
                                {{ __('wait_call') }}
                            </PrimaryButton>

                        </form>
                    </template>
                    <template v-if="type === 'cheaper'">
                        <form class="space-y-4" action="#">
                            <div>
                                <label for="name"
                                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                        __('your_name')
                                    }}</label>
                                <input type="text" name="name" id="name"
                                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                       placeholder=""/>
                            </div>
                            <div>
                                <label for="phone"
                                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                        __('phone')
                                    }}</label>
                                <input type="tel" name="phone" id="phone" placeholder=""
                                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
                            </div>
                            <div>
                                <label for="link"
                                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                        __('link_to_cheaper_product')
                                    }}</label>
                                <input type="url" name="link" id="link" placeholder=""
                                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
                            </div>

                            <PrimaryButton type="submit"
                                           class="w-full h-10 flex justify-center hover:bg-slate-400">
                                {{ __('wait_call') }}
                            </PrimaryButton>

                        </form>
                    </template>
                    <template v-if="type === 'buy_1_click'">

                        <span class="flex text-center mb-4 font-mulish font-medium">{{
                                __('for_fast_order_complete_phone_number')
                            }}</span>

                        <form class="space-y-4" action="#">

                            <div>
                                <label for="phone"
                                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                        __('phone')
                                    }}</label>
                                <input type="tel" name="phone" id="phone" placeholder=""
                                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>

                            </div>

                            <input type="text" name="product" id="product" placeholder="" :value="product"
                                   class="hidden"/>

                            <PrimaryButton type="submit"
                                           class="w-full h-10 flex justify-center hover:bg-slate-400">
                                {{ __('send_order') }}
                            </PrimaryButton>


                        </form>
                    </template>
                    <template v-if="type === 'buy_in_credit'">
                        <div class="flex flex-col gap-2">

                            <div
                                class="relative mb-4 grid grid-cols-2 sm:grid-cols-6 gap-4  container-custom-rounded border border-1 border-slate-300 dark:border-slate-100/20 bg-slate-300/20  dark:bg-slate-100/20
                                 rounded-md items-start p-4 dark:text-white">

                                <div class="col-span-2 sm:col-span-1 mx-auto">
                                    <img class="w-24 " :src="product.images[0].image1" alt="">
                                </div>
                                <div class=" col-span-2 sm:col-span-3 mx-auto sm:mx-0 my-auto"><p>{{
                                        product.name
                                    }}</p>
                                </div>

                                <div class="sm:col-span-1 text-right my-auto">
                                    <p class="font-bold" :key="product.total_price">
                                        {{ product.total_price ?? product.price }}
                                        {{ __('lei') }}</p>
                                </div>
                            </div>
                            <div
                                class="relative mx-auto cursor-pointer mb-5 min-w-44 sm:w-72  items-center flex justify-between bg-slate-100 dark:bg-slate-300 text-lg rounded-xl">
                                <div
                                    class="absolute bg-primary-blue h-full w-1/2 duration-500 shadow transition rounded-xl z-10"
                                    :class="{'translate-x-full': selectedTab === 'installments'}"/>
                                <p @click="selectedTab = 'credit'"
                                   class="w-full flex justify-center p-1 rounded-xl z-20 duration-500 "
                                   :class="{'text-white': selectedTab === 'credit'}">
                                    Credit</p>
                                <p @click="selectedTab = 'installments'"
                                   class="w-full flex justify-center p-1 rounded-xl z-20 duration-500"
                                   :class="{'text-white': selectedTab === 'installments'}">Rate</p>
                            </div>
                            <CreditContent :details="showTabContent()" :product="product"/>
                            <span class="text-sm dark:text-slate-300">*{{ __('is_preventive_offer') }}.</span>
                            <hr class="my-3">
                            <form class="space-y-4">
                                <div class="grid grid-cols-2 gap-2">
                                    <label for="full_name"
                                           class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                            __('full_name')
                                        }}
                                        <input type="text" name="full_name" id="full_name" placeholder="Ion Popescu"
                                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
                                    </label>
                                    <label for="phone"
                                           class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                            __('phone')
                                        }}
                                        <input type="tel" name="phone" id="phone" placeholder="012345678"
                                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
                                    </label>

                                    <span class="flex gap-1 col-span-2">
                                             <input type="checkbox" name="terms" id="terms" required
                                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
    {{ __('accord_terms') }} <Link :href="route('privacy_page')" class="text-blue-800 underline">{{
                                            __('privacy')
                                        }}</Link>
                                        </span>

                                </div>

                                <input type="text" name="product" id="product" placeholder="" :value="product"
                                       class="hidden"/>
                                <input type="hidden" name="offer" :value="se">


                                <PrimaryButton @click="console.log('submit')"
                                               class="w-full h-10 flex justify-center hover:bg-slate-400">
                                    {{
                                        __('submit')
                                    }}
                                </PrimaryButton>


                            </form>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>


