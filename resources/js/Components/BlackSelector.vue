<script setup>
import {ref} from "vue";

const status = ref();
const emit = defineEmits(['update:status']);


defineProps({
  options: {
    type: Object,
    required: true
  },
  errorMessage: {
    type: String
  }
})
const emitStatus = () => {
  emit("update:status", status.value);
};
</script>

<template>
  <div>
    <label for="status" class="block mb-2 text-sm font-medium text-gray-900 ">{{ __('status') }}</label>
    <select id="status" v-model="status" @change="emitStatus"
            :class="{'border border-red-600' : errorMessage}"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option selected>{{ __('select_status') }}</option>
      <template v-for="(option, key) in options">
        <option :value="key">{{ __(`${option}`) }}</option>
      </template>
    </select>
    <div v-if="errorMessage">
      <p class="text-sm text-red-500">
        {{ errorMessage }}*
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
