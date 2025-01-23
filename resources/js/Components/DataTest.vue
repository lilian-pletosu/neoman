<template>
    <div v-if="data.length !== 0" class="flex flex-col mt-8">
        <div class="border">
            <div class="overflow-x-auto">
                <table
                    class="min-w-full text-sm bg-white divide-y-2 divide-gray-200"
                >
                    <thead>
                        <tr class="flex-1 text-base text-left">
                            <th
                                v-if="selectable"
                                class="sticky inset-y-0 flex px-4 py-2 bg-white start-0"
                            >
                                <input
                                    id="SelectAll"
                                    :checked="
                                        selectedItems.length === data.length
                                    "
                                    class="border-gray-300 rounded size-5"
                                    type="checkbox"
                                    @change="selectAll"
                                />
                            </th>
                            <th
                                v-for="column in columns"
                                :key="column.key"
                                class="px-4 py-2 font-medium text-gray-900 cursor-pointer whitespace-nowrap"
                                @click="sortColumn(column.key)"
                            >
                                <div class="flex items-center gap-2">
                                    {{ __(column.label) }}
                                    <span v-if="sortKey === column.key">
                                        {{ sortOrder === "asc" ? "↑" : "↓" }}
                                    </span>
                                </div>
                            </th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-200">
                        <tr v-for="(item, index) in sortedData" :key="index">
                            <td
                                v-if="selectable"
                                class="sticky inset-y-0 px-4 py-2 bg-white start-0"
                            >
                                <input
                                    :checked="isSelected(item)"
                                    class="border-gray-300 rounded size-5"
                                    type="checkbox"
                                    @change="selectItem(item)"
                                />
                            </td>
                            <td
                                v-for="column in columns"
                                :key="column.key"
                                class="px-4 py-2 text-gray-700 whitespace-nowrap"
                            >
                                <slot :name="column.key" :item="item">
                                    {{ getValue(item, column.key) }}
                                </slot>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="pagination" class="flex mt-4 place-content-start">
                <pagination :links="pagination" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import Pagination from "@/Components/Pagination.vue";

const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
    columns: {
        type: Array,
        required: true,
    },
    selectable: {
        type: Boolean,
        default: false,
    },
    pagination: {
        type: Object,
        default: null,
    },
});

const sortKey = ref("");
const sortOrder = ref("asc");

const sortColumn = (key) => {
    if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
        sortKey.value = key;
        sortOrder.value = "asc";
    }
};

const emit = defineEmits(["selection-change"]);

const selectedItems = ref([]);

const selectAll = () => {
    selectedItems.value =
        selectedItems.value.length === props.data.length ? [] : [...props.data];
    emit("selection-change", selectedItems.value);
};

const isSelected = (item) => selectedItems.value.includes(item);

const selectItem = (item) => {
    if (isSelected(item)) {
        selectedItems.value = selectedItems.value.filter((i) => i !== item);
    } else {
        selectedItems.value.push(item);
    }
    emit("selection-change", selectedItems.value);
};

const getValue = (item, key) => {
    return key.split(".").reduce((obj, k) => obj?.[k], item);
};

const sortedData = computed(() => {
    if (!sortKey.value) return props.data;

    return [...props.data].sort((a, b) => {
        const aValue = getValue(a, sortKey.value);
        const bValue = getValue(b, sortKey.value);

        if (sortOrder.value === "asc") {
            return aValue > bValue ? 1 : -1;
        }
        return aValue < bValue ? 1 : -1;
    });
});
</script>
