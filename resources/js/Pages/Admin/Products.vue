<script setup>
import { defineComponent, ref } from "vue";
import AdminLayout from "@/Layouts/AdminLayout.vue";
import { Link, useForm } from "@inertiajs/vue3";
import DataTable from "@/Components/DataTable.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import SchemaFormBuilder from "@/Components/SchemaFormBuilder.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";

defineProps({
    initialRoute: {
        type: String,
    },
    resourceType: {
        type: String,
    },
    resources: {
        type: Object,
    },
});
const isOpen = ref(false);
const modalIsOpen = ref(false);
const notifyType = ref();
const notification = ref(false);
const method = ref("POST");
const type = ref("modal");
const res = ref();

const form = useForm({
    file: null,
});

const showNotify = (type) => {
    notifyType.value = type;
    notification.value = !notification.value;
    setTimeout(() => {
        notification.value = !notification.value;
    }, 2000);
};

function schemaForm(resource = null, sendType, sendMethod) {
    method.value = sendMethod;
    type.value = sendType;
    modalIsOpen.value = !modalIsOpen.value;
    if (resource) {
        res.value = resource;
        res.value["brand_name"] = res.value["brand"]["name"];
        res.value["sub_sub_category_name"] =
            res.value["sub_sub_category"]["name"];
    }
}

defineComponent({
    name: "Products",

    components: {
        AdminLayout,
        Link,
        useForm,
    },
});
</script>

<template>
    <admin-layout :current-route="initialRoute" title="Products">
        <div class="grid w-full grid-cols-1 gap-4">
            <div class="container-rounded">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="primary-text">{{ __("products") }}</h3>
                        <span class="secondary-text">{{
                            __("products_description_admin")
                        }}</span>
                        <br />
                        <span class="secondary-text">{{ __("in_total_products_is") }} :
                            {{ resources.total }}</span>
                    </div>
                    <div class="flex-shrink-0">
                        <primary-button class="mx-2" @click="schemaForm(null, 'create', 'POST')">{{ __("create") }}
                        </primary-button>
                        <secondary-button @click="schemaForm(null, 'import', 'POST')">{{ __("import") }}
                        </secondary-button>
                    </div>
                </div>
                <div class="flex flex-col mt-8">
                    <data-table :columns="$page.props.columns" :columnsOrder="$page.props.columnsOrder"
                        :resource-type="resourceType" :resources="resources" :search-route="$page.props.searchRoute"
                        @emit-click="(args) =>
                            $inertia.get(route('admin.products.show', args))
                            " />
                </div>
                <div>
                    <h2 v-if="resources.data.length === 0" class="flex justify-center">
                        {{ __("no_products") }}...
                    </h2>
                </div>

                <schema-form-builder :columns="[
                    'name',
                    'description',
                    'product_code',
                    'price',
                    'brand_name',
                    'sub_sub_category_name',
                    'attributes',
                ]" :endpoint="initialRoute" :fields="$page.props.columnsOrder" :method="method"
                    :modal-is-open="modalIsOpen" :resource="res" :resource-route="$page.props.resourceRoute"
                    :resource-type="resourceType" :type="type" @close="schemaForm" @showNotify="showNotify"
                    @close-modal="schemaForm" />
            </div>
        </div>
    </admin-layout>
</template>
