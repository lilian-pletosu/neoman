<script setup lang="ts">
import { Link, usePage } from "@inertiajs/vue3";
import { route } from "ziggy-js";

const props = defineProps({
    steps: {
        type: Array as () => Breadcrumb[],
        required: true,
    }
});

interface Breadcrumb {
    name: string;
    url: string;
    type: string;
}

const page = usePage();
</script>

<template>
    <div class="flex w-full dark:bg-dark dark:border-b dark:border-gray-700">
        <nav class="flex my-2 md:my-4 " aria-label="Breadcrumb">
            <ol class="flex flex-wrap space-x-1 md:space-x-0.5 rtl:space-x-reverse">
                <li class="flex items-center">
                    <Link :href="route('home')"
                        class="inline-flex items-center text-xs font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    {{ __("home") }}
                    </Link>
                </li>
                <li v-for="step in props.steps[0]" :key="step" class="flex items-center">
                    <div class="flex items-center">
                        <svg class="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 9 4-4-4-4" />
                        </svg>
                        <Link :href="step?.url"
                            class="text-xs text-gray-700 ms-1 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                            :class="{ 'font-bold': step?.url == page.props.ziggy.location }">
                        {{ __(step?.name) }}
                        </Link>

                    </div>
                </li>
            </ol>
        </nav>
    </div>
</template>

<style scoped></style>
