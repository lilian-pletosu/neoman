<script setup>
import AdminLayout from "@/Layouts/AdminLayout.vue";
import DataTable from "@/Components/DataTable.vue";
import Modal from "@/Components/Modal.vue";
import { getCurrentInstance, ref, computed, watch } from "vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import { useForm, router } from "@inertiajs/vue3";
import BlackSelector from "@/Components/BlackSelector.vue";

const app = getCurrentInstance();

const props = defineProps({
    initialRoute: {
        type: String,
    },
    resources: Object,
});

let isModalOpen = ref(false);
let isOpenEditModal = ref(false);
const selectedPromotion = ref(null);

const form = useForm({
    name: null,
    description: null,
    start_date: null,
    end_date: null,
    discount: null,
    status: null,
    sub_subcategory: null,
    subcategory: null,
    category: null,
    brand: null,
});

const openModal = () => {
    isModalOpen.value = true;
};
const openEditModal = () => {
    isOpenEditModal.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    form.reset();
};
const closeEditModal = () => {
    isOpenEditModal.value = false;
    form.reset();
};
// Add watchers to reset other fields when one is selected
watch(
    () => form.brand,
    (newValue) => {
        if (newValue) {
            form.sub_subcategory = null;
            form.subcategory = null;
            form.category = null;
        }
    }
);

watch(
    () => form.sub_subcategory,
    (newValue) => {
        if (newValue) {
            form.brand = null;
            form.subcategory = null;
            form.category = null;
        }
    }
);

watch(
    () => form.subcategory,
    (newValue) => {
        if (newValue) {
            form.brand = null;
            form.sub_subcategory = null;
            form.category = null;
        }
    }
);

watch(
    () => form.category,
    (newValue) => {
        if (newValue) {
            form.brand = null;
            form.sub_subcategory = null;
            form.subcategory = null;
        }
    }
);

// Add computed property for disabled states
const isDisabled = computed(() => {
    return !!(
        form.brand ||
        form.sub_subcategory ||
        form.subcategory ||
        form.category
    );
});

const addPromotion = async () => {
    form.post(route("admin.promotions.store"), {
        preserveScroll: true,
        onSuccess: () => {
            closeModal();
        },
    });
};

const startEdit = (promotion) => {
    openEditModal();
    form.promotionId = promotion.id;
    form.name = promotion.name;
    form.description = promotion.description;
    form.start_date = promotion.start_date;
    form.end_date = promotion.end_date;
    form.discount = promotion.discount;
    form.status = promotion.status === "active" ? 1 : 0;
    form.sub_subcategory =
        promotion?.categories[0]?.level === 3
            ? promotion?.categories[0]?.id
            : null;
    form.subcategory =
        promotion?.categories[0]?.level === 2
            ? promotion?.categories[0]?.id
            : null;
    form.category =
        promotion?.categories[0]?.level === 1
            ? promotion?.categories[0]?.id
            : null;
    form.brand = promotion?.brands[0]?.id;
};

const submitEditPromotion = async (promotionId) => {
    form.put(route("admin.promotions.update", promotionId), {
        preserveScroll: true,
        onSuccess: () => {
            closeEditModal();
        },
    });
};

const deletePromotion = async () => {
    console.log(selectedPromotion);
    if (confirm("Are you sure you want to delete this promotion?")) {
        router.delete(
            route("admin.promotions.destroy", {
                promotion: selectedPromotion.value,
            }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    selectedPromotion.value = null;
                    closeEditModal();
                },
            }
        );
    }
};
</script>
<template>
    <admin-layout :current-route="initialRoute" title="Promotions">
        <div class="grid w-full grid-cols-1 gap-4">
            <div class="container-rounded">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="primary-text">{{ __("promotions") }}</h3>
                        <span class="secondary-text">{{
                            __("here_is_all_promotions")
                        }}</span>
                    </div>
                    <div class="flex-shrink-0">
                        <primary-button @click="openModal" class="mx-2"
                            >{{ __("create") }}
                        </primary-button>
                    </div>
                </div>
                <div class="flex flex-col mt-8">
                    <div class="overflow-x-auto rounded-lg">
                        <div class="flex-shrink-0">
                            <div class="flex flex-col mt-8">
                                <div class="overflow-x-auto rounded-lg">
                                    <data-table
                                        @emit-click="
                                            (order) => {
                                                startEdit(order);
                                                selectedPromotion = order;
                                            }
                                        "
                                        :resources="resources"
                                        :columnsOrder="$page.props.columnsOrder"
                                        :columns="$page.props.columns"
                                        :initial-route="
                                            $page.props.initialRoute
                                        "
                                        :search-route="$page.props.searchRoute"
                                    />
                                </div>
                            </div>
                            <div>
                                <h2
                                    class="flex justify-center"
                                    v-if="resources.data.length === 0"
                                >
                                    {{ __("no_promotions") }}...
                                </h2>
                            </div>
                        </div>
                    </div>
                    <Modal
                        :show="isModalOpen"
                        :actions="false"
                        @close="closeModal"
                        max-width="6xl"
                        :margin-top="0"
                    >
                        <div class="grid grid-cols-2 gap-2 p-4 mt-5">
                            <div class="col-span-2">
                                <label
                                    class="block mb-2 text-sm font-medium text-gray-900"
                                    >{{ __("name") }}</label
                                >
                                <input
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    :class="{
                                        'border-2 dark:border-red-600':
                                            form.errors.name,
                                    }"
                                    type="text"
                                    v-model="form.name"
                                    min="1"
                                    max="100"
                                    :placeholder="__('name')"
                                    ref="input"
                                />
                                <div v-if="form.errors.name">
                                    <p class="text-sm text-red-500">
                                        {{ __(form.errors.name) }}*
                                    </p>
                                </div>
                            </div>
                            <div class="col-span-2">
                                <label
                                    class="block mb-2 text-sm font-medium text-gray-900"
                                    >{{ __("description") }}</label
                                >
                                <textarea
                                    v-model="form.description"
                                    :placeholder="__('description')"
                                    class="w-full text-sm text-gray-900 border border-gray-300 rounded-lg scroll-smooth bg-gray-50 focus:ring-blue-500"
                                />
                            </div>
                            <div class="flex flex-col">
                                <label
                                    class="block mb-2 text-sm font-medium text-gray-900"
                                    >{{ __("start_date") }}</label
                                >
                                <input
                                    type="date"
                                    id="start_date"
                                    class="col-span-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                                    v-model="form.start_date"
                                />
                            </div>
                            <div class="flex flex-col">
                                <label
                                    class="block mb-2 text-sm font-medium text-gray-900"
                                    >{{ __("end_date") }}</label
                                >
                                <input
                                    type="date"
                                    class="col-span-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                                    v-model="form.end_date"
                                />
                            </div>

                            <div>
                                <label
                                    for="status"
                                    class="block mt-4 mb-2 text-sm font-medium text-gray-900"
                                    >{{ __("status") }}</label
                                >
                                <select
                                    id="status"
                                    @change="form.status = $event.target.value"
                                    :class="{
                                        'border-2 dark:border-red-600':
                                            form.errors.status,
                                    }"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option selected disabled :value="null">
                                        {{ __("select_status") }}
                                    </option>
                                    <template
                                        v-for="(option, key) in [
                                            { id: 1, value: 'active' },
                                            { id: 0, value: 'inactive' },
                                        ]"
                                    >
                                        <option :value="option.id">
                                            {{ __(`${option.value}`) }}
                                        </option>
                                    </template>
                                </select>
                                <div v-if="form.errors.status">
                                    <p class="text-sm text-red-500">
                                        {{ __(form.errors.status) }}*
                                    </p>
                                </div>
                            </div>
                            <div class="col-span-1 mt-4">
                                <label
                                    class="block mb-2 text-sm font-medium text-gray-900"
                                    >{{ __("discount") }}</label
                                >
                                <input
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    :class="{
                                        'border-2 dark:border-red-600':
                                            form.errors.discount,
                                    }"
                                    type="number"
                                    v-model="form.discount"
                                    min="1"
                                    max="100"
                                    :placeholder="__('discount')"
                                    ref="input"
                                />
                                <div v-if="form.errors.name">
                                    <p class="text-sm text-red-500">
                                        {{ __(form.errors.discount) }}*
                                    </p>
                                </div>
                            </div>

                            <!-- Select pentru branduri -->
                            <div class="w-full col-span-1">
                                <black-selector
                                    v-model="form.brand"
                                    @update:status="form.brand = $event"
                                    :options="$page.props.brands"
                                    :value="form.brand"
                                    :selected="form.brand"
                                    :error-message="__(form.errors.brand)"
                                    :label="__('brand')"
                                    :disabled="
                                        isDisabled &&
                                        !!form.sub_subcategory === false
                                    "
                                />
                            </div>

                            <!-- Select pentru subsubcategorii -->
                            <div class="w-full col-span-1">
                                <black-selector
                                    v-model="form.sub_subcategory"
                                    @update:status="
                                        form.sub_subcategory = $event
                                    "
                                    :options="$page.props.subcategories"
                                    :value="form.sub_subcategory"
                                    :selected="form.sub_subcategory"
                                    :error-message="
                                        __(form.errors.sub_subcategory)
                                    "
                                    :label="__('sub_subcategory')"
                                    :disabled="
                                        isDisabled &&
                                        !!form.subcategory === false
                                    "
                                />
                            </div>
                            <div class="w-full col-span-1">
                                <black-selector
                                    v-model="form.subcategory"
                                    @update:status="form.subcategory = $event"
                                    :options="$page.props.subcategories"
                                    :value="form.subcategory"
                                    :selected="form.subcategory"
                                    :error-message="__(form.errors.subcategory)"
                                    :label="__('subcategory')"
                                    :disabled="
                                        isDisabled && !!form.category === false
                                    "
                                />
                            </div>
                            <div class="w-full col-span-1">
                                <black-selector
                                    v-model="form.category"
                                    @update:status="form.category = $event"
                                    :options="$page.props.categories"
                                    :value="form.category"
                                    :selected="form.category"
                                    :error-message="__(form.errors.category)"
                                    :label="__('category')"
                                    :disabled="
                                        isDisabledExceptCategory
                                            ? false
                                            : isDisabledExceptBrand ||
                                              isDisabledExceptSubSubcategory ||
                                              isDisabledExceptSubcategory
                                    "
                                />
                            </div>
                            <hr class="col-span-2 mt-1 mb-4" />

                            <button
                                type="submit"
                                @click="addPromotion()"
                                class="flex justify-center w-full col-span-2 p-3 mx-auto rounded-lg cursor-pointer btn btn-primary bg-slate-200"
                            >
                                {{ __("create") }}
                            </button>
                        </div>
                    </Modal>

                    <Modal
                        :show="isOpenEditModal"
                        :actions="true"
                        @close="closeEditModal"
                        max-width="6xl"
                        @delete="deletePromotion(form.promotionId)"
                        :margin-top="0"
                    >
                        <div class="grid grid-cols-2 gap-2 p-4 mt-5">
                            <div class="col-span-2">
                                <label
                                    class="block mb-2 text-sm font-medium text-gray-900"
                                    >{{ __("name") }}</label
                                >
                                <input
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    :class="{
                                        'border-2 dark:border-red-600':
                                            form.errors.name,
                                    }"
                                    type="text"
                                    v-model="form.name"
                                    min="1"
                                    max="100"
                                    :placeholder="__('name')"
                                    ref="input"
                                />
                                <div v-if="form.errors.name">
                                    <p class="text-sm text-red-500">
                                        {{ __(form.errors.name) }}*
                                    </p>
                                </div>
                            </div>
                            <div class="col-span-2">
                                <label
                                    class="block mb-2 text-sm font-medium text-gray-900"
                                    >{{ __("description") }}</label
                                >
                                <textarea
                                    v-model="form.description"
                                    :placeholder="__('description')"
                                    class="w-full text-sm text-gray-900 border border-gray-300 rounded-lg scroll-smooth bg-gray-50 focus:ring-blue-500"
                                />
                            </div>
                            <div class="flex flex-col">
                                <label
                                    class="block mb-2 text-sm font-medium text-gray-900"
                                    >{{ __("start_date") }}</label
                                >
                                <input
                                    type="date"
                                    id="start_date"
                                    class="col-span-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                                    v-model="form.start_date"
                                />
                            </div>
                            <div class="flex flex-col">
                                <label
                                    class="block mb-2 text-sm font-medium text-gray-900"
                                    >{{ __("end_date") }}</label
                                >
                                <input
                                    type="date"
                                    class="col-span-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                                    v-model="form.end_date"
                                />
                            </div>

                            <div>
                                <label
                                    for="status"
                                    class="block mt-4 mb-2 text-sm font-medium text-gray-900"
                                    >{{ __("status") }}</label
                                >
                                <select
                                    id="status"
                                    v-model="form.status"
                                    :class="{
                                        'border-2 dark:border-red-600':
                                            form.errors.status,
                                    }"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option selected disabled :value="null">
                                        {{ __("select_status") }}
                                    </option>
                                    <template
                                        v-for="(option, key) in [
                                            { id: 1, value: 'active' },
                                            { id: 0, value: 'inactive' },
                                        ]"
                                    >
                                        <option :value="option.id">
                                            {{ __(`${option.value}`) }}
                                        </option>
                                    </template>
                                </select>
                                <div v-if="form.errors.status">
                                    <p class="text-sm text-red-500">
                                        {{ __(form.errors.status) }}*
                                    </p>
                                </div>
                            </div>
                            <div class="col-span-1 mt-4">
                                <label
                                    class="block mb-2 text-sm font-medium text-gray-900"
                                    >{{ __("discount") }}</label
                                >
                                <input
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    :class="{
                                        'border-2 dark:border-red-600':
                                            form.errors.discount,
                                    }"
                                    type="number"
                                    v-model="form.discount"
                                    min="1"
                                    max="100"
                                    :placeholder="__('discount')"
                                    ref="input"
                                />
                                <div v-if="form.errors.name">
                                    <p class="text-sm text-red-500">
                                        {{ __(form.errors.discount) }}*
                                    </p>
                                </div>
                            </div>
                            <!-- Select pentru branduri -->
                            <black-selector
                                v-model="form.brand"
                                @update:status="form.brand = $event"
                                :options="$page.props.brands"
                                :value="form.brand"
                                :selected="form.brand"
                                :error-message="__(form.errors.brand)"
                                :label="__('brand')"
                            />

                            <!-- Select pentru subsubcategorii -->
                            <black-selector
                                v-model="form.sub_subcategory"
                                @update:status="form.sub_subcategory = $event"
                                :options="$page.props.subcategories"
                                :value="form.sub_subcategory"
                                :selected="form.sub_subcategory"
                                :error-message="__(form.errors.sub_subcategory)"
                                :label="__('sub_subcategory')"
                            />

                            <black-selector
                                v-model="form.subcategory"
                                @update:status="form.subcategory = $event"
                                :options="$page.props.subcategories"
                                :value="form.subcategory"
                                :selected="form.subcategory"
                                :error-message="__(form.errors.subcategory)"
                                :label="__('subcategory')"
                            />
                            <black-selector
                                v-model="form.category"
                                @update:status="form.category = $event"
                                :options="$page.props.categories"
                                :value="form.category"
                                :selected="form.category"
                                :error-message="__(form.errors.category)"
                                :label="__('category')"
                            />

                            <hr class="col-span-2 mt-1 mb-4" />

                            <div class="flex justify-between col-span-2 gap-2">
                                <button
                                    type="cancel"
                                    @click="closeEditModal()"
                                    class="flex justify-center w-full col-span-2 p-3 mx-auto bg-red-400 rounded-lg cursor-pointer btn btn-primary"
                                >
                                    {{ __("cancel") }}
                                </button>
                                <button
                                    type="submit"
                                    @click="
                                        submitEditPromotion(form.promotionId)
                                    "
                                    class="flex justify-center w-full col-span-2 p-3 mx-auto bg-indigo-400 rounded-lg cursor-pointer btn btn-primary"
                                >
                                    {{ __("edit") }}
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    </admin-layout>
</template>
