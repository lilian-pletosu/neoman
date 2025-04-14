<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import CreditContent from "@/Components/CreditContent.vue";
import { useScrollLock } from "@vueuse/core";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import ReusableOrderForm from "@/Components/ReusableOrderForm.vue";
import FastOrderForm from "@/Components/FastOrderForm.vue";

const body = ref(document.body);
const isLocked = useScrollLock(body);

const emit = defineEmits(["close", "select", "call", "cheaper"]);

const props = defineProps({
    title: {
        required: false,
        type: String,
        default: null,
    },
    visible: {
        required: true,
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        required: true,
        default: "call",
    },
    product: {
        type: Object,
        required: false,
        default: null,
    },
    maxWidth: {
        type: String,
        default: "2xl",
    },
});

const maxWidthClass = computed(() => {
    return {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        "3xl": "sm:max-w-3xl",
        "4xl": "sm:max-w-4xl",
        "6xl": "sm:max-w-6xl",
    }[props.maxWidth];
});

function close() {
    isLocked.value = false;
    emit("close");
    success.value = false;
}

function handleSubmitCall() {
    emit("call", {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
    });
    close();
}

function handleSubmitCheaper() {
    emit("cheaper", {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        product: props.product,
        product_link: document.getElementById("product_link").value,
    });
    close();
    showSuccessMessage();
}

const selectedTab = ref("credit");

const selectedOffer = ref(null);

const success = ref(false);

function showSuccessMessage() {
    success.value = true;
}

const showTabContent = () => {
    if (selectedTab.value === "credit") {
        return props.product.credits.filter(
            (credit) => credit.type === "credit"
        );
    } else {
        return props.product.credits.filter(
            (credit) => credit.type === "installments"
        );
    }
};

const checkIfInstallments = () => {
    return props.product.credits.some(
        (credit) => credit.type === "installments"
    );
};

watch(
    () => props.visible,
    (value) => {
        if (value) {
            isLocked.value = true;
        } else isLocked.value = false;
    }
);

onMounted(() => {
    document.addEventListener("handleClick", close);
});

onUnmounted(() => {
    document.body.style.overflow = null;
});
</script>

<template>
    <div
        @click.self="close"
        v-if="visible"
        id="authentication-modal"
        class="fixed inset-0 z-50 flex items-center justify-center overflow-x-scroll bg-gray-900 bg-opacity-50"
    >
        <div v-if="!success" class="relative w-full max-h-full" :class="maxWidthClass">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div
                    class="flex items-center justify-between p-4 rounded-t md:p-5 dark:border-gray-600"
                    :class="{ 'border-b': title }"
                >
                    <h3
                        v-if="title"
                        class="text-xl font-semibold text-gray-900 dark:text-white"
                    >
                        {{ title }}
                    </h3>
                    <button
                        type="button"
                        @click="close"
                        class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="authentication-modal"
                    >
                        <svg
                            class="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:px-5">
                    <template v-if="type === 'call'">
                        <form class="space-y-4">
                            <div>
                                <label
                                    for="name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >{{ __("your_name") }}</label
                                >
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <label
                                    for="phone"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >{{ __("phone") }}</label
                                >
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    placeholder=""
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>

                            <PrimaryButton
                                type="submit"
                                @click="handleSubmitCall"
                                class="flex justify-center w-full h-10 hover:bg-slate-400"
                            >
                                {{ __("wait_call") }}
                            </PrimaryButton>
                        </form>
                    </template>
                    <template v-if="type === 'cheaper'">
                        <form class="space-y-4" @submit.prevent="handleSubmitCheaper">
                            <div>
                                <label
                                    for="name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >{{ __("your_name") }}</label
                                >
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <label
                                    for="phone"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >{{ __("phone") }}</label
                                >
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    placeholder=""
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <div>
                                <label
                                    for="product_link"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >{{ __("link_to_cheaper_product") }}</label
                                >
                                <input
                                    type="url"
                                    name="product_link"
                                    id="product_link"
                                    placeholder=""
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>

                            <PrimaryButton
                                type="submit"
                                class="flex justify-center w-full h-10 hover:bg-slate-400"
                            >
                                {{ __("send") }}
                            </PrimaryButton>
                        </form>
                    </template>
                    <template v-if="type === 'buy_1_click'">
                        <div v-if="!success">
                            <span
                            class="flex mb-4 font-medium text-center font-mulish"
                            >{{
                                __("for_fast_order_complete_phone_number")
                            }}</span
                        >
                        <FastOrderForm
                            :product="product"
                            @submitSuccess="showSuccessMessage()"
                        />
                        </div>

                    </template>
                    <template v-if="type === 'buy_in_credit'">
                        <div v-if="!success" class="flex flex-col gap-2">
                            <div
                                class="relative grid items-start grid-cols-2 gap-4 p-4 mb-4 border rounded-md sm:grid-cols-6 container-custom-rounded border-1 border-slate-300 dark:border-slate-100/20 bg-slate-300/20 dark:bg-slate-100/20 dark:text-white"
                            >
                                <div class="col-span-2 mx-auto sm:col-span-1">
                                    <img
                                        class="w-24"
                                        :src="product.images[0].image1"
                                        alt=""
                                    />
                                </div>
                                <div
                                    class="col-span-2 mx-auto my-auto sm:col-span-3 sm:mx-0"
                                >
                                    <p>{{ product.name }}</p>
                                </div>

                                <div
                                    class="col-span-2 mx-auto my-auto text-right sm:col-span-1"
                                >
                                    <p
                                        class="font-bold"
                                        :key="product.total_price"
                                    >
                                        {{
                                            product.total_price ?? product.price
                                        }}
                                        {{ __("lei") }}
                                    </p>
                                </div>
                            </div>
                            <div
                                class="relative flex items-center justify-between mx-auto mb-5 text-lg cursor-pointer min-w-44 sm:w-72 bg-slate-100 dark:bg-slate-300 rounded-xl"
                            >
                                <div
                                    class="absolute z-10 w-1/2 h-full transition duration-500 shadow bg-primary-blue rounded-xl"
                                    :class="{
                                        'translate-x-full':
                                            selectedTab === 'installments',
                                    }"
                                />
                                <p
                                    @click="selectedTab = 'credit'"
                                    class="z-20 flex justify-center w-full p-1 duration-500 rounded-xl"
                                    :class="{
                                        'text-white': selectedTab === 'credit',
                                    }"
                                >
                                    {{ __("credit") }}
                                </p>
                                <p
                                    v-if="checkIfInstallments"
                                    @click="selectedTab = 'installments'"
                                    class="z-20 flex justify-center w-full p-1 duration-500 rounded-xl"
                                    :class="{
                                        'text-white':
                                            selectedTab === 'installments',
                                    }"
                                >
                                    {{ __("installments") }}
                                </p>
                            </div>
                            <CreditContent
                                :details="showTabContent()"
                                :product="product"
                                @selected-offer="
                                    (offerId) => (selectedOffer = offerId)
                                "
                            />
                            <span class="text-sm dark:text-slate-300"
                                >*{{ __("is_preventive_offer") }}.</span
                            >
                            <hr class="my-3" />
                            <ReusableOrderForm
                                v-show="selectedTab"
                                :selected-offer="selectedOffer"
                                @submit-success="showSuccessMessage()"
                                :product="product"
                                :selected-type="selectedTab"
                            />
                        </div>

                    </template>
                </div>
            </div>
        </div>
        <div v-if="success">
                            <div class="p-6 bg-white md:mx-auto">
                                <svg
                                    viewBox="0 0 24 24"
                                    class="w-16 h-16 mx-auto my-6 text-green-600"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                                    ></path>
                                </svg>
                                <div class="text-center">
                                    <h3
                                        class="text-base font-semibold text-center text-gray-900 md:text-2xl"
                                    >
                                        {{ __("order_placed") }}!
                                    </h3>
                                    <p class="my-2 text-gray-600">
                                        {{ __("thanks_order") }}
                                    </p>
                                    <p>{{ __("order_success_message") }}</p>
                                    <div class="py-10 text-center">
                                        <p
                                            @click="close"
                                            class="px-12 py-3 font-semibold text-white bg-indigo-600 rounded-md cursor-pointer hover:bg-indigo-500"
                                        >
                                            {{ __("back_to_shop") }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
    </div>
</template>
