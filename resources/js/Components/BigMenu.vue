<script setup>
import { getCurrentInstance, ref } from "vue";
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
} from "radix-vue";
import { Icon } from "@iconify/vue";
import { route } from "ziggy-js";
import { router, usePage } from "@inertiajs/vue3";

const app = getCurrentInstance();
const page = usePage();

const toggleState = ref(false);
const checkboxOne = ref(false);
const checkboxTwo = ref(false);
const person = ref("pedro");

function handleClick() {
    alert("hello!");
}
</script>

<template>
    <DropdownMenuRoot v-model:open="toggleState">
        <DropdownMenuTrigger
            aria-label=""
            class="relative justify-center items-center bg-[#043B3D] md:w-3/12 dark:bg-dark"
        >
            <slot name="children" />
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
            <DropdownMenuContent
                :side-offset="5"
                class="z-50 outline-none w-96 bg-white rounded-md p-1.5 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            >
                <DropdownMenuSub
                    v-for="category in page.props.menu"
                    @scroll="console.log('scroll')"
                >
                    <DropdownMenuItem
                        v-if="category.subcategory.length <= 0"
                        :value="category.slug"
                        class="z-50 py-6 cursor-pointer group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1"
                        @click="
                            router.get(
                                route('category_page', { slug: category.slug })
                            )
                        "
                    >
                        <div
                            class="mr-2 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
                        >
                            <p v-html="category.icon" />
                        </div>
                        <p class="text-lg">{{ category.name }}</p>
                    </DropdownMenuItem>
                    <DropdownMenuSubTrigger
                        v-if="category.subcategory.length > 0"
                        class="z-50 py-6 cursor-pointer group w-full text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-green4 data-[state=open]:text-grass11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1 data-[highlighted]:data-[state=open]:bg-green9 data-[highlighted]:data-[state=open]:text-green1"
                        value="more toolsz"
                        @click="
                            router.get(
                                route('category_page', { slug: category.slug })
                            )
                        "
                    >
                        <div
                            class="mr-2 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
                        >
                            <p v-html="category.icon" />
                        </div>
                        <p class="text-lg">{{ category.name }}</p>
                        <div
                            class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
                        >
                            <Icon icon="radix-icons:chevron-right" />
                        </div>
                    </DropdownMenuSubTrigger>
                    <div>
                        <DropdownMenuPortal class="">
                            <DropdownMenuSubContent
                                :align-offset="-5"
                                :side-offset="2"
                                class="z-50 cursor-pointer w-auto outline-none bg-white rounded-md p-4 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                            >
                                <div class="columns-3">
                                    <div
                                        v-for="subcategory in category.subcategory"
                                        class="mb-4 break-inside-avoid"
                                    >
                                        <DropdownMenuItem
                                            v-if="
                                                category.subcategory.length <= 0
                                            "
                                            class="py-4 group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] relative px-3 select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1"
                                            @click="
                                                router.get(
                                                    route('subcategory_page', {
                                                        slug: subcategory.slug,
                                                    })
                                                )
                                            "
                                        >
                                            <p class="text-lg">
                                                {{ subcategory.name }}
                                            </p>
                                        </DropdownMenuItem>

                                        <DropdownMenuSub>
                                            <div
                                                class="flex items-center group/submenu"
                                            >
                                                <span
                                                    class="invisible group-hover/submenu:visible"
                                                >
                                                    <Icon
                                                        height="16"
                                                        icon="mingcute:right-line"
                                                        width="16"
                                                    />
                                                </span>
                                                <p
                                                    class="font-bold"
                                                    @click="
                                                        router.get(
                                                            route(
                                                                'subcategory_page',
                                                                {
                                                                    slug: subcategory.slug,
                                                                }
                                                            )
                                                        )
                                                    "
                                                >
                                                    {{ subcategory.name }}
                                                </p>
                                            </div>
                                            <DropdownMenuItem
                                                v-for="sub_subcategory in subcategory.sub_subcategory"
                                                class="group text-[13px] py-4 leading-none text-grass11 rounded-[3px] flex items-center h-[25px] relative"
                                                @click="
                                                    router.get(
                                                        route('products_page', {
                                                            subSubcategory:
                                                                sub_subcategory.slug,
                                                        })
                                                    )
                                                "
                                            >
                                                <div
                                                    class="flex items-center group/subsubmenu"
                                                >
                                                    <span
                                                        class="invisible group-hover/subsubmenu:visible"
                                                        ><Icon
                                                            height="16"
                                                            icon="mingcute:right-line"
                                                            width="16"
                                                    /></span>
                                                    <p
                                                        class="w-[300px] text-base group-hover/subsubmenu:font-medium"
                                                    >
                                                        {{
                                                            sub_subcategory.name
                                                        }}
                                                    </p>
                                                </div>
                                            </DropdownMenuItem>
                                        </DropdownMenuSub>
                                    </div>
                                </div>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </div>
                </DropdownMenuSub>
                <DropdownMenuArrow class="fill-white" />
            </DropdownMenuContent>
        </DropdownMenuPortal>
    </DropdownMenuRoot>
</template>
