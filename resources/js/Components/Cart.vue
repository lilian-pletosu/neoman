<script setup>


import {useCartStore} from "@/stores/cartStore.js";
import {ref} from "vue";
import {onClickOutside} from "@vueuse/core";
import {Link} from "@inertiajs/vue3";

const cartStore = useCartStore();
const emits = defineEmits(["close"])

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },

})

const products = ref({});

const target = ref(null)


onClickOutside(target, () => {
    if (props.isOpen) emits('close')
})

</script>

<template>
    <div v-show="isOpen" class="relative z-10" aria-labelledby="slide-over-title" role="dialog"
         aria-modal="true">
        <div class="fixed inset-0 bg-slate-500 bg-opacity-35">
            <div class="absolute inset-0 ease-in-out duration-700 delay-500"
                 :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
            >
                <div class="pointer-events-none fixed inset-y-0 right-0 flex" ref="target">
                    <div class="pointer-events-auto  w">
                        <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                            <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                <div class="flex items-start justify-between  ">
                                    <h2 class="text-lg font-medium text-gray-900"
                                        id="slide-over-title">
                                        {{ __('cart') }}</h2>
                                    <div class="ml-3 flex h-7 items-center">
                                        <button type="button" @click="$emit('close')"
                                                class="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                                            <span class="absolute -inset-0.5"></span>
                                            <span class="sr-only">Close panel</span>
                                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                                 stroke-width="1.5" stroke="currentColor"
                                                 aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                      d="M6 18L18 6M6 6l12 12"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div class="mt-8" v-if="cartStore.products.length !== 0">
                                    <div class="flow-root">
                                        <ul role="list" class="-my-6 divide-y divide-gray-200">
                                            <li v-for="product in cartStore.products" :key="product" class="flex py-6">
                                                <div
                                                    class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        :src="product.image"
                                                        :alt="product.name"
                                                        class="h-full w-full object-cover object-center">
                                                </div>

                                                <div class="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div
                                                            class="flex justify-between font-medium text-sm md:text-base text-gray-900">
                                                            <h3>
                                                                <a href="#">{{ product.name }}</a>
                                                            </h3>
                                                            <p class="ml-4">
                                                                {{ product.price.toFixed(2) * product.qty }}</p>
                                                        </div>
                                                        <p class="mt-1 text-sm text-gray-500">
                                                            {{ product.brand.name }}</p>
                                                    </div>
                                                    <div
                                                        class="flex flex-1 items-center justify-between text-sm">
                                                        <div class="flex space-x-2 items-center">
                                                            <p class="text-gray-500">{{ __('qty') }}:
                                                            </p>
                                                            <div
                                                                class="space-x-2 border flex items-center  px-4 rounded">
                                                                <span
                                                                    @click="product.qty > 1 ? product.qty-- : product.qty = 1"
                                                                    class="text-sm sm:text-xl">-</span>
                                                                <input
                                                                    class="w-12 sm:w-20 h-8 border-none"
                                                                    min="1"
                                                                    style="text-align:center;"
                                                                    @input.self="product.qty = $event.target.value"
                                                                    :value="product.qty"
                                                                    type="number"
                                                                    name=""
                                                                    id="">
                                                                <span
                                                                    @click="product.qty++"
                                                                    class="text-sm sm:text-xl">+</span>
                                                            </div>
                                                        </div>

                                                        <div class="flex">
                                                            <button type="button"
                                                                    @click="cartStore.removeProductInCart(product.id)"
                                                                    class="font-medium text-indigo-600 hover:text-indigo-500">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                     width="2em" height="2em"
                                                                     viewBox="0 0 24 24">
                                                                    <g fill="none">
                                                                        <path
                                                                            d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/>
                                                                        <path fill="currentColor"
                                                                              d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07A1.01 1.01 0 0 1 4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929zM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m.28-6H9.72l-.333 1h5.226z"/>
                                                                    </g>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div v-else class="mt-8">
                                    <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"
                                         viewBox="0 0 650 512" id="empty-cart">
                                        <circle cx="337.969" cy="243.395" r="167.695"
                                                fill="#dbe8ec"></circle>
                                        <path fill="#dbe8ec"
                                              d="M574.58343,223.75715V205.64747a13.02087,13.02087,0,0,0-13.02086-13.02087H505.60333a13.02086,13.02086,0,0,1-13.02086-13.02086V161.49606a13.02087,13.02087,0,0,1,13.02086-13.02087h21.45112a13.02087,13.02087,0,0,0,13.02086-13.02087V117.34464a13.02087,13.02087,0,0,0-13.02086-13.02087H143.13523a13.02087,13.02087,0,0,0-13.02087,13.02087v18.10968a13.02087,13.02087,0,0,0,13.02087,13.02087h0a13.02087,13.02087,0,0,1,13.02086,13.02087v18.10968a13.02086,13.02086,0,0,1-13.02086,13.02086H82.7824a13.02087,13.02087,0,0,0-13.02087,13.02087v18.10968A13.02087,13.02087,0,0,0,82.7824,236.778h59.75769A13.02087,13.02087,0,0,1,155.561,249.79889v18.10976c.31905,16.57135-35.82964,13.02087-43.02086,13.02087h-.04775a13.02087,13.02087,0,0,0-13.02087,13.02087V312.06a13.02087,13.02087,0,0,0,13.02087,13.02087h32.85852a13.02087,13.02087,0,0,1,13.02087,13.02087v18.10976a13.02087,13.02087,0,0,1-13.02087,13.02087H108.43743a13.02087,13.02087,0,0,0-13.02086,13.02087V400.3629a13.02086,13.02086,0,0,0,13.02086,13.02086H524.045a13.02087,13.02087,0,0,0,13.02087-13.02086V382.25322A13.02087,13.02087,0,0,0,524.045,369.23235H502.75526a13.02087,13.02087,0,0,1-13.02087-13.02087V338.10172a13.02087,13.02087,0,0,1,13.02087-13.02087h36.62008A13.02087,13.02087,0,0,0,552.39621,312.06V293.95039a13.02087,13.02087,0,0,0-13.02087-13.02087H521.30005a13.02087,13.02087,0,0,1-13.02087-13.02087V249.79889A13.02087,13.02087,0,0,1,521.30005,236.778h40.26252A13.02087,13.02087,0,0,0,574.58343,223.75715Z"></path>
                                        <circle cx="340.677" cy="148.55" r="46.959"
                                                fill="#3086a3"></circle>
                                        <path fill="none" stroke="#f9ae2b" stroke-linecap="round"
                                              stroke-linejoin="round" stroke-width="4"
                                              d="M324.05253,138.77179q-.00092-.08715-.00092-.17432a16.62566,16.62566,0,1,1,16.86682,16.62391v15.09678"></path>
                                        <line x1="419.668" x2="451.971" y1="116.939" y2="116.939"
                                              fill="none" stroke="#3086a3" stroke-linecap="round"
                                              stroke-miterlimit="10" stroke-width="3"></line>
                                        <line x1="419.668" x2="451.971" y1="126.25" y2="126.25"
                                              fill="none" stroke="#3086a3" stroke-linecap="round"
                                              stroke-miterlimit="10" stroke-width="3"></line>
                                        <line x1="419.668" x2="451.971" y1="135.56" y2="135.56"
                                              fill="none" stroke="#3086a3" stroke-linecap="round"
                                              stroke-miterlimit="10" stroke-width="3"></line>
                                        <line x1="119.153" x2="151.456" y1="293.762" y2="293.762"
                                              fill="none" stroke="#3086a3" stroke-linecap="round"
                                              stroke-miterlimit="10" stroke-width="3"></line>
                                        <line x1="119.153" x2="151.456" y1="303.072" y2="303.072"
                                              fill="none" stroke="#3086a3" stroke-linecap="round"
                                              stroke-miterlimit="10" stroke-width="3"></line>
                                        <line x1="119.153" x2="151.456" y1="312.383" y2="312.383"
                                              fill="none" stroke="#3086a3" stroke-linecap="round"
                                              stroke-miterlimit="10" stroke-width="3"></line>
                                        <line x1="481.64" x2="513.943" y1="360.156" y2="360.156"
                                              fill="none" stroke="#3086a3" stroke-linecap="round"
                                              stroke-miterlimit="10" stroke-width="3"></line>
                                        <line x1="481.64" x2="513.943" y1="369.467" y2="369.467"
                                              fill="none" stroke="#3086a3" stroke-linecap="round"
                                              stroke-miterlimit="10" stroke-width="3"></line>
                                        <line x1="481.64" x2="513.943" y1="378.777" y2="378.777"
                                              fill="none" stroke="#3086a3" stroke-linecap="round"
                                              stroke-miterlimit="10" stroke-width="3"></line>
                                        <circle cx="520.577" cy="300.496" r="13.807"
                                                fill="#b9d4db"></circle>
                                        <circle cx="484.141" cy="310.461" r="7.159"
                                                fill="#b9d4db"></circle>
                                        <circle cx="502.32" cy="266.711" r="10.228"
                                                fill="#b9d4db"></circle>
                                        <circle cx="206.393" cy="389.674" r="16.428"
                                                fill="#b9d4db"></circle>
                                        <circle cx="175.001" cy="377.974" r="8.557"
                                                fill="#b9d4db"></circle>
                                        <circle cx="182.861" cy="348.886" r="4.936"
                                                fill="#b9d4db"></circle>
                                        <circle cx="210.185" cy="352.378" r="11.833"
                                                fill="#b9d4db"></circle>
                                        <circle cx="218.423" cy="143.059" r="16.428"
                                                fill="#b9d4db"></circle>
                                        <circle cx="219.09" cy="109.564" r="8.557"
                                                fill="#b9d4db"></circle>
                                        <circle cx="276.085" cy="114.564" r="7.406"
                                                fill="#b9d4db"></circle>
                                        <circle cx="249.141" cy="107.367" r="4.936"
                                                fill="#b9d4db"></circle>
                                        <circle cx="254.877" cy="134.31" r="11.833"
                                                fill="#b9d4db"></circle>
                                        <path fill="#409cb5"
                                              d="M480.85793,233.2431H202.6215L193.549,210.24282h287.309a2.72176,2.72176,0,0,1,2.72176,2.72176v17.55676A2.72176,2.72176,0,0,1,480.85793,233.2431Z"></path>
                                        <path fill="#f9ae2b"
                                              d="M440.32266,354.08924H251.1267a4.53627,4.53627,0,0,1-4.24692-2.94208L202.6215,233.2431h268.547l-26.4204,117.30658A4.53627,4.53627,0,0,1,440.32266,354.08924Z"></path>
                                        <path fill="#3086a3"
                                              d="M457.56233,293.66888c-19.355,1.24146-38.71,1.89087-58.065,2.33216-9.6775.27637-19.355.33777-29.03251.50036l-29.0325.16578q-29.0325.02636-58.065-.65723c-19.355-.43945-38.71-1.09216-58.065-2.34107,19.355-1.2489,38.71-1.90148,58.065-2.34106q29.03249-.65185,58.065-.6571l29.0325.16565c9.6775.16259,19.355.224,29.03251.50048C418.8523,291.778,438.20731,292.42755,457.56233,293.66888Z"></path>
                                        <path fill="#3086a3"
                                              d="M419.70359 233.2431c-1.1026 10.54578-2.78772 20.96045-4.64789 31.33558q-2.82669 15.55462-6.30877 30.96154-3.46357 15.41108-7.56577 30.67835c-1.38006 5.08618-2.80926 10.16137-4.33484 15.21484-.78927 2.52075-1.54083 5.05-2.361 7.56384l-.632 1.90967a4.91879 4.91879 0 01-1.18194 1.85889 4.67456 4.67456 0 01-3.81363 1.32349 4.373 4.373 0 003.11981-1.90845 3.91413 3.91413 0 00.633-1.61035l.25211-1.93872c.3367-2.62269.742-5.22986 1.10959-7.84571.78815-5.21948 1.6727-10.41736 2.60638-15.60412q2.82738-15.55444 6.31671-30.95972 3.47562-15.40833 7.57367-30.67664C413.23631 253.37482 416.17866 243.24335 419.70359 233.2431zM311.58605 354.0893a4.68121 4.68121 0 01-3.92411-1.458 6.69642 6.69642 0 01-1.156-1.8822l-.89646-1.85706c-1.1946-2.47632-2.32068-4.97827-3.4844-7.46619-2.27786-4.9945-4.463-10.02368-6.60287-15.06994q-6.39166-15.14906-12.15434-30.53431-5.78044-15.37866-10.948-30.9873c-3.41577-10.41675-6.65956-20.89807-9.33894-31.59119 5.01886 9.815 9.47332 19.8418 13.75582 29.93323q6.391 15.14941 12.14673 30.53723 5.76888 15.38306 10.94045 30.99012c1.70927 5.20788 3.37323 10.43273 4.94449 15.69238.76086 2.63916 1.55934 5.26416 2.28932 7.91479l.54693 1.98828a5.88655 5.88655 0 00.66687 1.77539A4.37022 4.37022 0 00311.58605 354.0893z"></path>
                                        <circle cx="298.105" cy="428.058" r="18.743"
                                                fill="#409cb5"></circle>
                                        <circle cx="298.105" cy="428.058" r="8.651"
                                                fill="#dbe8ec"></circle>
                                        <circle cx="406.224" cy="428.058" r="18.743"
                                                fill="#409cb5"></circle>
                                        <circle cx="406.224" cy="428.058" r="8.651"
                                                fill="#dbe8ec"></circle>
                                        <path fill="#3086a3"
                                              d="M343.09231,233.2431c1.83931,9.99671,3.08253,20.02881,4.14664,30.07178q1.55889,15.06646,2.44714,30.173.9072,15.1053,1.161,30.24952c.13792,10.098.0925,20.207-.55473,30.35193-1.84722-9.99622-3.09265-20.02833-4.15473-30.07129q-1.5582-15.06666-2.43905-30.17347-.89487-15.106-1.15285-30.25012C342.40978,253.49628,342.453,243.38739,343.09231,233.2431Z"></path>
                                        <path fill="#409cb5"
                                              d="M437.93777,399.80133H268.38406a3.00011,3.00011,0,0,1-2.801-1.92578L167.38479,141.898H115.37112a3,3,0,0,1,0-6h54.07593a3.0001,3.0001,0,0,1,2.801,1.92578l98.19824,255.97754H437.93777a3,3,0,0,1,0,6Z"></path>
                                        <rect width="39.6" height="18.36" x="103.858" y="130.248"
                                              fill="#409cb5" rx="2"></rect>
                                        <circle cx="340.677" cy="179.6" r="2.7" fill="#f9ae2b"></circle>
                                    </svg>
                                    <span class="flex justify-center font-mulish font-medium text-xl">{{
                                            __('empty_cart')
                                        }}</span>
                                </div>
                            </div>

                            <div v-if="cartStore.products.length !== 0"
                                 class="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div
                                    class="flex justify-between text-base font-medium text-gray-900 ">
                                    <p>{{ __('subtotal') }}</p>
                                    <p>{{ cartStore.totalPrice }} {{ __('lei') }}</p>
                                </div>
                                <p class="mt-0.5 text-sm text-gray-500">{{ __('shipping_message') }}</p>
                                <div class="mt-6">
                                    <Link :href="route('cart')"
                                          class="flex items-center justify-center rounded-md border border-transparent
                                        bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                                        {{ __('checkout') }}
                                    </Link>
                                </div>
                                <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        {{ __('or') }}
                                        <button type="button" @click="$emit('close')"
                                                class="font-medium text-indigo-600 hover:text-indigo-500">
                                            {{ __('continue_shopping') }}
                                            <span aria-hidden="true"> &rarr;</span>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
