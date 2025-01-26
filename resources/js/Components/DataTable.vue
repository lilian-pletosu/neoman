<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import Pagination from "@/Components/Pagination.vue";
import { router, useForm } from "@inertiajs/vue3";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import {
    BoltIcon,
    CheckBadgeIcon,
    ReceiptPercentIcon,
    VariableIcon,
    XCircleIcon,
} from "@heroicons/vue/20/solid/index.js";
import { useDateFormat } from "@vueuse/core";

defineProps({
    resources: {
        type: Object,
    },
    columnsOrder: {
        type: Array,
    },
    columns: {
        type: Array,
    },
    searchRoute: {
        type: String,
        required: true,
    },
    initialRoute: {
        type: String,
        required: true,
    },
    resourceType: {
        type: String,
    },
});
const app = getCurrentInstance();
let searchText = ref();

let form = useForm({});

const search = () => {
    submitSearch();
};

const submitSearch = () => {
    router.visit(
        route(
            `${app.props.searchRoute}.index`,
            {
                search: searchText.value,
            },
            { only: ["resources"] }
        )
    );
};

const emit = defineEmits(["emitClick"]);

const emitClick = (res) => {
    emit("emitClick", res);
};

const applyFormat = (columnName, columnValue) => {
    if (["is_enabled", "is_active"].includes(columnName)) {
        if (columnValue === 1) {
            return "active";
        }
        return "inactive";
    }

    if (columnName === "description") {
        if (columnValue === null) {
            return "---";
        }
        return columnValue.slice(0, 23) + "...";
        // return app.appContext.config.globalProperties.truncate(columnValue, 50);
    }

    if (columnName === "icon") {
        if (columnValue === null) {
            return "---";
        }
        return columnValue;
    }

    if (columnName === "created_at") {
        if (columnValue === null) {
            return "---;";
        }
        return useDateFormat(columnValue, "dddd, D MMMM", { locales: "rum" })
            .value;
    }
    if (columnName === "updated_at") {
        if (columnValue === null) {
            return "---;";
        }
        return useDateFormat(columnValue, "DD-MM-YYYY", { locales: "rum" })
            .value;
    }
    return columnValue;
};

function applyTypeInput(columnName) {
    if (columnName === "image" || columnName === "file") {
        return "file";
    }
    return "text";
}

const clearSearch = () => {
    searchText.value = "";
    router.visit(
        route(`${app.props.searchRoute}.index`, {
            search: searchText.value,
        })
    );
};

onMounted(() => {
    searchText.value =
        app.appContext.config.globalProperties.$page.props.filters.search;
    document.querySelector('input[id="search"]').focus();
});
</script>

<template>
    <div class="flex mb-4">
        <div class="relative flex lg:w-1/2 xl:w-4/12">
            <input
                type="text"
                id="search"
                @input="search"
                v-model="searchText"
                :aria-label="__('search')"
                :placeholder="__('search...')"
                class="flex flex-auto block pr-10 border-gray-300 rounded-md shadow-sm focus:border-teal-500"
            />
            <x-circle-icon
                class="absolute w-5 text-gray-500 transform cursor-pointer right-2 top-2/4 -translate-y-2/4"
                @click="clearSearch"
            />
        </div>
        <div class="flex">
            <primary-button class="w-full h-full mx-1" @click="search">{{
                __("search")
            }}</primary-button>
        </div>
    </div>

    <div class="flex flex-col mt-8">
        <div class="flex overflow-x-auto rounded-lg md:overflow-hidden">
            <div class="inline-block w-full align-middle">
                <div class="overflow-hidden shadow sm:rounded-lg">
                    <table class="w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <template v-for="column in columnsOrder">
                                    <th
                                        scope="col"
                                        class="flex-1 p-4 text-xs font-medium tracking-wider text-gray-500 uppercase"
                                        :class="{
                                            'hidden xl:block':
                                                column === 'description',
                                        }"
                                    >
                                        {{ __(column) }}
                                    </th>
                                </template>
                            </tr>
                        </thead>
                        <tbody class="bg-white">
                            <tr
                                v-for="(resource, index) in resources.data"
                                :key="index"
                                class="w-full hover:bg-gray-100"
                                @click="emitClick(resource)"
                            >
                                <template v-for="columnInOrder in columnsOrder">
                                    <template v-for="column in columns">
                                        <template
                                            v-if="column === columnInOrder"
                                        >
                                            <td
                                                class="px-6 py-2 text-sm text-gray-900 whitespace-wrap"
                                                :class="{
                                                    'hidden xl:block':
                                                        columnInOrder ===
                                                        'description',
                                                }"
                                            >
                                                <!--                    image                        -->
                                                <template
                                                    v-if="
                                                        columnInOrder ===
                                                        'image'
                                                    "
                                                >
                                                    <img
                                                        v-if="
                                                            resource[
                                                                columnInOrder
                                                            ] &&
                                                            resource[
                                                                columnInOrder
                                                            ] !== 'image'
                                                        "
                                                        class="w-16 mx-auto"
                                                        :src="
                                                            resource[
                                                                columnInOrder
                                                            ]
                                                        "
                                                        alt="image if"
                                                    />
                                                    <img
                                                        v-else-if="
                                                            resource[
                                                                columnInOrder
                                                            ]
                                                        "
                                                        class="w-16 mx-auto"
                                                        :src="'/img/no_image.svg'"
                                                        alt="image else"
                                                    />
                                                </template>
                                                <!--                    website                        -->
                                                <template
                                                    v-else-if="
                                                        column === 'website'
                                                    "
                                                >
                                                    <div
                                                        class="flex justify-center rounded"
                                                    >
                                                        <a
                                                            rel="stylesheet"
                                                            title="sds"
                                                            :href="`http://${resource[columnInOrder]}`"
                                                            >{{
                                                                resource[
                                                                    columnInOrder
                                                                ]
                                                            }}</a
                                                        >
                                                    </div>
                                                </template>
                                                <!--                     order_type                       -->
                                                <template
                                                    v-else-if="
                                                        column === 'type'
                                                    "
                                                >
                                                    <template
                                                        v-if="
                                                            resource[
                                                                columnInOrder
                                                            ] === 'fast_order'
                                                        "
                                                    >
                                                        <bolt-icon
                                                            class="p-1 mx-auto text-yellow-400"
                                                        />
                                                    </template>
                                                    <template
                                                        v-if="
                                                            resource[
                                                                columnInOrder
                                                            ] === 'credit'
                                                        "
                                                    >
                                                        <receipt-percent-icon
                                                            class="p-1 mx-auto text-red-400"
                                                        />
                                                    </template>
                                                    <template
                                                        v-if="
                                                            resource[
                                                                columnInOrder
                                                            ] === 'simple'
                                                        "
                                                    >
                                                        <check-badge-icon
                                                            class="p-1 mx-auto text-blue-400"
                                                        />
                                                    </template>
                                                    <template
                                                        v-if="
                                                            resource[
                                                                columnInOrder
                                                            ] === 'installments'
                                                        "
                                                    >
                                                        <variable-icon
                                                            class="p-1 mx-auto text-red-400"
                                                        />
                                                    </template>
                                                </template>

                                                <!--                    status                        -->
                                                <template
                                                    v-else-if="
                                                        column === 'is_enabled'
                                                    "
                                                >
                                                    <div
                                                        class="p-1 mx-auto text-center text-black rounded shadow"
                                                        :class="{
                                                            'status-active text-white':
                                                                resource[
                                                                    columnInOrder
                                                                ] === 1,
                                                            'status-inactive text-white':
                                                                resource[
                                                                    columnInOrder
                                                                ] === 0,
                                                        }"
                                                    >
                                                        {{
                                                            __(
                                                                applyFormat(
                                                                    column,
                                                                    resource[
                                                                        columnInOrder
                                                                    ]
                                                                )
                                                            ) ?? "--"
                                                        }}
                                                    </div>
                                                </template>
                                                <template
                                                    v-else-if="
                                                        column === 'is_active'
                                                    "
                                                >
                                                    <div
                                                        class="p-1 mx-auto text-center text-black rounded shadow"
                                                        :class="{
                                                            'status-active text-white':
                                                                resource[
                                                                    columnInOrder
                                                                ] === 1,
                                                            'status-inactive text-white':
                                                                resource[
                                                                    columnInOrder
                                                                ] === 0,
                                                        }"
                                                    >
                                                        {{
                                                            __(
                                                                applyFormat(
                                                                    column,
                                                                    resource[
                                                                        columnInOrder
                                                                    ]
                                                                )
                                                            ) ?? "--"
                                                        }}
                                                    </div>
                                                </template>
                                                <template
                                                    v-else-if="
                                                        column === 'status'
                                                    "
                                                >
                                                    <div
                                                        class="p-1 mx-auto text-center text-black rounded shadow"
                                                        :class="{
                                                            'status-pending text-white':
                                                                resource[
                                                                    columnInOrder
                                                                ] === 'pending',
                                                            'status-confirmed text-white':
                                                                resource[
                                                                    columnInOrder
                                                                ] ===
                                                                'confirmed',
                                                            'status-shipped text-white':
                                                                resource[
                                                                    columnInOrder
                                                                ] === 'shipped',
                                                            'status-delivered text-white':
                                                                resource[
                                                                    columnInOrder
                                                                ] ===
                                                                'delivered',
                                                            'status-canceled text-white':
                                                                resource[
                                                                    columnInOrder
                                                                ] ===
                                                                'canceled',
                                                            'status-inactive text-white':
                                                                resource[
                                                                    columnInOrder
                                                                ] ===
                                                                'inactive',
                                                            'status-active text-white':
                                                                resource[
                                                                    columnInOrder
                                                                ] === 'active',
                                                        }"
                                                    >
                                                        <p>
                                                            {{
                                                                __(
                                                                    applyFormat(
                                                                        column,
                                                                        resource[
                                                                            columnInOrder
                                                                        ]
                                                                    )
                                                                ) ?? "--"
                                                            }}
                                                        </p>
                                                    </div>
                                                </template>
                                                <template
                                                    v-else-if="
                                                        column === 'icon'
                                                    "
                                                >
                                                    <div
                                                        class="flex items-center justify-center first-letter:uppercase"
                                                    >
                                                        <p
                                                            v-html="
                                                                resource[
                                                                    columnInOrder
                                                                ]
                                                            "
                                                        />
                                                    </div>
                                                </template>
                                                <!--                    else                        -->
                                                <template v-else>
                                                    <div
                                                        class="flex items-center justify-center first-letter:uppercase"
                                                    >
                                                        <p
                                                            class="first-letter:uppercase"
                                                        >
                                                            {{
                                                                __(
                                                                    applyFormat(
                                                                        column,
                                                                        resource[
                                                                            columnInOrder
                                                                        ]
                                                                    )
                                                                ) ?? "---"
                                                            }}
                                                        </p>
                                                    </div>
                                                </template>
                                            </td>
                                        </template>
                                    </template>
                                    <template
                                        v-if="$page.props.relationColumns"
                                        v-for="relationColumn in $page.props
                                            .relationColumns"
                                    >
                                        <td
                                            class="px-6 py-2 text-sm text-center text-gray-900 whitespace-nowrap hover first-letter:uppercase"
                                            v-if="
                                                relationColumn.label ===
                                                columnInOrder
                                            "
                                        >
                                            {{
                                                resource[
                                                    relationColumn.relation
                                                ]?.name ?? "---"
                                            }}
                                        </td>
                                    </template>
                                </template>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="flex mt-4 place-content-start">
                    <pagination :links="resources.links" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.flexible-text {
    @apply overflow-hidden
    whitespace-normal
    break-words;
    /* sau poate folosiți overflow-ellipsis pentru a afișa puncte de suspensie (...) când textul depășește containerul */
}
</style>
