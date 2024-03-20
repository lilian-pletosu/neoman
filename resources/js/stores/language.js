import {defineStore} from "pinia";
import {router} from "@inertiajs/vue3";
import {ref} from "vue";

export const useLanguageStore = defineStore('lang', () => {
    const currentLang = ref();


    async function changeLanguage(locale) {
        router.visit(route('language', {locale: locale}))
    }


    return {
        changeLanguage,
        currentLang,
    }
})
