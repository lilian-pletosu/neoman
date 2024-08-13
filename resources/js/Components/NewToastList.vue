<template>
    <TransitionGroup class="fixed z-50 min-w-80 right-4 top-16" enter-active-class="duration-500"
                     enter-from-class="translate-x-full opacity-0"
                     leave-active-class="duration-500" leave-to-class="translate-x-full opacity-0"
                     role="alert"
                     tag="div"

    >
        <NewToastListItem v-for="(item ,index) in toast.items" :key="item.key" :message="item.message"
                          @remove="remove(index)"/>
    </TransitionGroup>
</template>

<script setup>
import NewToastListItem from "@/Components/NewToastListItem.vue";
import toast from "@/stores/toast.js";

function remove(index) {
    toast.remove(index);
}
</script>
