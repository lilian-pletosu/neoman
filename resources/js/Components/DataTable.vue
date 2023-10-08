<template>
    <div class="align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden rounded-lg sm:rounded-tr-md ">
            <table  class="min-w-full divide-y divide-gray-200 ">
                <thead class="bg-gray-50">
                <tr>
                    <th v-for="(column) in columns" scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {{__(column)}}
                    </th>
                </tr>
                </thead>
                <tbody class="bg-white">
                <tr v-for="(item, index) in resources.data" :key="index">
                    <td v-for="(column, key) in columns" :key="key" class="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                        {{ item[column] }}
                    </td>
                </tr>
                </tbody>
            </table>

        </div>

    </div>

</template>

<script setup>
import {defineComponent} from "vue";

defineProps({
    resources:{
        type: Object
    },
    columns:{
        type: Array
    }
});
const getItemValue = (item, key) => {
    if (item && key in item) {
        return item[key];
    }
    return "___";
};
defineComponent({
    name: 'DataTable',
    components: {
        defineComponent
    },
    methods: {
        //
    }
});
</script>

<style scoped>

</style>
