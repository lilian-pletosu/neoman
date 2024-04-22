<script setup>
import {getCurrentInstance, ref} from 'vue'
import {
    DropdownMenuArrow,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuRoot,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from 'radix-vue'
import {Icon} from "@iconify/vue";
import {route} from "ziggy-js";
import {router} from "@inertiajs/vue3";

const app = getCurrentInstance();

const toggleState = ref(false)
const checkboxOne = ref(false)
const checkboxTwo = ref(false)
const person = ref('pedro')

function handleClick() {
    alert('hello!')
}
</script>

<template>
    <DropdownMenuRoot v-model:open="toggleState">
        <DropdownMenuTrigger
            class="relative
             justify-center items-center bg-[#043B3D] md:w-3/12  dark:bg-dark"
            aria-label=""
        >
            <slot name="children"/>

        </DropdownMenuTrigger>

        <DropdownMenuPortal>
            <DropdownMenuContent
                class="w-96 outline-none bg-white rounded-md p-1.5 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                :side-offset="5">
                <!--                <DropdownMenuItem-->
                <!--                    v-for="category in app.appContext.config.globalProperties.$page.props.menu"-->
                <!--                    value="New Tab"-->
                <!--                    class="group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1">-->
                <!--                    {{ category.name }}-->
                <!--                </DropdownMenuItem>-->
                <DropdownMenuSub v-for="category in app.appContext.config.globalProperties.$page.props.menu">

                    <DropdownMenuItem
                        v-if="category.subcategory.length <= 0"
                        :value="category.slug"
                        class=" py-6 cursor-pointer group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1"
                        @click="router.get(route('category_page', {slug: category.slug}))"
                    >
                        <div
                            class="mr-2 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8 "
                        >
                            <p v-html="category.icon"/>
                        </div>
                        <p class="text-lg">{{ category.name }}</p>

                    </DropdownMenuItem>
                    <DropdownMenuSubTrigger
                        v-if="category.subcategory.length > 0"
                        @click="router.get(route('category_page', {slug: category.slug}))"
                        value="more toolsz"
                        class="py-6 cursor-pointer group w-full text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-green4 data-[state=open]:text-grass11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1 data-[highlighted]:data-[state=open]:bg-green9 data-[highlighted]:data-[state=open]:text-green1">

                        <div
                            class="mr-2 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
                        >
                            <p v-html="category.icon"/>
                        </div>
                        <p class="text-lg">{{ category.name }}</p>
                        <div
                            class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                            <Icon icon="radix-icons:chevron-right"/>
                        </div>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent
                            class=" cursor-pointer min-w-[220px] outline-none bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                            :side-offset="2"
                            :align-offset="-5"
                        >
                            <DropdownMenuItem
                                v-if="category.subcategory.length <= 0"
                                v-for="subcategory in category.subcategory"
                                @click="router.get(route('subcategory_page', {slug: subcategory.slug}))"
                                class="py-4 group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px]  relative px-3 select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1"
                            >

                                <p class="text-lg">{{ subcategory.name }}</p>
                                <div
                                    class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                                    <Icon icon="radix-icons:chevron-right"/>
                                </div>
                            </DropdownMenuItem>

                            <DropdownMenuSub
                                v-if="category.subcategory.length > 0"
                                v-for="subcategory in category.subcategory">
                                <DropdownMenuSubTrigger
                                    value="more toolsz"
                                    class="group w-full text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-green4 data-[state=open]:text-grass11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1 data-[highlighted]:data-[state=open]:bg-green9 data-[highlighted]:data-[state=open]:text-green1"
                                    @click="router.get(route('subcategory_page', {slug: subcategory.slug}))"
                                >
                                    <p class="text-lg">{{ subcategory.name }}</p>
                                    <div
                                        class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
                                    >
                                        <Icon icon="radix-icons:chevron-right"/>
                                    </div>
                                </DropdownMenuSubTrigger>

                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent
                                        class="cursor-pointer min-w-[220px] outline-none bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                        :side-offset="2"
                                        :align-offset="-5"
                                    >
                                        <DropdownMenuItem
                                            v-for="sub_subcategory in subcategory.sub_subcategory"
                                            class="group text-[13px] leading-none text-grass11 rounded-[3px] flex
                                            items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none
                                            data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none
                                            data-[highlighted]:bg-green9 data-[highlighted]:text-green1"
                                            @click="router.get(route('products_page', {subSubcategory: sub_subcategory.slug}))"
                                        >
                                            <p class="text-base	">{{ sub_subcategory.name }}</p>
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuArrow class="fill-white"/>
            </DropdownMenuContent>
        </DropdownMenuPortal>
    </DropdownMenuRoot>
</template>
