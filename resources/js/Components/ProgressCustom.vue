<script setup>
import {onMounted, ref} from 'vue'
import {ProgressIndicator, ProgressRoot} from 'radix-vue'

const progressValue = ref(0)

onMounted(() => {
    const timer = setTimeout(() => (progressValue.value = 100), 500)
    return () => clearTimeout(timer)
})
</script>

<template>
    <ProgressRoot
        v-model="progressValue"
        class="relative overflow-hidden bg-blackA9 rounded-full w-full 1 h-4 sm:h-5"
        style="transform: translateZ(0)"
    >
        <ProgressIndicator
            class="bg-green-300 rounded-full w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
            :style="`transform: translateX(-${100 - progressValue}%)`"
        />
    </ProgressRoot>
</template>
