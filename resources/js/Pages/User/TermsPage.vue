CartPage.vue
<script setup>
import FrontLayout from "@/Layouts/FrontLayout.vue";

const props = defineProps({
    content: Object
})


</script>

<template>
    <FrontLayout>
        <div class="py-4">
            <h1 class="text-2xl font-bold font-mulish dark:text-white">{{ __('terms') }}</h1>
            <section class="pt-4">
                <span>sss</span>
            </section>

        </div>

    </FrontLayout>
</template>

