CartPage.vue
<script setup>
import FrontLayout from "@/Layouts/FrontLayout.vue";

const props = defineProps({
    content: Object,
});
</script>

<template>
    <FrontLayout
        :title="__('about_us')"
        meta-description="Neoman.md este un magazin online specializat în materiale de finisare și produse esențiale pentru reparația și amenajarea locuinței tale.
Oferim tot ce ai nevoie pentru a transforma spațiul tău într-un cămin perfect."
        meta-keywords="magazin online moldova, materiale finisare, electrocasnice, amenajari interioare, reparatii casa, neoman chisinau, produse calitate, livrare moldova"
        :current-url="route('about_page')"
        :current-language="$page.props.locale"
    >
        <div class="py-4">
            <h1 class="text-2xl font-bold font-mulish dark:text-white">
                {{ __("about_us") }}
            </h1>
            <section class="pt-4">
                <div class="dark:text-white" v-html="content?.content"></div>
            </section>
        </div>
    </FrontLayout>
</template>
