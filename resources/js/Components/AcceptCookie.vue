<script setup>
import {Link} from "@inertiajs/vue3";
</script>

<template>
    <div class="fixed z-10 inset-x-0 bottom-0 p-4">
        <div
            class="relative flex items-center justify-between gap-4 rounded-lg bg-indigo-600 px-4 py-3 text-white shadow-lg"
        >
            <div class="flex space-x-2">
                <p class="text-md font-medium">
                    {{ __('use_cookies') }}
                </p>
                <Link :href="route('privacy_page')" class="inline-block underline">{{ __('privacy') }}</Link>
            </div>


            <button
                aria-label="accept"
                class="shrink-0 rounded-lg bg-green-600 py-1 px-4 transition hover:bg-black/20 font-medium font-mulish shadow">
                {{ __('accept') }}
            </button>
        </div>
    </div>
</template>

<style scoped>

</style>
