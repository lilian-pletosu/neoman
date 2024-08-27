<template>
    <admin-layout :current-route="initialRoute" title="Subcategories">
        <custom-notification :message="__(`success_${notifyType}`)" :show="notification" type="success"/>

        <div class="w-full grid grid-cols-1  gap-4">
            <div class="container-rounded ">

                <div class="mb-4 flex items-center justify-between">
                    <div>
                        <h3 class="primary-text">{{ __('subcategories') }}</h3>
                        <span class="secondary-text">This is a list of latest transactions</span>
                    </div>
                    <div class="flex-shrink-0">
                        <primary-button class="mx-2" @click="schemaForm(null, 'create', 'POST')">{{
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
                    <div class="overflow-x-auto rounded-lg">
                        <data-table
                            :columns="$page.props.columns"
                            :columnsOrder="$page.props.columnsOrder"
                            :initial-route="$page.props.initialRoute"
                            :resources="resources"
                            :search-route="$page.props.searchRoute"
                            @emit-click="args => schemaForm(args, 'modal', 'PUT')"/>
                    </div>
                </div>
                <div>
                    <h2 v-if="resources.data.length === 0" class="flex justify-center">{{
                            __('no_subcategories')
                        }}...</h2>
                </div>
                <schema-form-builder :columns="['name', 'slug']"
                                     :endpoint="initialRoute"
                                     :fields="$page.props.columnsOrder"
                                     :method="method"
                                     :modal-is-open="modalIsOpen"
                                     :resource="res"
                                     :resource-route="$page.props.resourceRoute"
                                     :resource-type="resourceType"
                                     :type="type"
                                     @close="schemaForm"
                                     @showNotify="showNotify"
                                     @close-modal="schemaForm"/>


            </div>

        </div>
    </admin-layout>
</template>

<script setup>
import AdminLayout from "@/Layouts/AdminLayout.vue";
import CustomNotification from "@/Components/CustomNotification.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import DataTable from "@/Components/DataTable.vue";
import SchemaFormBuilder from "@/Components/SchemaFormBuilder.vue";
import {ref} from "vue";


defineProps({
    initialRoute: {
        type: String,
    },
    resources: Object,
    resourceType: String
});
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
