<script setup>

import FrontLayout from "@/Layouts/FrontLayout.vue";
import {getCurrentInstance, ref, useAttrs} from "vue";
import Breadcrumb from "@/Components/Breadcrumb.vue";
import FrontModal from "@/Components/FrontModal.vue";
import {useCartStore} from "@/stores/cartStore.js";
import ProductSection from "@/Components/ProductSection.vue";
import {useWishlistStore} from "@/stores/wishlistStore.js";
import {HeartIcon} from "@heroicons/vue/24/outline/index.js";
import {router} from "@inertiajs/vue3";
import CustomModal from "@/Components/CustomModal.vue";
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Navigation, Slide} from 'vue3-carousel'

const attrs = useAttrs()

const emit = defineEmits(['productCart'])
const cartStore = useCartStore()
const wishlistStore = useWishlistStore();

const props = defineProps({
    product: {
        type: Object,
    },
    latest_products: {
        type: Object,
    },
});

const selectedQty = ref('default');
const error = ref({});

const description = ref(false);
const specifications = ref(true);
const selectedImage = ref(props.product.images[0].image1);

const isOpen = ref(false);
const modalTitle = ref();
const typeModal = ref();
const app = getCurrentInstance();
const countCart = ref(0);
const openModalSlider = ref(false);

const images = ref({});
const filteredImages = ref([]);

function openImage() {
    images.value = props.product.images[0];
    openModalSlider.value = !openModalSlider.value;
    filteredImages.value = Object.values(images.value).filter(image =>
        typeof image === 'string' && image.startsWith('/storage/products/')
    );

}


function openModal(type) {
    if (type === 'cheaper') {
        isOpen.value = !isOpen.value;
        typeModal.value = type
        modalTitle.value = app.appContext.config.globalProperties.__('found_cheaper')
    }
    if (type === 'buy_1_click') {
        isOpen.value = !isOpen.value;
        typeModal.value = type
        modalTitle.value = app.appContext.config.globalProperties.__('buy_1_click')
    }
    if (type === 'buy_in_credit') {
        isOpen.value = !isOpen.value;
        typeModal.value = type
        modalTitle.value = app.appContext.config.globalProperties.__('select_offer')
    }
}


function closeModal() {
    isOpen.value = !isOpen.value
}

function selectImage(imageSource) {
    selectedImage.value = imageSource;
}


function setActiveTab(tabName) {
    if (tabName === 'description') {
        description.value = true;
        specifications.value = !specifications;
    }
    if (tabName === 'specifications') {
        specifications.value = true;
        description.value = !description;
    }
}

function clear(object) {
    Object.keys(object).forEach(key => {
        delete object[key];
    });
}


function buyProduct(productId) {
    cartStore.addProductInCart(productId, selectedQty.value).then(() => {
        clear(error)
    });
}
</script>

<template>
    <front-layout title="Pagina principală">

        <breadcrumb :product="product"/>

        <hr>
        <section v-if="Object.keys(product)" class="py-12 mt-1 sm:py-16">
            <div class="">
                <div class="lg:col-gap-12 xl:col-gap-16 grid grid-cols-1 gap-12 lg:-mt-12 lg:grid-cols-5 lg:gap-16">
                    <div class="lg:col-span-3 lg:row-end-1">
                        <div class="lg:flex">
                            <div class="lg:order-2  lg:ml-5 flex-1">
                                <div class="overflow-hidden w-full  h-[300px]  md:h-[500px] rounded-lg ">
                                    <img class="object-contain w-full  h-[300px]  md:h-[500px] cursor-pointer"
                                         @click="openImage"
                                         :src="selectedImage" alt=""/>
                                </div>
                            </div>

                            <div
                                class="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                                <div v-for="(image, index) in product.images"
                                     class="flex flex-row items-start lg:flex-col">
                                    <button v-show="image.image1 != null" type="button"
                                            @click="selectImage(image.image1)"
                                            :class="{'border-gray-900': image.image1 === selectedImage}"
                                            class="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 text-center">
                                        <img class="h-full w-full object-cover" :src="image.image1" alt=""/>
                                    </button>
                                    <button v-show="image.image2 != null" type="button"
                                            @click="selectImage(image.image2)"
                                            :class="{'border-gray-900': image.image2 === selectedImage}"
                                            class="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2  text-center">
                                        <img class="h-full w-full object-cover" :src="image.image2" alt=""/>
                                    </button>
                                    <button v-show="image.image3 != null" type="button"
                                            @click="selectImage(image.image3)"
                                            :class="{'border-gray-900': image.image3 === selectedImage}"
                                            class="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2  text-center">
                                        <img class="h-full w-full object-cover" :src="image.image3" alt=""/>
                                    </button>
                                    <button v-show="image.image4 != null" type="button"
                                            @click="selectImage(image.image4)"
                                            :class="{'border-gray-900': image.image4 === selectedImage}"
                                            class="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2  text-center">
                                        <img class="h-full w-full object-cover" :src="image.image4" alt=""/>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                        <div class="flex  items-start">
                            <h1 class="dark:text-slate-300 text-2xl font-bold text-gray-900 sm:text-3xl">{{
                                    product.name
                                }}</h1>
                            <button type="button"
                                    @click="wishlistStore.addProductInWishlist(product.id)"
                                    class="rounded-md border border-slate-500   bg-none px-2  py-2 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow">

                                <heart-icon class="w-6"
                                            :class="wishlistStore.checkIfProductExistInWishlist(product.id) ? 'text-red-500 fill-red-500' : 'text-slate-700 dark:text-slate-300'"/>
                            </button>
                        </div>

                        <div class="mt-2 flex justify-between items-center">
                            <img class="w-16" :src="product.brand.image"
                                 alt=""/>
                            <div class=" flex items-center dark:text-slate-300">
                                <div class="flex items-center">
                                    {{ __('product_code') }}:
                                </div>
                                <p class=" ml-2 text-sm font-medium text-gray-500">
                                    {{ product.product_code }}</p>
                            </div>
                        </div>


                        <div v-for="(attribute, key) in product.attributes" class="border-t">

                            <div class="flex  flex-col 2xs:items-center 2xs:flex-row  2xs:space-x-6"
                                 v-if="['cantitate', 'Cantitate\''].includes(key) && attribute.values.length > 1">
                                <h2 class="dark:text-slate-300 my-2 sm:my-6 text-base text-gray-900">{{
                                        attribute.name
                                    }}:</h2>
                                <div class="2xs:my-3 flex select-none flex-wrap items-center gap-1">
                                    <select
                                        id="color"
                                        v-model="selectedQty"
                                        @change="router.visit(route('product_page', {slug: selectedQty}), {
                                            only: ['product'],
                                            preserveScroll: true,
                                            preserveState: true,
                                        })"
                                        class="dark:bg-transparent dark:text-slate-300 border border-slate-300 rounded-md focus:border-none focus:outline-none">
                                        <option class="dark:bg-slate-600" disabled value="default">{{
                                                __('select_qty')
                                            }}
                                        </option>
                                        <option class="dark:bg-slate-600" v-for="(value, index) in attribute.values"
                                                :key="index"
                                                selected
                                                :value="value.link">
                                            {{ value.value }} {{ value.mu }}
                                        </option>
                                    </select>

                                </div>
                            </div>
                        </div>


                        <div class="my-1 space-x-2 py-6 flex items-end ">
                            <h1 class=" dark:text-slate-300 text-3xl  font-bold">{{ product.price.toFixed(2) }} </h1>
                            <h1 class="dark:text-white text-2xl  font-medium">{{ __('lei') }} </h1>
                            <h1 class="text-xl text-slate-500  font-light"> / {{ product.mu }} </h1>
                        </div>

                        <div>
                            <div @click="openModal('cheaper')"
                                 class="container-custom-rounded dark:bg-slate-800 mb-4 flex items-center space-x-4 p-2 border border-[#1FC8F3] cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                     class="dark:text-slate-300 bi bi-question-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path
                                        d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
                                </svg>
                                <p class="dark:text-slate-300 text-lg flex font-light ">{{ __('found_cheaper') }}</p>
                            </div>
                        </div>

                        <div
                            class=" flex flex-col  space-y-2 border-t border-b dark:border-y-slate-600 py-4 sm:flex-row sm:space-x-2 sm:space-y-0 ">
                            <button @click="buyProduct(product.id)"
                                    class="w-full sm:w-1/4  inline-flex items-center justify-center rounded-md border-2 border-transparent bg-primary-blue bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-primary-blue-200"
                                    type="button">
                                {{ __('buy') }}
                            </button>
                            <button type="button" @click="openModal('buy_1_click')"
                                    class="w-full inline-flex items-center justify-center rounded-md border-2 border-transparent bg-1 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                                {{ __('buy_1_click') }}
                            </button>
                        </div>
                        <div>
                            <button type="button" @click="openModal('buy_in_credit')"
                                    class="w-full inline-flex items-center justify-center rounded-md border-2 border-transparent bg-slate-500 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-slate-600">
                                {{ __('buy_in_credit') }}
                            </button>
                        </div>


                        <div
                            class="container-custom-rounded dark:bg-slate-800 mt-4 flex items-center space-x-4 w-full p-3 border border-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 32 32"
                                 class="dark:text-slate-300">
                                <path fill="currentColor" d="M4 16h12v2H4zm-2-5h10v2H2z"/>
                                <path fill="currentColor"
                                      d="m29.919 16.606l-3-7A.999.999 0 0 0 26 9h-3V7a1 1 0 0 0-1-1H6v2h15v12.556A3.992 3.992 0 0 0 19.142 23h-6.284a4 4 0 1 0 0 2h6.284a3.98 3.98 0 0 0 7.716 0H29a1 1 0 0 0 1-1v-7a.997.997 0 0 0-.081-.394M9 26a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2m14-15h2.34l2.144 5H23Zm0 15a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2m5-3h-1.142A3.995 3.995 0 0 0 23 20v-2h5Z"/>
                            </svg>
                            <div class="dark:text-slate-300 flex items-center flex-col text-center">
                                <p class="text-lg flex  font-medium">{{ __('delivery_info') }}</p>
                                <p class="text-sm underline flex font-light">{{ __('delivery_aditional_info') }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="lg:col-span-3">
                        <div class="border-b border-gray-300 dark:border-slate-500">
                            <nav class="flex gap-4">
                                <a href="#" title="specifications" @click.prevent="setActiveTab('specifications')"
                                   :class="{'transition delay-150 border-b-2 border-gray-500': specifications, 'border-transparent': !specifications}"
                                   class="dark:text-slate-300 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800">
                                    {{ __('specifications') }}
                                </a>
                                <a href="#" title="description" @click.prevent="setActiveTab('description')"
                                   :class="{'transition delay-150 border-b-2 border-gray-500': description, 'border-transparent': !description}"
                                   class="dark:text-slate-300 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800">
                                    {{ __('description') }}
                                </a>
                            </nav>
                        </div>

                        <div v-show="description" id="description" class="mt-8 flow-root sm:mt-12">
                            <h1 class="text-3xl font-bold dark:text-slate-300">{{ product.name }}</h1>
                            <p class="mt-4 dark:text-slate-300">{{ product.description }}</p>
                        </div>
                        <div v-show="specifications" class="mt-8 flow-root sm:mt-2">
                            <div class="relative overflow-x-auto my-4">
                                <table
                                    class="w-full border dark:border-slate-600 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-red-200">
                                    <tbody>
                                    <tr v-for="(attribute, key) in product.attributes" :key="key"
                                        class="bg-white dark:bg-gray-800 da odd:bg-white even:bg-slate-100 dark:odd:bg-slate-700 dark:even:bg-slate-800 border dark:border-slate-600">
                                        <td class="px-6 py-4 whitespace-nowrap capitalize-first font-medium ">
                                            {{ attribute.name }}:
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap capitalize-first">
                                            <div class=" flex space-x-2">
                                                <p class="capitalize-first" v-for="value in attribute.values">
                                                    {{
                                                        value.value
                                                    }}</p>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <front-modal :title="modalTitle" :type="typeModal" @close="isOpen= false" :visible="isOpen"
                         :product="product" @select="console.log($event)"/>
        </section>
        <hr>
        <product-section :title="__('latest_products')" :top_products="true" :products="latest_products"/>
        <product-section v-if="attrs.last_visited.length !== 0" :title="__('visited_products')" :new_products="true"
                         :products="attrs.last_visited"/>


        <custom-modal :is-open="openModalSlider" @close-modal="openImage">
            <template v-slot:content>
                <div class="w-full">
                    <carousel :wrap-around="true" :items-to-show="1" class="w-full "
                              :transition="500">
                        <slide v-for="(slide, index) in filteredImages"
                               :key="index">
                            <img class="object-contain w-full  h-[120vw] sm:h-[40vw]"
                                 :src="slide" :alt="index">
                        </slide>
                        <template #addons>
                            <Navigation/>
                            <Pagination/>
                        </template>
                    </carousel>
                </div>
            </template>
        </custom-modal>

    </front-layout>
</template>

<style scoped>

</style>
