<script setup>

import {useLanguageStore} from "@/stores/language.js";
import {onMounted, ref} from "vue";

const useLanguage = useLanguageStore();

const props = defineProps({
    isDark: Boolean,
    currentLocale: String
})
const val = ref();

function changeLanguage() {
    if (val.value) {
        console.log('true')
        useLanguage.changeLanguage('ru')
    } else {
        console.log('false')

        useLanguage.changeLanguage('ro')
    }
}

onMounted(() => {
    props.currentLocale === 'ro' ? val.value = false : val.value = true;
})


</script>

<template>
    <div
        class="flex justify-center sm:px-4    md:justify-end md:px-2 items-center  h-10 xl:px-60 2xl:px-60">
        <div class="hidden md:flex w-full pb-1 border-b justify-end">
            <label class="mx-4 relative cursor-pointer">
                <input type="checkbox" :checked="val" :value="currentlang" class="sr-only peer"
                       @change="changeLanguage">
                <div
                    class="w-11 h-6  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-gray-500 after:content-[''] after:absolute after:top-[2px] after:start-[2px] border  after:bg-white after:border after:border-gray-500  after:rounded-full after:w-5 after:h-5 after:transition-all bg-none border  border-gray-500">
                    <div class="flex flex-row items-center justify-between px-1">
                    <span class="text-3 font-xs text-black dark:text-white">
                        ro
                    </span>
                        <span class="text-3 font-xs text-black dark:text-white">
                        ru
                    </span>
                    </div>
                </div>
            </label>
            <label class="relative cursor-pointer">
                <input type="checkbox" :checked="isDark" class="sr-only peer" @change="$emit('darkMode')">
                <div
                    class="w-11 h-6  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:border-gray-500  border-gray-500  after:rounded-full after:w-5 after:h-5 after:transition-all  bg-none border">
                    <div class="flex flex-row items-center justify-between px-1 py-1">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" color="yellow" fill="currentColor"
                             class="w-4 h-4">
                          <path
                              d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z"/>
                        </svg>
                    </span>
                        <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" aria-hidden="true"
                             height="15"

                             viewBox="0 0 18 18">
                            <path
                                d="M8.48335 0.682617C7.8693 1.2548 7.37678 1.9448 7.03518 2.71147C6.69358 3.47813 6.5099 4.30574 6.49509 5.14493C6.48028 5.98412 6.63466 6.8177 6.949 7.59593C7.26334 8.37416 7.73121 9.08111 8.3247 9.6746C8.91819 10.2681 9.62514 10.736 10.4034 11.0503C11.1816 11.3646 12.0152 11.519 12.8544 11.5042C13.6936 11.4894 14.5212 11.3057 15.2878 10.9641C16.0545 10.6225 16.7445 10.13 17.3167 9.51595C17.1862 11.6327 16.2532 13.6201 14.708 15.0727C13.1628 16.5253 11.1217 17.3339 9.00085 17.3334C4.39752 17.3334 0.666687 13.6026 0.666687 9.00012C0.666687 4.57095 4.12169 0.949284 8.48335 0.682617Z"
                                fill="black"/>
                        </svg>
                    </span>
                    </div>
                </div>
            </label>
        </div>
        <div>
            <div class="flex flex-row space-x-3 justify-center items-center">
                <div
                    class="flex flex-row space-x-1 text-[#868686] text-[10px] py-1  sm:text-sm md:hidden">
                    <p>Lu - Vi: <p class="font-semibold"> 08.00 - 19.00 /</p></p>
                    <p>Sâ: <p class="font-semibold"> 08.00 - 17.00 /</p></p>
                    <p>Du: <p class="font-semibold"> 10.00 - 15.00</p></p>

                </div>
            </div>
        </div>
    </div>


</template>

<style scoped>

</style>
