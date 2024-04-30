<script setup>
import {computed, onMounted, onUnmounted, ref} from "vue";

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

const selectedProduct = ref(null);

function close() {
    emit('close')
}

// onMounted(() => document.addEventListener('keydown', close));
onMounted(() => document.addEventListener('handleClick', close));

onUnmounted(() => {
    document.body.style.overflow = null;
});
</script>

<template>
    <div @click.self="close" v-if="visible" id="authentication-modal"
         class="fixed inset-0 -top-[120%] z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div class="relative  top-1/4 w-full  max-h-full" :class="maxWidthClass">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5  rounded-t dark:border-gray-600"
                     :class="{ 'border-b': title }">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
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
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:p-5">
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

                            <button type="submit"
                                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Aștept apelul
                            </button>

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

                            <button type="submit"
                                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Aștept apelul
                            </button>

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


                            <button type="submit"
                                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                {{ __('send_order') }}
                            </button>

                        </form>
                    </template>
                    <template v-if="type === 'buy_in_credit'">
                        <div class="grid grid-cols-4 gap-2  ">
                            <fieldset class="col-span-4 grid grid-cols-2 gap-4">
                                <div v-for="credit in product.credits.credit">
                                    <label
                                        :for="credit.id"
                                        class="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                                    >
                                        <div>
                                            <p class="text-gray-700">{{ credit.num_of_installments }}
                                                {{ __('installments') }}</p>

                                            <p class="mt-1 text-gray-900">{{ parseInt(credit.interest_rate) }} %</p>
                                        </div>

                                        <input
                                            type="radio"
                                            @change="$emit('select', $event.target.value)"
                                            :name="credit.name"
                                            :value="credit.id"
                                            :id="credit.id"
                                            class="sr-only"
                                        />
                                    </label>
                                </div>
                            </fieldset>

                        </div>
                        <hr class="my-4">
                        <div class="grid grid-cols-4 gap-2">
                            <fieldset class="col-span-4 grid grid-cols-2 gap-4">
                                <div v-for="installment in product.credits.installments">
                                    <label
                                        :for="installment.id"
                                        class="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                                    >
                                        <div class="grid grid-cols-2 ">
                                            <div class="flex  items-center gap-4    ">
                                                <p class="text-gray-700 text-4xl">{{ installment.num_of_installments }}
                                                </p>
                                                {{ __('installments') }}
                                            </div>

                                            <p class="mt-1 text-gray-900">
                                                {{
                                                    parseInt((product.price + 1 + 3) / installment.num_of_installments)

                                                }}
                                            </p>
                                        </div>

                                        <input
                                            type="radio"
                                            :name="installment.name"
                                            :value="installment.id"
                                            :id="installment.id"
                                            class="sr-only"
                                        />
                                    </label>
                                </div>
                            </fieldset>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
