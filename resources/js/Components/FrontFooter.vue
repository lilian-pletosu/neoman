<script setup>
import {getCurrentInstance} from 'vue'
import {Link} from '@inertiajs/vue3'
import ShortLogo from "@/Components/ShortLogo.vue";

const app = getCurrentInstance()
</script>

<template>
    <footer class="relative mt-20 bg-gray-900 px-4 pt-20">
        <div
            class="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-sky-500 bg-white p-2">
            <ShortLogo/>
        </div>
        <nav aria-label="Footer Navigation"
             class="mx-auto mb-10 flex max-w-2xl flex-col gap-10 text-center sm:flex-row sm:text-left">
            <Link :href="route('about_page')" class="font-medium text-white">{{ __('about_us') }}</Link>
            <Link :href="route('contacts.index')" class="font-medium text-white">{{ __('contact') }}</Link>
            <Link :href="route('privacy_page')" class="font-medium text-white">{{ __('privacy') }}</Link>
            <Link :href="route('terms_page')" class="font-medium text-white">{{ __('terms') }}</Link>
        </nav>
        <p class="py-10 text-center text-gray-300">© 2023 - {{
                app.appContext.config.globalProperties.$page.props.currentYear
            }} Neoman | {{ __('all_rights_reserved') }}</p>
    </footer>

</template>

<style scoped>

</style>
