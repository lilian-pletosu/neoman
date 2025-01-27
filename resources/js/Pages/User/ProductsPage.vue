<script setup>
import {
    computed,
    onBeforeUnmount,
    onMounted,
    reactive,
    ref,
    useAttrs,
    watch,
} from "vue";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/vue";
import {
    ChevronDownIcon,
    FunnelIcon,
    MinusIcon,
    PlusIcon,
    PresentationChartBarIcon,
} from "@heroicons/vue/20/solid";
import FrontLayout from "@/Layouts/FrontLayout.vue";
import { useWishlistStore } from "@/stores/wishlistStore.js";
import { useCartStore } from "@/stores/cartStore.js";
import { HeartIcon } from "@heroicons/vue/24/outline/index.js";
import { Link, router } from "@inertiajs/vue3";
import Pagination from "@/Components/Pagination.vue";
import ReusableSidebar from "@/Components/ReusableSidebar.vue";
import { formatPrice } from "../../helpers/helper.js";
import { getCurrentInstance } from "vue";

const app = getCurrentInstance();

const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const sortOptions = [
    {
        name: app.appContext.config.globalProperties.__("newest"),
        value: "new",
        current: false,
    },
    {
        name: app.appContext.config.globalProperties.__("price_asc"),
        value: "asc",
        current: false,
    },
    {
        name: app.appContext.config.globalProperties.__("price_desc"),
        value: "desc",
        current: false,
    },
];
const range = ref([0, 20]);
const STORAGE_KEY = "filterParams";

const props = defineProps({
    products: Object,
    subSubcategory: Object,
    brands: Array,
    attributes: Array,
});

const computedAttributes = computed(() => {
    const temp = props.attributes.map((attribute) => {
        if (attribute.name) return attribute;
    });
    return temp.filter((item) => {
        return item !== undefined;
    });
});

const mobileFiltersOpen = ref(false);
const attrs = useAttrs();

const brandsFilter = ref([]);
const attributesFilter = reactive({});
const sortProducts = ref("");
const priceRange = reactive(["", ""]);

watch([brandsFilter, sortProducts, attributesFilter, priceRange], () => {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
            brands: brandsFilter.value,
            sorts: sortProducts.value,
            attributes: attributesFilter,
            priceRange: priceRange,
        })
    );
    updateFilteredProducts();
});

if (window.innerWidth < 1024) {
    mobileFiltersOpen.value = false;
}

function updateFilteredProducts() {
    let isEmptyPriceRange = priceRange.every((item) => item === "");

    router.get(
        route("products_page", { subSubcategory: props.subSubcategory.slug }),
        {
            brands: brandsFilter.value,
            sorts: sortProducts.value,
            ...attributesFilter,
            price: !isEmptyPriceRange
                ? {
                      from: priceRange[0],
                      to: priceRange[1],
                  }
                : null,
        },
        {
            preserveState: true,
            preserveScroll: true,
        }
    );
}

function addVariable(name, value) {
    if (attributesFilter[name]) {
        if (attributesFilter[name].includes(value)) {
            attributesFilter[name] = attributesFilter[name].filter(
                (item) => item !== value
            );
        } else {
            attributesFilter[name].push(value);
        }
    } else {
        attributesFilter[name] = [value];
    }
}

function isOptionSelected(attribute, value) {
    return (
        attributesFilter[attribute] &&
        attributesFilter[attribute].includes(value)
    );
}

onMounted(() => {
    const storedParams = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (storedParams) {
        brandsFilter.value = storedParams.brands || [];
        sortProducts.value = storedParams.sorts || "";
        Object.assign(attributesFilter, storedParams.attributes || {});
        Object.assign(priceRange, storedParams.priceRange || ["", ""]);
    }
});
onBeforeUnmount(() => {
    localStorage.removeItem(STORAGE_KEY);
});
</script>

<template>
    <FrontLayout
        :title="subSubcategory.name"
        :meta-description="`Cumpără ${subSubcategory.name} la cele mai bune prețuri pe Neoman.md. Catalog complet de produse, livrare în toată Moldova și garanție de calitate.`"
        :meta-keywords="`${subSubcategory.name}, ${subSubcategory.name} moldova, catalog ${subSubcategory.name}, pret ${subSubcategory.name}, ${subSubcategory.name} online, magazin ${subSubcategory.name}`"
        :current-url="route('products_page', subSubcategory.slug)"
        :current-language="$page.props.locale"
    >
        <div class="bg-white">
            <div>
                <!-- Mobile filter dialog -->
                <ReusableSidebar
                    :open="mobileFiltersOpen"
                    :title="__('filter')"
                    class="lg:hidden"
                    @close="mobileFiltersOpen = false"
                >
                    <template v-slot:content>
                        <div class="px-4">
                            <form class="block">
                                <Disclosure
                                    v-slot="{ open }"
                                    as="div"
                                    class="py-6 border-b border-gray-200"
                                >
                                    <h3 class="flow-root -my-3">
                                        <DisclosureButton
                                            class="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500"
                                        >
                                            <span
                                                class="font-medium text-gray-900"
                                                >{{ __("price") }}</span
                                            >
                                            <span
                                                class="flex items-center ml-6"
                                            >
                                                <PlusIcon
                                                    v-if="!open"
                                                    aria-hidden="true"
                                                    class="w-5 h-5"
                                                />
                                                <MinusIcon
                                                    v-else
                                                    aria-hidden="true"
                                                    class="w-5 h-5"
                                                />
                                            </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel
                                        :unmount="true"
                                        class="pt-6"
                                    >
                                        <div class="">
                                            <div
                                                class="flex justify-around space-x-2"
                                            >
                                                <input
                                                    v-model="priceRange[0]"
                                                    :min="0"
                                                    class="w-full h-8 rounded-sm"
                                                    :placeholder="__('min')"
                                                    type="number"
                                                />
                                                <input
                                                    v-model="priceRange[1]"
                                                    :min="0"
                                                    class="w-full h-8 rounded-sm"
                                                    :placeholder="__('max')"
                                                    type="number"
                                                />
                                            </div>
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>
                                <!--               Brand                 -->
                                <Disclosure
                                    v-for="brand in brands"
                                    v-slot="{ open }"
                                    as="div"
                                    class="py-6 border-b border-gray-200"
                                >
                                    <h3 class="flow-root -my-3">
                                        <DisclosureButton
                                            class="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500"
                                        >
                                            <span
                                                class="font-medium text-gray-900"
                                                >{{ brand.name }}</span
                                            >
                                            <span
                                                class="flex items-center ml-6"
                                            >
                                                <PlusIcon
                                                    v-if="!open"
                                                    aria-hidden="true"
                                                    class="w-5 h-5"
                                                />
                                                <MinusIcon
                                                    v-else
                                                    aria-hidden="true"
                                                    class="w-5 h-5"
                                                />
                                            </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel class="pt-6">
                                        <div class="space-y-4">
                                            <div
                                                v-for="(
                                                    option, optionIdx
                                                ) in brand.options"
                                                class="flex items-center"
                                            >
                                                <input
                                                    v-model="brandsFilter"
                                                    :name="option.value"
                                                    :value="option.id"
                                                    class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                    type="checkbox"
                                                />
                                                <label
                                                    :for="option.value"
                                                    class="ml-3 text-sm text-gray-600 first-letter:uppercase"
                                                    >{{ option.value }}</label
                                                >
                                            </div>
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>
                                <!--               Attributes                 -->
                                <Disclosure
                                    v-for="attribute in computedAttributes"
                                    v-slot="{ open }"
                                    as="div"
                                    class="py-6 border-b border-gray-200"
                                >
                                    <h3 class="flow-root -my-3">
                                        <DisclosureButton
                                            class="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500"
                                        >
                                            <span
                                                class="font-medium text-gray-900"
                                                >{{ attribute.name }}</span
                                            >
                                            <span
                                                class="flex items-center ml-6"
                                            >
                                                <PlusIcon
                                                    v-if="!open"
                                                    aria-hidden="true"
                                                    class="w-5 h-5"
                                                />
                                                <MinusIcon
                                                    v-else
                                                    aria-hidden="true"
                                                    class="w-5 h-5"
                                                />
                                            </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel
                                        v-if="attribute.name"
                                        class="pt-6"
                                    >
                                        <div class="space-y-4">
                                            <div
                                                v-for="option in attribute.options"
                                                class="flex items-center"
                                            >
                                                <input
                                                    :checked="
                                                        isOptionSelected(
                                                            attribute.key,
                                                            option.id
                                                        )
                                                    "
                                                    :name="option.value"
                                                    :value="option.id"
                                                    class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                    type="checkbox"
                                                    @change="
                                                        addVariable(
                                                            attribute.key,
                                                            option.id
                                                        )
                                                    "
                                                />
                                                <label
                                                    :for="option.value"
                                                    class="ml-3 text-sm text-gray-600 first-letter:uppercase"
                                                    >{{ option.value }}</label
                                                >
                                            </div>
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>
                            </form>
                        </div>
                    </template>
                </ReusableSidebar>

                <main
                    class="max-w-full px-4 mx-auto bg-white sm:px-6 lg:px-8 dark:bg-dark"
                >
                    <div
                        class="flex items-center justify-between pt-4 pb-2 border-b border-gray-200 text-dark dark:text-white"
                    >
                        <h1
                            class="text-lg font-bold font-mulish md:text-xl lg:text-2xl"
                        >
                            {{ subSubcategory.name }}
                        </h1>
                        <div class="flex items-center">
                            <Menu
                                as="div"
                                class="relative inline-block text-left"
                            >
                                <div>
                                    <MenuButton
                                        class="inline-flex justify-center text-sm font-medium text-gray-400 group hover:text-gray-500"
                                    >
                                        <span class="hidden sm:flex">{{
                                            __("sort")
                                        }}</span>
                                        <span class="flex sm:hidden"
                                            ><PresentationChartBarIcon
                                                aria-hidden="true"
                                                class="w-5 h-5"
                                        /></span>
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            class="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
                                        />
                                    </MenuButton>
                                </div>

                                <transition
                                    enter-active-class="transition duration-100 ease-out"
                                    enter-from-class="transform scale-95 opacity-0"
                                    enter-to-class="transform scale-100 opacity-100"
                                    leave-active-class="transition duration-75 ease-in"
                                    leave-from-class="transform scale-100 opacity-100"
                                    leave-to-class="transform scale-95 opacity-0"
                                >
                                    <MenuItems
                                        class="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    >
                                        <div class="py-1">
                                            <MenuItem
                                                v-for="option in sortOptions"
                                                :key="option.name"
                                                v-slot="{ active }"
                                            >
                                                <span
                                                    :class="[
                                                        option.current
                                                            ? 'font-medium text-gray-900'
                                                            : 'text-gray-500',
                                                        active
                                                            ? 'bg-gray-100'
                                                            : '',
                                                        'block px-4 py-2 text-sm',
                                                    ]"
                                                    class="cursor-pointer"
                                                    @click="
                                                        sortProducts =
                                                            option.value
                                                    "
                                                    >{{ option.name }}</span
                                                >
                                            </MenuItem>
                                        </div>
                                    </MenuItems>
                                </transition>
                            </Menu>

                            <button
                                class="p-2 ml-4 -m-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                type="button"
                                @click="mobileFiltersOpen = true"
                            >
                                <span class="sr-only">Filters</span>
                                <FunnelIcon
                                    aria-hidden="true"
                                    class="w-5 h-5"
                                />
                            </button>
                        </div>
                    </div>

                    <section
                        aria-labelledby="products-heading"
                        class="pt-6 pb-24"
                    >
                        <h2 id="products-heading" class="sr-only">
                            {{ __("products") }}
                        </h2>

                        <div
                            class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-6"
                        >
                            <!-- Filters -->
                            <form class="hidden lg:block">
                                <Disclosure
                                    v-slot="{ open }"
                                    as="div"
                                    class="py-6 border-b border-gray-200"
                                >
                                    <h3 class="flow-root -my-3">
                                        <DisclosureButton
                                            class="flex items-center justify-between w-full py-3 text-gray-400 bg-white hover:text-gray-500 dark:bg-dark"
                                        >
                                            <span
                                                class="text-xs text-gray-900 2xl:text-sm 4xl:text-base dark:text-slate-200"
                                                >{{ __("price") }}</span
                                            >
                                            <span
                                                class="flex items-center ml-6"
                                            >
                                                <PlusIcon
                                                    v-if="!open"
                                                    aria-hidden="true"
                                                    class="w-5 h-5"
                                                />
                                                <MinusIcon
                                                    v-else
                                                    aria-hidden="true"
                                                    class="w-5 h-5"
                                                />
                                            </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel
                                        :unmount="true"
                                        class="pt-6"
                                    >
                                        <div class="">
                                            <div
                                                class="flex justify-around space-x-2"
                                            >
                                                <input
                                                    v-model="priceRange[0]"
                                                    :min="0"
                                                    class="w-full h-8 rounded-sm"
                                                    :placeholder="__('min')"
                                                    type="number"
                                                />
                                                <input
                                                    v-model="priceRange[1]"
                                                    :min="0"
                                                    class="w-full h-8 rounded-sm"
                                                    :placeholder="__('max')"
                                                    type="number"
                                                />
                                            </div>
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>
                                <Disclosure
                                    v-for="brand in brands"
                                    v-slot="{ open }"
                                    as="div"
                                    class="py-6 border-b border-gray-200"
                                >
                                    <h3 class="flow-root -my-3">
                                        <DisclosureButton
                                            class="flex items-center justify-between w-full py-3 text-gray-400 dark:bg-dark hover:text-gray-500"
                                        >
                                            <span
                                                class="text-xs text-gray-900 2xl:text-sm 4xl:text-base dark:text-slate-200"
                                                >{{ brand?.name }}</span
                                            >
                                            <span
                                                class="flex items-center ml-6"
                                            >
                                                <PlusIcon
                                                    v-if="!open"
                                                    aria-hidden="true"
                                                    class="w-5 h-5"
                                                />
                                                <MinusIcon
                                                    v-else
                                                    aria-hidden="true"
                                                    class="w-5 h-5"
                                                />
                                            </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel class="pt-6">
                                        <div class="space-y-4">
                                            <div
                                                v-for="(
                                                    option, optionIdx
                                                ) in brand.options"
                                                class="flex items-center"
                                            >
                                                <input
                                                    v-model="brandsFilter"
                                                    :name="option.value"
                                                    :value="option.id"
                                                    class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                    type="checkbox"
                                                />
                                                <label
                                                    :for="option.value"
                                                    class="ml-3 text-sm text-gray-600 first-letter:uppercase"
                                                    >{{
                                                        `${option.value} (${option.count})`
                                                    }}</label
                                                >
                                            </div>
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>
                                <Disclosure
                                    v-for="attribute in computedAttributes"
                                    v-slot="{ open }"
                                    as="div"
                                    class="py-6 border-b border-gray-200"
                                >
                                    <h3 class="flow-root -my-3">
                                        <DisclosureButton
                                            class="flex items-center justify-between w-full py-3 text-gray-400 dark:bg-dark hover:text-gray-500"
                                        >
                                            <span
                                                class="text-xs text-gray-900 2xl:text-sm 4xl:text-base dark:text-slate-200"
                                                >{{ attribute.name }}</span
                                            >
                                            <span
                                                class="flex items-center ml-6"
                                            >
                                                <PlusIcon
                                                    v-if="!open"
                                                    aria-hidden="true"
                                                    class="w-5 h-5"
                                                />
                                                <MinusIcon
                                                    v-else
                                                    aria-hidden="true"
                                                    class="w-5 h-5"
                                                />
                                            </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel class="pt-6">
                                        <div class="space-y-4">
                                            <div
                                                v-for="option in attribute.options"
                                                class="flex items-center"
                                            >
                                                <input
                                                    :checked="
                                                        isOptionSelected(
                                                            attribute.key,
                                                            option.id
                                                        )
                                                    "
                                                    :name="option.value"
                                                    :value="option.id"
                                                    class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                    type="checkbox"
                                                    @change="
                                                        addVariable(
                                                            attribute.key,
                                                            option.id
                                                        )
                                                    "
                                                />
                                                <label
                                                    :for="option.value"
                                                    class="ml-3 text-sm text-gray-600 first-letter:uppercase"
                                                >
                                                    <template
                                                        v-if="option.value == 1"
                                                        >{{ __("yes") }}
                                                    </template>
                                                    <template v-else>
                                                        {{ option.value }}
                                                    </template>
                                                </label>
                                            </div>
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>
                            </form>

                            <!-- Product grid -->
                            <div
                                v-if="products.data.length > 0"
                                class="md:grid-cols-3 lg:col-span-5"
                            >
                                <div
                                    class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:col-span-4 2xl:grid-cols-3 4xl:grid-cols-4"
                                >
                                    <div v-for="product in products.data">
                                        <div
                                            class="container-rounded bg-3 relative group/card xl:min-h-[27.5rem]"
                                        >
                                            <div
                                                v-if="
                                                    product?.credits?.length > 0
                                                "
                                                class="absolute left-0 w-full -top-0"
                                            >
                                                <div
                                                    class="flex justify-center"
                                                >
                                                    <div
                                                        class="flex items-center rounded-b-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-10 py-0.5 p h-auto shadow border-1 border-slate-600"
                                                    >
                                                        <span
                                                            class="text-xs font-semibold text-white"
                                                            >{{ __("credit") }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="pb-2 hover:cursor-pointer"
                                            >
                                                <div>
                                                    <div class="static">
                                                        <div
                                                            class="absolute w-12 left-2 top-2 z-80"
                                                        >
                                                            <img
                                                                :alt="
                                                                    product
                                                                        ?.brand
                                                                        ?.name
                                                                "
                                                                :src="
                                                                    product
                                                                        ?.brand
                                                                        ?.image
                                                                "
                                                                class="mix-blend-multiply"
                                                            />
                                                        </div>
                                                        <div
                                                            class="absolute p-2 bg-white cursor-pointer group right-2 top-2 rounded-xl bg-opacity-40"
                                                            @click="
                                                                wishlistStore.addProductInWishlist(
                                                                    product.id
                                                                )
                                                            "
                                                        >
                                                            <heart-icon
                                                                :class="{
                                                                    'text-red-500 fill-red-500':
                                                                        wishlistStore.checkIfProductExistInWishlist(
                                                                            product.id
                                                                        ),
                                                                }"
                                                                class="w-4 group-hover:text-red-500 group-hover:fill-red-500"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <Link
                                                    :href="
                                                        route('product_page', {
                                                            slug: product.slug,
                                                        })
                                                    "
                                                >
                                                    <div>
                                                        <div class="mt-2">
                                                            <img
                                                                :src="
                                                                    product
                                                                        ?.images[0]
                                                                        ?.image1
                                                                "
                                                                :alt="
                                                                    product?.slug
                                                                "
                                                                class="object-contain w-56 h-56 mx-auto transition opacity-100 hover:scale-110 aspect-square mix-blend-multiply"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="relative my-8 md:my-6"
                                                    >
                                                        <p
                                                            class="text-xs font-bold text-black font-mulish text-shadow-lg md:text-lg"
                                                        >
                                                            {{
                                                                product?.name?.slice(
                                                                    0,
                                                                    42
                                                                ) + "..." ?? ""
                                                            }}
                                                        </p>
                                                    </div>
                                                </Link>
                                            </div>

                                            <div
                                                class="absolute flex items-center justify-between bottom-2 left-2 right-2"
                                            >
                                                <div
                                                    class="flex flex-col items-start"
                                                >
                                                    <template
                                                        v-if="
                                                            product.has_discount
                                                        "
                                                    >
                                                        <div
                                                            class="flex flex-row space-x-1"
                                                        >
                                                            <p
                                                                class="text-sm font-medium line-through font-mulish"
                                                            >
                                                                {{
                                                                    formatPrice(
                                                                        product.price
                                                                    )
                                                                }}
                                                                {{ __("lei") }}
                                                            </p>
                                                            <span
                                                                class="bg-red-400 text-white text-xs font-medium me-2 px-0.5 sm:px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                                                                >{{
                                                                    product.sale
                                                                }}</span
                                                            >
                                                        </div>
                                                    </template>
                                                    <template
                                                        v-if="
                                                            product.promotion_price
                                                        "
                                                    >
                                                        <p
                                                            class="text-xl font-medium font-mulish"
                                                        >
                                                            {{
                                                                formatPrice(
                                                                    product.promotion_price
                                                                )
                                                            }}
                                                            {{ __("lei") }}
                                                        </p>
                                                    </template>
                                                    <template v-else>
                                                        <p
                                                            class="text-xl font-medium font-mulish"
                                                        >
                                                            {{
                                                                formatPrice(
                                                                    product.price
                                                                )
                                                            }}
                                                            {{ __("lei") }}
                                                        </p>
                                                    </template>
                                                </div>
                                                <div
                                                    :class="
                                                        cartStore.checkIfProductExistInCart(
                                                            product.id
                                                        )
                                                            ? 'bg-[#1FC8F3]'
                                                            : 'bg-white'
                                                    "
                                                    class="shadow rounded-lg transition p-4 sm:p-4 hover:scale-110 hover:bg-[#1FC8F3] cursor-pointer group/cart"
                                                    @click="
                                                        cartStore.addProductInCart(
                                                            product.id,
                                                            'default'
                                                        )
                                                    "
                                                >
                                                    <svg
                                                        :class="
                                                            cartStore.checkIfProductExistInCart(
                                                                product.id
                                                            )
                                                                ? 'text-white'
                                                                : 'text-black'
                                                        "
                                                        class="w-4 h-4 group-hover/cart:text-white"
                                                        fill="currentColor"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex p-4 mt-4 place-content-center">
                                    <pagination
                                        v-if="products.links"
                                        :links="products.links"
                                    />
                                </div>
                            </div>
                            <div
                                v-if="products.data.length <= 0"
                                class="mx-auto lg:col-span-3"
                            >
                                <p
                                    class="py-12 text-2xl font-bold text-gray-500"
                                >
                                    {{ __("no_products") }}
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    </FrontLayout>
</template>
