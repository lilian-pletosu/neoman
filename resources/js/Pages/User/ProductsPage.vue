<script setup>
import {onMounted, reactive, ref, useAttrs, watch} from 'vue'
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import {XMarkIcon} from '@heroicons/vue/24/outline'
import {ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon} from '@heroicons/vue/20/solid'
import FrontLayout from "@/Layouts/FrontLayout.vue";
import {useWishlistStore} from "@/stores/wishlistStore.js";
import {useCartStore} from "@/stores/cartStore.js";
import {HeartIcon} from "@heroicons/vue/24/outline/index.js";
import {Link, router} from "@inertiajs/vue3";
import Pagination from "@/Components/Pagination.vue";


const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const sortOptions = [
    {name: 'Newest', value: 'new', current: false},
    {name: 'Price: Low to High', value: 'asc', current: false},
    {name: 'Price: High to Low', value: 'desc', current: false},
]
const range = ref([0, 20])
const STORAGE_KEY = 'filterParams';

const props = defineProps({
    products: Object,
    subSubcategory: Object,
    brands: Array,
    attributes: Array
});

const mobileFiltersOpen = ref(false)
const attrs = useAttrs();

const brandsFilter = ref([]);
const attributesFilter = reactive({});
const sortProducts = ref('');
const priceRange = reactive(['', ''])


watch([brandsFilter, sortProducts, attributesFilter, priceRange], () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        brands: brandsFilter.value,
        sorts: sortProducts.value,
        attributes: attributesFilter,
        priceRange: priceRange
    }));
    updateFilteredProducts();
})

function updateFilteredProducts() {
    router.get(route('products_page', {subSubcategory: props.subSubcategory.slug}), {
        brands: brandsFilter.value,
        sorts: sortProducts.value,
        ...attributesFilter,
        price: {
            from: priceRange[0],
            to: priceRange[1]
        }
    }, {
        preserveState: true,
        preserveScroll: true
    })
}

function addVariable(name, value) {
    if (attributesFilter[name]) {
        if (attributesFilter[name].includes(value)) {
            attributesFilter[name] = attributesFilter[name].filter(item => item !== value);
        } else {
            attributesFilter[name].push(value);
        }
    } else {
        attributesFilter[name] = [value]
    }

}

function isOptionSelected(attribute, value) {
    return attributesFilter[attribute] && attributesFilter[attribute].includes(value);
}

onMounted(() => {
    // Încărcăm datele stocate din localStorage la încărcarea componentei
    const storedParams = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (storedParams) {
        brandsFilter.value = storedParams.brands || [];
        sortProducts.value = storedParams.sorts || '';
        Object.assign(attributesFilter, storedParams.attributes || {});
        Object.assign(priceRange, storedParams.priceRange || ['', '']);
    }
});
</script>

<template>
    <FrontLayout>
        <div class="bg-white">
            <div>
                <!-- Mobile filter dialog -->
                <TransitionRoot as="template" :show="mobileFiltersOpen">
                    <Dialog as="div" class="relative z-40 lg:hidden" @close="mobileFiltersOpen = false">
                        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                                         enter-from="opacity-0" enter-to="opacity-100"
                                         leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
                                         leave-to="opacity-0">
                            <div class="fixed inset-0 bg-black bg-opacity-25"/>
                        </TransitionChild>

                        <div class="fixed inset-0 z-40 flex">
                            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                                             enter-from="translate-x-full" enter-to="translate-x-0"
                                             leave="transition ease-in-out duration-300 transform"
                                             leave-from="translate-x-0" leave-to="translate-x-full">
                                <DialogPanel
                                    class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div class="flex items-center justify-between px-4">
                                        <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                                        <button type="button"
                                                class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                                @click="mobileFiltersOpen = false">
                                            <span class="sr-only">Close menu</span>
                                            <XMarkIcon class="h-6 w-6" aria-hidden="true"/>
                                        </button>
                                    </div>

                                    <!-- Filters -->
                                    <form class="mt-4 border-t border-gray-200">
                                        <h3 class="sr-only">Categories</h3>
                                        <ul role="list" class="px-2 py-3 font-medium text-gray-900">
                                            <li v-for="category in subCategories" :key="category.name">
                                                <a :href="category.href" class="block px-2 py-3">{{ category.name }}</a>
                                            </li>
                                        </ul>

                                        <Disclosure as="div" v-for="section in filters" :key="section.id"
                                                    class="border-t border-gray-200 px-4 py-6" v-slot="{ open }">
                                            <h3 class="-mx-2 -my-3 flow-root">
                                                <DisclosureButton
                                                    class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                    <span class="font-medium text-gray-900">{{
                                                            section.name
                                                        }} {{ filterParams }}</span>
                                                    <span class="ml-6 flex items-center">
                          <PlusIcon v-if="!open " class="h-5 w-5" aria-hidden="true"/>
                          <MinusIcon v-else class="h-5 w-5" aria-hidden="true"/>
                        </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel class="pt-6">
                                                <div class="space-y-6">
                                                    <div v-for="(option, optionIdx) in section.options"
                                                         :key="option.value"
                                                         class="flex items-center">
                                                        <input :id="`filter-mobile-${section.id}-${optionIdx}`"
                                                               :name="`${section.id}[]`" :value="option.value"
                                                               type="checkbox" :checked="option.checked"
                                                               class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                                        <label :for="`filter-mobile-${section.id}-${optionIdx}`"
                                                               class="ml-3 min-w-0 flex-1 text-gray-500">{{
                                                                option.label
                                                            }}</label>
                                                    </div>
                                                </div>
                                            </DisclosurePanel>
                                        </Disclosure>
                                    </form>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </Dialog>
                </TransitionRoot>

                <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between border-b border-gray-200 pb-2 pt-4">
                        <h1 class="font-mulish font-bold text-lg md:text-xl lg:text-2xl  ">
                            {{ subSubcategory.name }}</h1>
                        <div class="flex items-center">
                            <Menu as="div" class="relative inline-block text-left">
                                <div>
                                    <MenuButton
                                        class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        {{ __('sort') }}
                                        <ChevronDownIcon
                                            class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"/>
                                    </MenuButton>
                                </div>

                                <transition enter-active-class="transition ease-out duration-100"
                                            enter-from-class="transform opacity-0 scale-95"
                                            enter-to-class="transform opacity-100 scale-100"
                                            leave-active-class="transition ease-in duration-75"
                                            leave-from-class="transform opacity-100 scale-100"
                                            leave-to-class="transform opacity-0 scale-95">
                                    <MenuItems
                                        class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div class="py-1">
                                            <MenuItem v-for="option in sortOptions" :key="option.name"
                                                      v-slot="{ active }">
                                                <span class="cursor-pointer"
                                                      @click="sortProducts = option.value"
                                                      :class="[option.current ? 'font-medium text-gray-900' : 'text-gray-500', active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm']">{{
                                                        option.name
                                                    }}</span>
                                            </MenuItem>
                                        </div>
                                    </MenuItems>
                                </transition>
                            </Menu>


                            <button type="button"
                                    class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                    @click="mobileFiltersOpen = true">
                                <span class="sr-only">Filters</span>
                                <FunnelIcon class="h-5 w-5" aria-hidden="true"/>
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" class="pb-24 pt-6">
                        <h2 id="products-heading" class="sr-only">Products</h2>

                        <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            <!-- Filters -->
                            <form class="hidden lg:block">

                                <Disclosure as="div" v-for="brand in brands"
                                            class="border-b border-gray-200 py-6" v-slot="{ open }">
                                    <h3 class="-my-3 flow-root">
                                        <DisclosureButton
                                            class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                            <span class="font-medium text-gray-900">{{ brand.name }}</span>
                                            <span class="ml-6 flex items-center">
                                  <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true"/>
                                  <MinusIcon v-else class="h-5 w-5" aria-hidden="true"/>
                                    </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel class="pt-6">
                                        <div class="space-y-4">
                                            <div v-for="(option, optionIdx) in brand.options"
                                                 class="flex items-center">
                                                <input :name="option.value"
                                                       :value="option.id"
                                                       v-model="brandsFilter"
                                                       type="checkbox"
                                                       class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                                <label :for="option.value"
                                                       class="ml-3 text-sm text-gray-600 first-letter:uppercase">{{
                                                        option.value
                                                    }}</label>
                                            </div>
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>
                                <Disclosure as="div" v-for="attribute in attributes"
                                            class="border-b border-gray-200 py-6" v-slot="{ open }">
                                    <h3 class="-my-3 flow-root">
                                        <DisclosureButton
                                            class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                            <span class="font-medium text-gray-900">{{ attribute.name }}</span>
                                            <span class="ml-6 flex items-center">
                                  <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true"/>
                                  <MinusIcon v-else class="h-5 w-5" aria-hidden="true"/>
                                    </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel class="pt-6">
                                        <div class="space-y-4">
                                            <div v-for="(option) in attribute.options"
                                                 class="flex items-center">
                                                <input :name="option.value"
                                                       :value="option.id"
                                                       @change="addVariable(attribute.key, option.id)"
                                                       type="checkbox"
                                                       :checked="isOptionSelected(attribute.key, option.id)"
                                                       class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                                <label :for="option.value"
                                                       class="ml-3 text-sm text-gray-600 first-letter:uppercase">{{
                                                        option.value
                                                    }}</label>
                                            </div>
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>
                                <Disclosure as="div"
                                            class="border-b border-gray-200 py-6" v-slot="{ open }">
                                    <h3 class="-my-3 flow-root">
                                        <DisclosureButton
                                            class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                            <span class="font-medium text-gray-900">{{ __('price') }}</span>
                                            <span class="ml-6 flex items-center">
                                  <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true"/>
                                  <MinusIcon v-else class="h-5 w-5" aria-hidden="true"/>
                                    </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel :unmount="true" class="pt-6">

                                        <div class=" ">
                                            <div class="flex justify-around space-x-2 ">
                                                <input placeholder="min"
                                                       type="number"
                                                       :min="0"
                                                       v-model="priceRange[0]"
                                                       class="w-full rounded-sm h-8 ">
                                                <input placeholder="max" type="number"
                                                       :min="0"
                                                       v-model="priceRange[1]"
                                                       class="w-full rounded-sm h-8 ">
                                            </div>
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>
                            </form>

                            <!-- Product grid -->
                            <div class="lg:col-span-3 ">
                                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4">
                                    <div v-for="product in products.data" class="">
                                        <div
                                            class="container-rounded bg-3 relative group/card">
                                            <div class="hover:cursor-pointer">
                                                <div>
                                                    <div class="static">
                                                        <div class="w-12 absolute left-2 top-2 z-80">
                                                            <img class="mix-blend-multiply" :src="product.brand.image"
                                                                 :alt="product.brand.name">
                                                        </div>
                                                        <div @click="wishlistStore.addProductInWishlist(product.id)"
                                                             class=" absolute group right-2 top-2 bg-white rounded-xl p-2 bg-opacity-40 cursor-pointer">
                                                            <heart-icon
                                                                class="w-4 group-hover:text-red-500 group-hover:fill-red-500"
                                                                :class="{'text-red-500 fill-red-500': wishlistStore.checkIfProductExistInWishlist(product.id)}"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Link :href="route('product_page', {slug: product.slug})">
                                                    <div>
                                                        <div class="mt-2">
                                                            <img :src="product.images[0].image1" alt="Product Image"
                                                                 class="transition  hover:scale-110   object-cover opacity-100 mix-blend-multiply ">
                                                        </div>
                                                    </div>
                                                    <div class="relative my-8 md:my-6">
                                                        <p class="font-mulish font-bold text-shadow-lg text-xs md:text-lg text-black ">
                                                            {{
                                                                product.name.slice(0, 42) + '...'
                                                            }}</p>
                                                    </div>
                                                </Link>
                                            </div>

                                            <div
                                                class="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                                                <div class="flex flex-col items-start">

                                                    <p class="font-mulish text-xl font-semibold">{{ product.price }}
                                                        {{ __('lei') }}</p>
                                                </div>
                                                <div @click="cartStore.addProductInCart(product.id)"
                                                     class="shadow  rounded-lg  transition p-4 sm:p-4   hover:scale-110  hover:bg-[#1FC8F3]  cursor-pointer group/cart"
                                                     :class="cartStore.checkIfProductExistInCart(product.id) ? 'bg-[#1FC8F3]' : 'bg-white'">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                         class="h-4 w-4  group-hover/cart:text-white"
                                                         :class="cartStore.checkIfProductExistInCart(product.id) ? 'text-white' : 'text-black'">
                                                        <path
                                                            d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                                                    </svg>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div class="flex place-content-center p-4 mt-4">
                                    <pagination v-if="products.links"
                                                :links="products.links"/>
                                </div>
                            </div>

                        </div>
                    </section>
                </main>
            </div>
        </div>
    </FrontLayout>
</template>

