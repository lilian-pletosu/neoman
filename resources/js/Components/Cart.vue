<script setup>


import {useCartStore} from "@/stores/cartStore.js";
import {ref} from "vue";
import {onClickOutside} from "@vueuse/core";
import ReusableSidebar from "@/Components/ReusableSidebar.vue";
import EmptyCartSvg from "@/Svg/EmptyCartSvg.vue";
import {Link} from "@inertiajs/vue3";

const cartStore = useCartStore();
const emits = defineEmits(["close"])

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },

})

const target = ref(null)


const updateQtyOfProduct = (id, qty) => {
    cartStore.updateQtyOfProduct(id, qty)
}


onClickOutside(target, () => {
    if (props.isOpen) emits('close')
})

const deleteProductFromCart = (id) => {
    cartStore.removeProductInCart(id);
}

</script>

<template>
    <ReusableSidebar :title="__('cart')" :open="isOpen" @close="$emit('close')">
        <template v-slot:content>
            <div class="  h-full flex flex-col justify-between">
                <div class="border-t p-2" v-if="cartStore.products.length !== 0">
                    <ul class="">
                        <li v-for="product in cartStore.products" class="grid grid-cols-4 gap-2 my-3" :key="product.id"
                            :id="product.name">
                            <div
                                class="col-span-1 p-0.5 overflow-hidden rounded-md border border-gray-200">
                                <img
                                    :src="product.image"
                                    :alt="product.name"
                                    class="w-24 h-24  object-contain mx-auto">
                            </div>
                            <div class="col-span-2 flex flex-col justify-between">
                                <p class="font-medium text-xs md:text-base text-gray-900">{{ product.name }}</p>
                                <div
                                    class="flex flex-1 items-end  text-sm ">
                                    <div class="flex space-x-2 items-center">
                                        <p class="text-gray-500">{{ __('qty') }}:
                                        </p>
                                        <div class=" border flex items-center  px-4 rounded">
                                        <span
                                            @click="cartStore.updateQtyOfProduct(product.id,  --product.qty)"
                                            class="text-sm sm:text-xl cursor-default">-</span>
                                            <input
                                                class="w-12 h-8 border-none"
                                                disabled
                                                min="1"
                                                style="text-align:center;"
                                                @input="cartStore.updateQtyOfProduct(product.id,  $event.target.value)"
                                                :value="product.qty"
                                                type="number"
                                                name=""
                                                id="">
                                            <span
                                                @click.capture="cartStore.updateQtyOfProduct(product.id,  ++product.qty)"
                                                class="text-sm sm:text-xl cursor-default">+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-1 flex flex-col justify-between items-end">
                                <p class=" ">
                                    {{ product.price.toFixed(2) * product.qty }} {{ __('lei') }}
                                </p>
                                <div>
                                    <button type="button"
                                            @click="deleteProductFromCart(product.id)"
                                            class="font-medium text-indigo-600 hover:text-indigo-500">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             width="1.5em" height="1.5em"
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
                        </li>
                    </ul>
                </div>
                <div v-else class="mt-8 ">
                    <empty-cart-svg class="w-8/12  mx-auto"/>
                    <span class="flex justify-center font-mulish font-medium text-xl">{{
                            __('empty_cart')
                        }}</span>
                </div>
            </div>
            <div v-if="cartStore.products.length !== 0"
                 class="border-t border-gray-200 px-4 pt-2 sm:px-6 flex-col">
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
        </template>
    </ReusableSidebar>
</template>

<style scoped>

</style>
