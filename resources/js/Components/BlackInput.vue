<template>
  <div class="mb-5">
    <label :for="id" class="block mb-2 text-sm font-medium text-gray-900 ">{{ label }}</label>
    <input
        :type="type"
        :id="id"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="{'border-2 dark:border-red-600' :errorMessage}"
        class="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :placeholder="label">
    <div v-if="errorMessage">
      <p class="text-sm text-red-500">
        {{ errorMessage }}*
      </p>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  props: [
    'id',
    'type',
    'errorMessage',
    'label',
    'classStyle'
  ],

  methods: {
    focus() {
      this.$refs.input.focus()
    }
  }
})
</script>
