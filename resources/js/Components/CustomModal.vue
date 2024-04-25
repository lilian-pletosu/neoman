<script setup>
import {DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogRoot,} from 'radix-vue'
import {Icon} from '@iconify/vue'

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },
})

defineEmits(['close-modal'])

</script>

<template>
    <DialogRoot :open="isOpen">

        <DialogPortal>
            <DialogOverlay class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30"/>
            <DialogContent @close-auto-focus="$emit('close-modal')" @interactOutside="$emit('close-modal')"
                           class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] w-screen h-10/12 sm:h-[40vw] sm:w-[60vw]  translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white  shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
            >
                <slot name="content"/>

                <DialogClose @click="$emit('close-modal')"

                             class="text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                             aria-label="Close"
                >
                    <Icon icon="lucide:x"/>
                </DialogClose>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>
