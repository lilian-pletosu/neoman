<script setup>
import {ref, watchEffect} from 'vue'
import {ToastDescription, ToastProvider, ToastRoot, ToastViewport} from 'radix-vue'
import {useCartStore} from "@/stores/cartStore.js";

const cartStore = useCartStore()


const show = ref(cartStore.notification);
const open = ref(false)
const eventDateRef = ref(new Date())
const timerRef = ref(0)
const props = defineProps({
    action: String,
    style: String,
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    success: {
        type: Boolean,
        default: true
    },
    show: {
        type: Boolean,
        default: false
    }
})

function oneWeekAway() {
    const now = new Date()
    const inOneWeek = now.setDate(now.getDate() + 7)
    return new Date(inOneWeek)
}

function handleClick() {
    open.value = false
    window.clearTimeout(timerRef.value)
    timerRef.value = window.setTimeout(() => {
        eventDateRef.value = oneWeekAway()
        open.value = true
    }, 2)
}

watchEffect(() => {
    if (cartStore.notification) {
        handleClick()
    }
})

</script>

<template>
    <ToastProvider>
        <ToastRoot
            :duration="2000"
            v-model:open="open"
            class=" rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
            :class="!success ? 'bg-yellow-400': 'bg-green-700'"
        >
            <ToastDescription as-child class="">
                <div class="flex items-center space-x-2">
                    <svg v-if="success" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                        <path fill="white"
                              d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4l8-8z"/>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="-2 -2 24 24">
                        <path fill="white"
                              d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0-13a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1m0 10a1 1 0 1 1 0-2a1 1 0 0 1 0 2"/>
                    </svg>
                    <p class="text-white font-medium text-lg">{{ message }}</p>
                </div>
            </ToastDescription>
        </ToastRoot>
        <ToastViewport
            class="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none"/>
    </ToastProvider>
</template>
