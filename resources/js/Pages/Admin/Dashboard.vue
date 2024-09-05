<script setup>


import AdminLayout from "@/Layouts/AdminLayout.vue";
import {BarChart} from 'vue-chart-3';
import {Chart, registerables} from "chart.js";
import {getCurrentInstance} from "vue";
import {useDateFormat} from "@vueuse/core";

const app = getCurrentInstance();

Chart.register(...registerables);

const props = defineProps({
    'route': String,
    'orders': Object,
    'latestConfimerdOrders': Object,
    'productImportedPercentage': Array,
    'totalProducts': Number,
    'totalOrders': Number,
});


let testData = {

    labels: [app.appContext.config.globalProperties.__('pending'), app.appContext.config.globalProperties.__('confirmed'), app.appContext.config.globalProperties.__('shipped'), app.appContext.config.globalProperties.__('delivered'), app.appContext.config.globalProperties.__('canceled')],
    datasets: [
        {
            label: app.appContext.config.globalProperties.__('comenzi'),
            data: [app.appContext.config.globalProperties.$page.props.orders['pending'], app.appContext.config.globalProperties.$page.props.orders['confirmed'], app.appContext.config.globalProperties.$page.props.orders['shipped'], app.appContext.config.globalProperties.$page.props.orders['delivered'], app.appContext.config.globalProperties.$page.props.orders['canceled']],
            backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
        },
    ],
};


</script>


<template>
    <admin-layout :current-route="route" title="Dashboard">
        <div class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">

            <div class="container-rounded">
                <h3 class="primary-text">{{ __('orders_statistics') }}</h3>

                <!--                -->

                <BarChart :chartData="testData"/>

                <!--                -->
            </div>
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div class=" flex items-center justify-between">
                    <div>
                        <h3 class="primary-text">Ultimele comenzi</h3>
                    </div>

                </div>
                <div class="flex flex-col mt-8">
                    <div class="overflow-x-auto rounded-lg">
                        <div class="align-middle inline-block min-w-full">
                            <div class="shadow overflow-hidden sm:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                    <tr>
                                        <th class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            scope="col">
                                            {{ __('transaction') }}
                                        </th>
                                        <th class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            scope="col">
                                            {{ __('date') }}
                                        </th>
                                        <th class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            scope="col">
                                            {{ __('price') }}
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody class="bg-white">
                                    <tr v-for="transaction in latestConfimerdOrders" :key="transaction.id">
                                        <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                            {{ __('payment_from') }} <span
                                            class="font-semibold">{{ transaction.full_name }}</span>
                                        </td>
                                        <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500 uppercase">
                                            {{
                                            useDateFormat(transaction.created_at, "dddd, D MMMM", {locales:
                                            'rum'}).value
                                            }}
                                        </td>
                                        <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                            {{ transaction.total_price }} {{ __('lei') }}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <span class="big-text">{{ productImportedPercentage.currentWeekCount }}</span>
                        <h3 class="secondary-text">Produse noi venite</h3>
                    </div>
                    <div :class="productImportedPercentage.percentageChange > 0 ? '' : 'text-red-500'"
                         class="ml-5 w-0 flex items-center justify-end flex-1  text-base font-bold">
                        {{ productImportedPercentage.percentageChange.toFixed(0) }}%
                        <svg v-if="productImportedPercentage.percentageChange > 0" class="w-5 h-5" fill="currentColor"
                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd"
                                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                                  fill-rule="evenodd"></path>
                        </svg>
                        <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd"
                                  d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                                  fill-rule="evenodd"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <span
                            class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{{ totalProducts }}</span>
                        <h3 class="text-base font-normal text-gray-500">{{ __('total_products') }}</h3>
                    </div>

                </div>
            </div>
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{{ totalOrders }}</span>
                        <h3 class="text-base font-normal text-gray-500">{{ __('total_orders') }}</h3>
                    </div>

                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
            <div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-bold leading-none text-gray-900">{{ __('latest_customers') }}</h3>

                </div>
                <div class="flow-root">
                    <ul class="divide-y divide-gray-200" role="list">
                        <li v-for="order in orders" :key="order.id" class="py-3 sm:py-4">
                            <div class="flex items-center space-x-4">
                                <div class="flex-shrink-0 flex items-center">
                                    <span
                                        class="h-8 w-8 p-2 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-600">{{
                                            order.full_name[0]
                                        }}</span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate">
                                        {{ order.full_name }}
                                    </p>
                                    <p class="text-sm text-gray-500 truncate">
                                        {{ order.email ?? '' }}
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                    {{ order.total_price }} {{ __('lei') }}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <h3 class="text-xl leading-none font-bold text-gray-900 mb-10">Acquisition Overview</h3>
                <div class="block w-full overflow-x-auto">
                    <table class="items-center w-full bg-transparent border-collapse">
                        <thead>
                        <tr>
                            <th class="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                                Top Channels
                            </th>
                            <th class="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                                Users
                            </th>
                            <th class="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px"></th>
                        </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                        <tr class="text-gray-500">
                            <th class="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                                Organic
                                Search
                            </th>
                            <td class="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                                5,649
                            </td>
                            <td class="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                <div class="flex items-center">
                                    <span class="mr-2 text-xs font-medium">30%</span>
                                    <div class="relative w-full">
                                        <div class="w-full bg-gray-200 rounded-sm h-2">
                                            <div class="bg-cyan-600 h-2 rounded-sm" style="width: 30%"></div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="text-gray-500">
                            <th class="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                                Referral
                            </th>
                            <td class="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                                4,025
                            </td>
                            <td class="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                <div class="flex items-center">
                                    <span class="mr-2 text-xs font-medium">24%</span>
                                    <div class="relative w-full">
                                        <div class="w-full bg-gray-200 rounded-sm h-2">
                                            <div class="bg-orange-300 h-2 rounded-sm" style="width: 24%"></div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="text-gray-500">
                            <th class="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                                Direct
                            </th>
                            <td class="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                                3,105
                            </td>
                            <td class="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                <div class="flex items-center">
                                    <span class="mr-2 text-xs font-medium">18%</span>
                                    <div class="relative w-full">
                                        <div class="w-full bg-gray-200 rounded-sm h-2">
                                            <div class="bg-teal-400 h-2 rounded-sm" style="width: 18%"></div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="text-gray-500">
                            <th class="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                                Social
                            </th>
                            <td class="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                                1251
                            </td>
                            <td class="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                <div class="flex items-center">
                                    <span class="mr-2 text-xs font-medium">12%</span>
                                    <div class="relative w-full">
                                        <div class="w-full bg-gray-200 rounded-sm h-2">
                                            <div class="bg-pink-600 h-2 rounded-sm" style="width: 12%"></div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="text-gray-500">
                            <th class="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                                Other
                            </th>
                            <td class="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                                734
                            </td>
                            <td class="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                <div class="flex items-center">
                                    <span class="mr-2 text-xs font-medium">9%</span>
                                    <div class="relative w-full">
                                        <div class="w-full bg-gray-200 rounded-sm h-2">
                                            <div class="bg-indigo-600 h-2 rounded-sm" style="width: 9%"></div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="text-gray-500">
                            <th class="border-t-0 align-middle text-sm font-normal whitespace-nowrap p-4 pb-0 text-left">
                                Email
                            </th>
                            <td class="border-t-0 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4 pb-0">
                                456
                            </td>
                            <td class="border-t-0 align-middle text-xs whitespace-nowrap p-4 pb-0">
                                <div class="flex items-center">
                                    <span class="mr-2 text-xs font-medium">7%</span>
                                    <div class="relative w-full">
                                        <div class="w-full bg-gray-200 rounded-sm h-2">
                                            <div class="bg-purple-500 h-2 rounded-sm" style="width: 7%"></div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </admin-layout>
</template>
