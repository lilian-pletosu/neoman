<template>
    <admin-layout :current-route="initialRoute" title="Products">
        <div class="w-full grid grid-cols-1  gap-4">
            <div class="container-rounded ">

                <div class="mb-4 flex items-center justify-between">
                    <div>
                        <h3 class="primary-text">{{ __('products') }}</h3>
                        <span class="secondary-text">{{ __('products_description_admin') }}</span>
                    </div>
                    <div class="flex-shrink-0">
                        <primary-button @click="schemaForm(null, 'create', 'POST')" class="mx-2">{{
                                __('create')
                            }}
                        </primary-button>
                        <secondary-button @click="schemaForm(null, 'import', 'POST')">{{
                                __('import')
                            }}
                        </secondary-button>
                    </div>
                </div>
                <div class="flex flex-col mt-8">
                    <data-table
                        :resource-type="resourceType"
                        @emit-click="args => schemaForm(args, 'modal', 'PUT')"
                        :resources="resources" :columnsOrder="$page.props.columnsOrder"
                        :columns="$page.props.columns" :search-route="$page.props.searchRoute"/>
                </div>
                <div>
                    <h2 class="flex justify-center" v-if="resources.data.length === 0">{{ __('no_products') }}...</h2>
                </div>

                <schema-form-builder :type="type"
                                     :modal-is-open="modalIsOpen"
                                     @close="schemaForm"
                                     @close-modal="schemaForm"
                                     @showNotify="showNotify"
                                     :resource="res"
                                     :endpoint="initialRoute"
                                     :method="method"
                                     :resource-type="resourceType"
                                     :columns="['name', 'description', 'product_code', 'price', 'brand_name', 'sub_sub_category_name', 'attributes']"
                                     :resource-route="$page.props.resourceRoute"
                                     :fields="$page.props.columnsOrder"/>


            </div>


        </div>
    </admin-layout>
</template>

<script setup>
import {defineComponent, ref} from 'vue'
import AdminLayout from "@/Layouts/AdminLayout.vue";
import {Link, useForm} from "@inertiajs/vue3";
import DataTable from "@/Components/DataTable.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import SchemaFormBuilder from "@/Components/SchemaFormBuilder.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";


defineProps({
    initialRoute: {
        type: String
    },
    resourceType: {
        type: String
    },
    resources: {
        type: Object
    }
});
const isOpen = ref(false);
const modalIsOpen = ref(false);
const notifyType = ref();
const notification = ref(false);
const method = ref('POST');
const type = ref('modal');
const res = ref();


const form = useForm({
    file: null,
})

const showNotify = (type) => {
    notifyType.value = type;
    notification.value = !notification.value;
    setTimeout(() => {
        notification.value = !notification.value
    }, 2000);
}

function schemaForm(resource = null, sendType, sendMethod) {
    console.log(resource);
    method.value = sendMethod;
    type.value = sendType;
    modalIsOpen.value = !modalIsOpen.value;
    if (resource) {
        res.value = resource;
        res.value['brand_name'] = res.value['brand']['name']
        res.value['sub_sub_category_name'] = res.value['sub_sub_category']['name']
    }
}

defineComponent({
    name: "Products",

    components: {
        AdminLayout,
        Link,
        useForm

    },
})
</script>
