<script setup>
import {Link} from "@inertiajs/vue3";
import axios from "axios";
import {route} from "ziggy-js";
import {onMounted, ref} from "vue";


const showCookie = ref(false);


function acceptCookie() {
    axios.get(route('api.acceptCookies'))
        .then(response => {
            showCookie.value = false;
        })
        .catch(error => {
            console.log(error)
        })
}

function checkCookie() {
    axios.get(route('api.getCookies'))
        .then(response => {
            showCookie.value = !response.data
        })
        .catch(error => {
            console.log(error)
        })
}

onMounted(() => checkCookie());


</script>

<template>
    <div v-show="showCookie" class="fixed z-10 inset-x-0 bottom-0 p-4">
        <div
            class="relative flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg bg-indigo-600 px-4 py-3 text-white shadow-lg"
        >
            <div class="flex flex-col sm:flex-row items-center space-x-2">
                <p class="text-md font-medium text-center">
                    {{ __('use_cookies') }}
                </p>
                <Link :href="route('privacy_page')" class="inline-block underline">{{ __('privacy') }}</Link>
            </div>


            <button
                aria-label="accept"
                @click="acceptCookie"
                class="shrink-0 rounded-lg bg-green-600 py-1 px-4 transition hover:bg-black/20 font-medium font-mulish shadow">
                {{ __('accept') }}
            </button>
        </div>
    </div>
</template>

<style scoped>

</style>
