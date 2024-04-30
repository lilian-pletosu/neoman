<script setup>
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogOverlay,
    AlertDialogPortal,
    AlertDialogRoot,
    AlertDialogTitle,
    AlertDialogTrigger,
} from 'radix-vue'


const props = defineProps({
    action: Function,
    name: {
        required: true,
        type: String,
    },
    message: {
        required: true,
        type: String,
    },
})

</script>

<template>
    <AlertDialogRoot>
        <AlertDialogTrigger>
            <slot/>
        </AlertDialogTrigger>
        <AlertDialogPortal>
            <AlertDialogOverlay class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30"/>
            <AlertDialogContent
                class="z-[100] text-[15px] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
            >
                <AlertDialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
                    {{ name }}
                </AlertDialogTitle>
                <AlertDialogDescription class="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                    {{ message }}
                </AlertDialogDescription>
                <div class="flex justify-end gap-[25px]">
                    <AlertDialogCancel
                        class="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]"
                    >
                        {{ __('cancel') }}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        class="text-red-700 bg-red-100 hover:bg-red-200 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]"
                        @click="action()"
                    >
                        {{ __('yes_delete') }}
                    </AlertDialogAction>
                </div>
            </AlertDialogContent>
        </AlertDialogPortal>
    </AlertDialogRoot>
</template>
