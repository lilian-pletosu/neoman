<template>
    <admin-layout :current-route="initialRoute" title="Brands">
        <custom-notification :message="__(`success_${notifyType}`)" type="success" :show="notification"/>

        <div class="w-full grid grid-cols-1  gap-4">
            <div class="container-rounded ">

                <div class="mb-4 flex items-center justify-between">
                    <div>
                        <h3 class="primary-text">{{ __('brands') }}</h3>
                        <span class="secondary-text">This is a list of latest transactions</span>
                    </div>

                    <div class="flex-shrink-0">
                        <primary-button @click="schemaForm(null, 'create', 'POST')" class="mx-2">{{
                                __('create')
                            }}
                        </primary-button>
                        <secondary-button>{{ __('import') }}</secondary-button>
                    </div>

                </div>
                <div class="flex flex-col mt-8">
                    <div class="overflow-x-auto rounded-lg">
                        <data-table
                            @emit-click="args => schemaForm(args, 'modal', 'PUT')"
                            :resources="resources"
                            :columnsOrder="$page.props.columnsOrder"
                            :columns="$page.props.columns"
                            :initial-route="$page.props.initialRoute"
                            :search-route="$page.props.searchRoute"/>
                    </div>
                </div>
                <div>
                    <h2 class="flex justify-center" v-if="resources.data.length === 0">{{ __('no_brands') }}...</h2>
                </div>
                <schema-form-builder :type="type"
                                     :modal-is-open="modalIsOpen"
                                     @close="schemaForm"
                                     @close-modal="schemaForm"
                                     @showNotify="showNotify"
                                     :resource="res"
                                     :resource-type="resourceType"
                                     :endpoint="initialRoute"
                                     :method="method"
                                     :columns="['name', 'website', 'is_enabled', 'description',  'image']"
                                     :resource-route="$page.props.resourceRoute"
                                     :fields="$page.props.columnsOrder"/>

            </div>

        </div>
    </admin-layout>
</template>

<script setup>
import AdminLayout from "@/Layouts/AdminLayout.vue";
import DataTable from "@/Components/DataTable.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {ref} from "vue";
import CustomNotification from "@/Components/CustomNotification.vue";
import SchemaFormBuilder from "@/Components/SchemaFormBuilder.vue";


defineProps({
    initialRoute: {
        type: String
    },
    resourceType: {
        type: String
    },
    resources: {
        type: Object,
        required: true
    }
});
const isOpen = ref(false);
const createBrand = ref(false);
const importBrands = ref(false);
const notification = ref(false);
const type = ref('modal');
const method = ref('POST');
const notifyType = ref();

const modalIsOpen = ref(false);
const res = ref();

const showNotify = (type) => {
    notifyType.value = type;
    notification.value = !notification.value;
    setTimeout(() => {
        notification.value = !notification.value
    }, 2000);
}


function schemaForm(resource = null, sendType, sendMethod) {
    method.value = sendMethod;
    type.value = sendType;
    modalIsOpen.value = !modalIsOpen.value;
    if (resource) {
        res.value = resource;
    }
}

</script>

