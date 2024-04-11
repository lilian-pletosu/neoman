<template>
    <admin-layout :current-route="initialRoute" title="Orders">
        <div class="w-full grid grid-cols-1  gap-4">
            <div class="container-rounded ">

                <div class="mb-4 flex items-center justify-between">
                    <div>
                        <h3 class="primary-text">{{ __('orders') }}</h3>
                        <span class="secondary-text">{{ __('here_is_all_orders') }}</span>
                    </div>
                    <div class="flex-shrink-0">
                        <!--                        <a href="#" class="text-link-blue">View all</a>-->
                    </div>
                </div>
                <div class="flex flex-col mt-8">
                    <div class="overflow-x-auto rounded-lg">
                        <div class="flex flex-col mt-8">
                            <div class="overflow-x-auto rounded-lg">
                                <data-table
                                    @emit-click="order => modal(order)"
                                    :resources="resources"
                                    :columnsOrder="$page.props.columnsOrder"
                                    :columns="$page.props.columns"
                                    :initial-route="$page.props.initialRoute"
                                    :search-route="$page.props.searchRoute"/>
                            </div>
                        </div>
                        <div>
                            <h2 class="flex justify-center" v-if="resources.data.length === 0">{{
                                    __('no_orders')
                                }}...</h2>
                        </div>
                        <Modal :show="modalIsOpen" :actions="false" @close="modal" max-width="6xl"
                        >
                            <div class="grid grid-cols-1 p-4 pt-10 gap-4">
                                <div class="flex rounded items-center space-x-3">
                                    <p class="font-bold sm:text-xl font-mulish">{{ __('order_number') }}: {{
                                            orderLoad.order_number
                                        }}</p>
                                    <div v-if="!showSelectStatus"
                                         class="rounded py-0.5 px-2 text-center  shadow "
                                         :class="{
                                                                                                        'status-pending': orderLoad.status === 'pending',
                                                                                                        'status-confirmed': orderLoad.status === 'confirmed',
                                                                                                        'status-shipped': orderLoad.status === 'shipped',
                                                                                                        'status-delivered': orderLoad.status === 'delivered',
                                                                                                        'status-canceled': orderLoad.status === 'canceled',
                                                                                                     }">
                                        <p
                                            class="text-white flex gap-2 items-center"
                                            :class="{'text-white': orderLoad.status === 'canceled'}">
                                            {{ __(orderLoad.status) }}

                                        </p>
                                    </div>
                                    <div v-if="showSelectStatus">
                                        <select @change="event => updateOrderStatus(event.target.value)">
                                            <option :selected="orderLoad.status === 'pending'" value="pending">
                                                {{ __('pending') }}
                                            </option>
                                            <option :selected="orderLoad.status === 'confirmed'" value="confirmed">
                                                {{ __('confirmed') }}
                                            </option>
                                            <option :selected="orderLoad.status === 'shipped'" value="shipped">
                                                {{ __('shipped') }}
                                            </option>
                                            <option :selected="orderLoad.status === 'delivered'" value="delivered">
                                                {{ __('delivered') }}
                                            </option>
                                            <option :selected="orderLoad.status === 'canceled'" value="canceled">
                                                {{ __('canceled') }}
                                            </option>
                                        </select>
                                    </div>
                                    <pencil-square-icon class="w-6" @click="showSelectStatus = !showSelectStatus"/>
                                </div>
                                <div>
                                    <p class="text-sm text-slate-500">{{ __('date') }}:
                                        {{
                                            useDateFormat(orderLoad.created_at, "DD.MM.YYYY, HH:mm", {locales: 'rum'}).value
                                        }}</p>
                                </div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                                    <div>
                                        <span class="text-sm text-slate-500">{{ __('full_name') }}</span>
                                        <div class="p-1 border container-custom-rounded">
                                            <p>{{ orderLoad.full_name }}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <span class="text-sm text-slate-500">{{ __('phone') }}</span>
                                        <div class="p-1 border container-custom-rounded">
                                            <p>{{ orderLoad.phone }}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <span class="text-sm text-slate-500 ">{{ __('email') }}</span>
                                        <div class="p-1 border container-custom-rounded ">
                                            <p class="whitespace-wrap text-ellipsis">{{ orderLoad.email }}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <span class="text-sm text-slate-500">{{ __('city') }}</span>
                                        <div class="p-1 border container-custom-rounded">
                                            <p>{{ orderLoad.city }}</p>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-2">
                                        <span class="text-sm text-slate-500">{{ __('address') }}</span>
                                        <div class="p-1 border container-custom-rounded">
                                            <p>{{ orderLoad.address }}</p>
                                        </div>
                                    </div>
                                    <div v-if="orderLoad.message" class="sm:col-span-2">
                                        <span class="text-sm text-slate-500">{{ __('notices') }}</span>
                                        <div class="p-1 border container-custom-rounded">
                                            <p>{{ orderLoad.message }}</p>
                                        </div>
                                    </div>

                                </div>
                                <div>
                                    <span class="text-sm text-slate-500 font-mulish">{{ __('products') }}</span>
                                    <div class="bg-slate-50 container-custom-rounded border ">


                                        <div v-if="!loadProducts" class="overflow-x overflow-scroll">
                                            <table class="min-w-full table-auto ">
                                                <thead class="bg-gray-200 border-b">
                                                <tr>
                                                    <th scope="col"
                                                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        #
                                                    </th>
                                                    <th scope="col"
                                                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        {{ __('product') }}
                                                    </th>
                                                    <th scope="col"
                                                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        {{ __('qty') }}
                                                    </th>
                                                    <th scope="col"
                                                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        {{ __('unit_price') }}
                                                    </th>
                                                    <th scope="col"
                                                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        {{ __('color') }}
                                                    </th>
                                                    <th scope="col"
                                                        class=" text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        {{ __('brand') }}
                                                    </th>
                                                    <th scope="col"
                                                        class=" text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        {{ __('actions') }}
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr
                                                    v-for="(product, index) in orderLoad.products" :key="product"
                                                    class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {{ ++index }}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap">
                                                        {{ product.name ?? '---' }}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {{ product.qty ?? '---' }}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {{ product.price ?? '---' }}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {{ product.color_value ?? '---' }}
                                                    </td>
                                                    <td class=" text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {{ product.brand ?? '---' }}
                                                    </td>
                                                    <td class=" text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <trash-icon
                                                            @click="removeProductFromOrder(product.id, orderLoad)"
                                                            class="w-6"/>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <div class="grid grid-cols-6 border p-4">
                                                <div class="col-span-5  text-end">
                                                    <p class="text-lg font-semibold">{{ __('subtotal') }}:</p>
                                                    <p class="text-lg font-semibold">{{ __('shipping') }}:</p>
                                                    <p class="text-lg font-semibold">{{ __('total_price') }}:</p>
                                                </div>
                                                <div class="col-span-1  text-end">
                                                    <p class="text-lg font-semibold">{{ orderLoad.total_price }}
                                                        {{ __('lei') }}</p>
                                                    <p @click="showDeliveryPriceInput = !showDeliveryPriceInput"
                                                       v-show="!showDeliveryPriceInput"
                                                       class="text-lg font-semibold text-red-400 cursor-pointer">
                                                        {{ orderLoad.delivery_price ?? 0 }}
                                                        {{ __('lei') }}</p>
                                                    <div ref="target" class="flex justify-end space-x-2"
                                                         v-show="showDeliveryPriceInput">
                                                        <input v-model="orderLoad.delivery_price" type="number"
                                                               class="border rounded p-1 w-20"
                                                        >

                                                        <arrow-path-icon
                                                            @click="updateOrderDeliveryPrice(orderLoad.delivery_price)"
                                                            class="w-4 cursor-pointer"/>
                                                    </div>
                                                    <p class="text-lg font-semibold">
                                                        {{
                                                            parseFloat(orderLoad.total_price) + parseFloat(orderLoad.delivery_price ?? 0)
                                                        }}
                                                        {{ __('lei') }}</p>
                                                </div>

                                            </div>
                                        </div>

                                        <div class="flex justify-center w-full mx-auto p-4" v-if="loadProducts">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 20 20 "
                                                 fill="currentColor" class="w-5 h-5 animate-spin">
                                                <path fill-rule="evenodd"
                                                      d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                                                      clip-rule="evenodd"/>
                                            </svg>
                                            {{ __('processing') }}...

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Modal>
                    </div>
                </div>


            </div>

        </div>
    </admin-layout>
</template>

<script setup>
import {defineComponent, getCurrentInstance, ref} from 'vue'
import AdminLayout from "@/Layouts/AdminLayout.vue";
import {Link, router} from "@inertiajs/vue3";
import vSelect from 'vue-select'
import DataTable from "@/Components/DataTable.vue";
import axios from "axios";
import {onClickOutside, useDateFormat} from "@vueuse/core";
import Modal from "@/Components/Modal.vue";
import {ArrowPathIcon, PencilSquareIcon, TrashIcon} from "@heroicons/vue/16/solid/index.js";

const app = getCurrentInstance();


const props = defineProps({
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
defineComponent({
    name: "Products",

    components: {
        AdminLayout,
        Link,
        vSelect,
    },

    data() {
        return {
            data: Array
        }
    }

})

const notification = ref(false);
const type = ref('modal');
const method = ref('POST');
const notifyType = ref();
const modalIsOpen = ref(false);
const res = ref();
const loadProducts = ref(false);
const showSelectStatus = ref(false)
const showDeliveryPriceInput = ref(false);
const target = ref(null)


onClickOutside(target, () => {
    if (showDeliveryPriceInput.value) {
        showDeliveryPriceInput.value = false;
    }
})
const showNotify = (type) => {
    notifyType.value = type;
    notification.value = !notification.value;
    setTimeout(() => {
        notification.value = !notification.value
    }, 2000);
}
const orderLoad = ref({});


const fetchOrder = async (order) => {
    axios.get(route('api.fetchOrder', order.id)).then((res) => {
        orderLoad.value = res.data;
    }).finally(() => loadProducts.value = false)

};


const removeProductFromOrder = (productId, order) => {
    const data = {
        type: 'deleteProduct',
        product_id: productId
    }
    const confirmed = confirm(app.appContext.config.globalProperties.__('are_you_sure_delete'));
    if (confirmed) {
        const data = {
            type: 'deleteProduct',
            product_id: productId
        };
        if (orderLoad.value.products.length === 1) {
            updateOrder(data).finally(() => modal());
        } else {
            updateOrder(data);
        }
    }

}
const updateOrderDeliveryPrice = (delivery_price) => {
    const data = {
        type: 'updateDeliveryPrice',
        delivery_price: delivery_price
    }
    showDeliveryPriceInput.value = !showDeliveryPriceInput.value;
    updateOrder(data)
}
const updateOrderStatus = (new_status) => {
    const data = {
        type: 'updateStatus',
        status: new_status,
    }
    updateOrder(data).finally(() => showSelectStatus.value = !showSelectStatus.value)
}

const updateOrder = async (data) => {
    await router.visit(route(`${props.initialRoute}.update`, orderLoad.value.id), {
        method: 'put',
        data: data,
        preserveState: true,
        preserveScroll: true,
        onStart: () => loadProducts.value = true,
        onSuccess: () => fetchOrder(orderLoad.value),
    })
}


function modal(resource) {
    if (resource) {
        fetchOrder(resource)
    }
    modalIsOpen.value = !modalIsOpen.value;
}
</script>
