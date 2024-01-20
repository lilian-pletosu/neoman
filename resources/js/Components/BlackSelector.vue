<template>
    <div>
        <label for="status" class="block mb-2 text-sm font-medium text-gray-900">{{ __(label) }}</label>
        <select id="status" v-model="status" @change="emitStatus" @beforematch="emitStatus"
                :class="{'border-2 dark:border-red-600' : errorMessage}"
                class="bg-gray-50 border border-gray-300 mb-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option disabled>{{ __(`select`) }}</option>
            <template v-for="(option, key) in options">
                <option :value="option.id">{{ __(`${option.value}`) }}</option>
            </template>
        </select>
        <div v-if="errorMessage">
            <p class="text-sm text-red-500">
                {{ errorMessage }}*
            </p>
        </div>
    </div>
</template>

<script setup>
import {ref, watch} from "vue";

const props = defineProps({
    options: {
        type: Object,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    errorMessage: {
        type: String
    },
    value: {}
});

let status = ref(props.value || "");
const emit = defineEmits(['update:status']);


watch(() => props.value, (newValue) => {
    status.value = newValue
});


const emitStatus = () => {
    emit("update:status", status);
};
</script>

<style scoped>

</style>
