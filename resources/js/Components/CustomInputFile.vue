<script setup>
import {ref} from "vue";

let image = ref(null);
const emit = defineEmits(['update:file'])

const emitFile = () => {
    emit("update:file", image);
}
</script>

<template>
    <div class="my-5">
        <label for="image" class="block mb-2 text-sm font-medium text-gray-900 ">{{
                __('image')
            }}</label>

        <input @input="image = $event.target.files[0]"
               class="block  text-sm  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
               id="image" type="file">
    </div>
</template>

<style scoped>

</style>
