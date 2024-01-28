<script setup>

import {ref} from "vue";

const readActivated = ref(false);
const props = defineProps({
    resource: {
        type: Object
    },
    resourceModal: {
        type: Object,
    },
    columns: {
        type: Object,
        required: true
    },
})

const applyFormat = (columnName, columnValue) => {
    if (columnName === 'is_enabled') {
        if (columnValue === 1) {
            return 'active';
        }
        return 'inactive';

    }
    return columnValue;
}


</script>

<template>
    <div v-for="column in columns" class="mb-2">
        <template v-if="!['image', 'id'].includes(column)">
            <span class="mr-2 uppercase secondary-text">{{ __(column) }}</span>
            <div v-bind:class="{'rounded w-14 flex justify-center' : column === 'is_enabled'}"
                 :class="{'bg-green-400 font-semibold ' : resourceModal[column] === 1,'bg-red-400 font-semibold' : resourceModal[column] === 0}">
                <template v-if="['description'].includes(column)">
                    <div>
                        <p class="p" v-if="!readActivated">
                            {{ resourceModal[column] ? resourceModal[column].slice(0, 50) : '-' }}
                            <span class="read font-bold" v-if="!readActivated"
                                  @click="readActivated = !readActivated">..read more</span>
                        </p>
                        <p class="p" v-if="readActivated">{{ applyFormat(column, resourceModal[column]) }}</p>
                    </div>
                </template>
                <template v-else-if="['attributes'].includes(column)">
                    <div>
                        <template v-for="attribute in resourceModal[column]">
                            <table>
                                <tr>
                                    <td class="font-bold">{{ attribute.name + ' - ' }}</td>
                                    <td>{{ attribute.pivot.value }}</td>
                                </tr>
                            </table>
                        </template>
                    </div>
                </template>
                <template v-else>
                    <div class="flex">
                        <p class="text-sm ">{{ __(applyFormat(column, resourceModal[column] ?? resource[column])) }}</p>

                    </div>
                </template>
            </div>
        </template>
    </div>

</template>


