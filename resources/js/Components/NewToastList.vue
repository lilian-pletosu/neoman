<template>
    <TransitionGroup
        class="fixed z-50 min-w-80 right-4 top-16"
        enter-active-class="duration-500"
        enter-from-class="translate-x-full opacity-0"
        leave-active-class="duration-500"
        leave-to-class="translate-x-full opacity-0"
        role="alert"
        tag="div"
    >
        <NewToastListItem
            v-for="(item, index) in toast.items"
            :key="item.key"
            :message="item.message"
            @remove="remove(index)"
        />
    </TransitionGroup>
</template>

<script setup>
import NewToastListItem from "@/Components/NewToastListItem.vue";
import toast from "@/stores/toast.js";
import { watch } from "vue";
import { usePage } from "@inertiajs/vue3";

const page = usePage();

function remove(index) {
    toast.remove(index);
}

watch(
    () => page.props.toast,
    (message) => {
        if (page.props.toast) {
            toast.add({ message: page.props.toast });
            page.props.toast = null;
        }
    }
);
</script>
