<script setup>
const props = defineProps({
    resource: {
        type: Object,
        required: true
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
                 :class="{'bg-green-400 font-semibold ' : resource[column] === 1,'bg-red-400 font-semibold' : resource[column] === 0}">
                <p class="text-sm ">{{ __(applyFormat(column, resource[column])) }}</p>
            </div>
        </template>
    </div>

</template>


