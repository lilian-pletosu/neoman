<script setup>
import { ref } from "vue";
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/16/solid/index.js";
import { router } from "@inertiajs/vue3";
import { route } from "ziggy-js";
import Modal from "@/Components/Modal.vue";
import AlertDialog from "@/Components/AlertDialog.vue";
import axios from "axios";

const props = defineProps({
    credit: Object,
});

const products = ref([]);

const formData = ref({
    type: props.credit.type,
    num_of_installments: props.credit.num_of_installments,
    interest_rate: props.credit.interest_rate,
});
const edit = ref(false);

const updateCredit = () => {
    router.put(
        route("admin.settings.update", {
            setting: props.credit.id,
            form: formData.value,
        }),
        {
            onSuccess: (edit.value = false),
        }
    );
};

function fetchProducts() {
    axios.get(route("admin.fetch_products")).then((response) => {
        products.value = response.data;
    });
}

const startEdit = async () => {
    await fetchProducts();
    edit.value = true;
};

const cancelEdit = () => {
    edit.value = false;
    formData.value = {
        type: props.credit.type,
        num_of_installments: props.credit.num_of_installments,
        interest_rate: props.credit.interest_rate,
    };
};

const removeCredit = () => {
    router.delete(
        route("admin.settings.destroy", { setting: props.credit.id })
    );
};
const showModal = ref(false);
</script>

<template>
    <div
        class="relative grid grid-cols-1 gap-2 p-2 border 2xl:grid-cols-2 container-custom-rounded border-1 border-slate-300"
    >
        <div class="flex flex-col col-span-1">
            <span> {{ __("installments") }}</span>
            <input
                type="text"
                v-model="formData.num_of_installments"
                class="w-full rounded disabled:bg-slate-100 disabled:border-0"
                :disabled="!edit"
            />
        </div>
        <div class="flex flex-col col-span-1 pb-6">
            <span>{{ __("interest_rate") }}</span>
            <input
                type="text"
                v-model="formData.interest_rate"
                class="w-full rounded disabled:bg-slate-100 disabled:border-0"
                :disabled="!edit"
            />
        </div>

        <div
            class="flex col-span-2 gap-2 text-center right-1 bottom-1 j"
            :class="edit ? '' : 'absolute'"
        >
            <PencilSquareIcon
                v-if="!edit"
                @click="startEdit"
                class="w-5 cursor-pointer text-slate-500 hover:text-slate-700"
            />
            <p
                v-if="edit"
                @click="cancelEdit"
                class="cursor-pointer border w-full border-[#3d55cc] text-[#3d55cc] font-medium p-1 rounded-lg bg-white shadow"
            >
                {{ __("cancel") }}
            </p>
            <p
                v-if="edit"
                @click="updateCredit()"
                class="cursor-pointer w-full text-white border p-1 font-medium rounded-lg bg-[#3d55cc] shadow"
            >
                {{ __("submit") }}
            </p>
        </div>

        <Modal :show="showModal" :closeable="false">
            <p>Ești sigur ca vrei să ștergi?</p>
            <button
                class="px-4 py-2 text-white bg-red-500"
                @click="removeCredit"
            >
                Delete
            </button>
        </Modal>
        <AlertDialog
            class="absolute"
            :action="removeCredit"
            :key="credit.id"
            :name="__('are_you_sure')"
            :message="__('action_cannot_be_undone')"
        >
            <TrashIcon
                class="absolute w-4 cursor-pointer right-1 top-1 text-slate-300 hover:text-red-300"
            />
        </AlertDialog>
    </div>
</template>
