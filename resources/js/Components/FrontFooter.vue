<script setup>
import {getCurrentInstance} from 'vue'
import {Link} from '@inertiajs/vue3'

const app = getCurrentInstance()
</script>

<template>
    <footer class="relative mt-20 bg-gray-900 px-4 pt-20">
        <div
            class="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-sky-500 bg-white p-2">
            <svg viewBox="0 0 63 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_76_7)">
                    <path d="M1 61.5V7L56.5 61.5H40.5L12.5 34V61.5H1Z" fill="#1FC8F3"/>
                    <path d="M7 0L61.5 54.5V0H50V27.5L23 0H7Z" fill="#EFFA0A"/>
                </g>
                <defs>
                    <filter id="filter0_d_76_7" x="0" y="0" width="62.5" height="63.5" filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="1"/>
                        <feGaussianBlur stdDeviation="0.5"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_76_7"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_76_7" result="shape"/>
                    </filter>
                </defs>
            </svg>
            <!--            <img class="h-full object-contain" src="/images/logo-circle.png" alt=""/>-->

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
