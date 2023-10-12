<template>
    <div class="filter drop-shadow mb-6">
        <label class="block font-medium text-sm text-gray-700">
            <span v-if="label">{{ label }}</span>
            <span v-else><slot name="label"></slot></span>
            <span v-if="hint" @click="hintOpen=!hintOpen"
                  class="block float-right bg-green-200 -mt-1 mr-1 w-6 h-6 text-center rounded-full">&ifr;</span>
        </label>
        <div v-if="hintOpen" @mouseleave="hintOpen=!hintOpen" class=" w-full text-gray-100 relative bg-gray-400 p-4"
             v-html="hint"></div>

        <input
            class="w-full my-1 px-3 py-2 border-gray-100 focus:outline-none focus:border-teal-blue focus:ring focus:ring-teal-blue focus:ring-opacity-50 rounded-md"
            :id="id"
            :type="type"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" ref="input">

        <div v-if="errorMessage">
            <p class="text-sm text-red-500">
                {{ errorMessage }}
            </p>
        </div>
        <div v-else>
            <slot name="errorMessage"></slot>
        </div>

        <div v-if="successMessage">
            <p class="text-sm text-green-500">
                {{ successMessage }}
            </p>
        </div>
        <div v-else>
            <slot name="successMessage"></slot>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
    props: [
        'modelValue',
        'id',
        'type',
        'errorMessage',
        'successMessage',
        'label',
        'hint',
    ],

    data() {
        return {
            hintOpen: false,
        }
    },

    emits: ['update:modelValue'],

    methods: {
        focus() {
            this.$refs.input.focus()
        }
    }
})
</script>
