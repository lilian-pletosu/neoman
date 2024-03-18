<script setup>

import FrontLayout from "@/Layouts/FrontLayout.vue";
import {getCurrentInstance, ref} from "vue";
import Breadcrumb from "@/Components/Breadcrumb.vue";
import FrontModal from "@/Components/FrontModal.vue";
import {useCartStore} from "@/cartStore.js";

const emit = defineEmits(['productCart'])
const cartStore = useCartStore()

const props = defineProps({
    product: {
        type: Object,
    },
});

const selectedColor = ref();

const description = ref(false);
const specifications = ref(true);
const selectedImage = ref(props.product.images[0].image1);

const isOpen = ref(false);
const modalTitle = ref();
const typeModal = ref();
const app = getCurrentInstance();
const countCart = ref(0);

function openModal(type) {
    if (type === 'cheaper') {
        isOpen.value = !isOpen.value;
        typeModal.value = type
        modalTitle.value = app.appContext.config.globalProperties.__('found_cheaper')
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
</script>

<template>
    <front-layout title="Pagina principală" :cart-item-count="countCart">

        <breadcrumb :product="product"/>
        <hr>
        <section class="py-12 mt-1 sm:py-16 ">
            <div class="container mx-auto px-4">
                <div class="lg:col-gap-12 xl:col-gap-16  grid grid-cols-1 gap-12 lg:-mt-12 lg:grid-cols-5 lg:gap-16">
                    <div class="lg:col-span-3 lg:row-end-1">
                        <div class="lg:flex lg:items-start">
                            <div class="lg:order-2 lg:ml-5">
                                <div class="max-w-xl overflow-hidden rounded-lg">
                                    <img class="h-full w-full max-w-full object-cover"
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
                        <h1 class=" text-2xl font-bold text-gray-900 sm:text-3xl">{{ product.name }}</h1>

                        <div class="mt-2 flex justify-between items-center">
                            <img class="w-16 object-cover" :src="product.brand.image"
                                 alt=""/>
                            <div class="mt-5 flex items-center">
                                <div class="flex items-center">
                                    {{ __('product_code') }}:
                                </div>
                                <p class="ml-2 text-sm font-medium text-gray-500">{{ product.product_code }}</p>
                            </div>
                        </div>


                        <div v-for="attribute in product.attributes" class="border-t">
                            <div
                                v-if="['Culoare', 'culoare'].includes(attribute.name) || ['Culoare', 'culoare'].includes(attribute.slug)">
                                <h2 class="my-6 text-base text-gray-900">{{ __(attribute.name) }}</h2>
                                <div class="my-3 flex select-none flex-wrap items-center gap-1">
                                    <template v-for="value in attribute.attribute_values" :key="value.id">
                                        <label class="cursor-pointer" for="color">
                                            <input id="color" type="radio" v-model="selectedColor"
                                                   name="color" :value="value.id"
                                                   class="peer sr-only rounded-3xl"/>
                                            <div
                                                class="flex flex-col items-center">
                                                <span :style="'background-color: ' + value.value"
                                                      :class="{'border-2 border-black': value.id === selectedColor}"
                                                      class="flex rounded-full border border-slate-300 peer-checked:border-black p-4"></span>
                                                <span class="capitalize-first">{{ value.value }}</span>
                                            </div>
                                        </label>
                                    </template>
                                </div>
                            </div>
                        </div>


                        <div class="my-1 space-x-2 py-6 flex items-end ">
                            <h1 class="text-3xl  font-bold">{{ product.price.toFixed(2) }} </h1>
                            <h1 class="text-2xl  font-medium">{{ __('lei') }} </h1>
                            <h1 class="text-xl text-slate-500  font-light"> / {{ product.mu }} </h1>
                        </div>

                        <div>
                            <div @click="openModal('cheaper')"
                                 class="container-custom-rounded flex items-center space-x-4 p-2 border border-[#1FC8F3] cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                     class="bi bi-question-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path
                                        d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
                                </svg>
                                <p class="text-lg flex font-medium ">{{ __('found_cheaper') }}</p>
                            </div>
                        </div>

                        <div @click="cartStore.addProductInCart(product.id)"
                             class=" flex flex-col items-center space-y-2   border-t border-b py-4 sm:flex-row sm:space-x-2 sm:space-y-0 ">
                            <button
                                class="w-full sm:w-1/4  inline-flex items-center justify-center rounded-md border-2 border-transparent bg-primary-blue bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-primary-blue-200"
                                type="button">
                                {{ __('buy') }}
                            </button>
                            <button type="button"
                                    class="w-full inline-flex items-center justify-center rounded-md border-2 border-transparent bg-1 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">

                                {{ __('buy_1_click') }}
                            </button>
                        </div>


                        <div
                            class="container-custom-rounded  mt-4 flex items-center space-x-4 w-full p-3 border border-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 32 32">
                                <path fill="currentColor" d="M4 16h12v2H4zm-2-5h10v2H2z"/>
                                <path fill="currentColor"
                                      d="m29.919 16.606l-3-7A.999.999 0 0 0 26 9h-3V7a1 1 0 0 0-1-1H6v2h15v12.556A3.992 3.992 0 0 0 19.142 23h-6.284a4 4 0 1 0 0 2h6.284a3.98 3.98 0 0 0 7.716 0H29a1 1 0 0 0 1-1v-7a.997.997 0 0 0-.081-.394M9 26a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2m14-15h2.34l2.144 5H23Zm0 15a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2m5-3h-1.142A3.995 3.995 0 0 0 23 20v-2h5Z"/>
                            </svg>
                            <div class="flex-col">
                                <p class="text-lg flex font-medium">{{ __('free_delivery') }}</p>
                                <p class="text-sm underline flex font-light">{{ __('for_another_cities') }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="lg:col-span-3">
                        <div class="border-b border-gray-300">
                            <nav class="flex gap-4">
                                <a href="#" title="specifications" @click.prevent="setActiveTab('specifications')"
                                   :class="{'border-b-2 border-gray-900': specifications, 'border-transparent': !specifications}"
                                   class="py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800">
                                    {{ __('specifications') }}
                                </a>
                                <a href="#" title="description" @click.prevent="setActiveTab('description')"
                                   :class="{'border-b-2 border-gray-900': description, 'border-transparent': !description}"
                                   class="py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800">
                                    {{ __('description') }}
                                </a>
                            </nav>
                        </div>

                        <div v-show="description" id="description" class="mt-8 flow-root sm:mt-12">
                            <h1 class="text-3xl font-bold">{{ product.name }}</h1>
                            <p class="mt-4">{{ product.description }}</p>
                        </div>
                        <div v-show="specifications" class="mt-8 flow-root sm:mt-2">
                            <div class="relative overflow-x-auto my-4">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <tbody>
                                    <tr v-for="(attribute, index) in product.attributes" :key="index"
                                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td class="px-6 py-4 whitespace-nowrap capitalize-first font-medium ">
                                            {{ attribute.name }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap capitalize-first">{{
                                                attribute.attribute_values[0].value
                                            }}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <front-modal :title="modalTitle" :type="typeModal" @close="isOpen= false" :visible="isOpen"/>

        </section>


    </front-layout>
</template>

<style scoped>

</style>
