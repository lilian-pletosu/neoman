CartPage.vue
<script setup>
import FrontLayout from "@/Layouts/FrontLayout.vue";
import AccordionVue from "@/Components/AccordionVue.vue";

const props = defineProps({
    content: Object,
});
</script>

<template>
    <FrontLayout
        :title="__('terms')"
        meta-description="Site-ul neoman.md (în continuare „site”), specializat în comercializarea materialelor de finisare și produse pentru casă, aparține companiei ”NEOMAN GROUP” S.R.L, cu sediul în mun. Chișinău, str. Uzinelor 12A. "
        :meta-keywords="__('terms')"
        :current-url="route('terms_page')"
        :current-language="$page.props.locale"
    >
        <div class="py-4">
            <h1 class="text-2xl font-bold font-mulish dark:text-white">
                {{ __("terms") }}
            </h1>
            <hr class="my-4" />
            <section class="pt-4">
                <accordion-vue :privacy="content" />
            </section>
        </div>
    </FrontLayout>
</template>
