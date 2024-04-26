<script setup>
import {AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger} from 'radix-vue'
import {Icon} from '@iconify/vue'

defineProps({
    privacy: Object
})
</script>

<template>
    <AccordionRoot
        class="bg-mauve6 w-full rounded-md shadow-[0_2px_10px] shadow-black/5"
        default-value="item-1"
        type="single"
        :collapsible="true"
    >
        <template v-for="item in privacy" :key="item.id">
            <AccordionItem
                class="focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10"
                :value="item.id">
                <AccordionHeader class="flex">
                    <AccordionTrigger
                        class="text-grass11 font-bold  shadow-mauve6 hover:bg-mauve2 flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none group">
                        <span>{{ item.title }}</span>
                        <Icon
                            icon="radix-icons:chevron-down"
                            class="text-green10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                            aria-hidden
                        />
                    </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent
                    class="text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]">
                    <div class="px-5 py-4">
                        {{ item.content }}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </template>
    </AccordionRoot>
</template>
