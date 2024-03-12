<script setup>
defineProps({
    w: {
        default: 'w-10',
    }
})
</script>

<template>
    <svg :class="w" viewBox="0 0 475 483" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_1_26)">
            <path d="M472.5 427L45.5 0H165.5L384 218.5V0H472.5V427Z" fill="#83E509"/>
            <path d="M2 478.5V54.5L432 478.5H306L91 263.5V478.5H2Z" fill="#1FC8F2"/>
        </g>
        <defs>
            <filter id="filter0_d_1_26" x="0" y="0" width="474.5" height="482.5" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                               result="hardAlpha"/>
                <feOffset dy="2"/>
                <feGaussianBlur stdDeviation="1"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_26"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_26" result="shape"/>
            </filter>
        </defs>
    </svg>

</template>

<style scoped>

</style>
