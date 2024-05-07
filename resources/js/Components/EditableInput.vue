<script setup>
import {defineModel, defineProps, ref} from "vue";
import {clone} from "@/helper.js";
import {router} from "@inertiajs/vue3";
import {route} from "ziggy-js";

const props = defineProps({
    name: {
        required: true,
        type: String,
    },
});

const formData = defineModel();
const cloneFormData = clone(formData.value)

const edit = ref({
    fullName: false,
    phoneNumber: false,
    email: false,
    address: false,
    city: false,
});

const cancelEdit = (field) => {
    edit.value[field] = false;
    cloneFormData[field] = clone(formData.value[field]);
};

const enableEdit = (field) => {
    edit.value[field] = !edit.value[field];
};

const updateField = (field) => {
    router.put(route('admin.orders.update', {order: formData.value.id}), {
        type: 'updateOrder',
        field: field,
        value: cloneFormData[field],
    }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            edit.value[field] = false;
            formData.value[field] = cloneFormData[field];
        }
    });
};

</script>


<template>
    <div>
        <span class="text-sm text-slate-500">{{ __(name) }}</span>
        <div class="relative">
            <p
                class="rounded bg-slate-100 border-0.5 border-slate-200  w-full hover:bg-slate-100 p-2 cursor-pointer"
                @click="enableEdit(name)"
                v-if="!edit[name]"
            >
                {{ cloneFormData[name] }}

            </p>
            <input
                type="text" v-model="cloneFormData[name]"
                class="rounded disabled:bg-slate-100 disabled:border-0.5 border-slate-200  w-full"
                :disabled="!edit[name]"
                @keydown.enter="updateField(name)"
                @keydown="console.log(cloneFormData[name])"
                v-else
            />

            <div v-if="edit[name]" class="absolute flex  right-2">
                <span @click="updateField(name)" class="border p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         class="w-5 h-5">
                        <path fill-rule="evenodd"
                              d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                              clip-rule="evenodd"/>
                    </svg>
                </span>
                <span @click="cancelEdit(name)" class="border p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path
                            d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"/>
                    </svg>
                </span>
            </div>
        </div>
    </div>
</template>
