<script setup>
import {computed, onMounted, onUnmounted, watch} from 'vue';
import {EllipsisVerticalIcon, XMarkIcon} from "@heroicons/vue/20/solid/index.js";
import Dropdown from "@/Components/Dropdown.vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '2xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    modalType: {
        type: String,
        default: 'modal'
    },
    actions: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['close', 'edit', 'delete']);

watch(
    () => props.show,
    () => {
        if (props.show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = null;
        }
    }
);

const close = () => {
    if (props.closeable) {
        emit('close');
    }
};

const closeOnEscape = (e) => {
    if (e.key === 'Escape' && props.show) {
        close();
    }
};

onMounted(() => document.addEventListener('keydown', closeOnEscape));

onUnmounted(() => {
    document.removeEventListener('keydown', closeOnEscape);
    document.body.style.overflow = null;
});

const maxWidthClass = computed(() => {
    return {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '3xl': 'sm:max-w-3xl',
        '4xl': 'sm:max-w-4xl',
    }[props.maxWidth];
});
</script>

<template>
    <Teleport to="body">
        <Transition leave-active-class="duration-200">
            <div v-show="show" class="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50" scroll-region>

                <Transition
                    enter-active-class="ease-out duration-300"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div v-show="show" class="fixed inset-0 transform transition-all" @click="close">
                        <div class="absolute inset-0 bg-gray-500 opacity-75"/>
                    </div>
                </Transition>

                <Transition
                    enter-active-class="ease-out duration-300"
                    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div v-show="show"
                         class="mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto"
                         :class="maxWidthClass">
                        <div class="flex absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer">
                            <template v-if="actions">
                                <Dropdown v-if="['edit', 'modal'].includes(modalType)">
                                    <template #trigger>
                                            <span class="">
                                              <ellipsis-vertical-icon class="h-6 w-6"/>
                                            </span>
                                    </template>
                                    <template #content>
                                        <ul class="px-2  items-start">
                                            <li class="hover:bg-gray-100"
                                                @click="emit('edit')">{{ __('edit') }}
                                            </li>
                                            <li class="hover:bg-gray-100"
                                                @click="emit('delete')">{{ __('delete') }}
                                            </li>
                                        </ul>
                                    </template>
                                </Dropdown>
                            </template>
                            <button @click="close">
                                <x-mark-icon class="h-6 w-6"/>
                            </button>
                        </div>
                        <slot v-if="show"/>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>
