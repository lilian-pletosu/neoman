<template>
    <div class="grid-cols-1 space-y-2">
        <span class="space-y-4" v-for="lang in app.appContext.config.globalProperties.$page.props.availableLanguages">
            <div class="py-2">
                <label :for="form.content[lang]" class="text-sm font-semibold text-slate-800">{{
                        __(`content_${lang}`)
                    }}</label>
            <InputEditor :id="form.content[lang]"
                         v-model="form.content[lang]"/>
            </div>
        </span>
        <div class="flex flex-row justify-end">
            <primary-button @click="submit" class="mx-2">{{
                    __('submit')
                }}
            </primary-button>
            <secondary-button @click="cancel()" class="mx-2">{{
                    __('cancel')
                }}
            </secondary-button>
        </div>
    </div>
</template>

<script setup>
import {useForm} from "@inertiajs/vue3";
import {route} from "ziggy-js";
import InputEditor from "@/Components/InputEditor.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {getCurrentInstance} from "vue";

const app = getCurrentInstance();

const form = useForm({
    title: 'About Us',
    content: {}

});


const emits = defineEmits(['cancel', 'close']);

function cancel() {
    form.reset();
    emits('close');
}

const submit = () => {
    form.post(route('admin.about_us.store'), {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
        },
        onFinish: () => {
            emits('close')
        }
    });
};
</script>
