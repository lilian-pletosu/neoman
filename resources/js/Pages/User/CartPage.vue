<script setup>
import FrontLayout from "@/Layouts/FrontLayout.vue";
import {useWishlistStore} from "@/stores/wishlistStore.js";
import {useCartStore} from "@/stores/cartStore.js";
import InputLabel from "@/Components/InputLabel.vue";
import {useForm} from "@inertiajs/vue3";
import {onMounted, ref, watch} from "vue";
import {refreshPage} from "@/helpers/helper";


const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const cartProducts = ref();


const form = useForm({
    full_name: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    products: {},
    message: '',
    total_price: cartStore.totalPrice
});


const props = defineProps({
    products: Object
})


const checkout = () => {
    form.post(route('set_order'), {
        preserveScroll: true,
        onSuccess: () => {
            form.errors = {};
            cartStore.cartForget()
            refreshPage();
        }
    })
}


onMounted(() => {
    cartStore.fetchCount();
    form.products = cartStore.products;
    form.total_price = cartStore.totalPrice
})
watch(cartStore, () => {
    // cartStore.fetchCount();
    form.products = cartStore.products;
    form.total_price = cartStore.totalPrice;
}, {deep: true, immediate: true})
</script>

<template>
    <FrontLayout>
        <div class="py-4">
            <h1 class="text-2xl font-bold font-mulish dark:text-white">{{ __('cart') }}</h1>
            <section class="pt-4">
                <p v-if="cartStore.products.length > 0" class="font-bold text-sm dark:text-slate-300">

                    {{
                        cartStore.countCart > 2 ? cartStore.countCart + " " + __('products') : cartStore.countCart + " " + __('product')
                    }}</p>
                <div v-if="cartStore.products.length > 0"
                     class="relative grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-4">
                    <div class="absolute right-2 top-2 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             width="1em" height="1em"
                             viewBox="0 0 24 24">
                            <g fill="none">
                                <path
                                    d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/>
                                <path fill="currentColor"
                                      d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07A1.01 1.01 0 0 1 4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929zM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m.28-6H9.72l-.333 1h5.226z"/>
                            </g>
                        </svg>
                    </div>
                    <div class="lg:col-span-2 space-y-4">
                        <div v-for="product in cartStore.products" :key="product.id"
                             class="grid grid-cols-2 sm:grid-cols-6 gap-4    container-simple border bg-white dark:bg-1 rounded-md items-start p-4">
                            <div class="col-span-2 sm:col-span-1    mx-auto ">
                                <img class="w-24 " :src="product.image" alt="">
                            </div>
                            <div class=" col-span-2 sm:col-span-3 mx-auto sm:mx-0 my-auto"><p>{{ product.name }}</p>
                            </div>
                            <div class="sm:col-span-1 my-auto">
                                <div
                                    class="w-fit border flex items-center  px-2 rounded">
                                      <span
                                          @click="cartStore.updateQtyOfProduct(product.id,  --product.qty)"
                                          class="text-sm sm:text-xl cursor-pointer">-</span>
                                    <input
                                        class="w-12 sm:w-18 md:w-20 xl:w-16 2xl:w-24 h-8 border-none"
                                        min="1"
                                        disabled
                                        style="text-align:center;"
                                        @input.self=""
                                        :value="product.qty"
                                        type="number"
                                        name=""
                                        id="">
                                    <span
                                        @click="cartStore.updateQtyOfProduct(product.id,  ++product.qty)"
                                        class="text-sm sm:text-xl cursor-pointer">+</span>
                                </div>
                            </div>
                            <div class="sm:col-span-1 text-right my-auto">
                                <p class="font-bold" :key="product.total_price">
                                    {{ product.total_price ?? product.price }}
                                    {{ __('lei') }}</p>
                            </div>
                        </div>
                    </div>
                    <div
                        class="container-simple border dark:bg-white rounded-md text-red p-4 lg:col-span-1">
                        <div class="grid grid-cols-1 gap-4">
                            <p class="font-bold">{{ __('order_details') }}</p>


                            <div>
                                <input-label :value="__('full_name')"/>
                                <input class="rounded-md w-full" type="text"
                                       name="first_name"
                                       v-model="form.full_name"
                                       id="first_name">
                                <span class="font-light text-xs text-red-500"
                                      v-if="form.errors.full_name">{{ __(form.errors.full_name) }}</span>
                            </div>
                            <div>
                                <input-label :value="__('phone')"/>
                                <input class="rounded-md w-full" type="tel"
                                       v-model="form.phone"
                                       name="phone"
                                       id="phone">
                                <span class="font-light text-xs text-red-500"
                                      v-if="form.errors.phone">{{ __(form.errors.phone) }}</span>
                            </div>
                            <div>
                                <input-label :value="__('email')"/>
                                <input class="rounded-md w-full" type="email"
                                       v-model="form.email"
                                       name="email"
                                       id="email">
                                <span class="font-light text-xs text-red-500"
                                      v-if="form.errors.email">{{ __(form.errors.email) }}</span>
                            </div>
                            <div>
                                <input-label :value="__('city')"/>
                                <input class="rounded-md w-full" type="text"
                                       v-model="form.city"
                                       name="city"
                                       id="city">
                                <span class="font-light text-xs text-red-500"
                                      v-if="form.errors.city">{{ __(form.errors.city) }}</span>
                            </div>
                            <div>
                                <input-label :value="__('address')"/>
                                <input class="rounded-md w-full" type="search"
                                       v-model="form.address"
                                       name="address"
                                       id="address">
                                <span class="font-light text-xs text-red-500"
                                      v-if="form.errors.city">{{ __(form.errors.address) }}</span>
                            </div>
                            <div>
                                <input-label :value="__('comments')"/>
                                <textarea class="rounded-md w-full"
                                          v-model="form.message"
                                          name="message"
                                          id="message"/>
                                <span class="font-light text-xs text-red-500"
                                      v-if="form.errors.message">{{ __(form.errors.message) }}</span>
                            </div>

                            <hr class="mt-2">

                            <div class="grid grid-cols-2 font-bold">
                                <p class="justify-self-start">Subtotal:</p>
                                <p class="justify-self-end">
                                    {{ cartStore.totalPrice }} {{ __('lei') }}</p>
                            </div>
                            <div class="grid grid-cols-2 font-bold">
                                <p class="justify-self-start">{{ __('shipping') }}:</p>
                                <p class="justify-self-end ">
                                    {{ 100 }} {{ __('lei') }}</p>
                            </div>
                            <div class="grid grid-cols-2 font-bold">
                                <p class="justify-self-start">{{ __('total') }}:</p>
                                <p class="justify-self-end ">
                                    {{ 100 + cartStore.totalPrice }} {{ __('lei') }}</p>
                            </div>

                            <button @click="checkout"
                                    class="container-custom-rounded  space-x-4 p-2 bg-[#1FC8F3] shadow cursor-pointer text-white font-mulish font-semibold">
                                {{
                                    __('checkout')
                                }}
                            </button>

                        </div>
                    </div>
                </div>
                <div v-else class="p-2 mx-auto flex flex-col justify-center items-center space-y-6 py-12">
                    <div class="w-fit rounded-full p-8 bg-[#F1F5F9] border border-[#CBD5E1] ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor"
                             class="bi bi-cart3" viewBox="0 0 16 16">
                            <path
                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>
                    </div>
                    <p class="text-xl md:text-3xl font-bold font-mulish text-slate-500 ">{{ __('empty_cart') }}</p>
                    <p class="text-xs md:text-xl font-medium font-mulish text-slate-500 ">
                        {{ __('youre_not_added_product') }}</p>
                </div>
            </section>

        </div>

    </FrontLayout>
</template>

