<script setup>
defineProps({
    w: {
        default: 'w-40',
    }
})
</script>

<template>
    <img class="h-auto" :class="[w]" src="/img/neo_logo_new.png" alt="neoman.md">

</template>
