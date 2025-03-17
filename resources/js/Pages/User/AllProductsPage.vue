<script setup>
import { onBeforeUnmount, onMounted, ref, useAttrs, watch } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import FrontLayout from "@/Layouts/FrontLayout.vue";
import { useWishlistStore } from "@/stores/wishlistStore.js";
import { useCartStore } from "@/stores/cartStore.js";
import { ChevronDownIcon, HeartIcon } from "@heroicons/vue/24/outline/index.js";
import { Link, router } from "@inertiajs/vue3";
import Pagination from "@/Components/Pagination.vue";
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
const STORAGE_KEY = "sort";
const props = defineProps({
    products: Object,
    search: {
        required: false,
        default: null,
    },
});

const attrs = useAttrs();

const sortProducts = ref("");

watch(sortProducts, () => {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
            sorts: sortProducts.value,
            search: props.search,
        })
    );
    updateFilteredProducts();
});

function updateFilteredProducts() {
    router.get(
        route("search_page", {
            search: JSON.parse(localStorage.getItem(STORAGE_KEY)).search,
        }),
        {
            sorts: sortProducts.value,
        },
        {
            preserveState: true,
            preserveScroll: true,
        }
    );
}

onMounted(() => {
    const storedParams = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (storedParams) {
        sortProducts.value = storedParams.sorts || "";
    }
});
onBeforeUnmount(() => {
    localStorage.removeItem(STORAGE_KEY);
});
</script>

<template>
    <FrontLayout>
        <div class="bg-white">
            <div>
                <!-- Mobile filter dialog -->

                <main class="max-w-full px-4 mx-auto sm:px-6 lg:px-8">
                    <div
                        class="flex items-center justify-between pt-4 pb-2 border-b border-gray-200"
                    >
                        <span class="flex gap-2">
                            <p
                                class="text-lg font-light font-mulish md:text-xl lg:text-2xl"
                            >
                                {{ __("search_for") }}:
                            </p>
                            <h1
                                class="text-lg font-bold font-mulish md:text-xl lg:text-2xl"
                            >
                                {{ search }}
                            </h1>
                        </span>
                        <div class="flex items-center">
                            <Menu
                                as="div"
                                class="relative inline-block text-left"
                            >
                                <div v-if="products.data.length > 0">
                                    <MenuButton
                                        class="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900"
                                    >
                                        <span>{{ __("sort") }}</span>
                                        <ChevronDownIcon
                                            class="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
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
                                                    class="cursor-pointer"
                                                    @click="
                                                        sortProducts =
                                                            option.value
                                                    "
                                                    :class="[
                                                        option.current
                                                            ? 'font-medium text-gray-900'
                                                            : 'text-gray-500',
                                                        active
                                                            ? 'bg-gray-100'
                                                            : '',
                                                        'block px-4 py-2 text-sm',
                                                    ]"
                                                    >{{ option.name }}</span
                                                >
                                            </MenuItem>
                                        </div>
                                    </MenuItems>
                                </transition>
                            </Menu>
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
                            <!-- Product grid -->
                            <div
                                v-if="products.data.length > 0"
                                class="md:grid-cols-3 lg:col-span-6"
                            >
                                <div
                                    class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:col-span-3 2xl:grid-cols-4 4xl:grid-cols-5"
                                >
                                    <div v-for="product in products.data">
                                        <div
                                            class="relative container-rounded bg-3 group/card"
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
                                                            >{{ __("credit") + " " + "0%"}}
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
                                                                class="mix-blend-multiply"
                                                                :src="
                                                                    product
                                                                        ?.brand
                                                                        ?.image
                                                                "
                                                                :alt="
                                                                    product
                                                                        ?.brand
                                                                        ?.name
                                                                "
                                                            />
                                                        </div>
                                                        <div
                                                            @click="
                                                                wishlistStore.addProductInWishlist(
                                                                    product.id
                                                                )
                                                            "
                                                            class="absolute p-2 bg-white cursor-pointer group right-2 top-2 rounded-xl bg-opacity-40"
                                                        >
                                                            <heart-icon
                                                                class="w-4 group-hover:text-red-500 group-hover:fill-red-500"
                                                                :class="{
                                                                    'text-red-500 fill-red-500':
                                                                        wishlistStore.checkIfProductExistInWishlist(
                                                                            product.id
                                                                        ),
                                                                }"
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
                                                                        .images[0]
                                                                        .image1
                                                                "
                                                                alt="Product Image"
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
                                                                product.name.slice(
                                                                    0,
                                                                    42
                                                                ) + "..."
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
                                                                    product.price
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
                                                                product.promotion_price
                                                            }}
                                                            {{ __("lei") }}
                                                        </p>
                                                    </template>
                                                    <template v-else>
                                                        <p
                                                            class="text-xl font-medium font-mulish"
                                                        >
                                                            {{ product.price }}
                                                            {{ __("lei") }}
                                                        </p>
                                                    </template>
                                                </div>
                                                <div
                                                    @click="
                                                        cartStore.addProductInCart(
                                                            product.id,
                                                            'default'
                                                        )
                                                    "
                                                    class="shadow rounded-lg transition p-4 sm:p-4 hover:scale-110 hover:bg-[#1FC8F3] cursor-pointer group/cart"
                                                    :class="
                                                        cartStore.checkIfProductExistInCart(
                                                            product.id
                                                        )
                                                            ? 'bg-[#1FC8F3]'
                                                            : 'bg-white'
                                                    "
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        class="w-4 h-4 group-hover/cart:text-white"
                                                        :class="
                                                            cartStore.checkIfProductExistInCart(
                                                                product.id
                                                            )
                                                                ? 'text-white'
                                                                : 'text-black'
                                                        "
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
                                class="mx-auto lg:col-span-6"
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
