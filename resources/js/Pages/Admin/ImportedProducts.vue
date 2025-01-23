<template>
    <admin-layout :current-route="initialRoute" title="Products">
        <div class="grid w-full grid-cols-1 gap-4">
            <div class="container-rounded">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="primary-text">
                            {{ __("products_for_importing") }}
                        </h3>
                        <span class="secondary-text"
                            >{{
                                __("products_for_importing_description_admin")
                            }}.
                        </span>
                        <br />
                        <span class="text-xs text-gray-500 underline">{{
                            __(
                                "attention_imported_products_will_not_be_visible_until_they_are_saved_to_a_category"
                            )
                        }}</span>
                    </div>
                    <div
                        v-if="Object.keys(selectedProduct).length !== 0"
                        class="flex justify-end mb-2"
                    >
                        <primary-button class="mx-2" @click="isOpen = !isOpen"
                            >{{ __("save_imported_products") }}
                        </primary-button>
                        <DangerButton @click="deleteSelectedProducts">{{
                            __("delete_selected")
                        }}</DangerButton>
                    </div>
                </div>
                <div class="my-2">
                    <TextInput
                        v-model="dt"
                        :placeholder="__('search')"
                        class="min-w-16"
                        @blur="search = !search"
                    />
                    <Link
                        :data="{ search: dt }"
                        :href="route(`${page.props.searchRoute}.index`)"
                        preserve-state
                    >
                        <secondary-button class="mx-2"
                            >{{ __("search") }}
                        </secondary-button>
                    </Link>
                </div>
                <DataTest
                    :data="filterData"
                    :columns="columns"
                    :selectable="true"
                    :pagination="resources.links"
                    @selection-change="handleSelectionChange"
                >
                    <template #image="{ item }">
                        <img
                            :src="
                                item.images?.image1 ??
                                'https://banner2.cleanpng.com/20180815/sit/a1fff69c4e6de4ea9f7a7f388f4b51cb.webp'
                            "
                            alt="no"
                            class="w-10 h-10"
                        />
                    </template>
                    <template #updated_at="{ item }">
                        <div class="flex items-center gap-1">
                            <ClockIcon
                                class="w-5 h-5 text-gray-400"
                                aria-hidden="true"
                            />
                            {{ formatDate(item.updated_at) }}
                        </div>
                    </template>
                </DataTest>
                <div>
                    <h2
                        v-if="resources.data.length === 0"
                        class="flex justify-center"
                    >
                        {{ __("no_products") }}...
                    </h2>
                </div>

                <Modal
                    :actions="false"
                    :closeable="true"
                    :show="isOpen"
                    @close="closeModal"
                >
                    <div class="h-auto p-4 bg-gray-100">
                        <BlackSelectorImport
                            :column="name"
                            :label="
                                __('select_sub_subcategory_where_save_products')
                            "
                            :options="page.props.sub_subcategories"
                            @update:status="
                                (val) => (form.sub_subcategory = val)
                            "
                        />
                        <div class="flex items-center text-yellow-800">
                            <ExclamationCircleIcon class="w-5 h-5" />
                            <span class="text-xs">{{
                                __(
                                    "if_dont_select_subcategory_will_be_setted_automatically"
                                )
                            }}</span>
                        </div>
                        <div class="flex justify-end mt-4 space-x-2">
                            <secondary-button @click="isOpen = !isOpen"
                                >{{ __("cancel") }}
                            </secondary-button>
                            <primary-button class="mx-2" @click="submit()"
                                >{{ __("save_imported_products") }}
                            </primary-button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    </admin-layout>
</template>

<script setup>
import { getCurrentInstance, ref, watch, computed } from "vue";
import AdminLayout from "@/Layouts/AdminLayout.vue";
import { Link, useForm, usePage } from "@inertiajs/vue3";
import Pagination from "@/Components/Pagination.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import Modal from "@/Components/Modal.vue";
import BlackSelectorImport from "@/Components/BlackSelectorImport.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import toast from "@/stores/toast.js";
import DangerButton from "@/Components/DangerButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { Inertia } from "@inertiajs/inertia";
import { formatDate } from "@/helper";
import { ClockIcon, ExclamationCircleIcon } from "@heroicons/vue/24/outline";
import DataTest from "@/Components/DataTest.vue";

const app = getCurrentInstance();

const props = defineProps({
    initialRoute: {
        type: String,
    },
    resourceType: {
        type: String,
    },
    resources: {
        type: Object,
    },
});
const isOpen = ref(false);
const selectedProduct = ref([]);
const page = usePage();
const dt = ref("");
const search = ref(false);

const columns = [
    { key: "image", label: "image" },
    { key: "name.ro", label: "name" },
    { key: "category.name", label: "sub_subcategory" },
    { key: "brand.name", label: "brand" },
    { key: "price", label: "price" },
    { key: "updated_at", label: "updated_at" },
];
const handleSelectionChange = (selected) => {
    selectedProduct.value = selected;
};
const isSelected = (product) => {
    return selectedProduct.value.includes(product);
};

const selectProducts = (product) => {
    if (selectedProduct.value.includes(product)) {
        selectedProduct.value = selectedProduct.value.filter(
            (item) => item !== product
        );
    } else {
        selectedProduct.value = [...selectedProduct.value, product];
    }
};
const selectAll = () => {
    if (selectedProduct.value.length === props.resources.data.length) {
        selectedProduct.value = [];
    } else {
        selectedProduct.value = [...props.resources.data];
    }
};

watch(selectedProduct, (newState, oldState) => {
    form.products = newState;
});

const form = useForm({
    products: [],
    sub_subcategory: null,
});

const submit = () => {
    form.post(route("admin.imported-products.store"), {
        preserveScroll: true,
        onSuccess: () => {
            // toast.add({ message: page.props.toast });
            isOpen.value = false;
            selectedProduct.value = [];
            // form.category = null;
            // form.subcategory = null;
            form.sub_subcategory = null;
        },
        onError: (e) => console.log(e),
    });
};

function deleteSelectedProducts() {
    const confirmed = app.appContext.config.globalProperties.__(
        "are_you_sure_delete"
    );

    if (confirm(confirmed)) {
        form.delete(
            route("admin.imported-products.destroy", {
                imported_product: selectedProduct.value,
            }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    // toast.add({ message: page.props.toast });
                    selectedProduct.value = [];
                },
                onError: (e) => toast.add({ message: e }),
            }
        );
    }
}

function searchProducts(value) {
    if (value) {
        Inertia.visit(
            route(
                `${page.props.searchRoute}.index`,
                {
                    search: dt.value,
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    only: ["resources"],
                }
            )
        );
    }
}

const filterData = computed(() => {
    return props.resources.data.filter((item) => {
        if (item.name?.ro) {
            return item.name.ro.toLowerCase().includes(dt.value.toLowerCase());
        }
        return false;
    });
});

function closeModal() {
    isOpen.value = false;
    form.category = null;
    form.subcategory = null;
    form.sub_subcategory = null;
}
</script>
