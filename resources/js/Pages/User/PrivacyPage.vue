CartPage.vue
<script setup>
import FrontLayout from "@/Layouts/FrontLayout.vue";
import AccordionVue from "@/Components/AccordionVue.vue";

const props = defineProps({
    content: Object
})

</script>

<template>
    <FrontLayout>
        <div class="py-4">
            <h1 class="text-2xl font-bold font-mulish dark:text-white">{{ __('privacy') }}</h1>
            <hr class="my-4">
            <section class="pt-4">
                <accordion-vue :privacy="content"/>
            </section>
        </div>
    </FrontLayout>
</template>

