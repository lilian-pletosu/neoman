<script setup>

import {Dialog, DialogPanel, TransitionChild, TransitionRoot} from "@headlessui/vue";
import {XMarkIcon} from "@heroicons/vue/24/outline/index.js";
import {defineEmits, defineProps} from 'vue';


const props = defineProps({
    open: {
        type: Boolean,
        required: true,
        default: false,
    },
    title: {
        type: String,
        required: true,
    },
});

defineEmits(['close']);


</script>

<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-40" @close="$emit('close')">
            <TransitionChild as="template" enter=" transition-opacity ease-linear duration-300"
                             enter-from="opacity-0" enter-to="opacity-100"
                             leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
                             leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25"/>
            </TransitionChild>

            <div class="fixed inset-0 z-40 h-screen ">
                <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                                 enter-from="translate-x-full" enter-to="translate-x-0"
                                 leave="transition ease-in-out duration-300 transform"
                                 leave-from="translate-x-0" leave-to="translate-x-full">
                    <DialogPanel
                        class="ml-auto  h-full w-full max-w-xs  md:max-w-md lg:max-w-lg flex-col overflow-y-auto bg-white  shadow-xl">
                        <div class="flex items-center justify-between px-4">
                            <h2 class="text-xl font-medium text-gray-900">{{ title }}</h2>
                            <button type="button"
                                    class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                    @click="$emit('close')">
                                <span class="sr-only">{{ __('close') }}</span>
                                <XMarkIcon class="h-6 w-6" aria-hidden="false"/>
                            </button>
                        </div>
                        <slot name="content"/>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<style scoped>

</style>
