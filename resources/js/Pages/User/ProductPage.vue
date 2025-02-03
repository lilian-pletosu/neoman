<script setup>
import FrontLayout from "@/Layouts/FrontLayout.vue";
import { getCurrentInstance, ref, useAttrs } from "vue";
import Breadcrumb from "@/Components/Breadcrumb.vue";
import FrontModal from "@/Components/FrontModal.vue";
import { useCartStore } from "@/stores/cartStore.js";
import ProductSection from "@/Components/ProductSection.vue";
import { useWishlistStore } from "@/stores/wishlistStore.js";
import { HeartIcon } from "@heroicons/vue/24/outline/index.js";
import { router } from "@inertiajs/vue3";
import CustomModal from "@/Components/CustomModal.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import { formatPrice } from "@/helpers/helper.js";
import { usePage } from "@inertiajs/vue3";

const page = usePage();
const attrs = useAttrs();

const emit = defineEmits(["productCart"]);
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const props = defineProps({
    product: {
        type: Object,
    },
    latest_products: {
        type: Object,
    },
});

const selectedQty = ref("default");
const error = ref({});

const description = ref(false);
const specifications = ref(true);
const selectedImage = ref(props.product.images[0]?.image1);

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
    openModalSlider.value = true;
    filteredImages.value = Object.values(images.value).filter(
        (image) =>
            (typeof image === "string" &&
                image.startsWith("/storage/products/")) ||
            (typeof image === "string" && image.startsWith("https"))
    );
}

const closeModalSlider = () => {
    openModalSlider.value = false;
};

function openModal(type) {
    if (type === "cheaper") {
        isOpen.value = !isOpen.value;
        typeModal.value = type;
        modalTitle.value =
            app.appContext.config.globalProperties.__("found_cheaper");
    }
    if (type === "buy_1_click") {
        isOpen.value = !isOpen.value;
        typeModal.value = type;
        modalTitle.value =
            app.appContext.config.globalProperties.__("buy_1_click");
    }
    if (type === "buy_in_credit") {
        isOpen.value = !isOpen.value;
        typeModal.value = type;
        modalTitle.value =
            app.appContext.config.globalProperties.__("select_offer");
    }
}

function closeModal() {
    isOpen.value = !isOpen.value;
}

function selectImage(imageSource) {
    selectedImage.value = imageSource;
}

function setActiveTab(tabName) {
    if (tabName === "description") {
        description.value = true;
        specifications.value = !specifications;
    }
    if (tabName === "specifications") {
        specifications.value = true;
        description.value = !description;
    }
}

function clear(object) {
    Object.keys(object).forEach((key) => {
        delete object[key];
    });
}

function buyProduct(productId) {
    cartStore.addProductInCart(productId, selectedQty.value).then(() => {
        clear(error);
    });
}
</script>

<template>
    <front-layout :title="product.name" :meta-description="`${product.name} - ${product.description?.substring(
        0,
        150
    )}... Cumpără online pe Neoman.md cu livrare rapidă în toată Moldova.`" :meta-keywords="`${product.name}, ${product.category.name}, ${product.brand?.name || ''
        }, ${product.product_code}, cumpara online, pret ${formatPrice(
            product.price
        )}, ${product.category.name} moldova`" :current-url="route('product_page', product.slug)"
        :current-language="$page.props.locale">
        <!-- <breadcrumb :product="product" /> -->

        <hr />
        <section v-if="Object.keys(product)" class="py-12 mt-1 sm:py-16">
            <div class="">
                <div class="grid grid-cols-1 gap-12 lg:col-gap-12 xl:col-gap-16 lg:-mt-12 lg:grid-cols-5 lg:gap-16">
                    <div class="lg:col-span-3 lg:row-end-1">
                        <div class="lg:flex">
                            <div class="flex-1 lg:order-2 lg:ml-5">
                                <div class="overflow-hidden w-full h-[300px] md:h-[500px] rounded-lg">
                                    <img loading="lazy" :src="selectedImage" alt=""
                                        class="object-contain w-full h-[300px] md:h-[500px] cursor-pointer"
                                        @click="openImage" />
                                </div>
                            </div>

                            <div class="w-full mt-2 lg:order-1 lg:w-32 lg:flex-shrink-0">
                                <div v-for="(image, index) in product.images"
                                    class="flex flex-row items-start lg:flex-col">
                                    <button v-show="image?.image1 != null" :class="{
                                        'border-gray-900':
                                            image?.image1 === selectedImage,
                                    }" class="h-20 mb-3 overflow-hidden text-center border-2 rounded-lg flex-0 aspect-square"
                                        type="button" @click="selectImage(image?.image1)">
                                        <img loading="lazy" :src="image?.image1" :alt="product.name"
                                            class="object-cover w-full h-full" />
                                    </button>
                                    <button v-show="image?.image2 != null" :class="{
                                        'border-gray-900':
                                            image?.image2 === selectedImage,
                                    }" class="h-20 mb-3 overflow-hidden text-center border-2 rounded-lg flex-0 aspect-square"
                                        type="button" @click="selectImage(image?.image2)">
                                        <img loading="lazy" :src="image?.image2" :alt="product.name"
                                            class="object-cover w-full h-full" />
                                    </button>
                                    <button v-show="image?.image3 != null" :class="{
                                        'border-gray-900':
                                            image?.image3 === selectedImage,
                                    }" class="h-20 mb-3 overflow-hidden text-center border-2 rounded-lg flex-0 aspect-square"
                                        type="button" @click="selectImage(image?.image3)">
                                        <img loading="lazy" :src="image.image3" :alt="product.name"
                                            class="object-cover w-full h-full" />
                                    </button>
                                    <button v-show="image?.image4 != null" :class="{
                                        'border-gray-900':
                                            image?.image4 === selectedImage,
                                    }" class="h-20 mb-3 overflow-hidden text-center border-2 rounded-lg flex-0 aspect-square"
                                        type="button" @click="selectImage(image?.image4)">
                                        <img loading="lazy" :src="image?.image4" :alt="product.name"
                                            class="object-cover w-full h-full" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                        <div class="flex items-start justify-between">
                            <h1 class="text-2xl font-bold text-gray-900 dark:text-slate-300 sm:text-3xl">
                                {{ product.name }}
                            </h1>
                            <button
                                class="px-2 py-2 text-base font-bold text-center text-white transition-all duration-200 ease-in-out border rounded-md border-slate-500 bg-none focus:shadow"
                                type="button" @click="
                                    wishlistStore.addProductInWishlist(
                                        product.id
                                    )
                                    ">
                                <heart-icon :class="wishlistStore.checkIfProductExistInWishlist(
                                    product.id
                                )
                                    ? 'text-red-500 fill-red-500'
                                    : 'text-slate-700 dark:text-slate-300'
                                    " class="w-6" />
                            </button>
                        </div>

                        <div class="flex items-center justify-between mt-2">
                            <img :src="product.brand?.image" alt="" class="w-16" />
                            <div class="flex items-center dark:text-slate-300">
                                <div class="flex items-center">
                                    {{ __("product_code") }}:
                                </div>
                                <p class="ml-2 text-sm font-medium text-gray-500">
                                    {{ product.product_code }}
                                </p>
                            </div>
                        </div>

                        <div v-for="(attribute, key) in product.attributes" class="border-t">
                            <div v-if="
                                ['cantitate', 'Cantitate\''].includes(
                                    key
                                ) && attribute.values.length > 1
                            " class="flex flex-col 2xs:items-center 2xs:flex-row 2xs:space-x-6">
                                <h2 class="my-2 text-base text-gray-900 dark:text-slate-300 sm:my-6">
                                    {{ attribute.name }}:
                                </h2>
                                <div class="flex flex-wrap items-center gap-1 select-none 2xs:my-3">
                                    <select id="color" v-model="selectedQty"
                                        class="border rounded-md dark:bg-transparent dark:text-slate-300 border-slate-300 focus:border-none focus:outline-none"
                                        @change="
                                            router.visit(
                                                route('product_page', {
                                                    slug: selectedQty,
                                                }),
                                                {
                                                    only: ['product'],
                                                    preserveScroll: true,
                                                    preserveState: true,
                                                }
                                            )
                                            ">
                                        <option class="dark:bg-slate-600" disabled value="default">
                                            {{ __("select_qty") }}
                                        </option>
                                        <option v-for="(
                                                value, index
                                            ) in attribute.values" :key="index" :value="value.link"
                                            class="dark:bg-slate-600" selected>
                                            {{ value.value }} {{ value.mu }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-end py-6 my-1 space-x-2">
                            <h1 v-if="
                                !product.has_discount &&
                                !product.promotion_price
                            " class="text-3xl font-bold dark:text-slate-300">
                                {{ formatPrice(product.price) }}
                            </h1>
                            <span v-else class="flex flex-col space-x-2">
                                <span class="flex space-x-2">
                                    <h1 class="text-xl font-bold line-through dark:text-slate-300 text-slate-400">
                                        {{ formatPrice(product.price) }}
                                    </h1>
                                    <span class="px-1 my-auto text-sm font-semibold text-white bg-red-400 rounded">-{{
                                        product.sale }}</span>
                                </span>
                                <h1 class="text-3xl font-bold dark:text-slate-300">
                                    {{ formatPrice(product?.promotion_price) }}
                                </h1>
                            </span>
                            <h1 class="text-2xl font-medium dark:text-white">
                                {{ __("lei") }}
                            </h1>
                            <h1 v-if="product.mu" class="text-xl font-light text-slate-500">
                                / {{ product.mu }}
                            </h1>
                        </div>

                        <div>
                            <div class="container-custom-rounded dark:bg-slate-800 mb-4 flex items-center space-x-4 p-2 border border-[#1FC8F3] cursor-pointer"
                                @click="openModal('cheaper')">
                                <svg class="dark:text-slate-300 bi bi-question-circle" fill="currentColor" height="20"
                                    viewBox="0 0 16 16" width="20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path
                                        d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
                                </svg>
                                <p class="flex text-lg font-light dark:text-slate-300">
                                    {{ __("found_cheaper") }}
                                </p>
                            </div>
                        </div>

                        <div
                            class="flex flex-col py-4 space-y-2 border-t border-b dark:border-y-slate-600 sm:flex-row sm:space-x-2 sm:space-y-0">
                            <button
                                class="inline-flex items-center justify-center w-full px-12 py-3 text-base font-bold text-center text-white transition-all duration-200 ease-in-out border-2 border-transparent rounded-md sm:w-1/4 bg-primary-blue bg-none focus:shadow hover:bg-primary-blue-200"
                                type="button" @click="buyProduct(product.id)">
                                {{ __("buy") }}
                            </button>
                            <button
                                class="inline-flex items-center justify-center w-full px-12 py-3 text-base font-bold text-center text-white transition-all duration-200 ease-in-out border-2 border-transparent rounded-md bg-1 bg-none focus:shadow hover:bg-gray-800"
                                type="button" @click="openModal('buy_1_click')">
                                {{ __("buy_1_click") }}
                            </button>
                        </div>
                        <div>
                            <button v-if="product.credits.length > 0" w
                                class="inline-flex items-center justify-center w-full px-12 py-3 text-base font-bold text-center text-white transition-all duration-200 ease-in-out border-2 border-transparent rounded-md bg-slate-500 bg-none focus:shadow hover:bg-slate-600"
                                type="button" @click="openModal('buy_in_credit')">
                                {{ __("buy_in_credit") }}
                            </button>
                        </div>

                        <div
                            class="flex items-center w-full p-3 mt-4 space-x-4 border container-custom-rounded dark:bg-slate-800 border-slate-400">
                            <svg class="dark:text-slate-300" height="2em" viewBox="0 0 32 32" width="2em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 16h12v2H4zm-2-5h10v2H2z" fill="currentColor" />
                                <path
                                    d="m29.919 16.606l-3-7A.999.999 0 0 0 26 9h-3V7a1 1 0 0 0-1-1H6v2h15v12.556A3.992 3.992 0 0 0 19.142 23h-6.284a4 4 0 1 0 0 2h6.284a3.98 3.98 0 0 0 7.716 0H29a1 1 0 0 0 1-1v-7a.997.997 0 0 0-.081-.394M9 26a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2m14-15h2.34l2.144 5H23Zm0 15a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2m5-3h-1.142A3.995 3.995 0 0 0 23 20v-2h5Z"
                                    fill="currentColor" />
                            </svg>
                            <div class="flex flex-col items-center text-center dark:text-slate-300">
                                <p class="flex text-lg font-medium">
                                    {{ __("delivery_info") }}
                                </p>
                                <p class="flex text-sm font-light underline">
                                    {{ __("delivery_aditional_info") }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="lg:col-span-3">
                        <div class="border-b border-gray-300 dark:border-slate-500">
                            <nav class="flex gap-4">
                                <a :class="{
                                    'transition delay-150 border-b-2 border-gray-500':
                                        specifications,
                                    'border-transparent': !specifications,
                                }" class="py-4 text-sm font-medium text-gray-900 dark:text-slate-300 hover:border-gray-400 hover:text-gray-800"
                                    href="#" title="specifications" @click.prevent="
                                        setActiveTab('specifications')
                                        ">
                                    {{ __("specifications") }}
                                </a>
                                <a :class="{
                                    'transition delay-150 border-b-2 border-gray-500':
                                        description,
                                    'border-transparent': !description,
                                }" class="py-4 text-sm font-medium text-gray-900 dark:text-slate-300 hover:border-gray-400 hover:text-gray-800"
                                    href="#" title="description" @click.prevent="setActiveTab('description')">
                                    {{ __("description") }}
                                </a>
                            </nav>
                        </div>

                        <div v-show="description" id="description" class="flow-root mt-8 sm:mt-12">
                            <h1 class="text-3xl font-bold dark:text-slate-300">
                                {{ product.name }}
                            </h1>
                            <p class="mt-4 dark:text-slate-300">
                                {{ product.description }}
                            </p>
                        </div>
                        <div v-show="specifications" class="flow-root mt-8 sm:mt-2">
                            <div class="relative my-4 overflow-x-auto">
                                <table
                                    class="w-full text-sm text-left text-gray-500 bg-red-200 border dark:border-slate-600 rtl:text-right dark:text-gray-400">
                                    <tbody>
                                        <tr v-for="(
                                                attribute, key
                                            ) in product.attributes" :key="key"
                                            class="bg-white border dark:bg-gray-800 da odd:bg-white even:bg-slate-100 dark:odd:bg-slate-700 dark:even:bg-slate-800 dark:border-slate-600">
                                            <td v-if="attribute.name"
                                                class="px-6 py-4 font-medium whitespace-nowrap capitalize-first">
                                                {{ attribute.name }}:
                                            </td>
                                            <td v-if="attribute.name"
                                                class="px-6 py-4 whitespace-nowrap capitalize-first">
                                                <div class="flex space-x-2">
                                                    <p v-for="value in attribute.values" class="capitalize-first">
                                                        {{
                                                            value.value === "1"
                                                                ? __("yes")
                                                                : value.value ===
                                                                    "0"
                                                                    ? __("no")
                                                                    : value.value
                                                        }}
                                                    </p>
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
            <front-modal :product="product" :title="modalTitle" :type="typeModal" :visible="isOpen"
                @close="isOpen = false" @select="console.log($event)" />
        </section>
        <hr />
        <product-section v-if="attrs.last_visited.length !== 0" :new_products="true" :products="attrs.last_visited"
            :title="__('visited_products')" />

        <!-- <product-section :products="page.props.relatedProducts" :title="__('related_products')" :top_products="true" /> -->
        <custom-modal :is-open="openModalSlider" @close-modal="closeModalSlider">
            <template v-slot:content>
                <div class="w-full">
                    <carousel :items-to-show="1" :transition="500" :wrap-around="true" class="w-full">
                        <slide v-for="(slide, index) in filteredImages" :key="index">
                            <img :alt="index" :src="slide" class="object-contain w-full h-[120vw] sm:h-[40vw]" />
                        </slide>
                        <template #addons>
                            <Navigation />
                            <Pagination />
                        </template>
                    </carousel>
                </div>
            </template>
        </custom-modal>
    </front-layout>
</template>

<style scoped></style>
