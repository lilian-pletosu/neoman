<script setup>
import { Link } from "@inertiajs/vue3";
import axios from "axios";
import { route } from "ziggy-js";
import { onMounted, ref } from "vue";

const showCookie = ref(false);

function acceptCookie() {
    axios
        .get(route("api.acceptCookies"))
        .then((response) => {
            showCookie.value = false;
        })
        .catch((error) => {
            console.log(error);
        });
}

function checkCookie() {
    axios
        .get(route("api.getCookies"))
        .then((response) => {
            showCookie.value = !response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}

onMounted(() => checkCookie());
</script>

<template>
    <div v-show="showCookie" class="fixed inset-x-0 bottom-0 z-10 p-4">
        <div
            class="relative flex flex-col items-center justify-between gap-4 px-4 py-3 text-white bg-indigo-600 rounded-lg shadow-lg sm:flex-row"
        >
            <div class="flex flex-col items-center space-x-2 sm:flex-row">
                <p class="font-medium text-center text-md">
                    {{ __("use_cookies") }}
                </p>
                <Link
                    :href="route('privacy_page')"
                    class="inline-block underline"
                    >{{ __("privacy") }}</Link
                >
            </div>

            <button
                aria-label="accept"
                @click="acceptCookie"
                class="px-4 py-1 font-medium transition bg-green-600 rounded-lg shadow shrink-0 hover:bg-black/20 font-mulish"
            >
                {{ __("accept") }}
            </button>
        </div>
    </div>
</template>

<style scoped></style>
