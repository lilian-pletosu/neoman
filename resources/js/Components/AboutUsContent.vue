<script setup>
import { getCurrentInstance, ref } from "vue";
import InputEditor from "@/Components/InputEditor.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import { useForm } from "@inertiajs/vue3";

const props = defineProps({
    resources: Object,
});

const app = getCurrentInstance();

const form = useForm({
    title: "About Us",
    content: props.resources.content,
});

const edit = ref(false);

const cancelEdit = () => {
    edit.value = false;
    form.content = props.resources.content;
};

const submit = () => {
    form.put(route("admin.about_us.update", props.resources.about_id), {
        preserveScroll: true,
        onSuccess: () => {
            edit.value = false;
        },
    });
};
</script>

<template>
    <div
        v-if="!edit"
        @click="edit = true"
        class="container-custom-rounded border border-1 border-slate-300 p-2 bg-slate-100/50 min-h-[150px]"
    >
        <div v-html="resources.content" />
    </div>
    <div v-else class="grid grid-cols-1 space-y-2">
        <div class="grid-cols-1 space-y-2">
            <InputEditor v-model="form.content" />
            <div class="flex flex-row justify-end">
                <primary-button @click="submit" class="mx-2"
                    >{{ __("submit") }}
                </primary-button>
                <secondary-button @click="cancelEdit()" class="mx-2"
                    >{{ __("cancel") }}
                </secondary-button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
