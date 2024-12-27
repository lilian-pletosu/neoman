<script setup>
import AdminLayout from "@/Layouts/AdminLayout.vue";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { getCurrentInstance } from "vue";
import { useDateFormat } from "@vueuse/core";
import { usePage } from "@inertiajs/vue3";

const app = getCurrentInstance();
const page = usePage();

Chart.register(...registerables);

const props = defineProps({
    route: String,
    orders: Object,
    latestConfirmedOrders: Object,
    importedProductsLastWeek: Number,
    totalProducts: Number,
    totalOrders: Number,
});

let testData = {
    labels: [
        app.appContext.config.globalProperties.__("pending"),
        app.appContext.config.globalProperties.__("confirmed"),
        app.appContext.config.globalProperties.__("shipped"),
        app.appContext.config.globalProperties.__("delivered"),
        app.appContext.config.globalProperties.__("canceled"),
    ],
    datasets: [
        {
            label: app.appContext.config.globalProperties.__("comenzi"),
            data: [
                page.props.ordersBar["pending"],
                page.props.ordersBar["confirmed"],
                page.props.ordersBar["shipped"],
                page.props.ordersBar["delivered"],
                page.props.ordersBar["canceled"],
            ],
            backgroundColor: [
                "#77CEFF",
                "#0079AF",
                "#123E6B",
                "#97B0C4",
                "#A5C8ED",
            ],
        },
    ],
};
</script>

<template>
    <admin-layout :current-route="route" title="Dashboard">
        <div
            class="grid w-full grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3"
        >
            <div class="container-rounded">
                <h3 class="primary-text">{{ __("orders_statistics") }}</h3>

                <!--                -->

                <BarChart :chartData="testData" />

                <!--                -->
            </div>
            <div class="p-4 bg-white rounded-lg shadow sm:p-6 xl:p-8">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="primary-text">
                            {{ __("latest_confirmed_orders") }}
                        </h3>
                    </div>
                </div>
                <div class="flex flex-col mt-8">
                    <div class="overflow-x-auto rounded-lg">
                        <div class="inline-block min-w-full align-middle">
                            <div class="overflow-hidden shadow sm:rounded-lg">
                                <table
                                    v-if="latestConfirmedOrders.length > 0"
                                    class="min-w-full divide-y divide-gray-200"
                                >
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th
                                                class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                                scope="col"
                                            >
                                                {{ __("transaction") }}
                                            </th>
                                            <th
                                                class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                                scope="col"
                                            >
                                                {{ __("date") }}
                                            </th>
                                            <th
                                                class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                                scope="col"
                                            >
                                                {{ __("price") }}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white">
                                        <tr
                                            v-for="transaction in latestConfirmedOrders"
                                            :key="transaction.id"
                                        >
                                            <td
                                                class="p-4 text-sm font-normal text-gray-900 whitespace-nowrap"
                                            >
                                                {{ __("payment_from") }}
                                                <span class="font-semibold">{{
                                                    transaction?.full_name ??
                                                    "N/A"
                                                }}</span>
                                            </td>
                                            <td
                                                class="p-4 text-sm font-normal text-gray-500 uppercase whitespace-nowrap"
                                            >
                                                {{
                                                    useDateFormat(
                                                        transaction.created_at,
                                                        "dddd, D MMMM",
                                                        { locales: "rum" }
                                                    ).value
                                                }}
                                            </td>
                                            <td
                                                class="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap"
                                            >
                                                {{ transaction.total_price }}
                                                {{ __("lei") }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div
                                    v-else
                                    class="p-4 text-center text-gray-500"
                                >
                                    <p>{{ __("no_orders") }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="grid w-full grid-cols-1 gap-4 mt-4 md:grid-cols-2 xl:grid-cols-3"
        >
            <div class="p-4 bg-white rounded-lg shadow sm:p-6 xl:p-8">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <span class="big-text">{{
                            importedProductsLastWeek
                        }}</span>
                        <h3 class="secondary-text">
                            {{ __("total_products_imported_in_current_week") }}
                        </h3>
                    </div>
                </div>
            </div>
            <div class="p-4 bg-white rounded-lg shadow sm:p-6 xl:p-8">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <span
                            class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl"
                            >{{ totalProducts }}</span
                        >
                        <h3 class="text-base font-normal text-gray-500">
                            {{ __("total_products") }}
                        </h3>
                    </div>
                </div>
            </div>
            <div class="p-4 bg-white rounded-lg shadow sm:p-6 xl:p-8">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <span
                            class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl"
                            >{{ totalOrders }}</span
                        >
                        <h3 class="text-base font-normal text-gray-500">
                            {{ __("total_orders") }}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 my-4 2xl:grid-cols-2 xl:gap-4">
            <div class="h-full p-4 mb-4 bg-white rounded-lg shadow sm:p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-bold leading-none text-gray-900">
                        {{ __("latest_customers") }}
                    </h3>
                </div>
                <div class="flow-root">
                    <ul
                        v-if="orders.length > 0"
                        class="divide-y divide-gray-200"
                        role="list"
                    >
                        <li
                            v-for="order in orders"
                            :key="order.id"
                            class="py-3 sm:py-4"
                        >
                            <div class="flex items-center space-x-4">
                                <div class="flex items-center flex-shrink-0">
                                    <span
                                        class="flex items-center justify-center w-8 h-8 p-2 font-semibold rounded-full bg-slate-200 text-slate-600"
                                        >{{
                                            order?.full_name[0] ?? "N/A"
                                        }}</span
                                    >
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p
                                        class="text-sm font-medium text-gray-900 truncate"
                                    >
                                        {{ order?.full_name ?? "N/A" }}
                                    </p>
                                    <p class="text-sm text-gray-500 truncate">
                                        {{ order.email ?? "" }}
                                    </p>
                                </div>
                                <div
                                    class="inline-flex items-center text-base font-semibold text-gray-900"
                                >
                                    {{ order.total_price }} {{ __("lei") }}
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div v-else class="py-3 text-center">
                        <p class="text-gray-500">{{ __("no_customers") }}</p>
                    </div>
                </div>
            </div>
            <div class="p-4 bg-white rounded-lg shadow sm:p-6 xl:p-8">
                <h3 class="mb-10 text-xl font-bold leading-none text-gray-900">
                    Acquisition Overview
                </h3>
                <div class="block w-full overflow-x-auto">
                    <table
                        class="items-center w-full bg-transparent border-collapse"
                    >
                        <thead>
                            <tr>
                                <th
                                    class="px-4 py-3 text-xs font-semibold text-left text-gray-700 uppercase align-middle border-l-0 border-r-0 bg-gray-50 whitespace-nowrap"
                                >
                                    Top Channels
                                </th>
                                <th
                                    class="px-4 py-3 text-xs font-semibold text-left text-gray-700 uppercase align-middle border-l-0 border-r-0 bg-gray-50 whitespace-nowrap"
                                >
                                    Users
                                </th>
                                <th
                                    class="px-4 py-3 text-xs font-semibold text-left text-gray-700 uppercase align-middle border-l-0 border-r-0 bg-gray-50 whitespace-nowrap min-w-140-px"
                                ></th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr class="text-gray-500">
                                <th
                                    class="p-4 px-4 text-sm font-normal text-left align-middle border-t-0 whitespace-nowrap"
                                >
                                    Organic Search
                                </th>
                                <td
                                    class="p-4 px-4 text-xs font-medium text-gray-900 align-middle border-t-0 whitespace-nowrap"
                                >
                                    5,649
                                </td>
                                <td
                                    class="p-4 px-4 text-xs align-middle border-t-0 whitespace-nowrap"
                                >
                                    <div class="flex items-center">
                                        <span class="mr-2 text-xs font-medium"
                                            >30%</span
                                        >
                                        <div class="relative w-full">
                                            <div
                                                class="w-full h-2 bg-gray-200 rounded-sm"
                                            >
                                                <div
                                                    class="h-2 rounded-sm bg-cyan-600"
                                                    style="width: 30%"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr class="text-gray-500">
                                <th
                                    class="p-4 px-4 text-sm font-normal text-left align-middle border-t-0 whitespace-nowrap"
                                >
                                    Referral
                                </th>
                                <td
                                    class="p-4 px-4 text-xs font-medium text-gray-900 align-middle border-t-0 whitespace-nowrap"
                                >
                                    4,025
                                </td>
                                <td
                                    class="p-4 px-4 text-xs align-middle border-t-0 whitespace-nowrap"
                                >
                                    <div class="flex items-center">
                                        <span class="mr-2 text-xs font-medium"
                                            >24%</span
                                        >
                                        <div class="relative w-full">
                                            <div
                                                class="w-full h-2 bg-gray-200 rounded-sm"
                                            >
                                                <div
                                                    class="h-2 bg-orange-300 rounded-sm"
                                                    style="width: 24%"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr class="text-gray-500">
                                <th
                                    class="p-4 px-4 text-sm font-normal text-left align-middle border-t-0 whitespace-nowrap"
                                >
                                    Direct
                                </th>
                                <td
                                    class="p-4 px-4 text-xs font-medium text-gray-900 align-middle border-t-0 whitespace-nowrap"
                                >
                                    3,105
                                </td>
                                <td
                                    class="p-4 px-4 text-xs align-middle border-t-0 whitespace-nowrap"
                                >
                                    <div class="flex items-center">
                                        <span class="mr-2 text-xs font-medium"
                                            >18%</span
                                        >
                                        <div class="relative w-full">
                                            <div
                                                class="w-full h-2 bg-gray-200 rounded-sm"
                                            >
                                                <div
                                                    class="h-2 bg-teal-400 rounded-sm"
                                                    style="width: 18%"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr class="text-gray-500">
                                <th
                                    class="p-4 px-4 text-sm font-normal text-left align-middle border-t-0 whitespace-nowrap"
                                >
                                    Social
                                </th>
                                <td
                                    class="p-4 px-4 text-xs font-medium text-gray-900 align-middle border-t-0 whitespace-nowrap"
                                >
                                    1251
                                </td>
                                <td
                                    class="p-4 px-4 text-xs align-middle border-t-0 whitespace-nowrap"
                                >
                                    <div class="flex items-center">
                                        <span class="mr-2 text-xs font-medium"
                                            >12%</span
                                        >
                                        <div class="relative w-full">
                                            <div
                                                class="w-full h-2 bg-gray-200 rounded-sm"
                                            >
                                                <div
                                                    class="h-2 bg-pink-600 rounded-sm"
                                                    style="width: 12%"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr class="text-gray-500">
                                <th
                                    class="p-4 px-4 text-sm font-normal text-left align-middle border-t-0 whitespace-nowrap"
                                >
                                    Other
                                </th>
                                <td
                                    class="p-4 px-4 text-xs font-medium text-gray-900 align-middle border-t-0 whitespace-nowrap"
                                >
                                    734
                                </td>
                                <td
                                    class="p-4 px-4 text-xs align-middle border-t-0 whitespace-nowrap"
                                >
                                    <div class="flex items-center">
                                        <span class="mr-2 text-xs font-medium"
                                            >9%</span
                                        >
                                        <div class="relative w-full">
                                            <div
                                                class="w-full h-2 bg-gray-200 rounded-sm"
                                            >
                                                <div
                                                    class="h-2 bg-indigo-600 rounded-sm"
                                                    style="width: 9%"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr class="text-gray-500">
                                <th
                                    class="p-4 pb-0 text-sm font-normal text-left align-middle border-t-0 whitespace-nowrap"
                                >
                                    Email
                                </th>
                                <td
                                    class="p-4 pb-0 text-xs font-medium text-gray-900 align-middle border-t-0 whitespace-nowrap"
                                >
                                    456
                                </td>
                                <td
                                    class="p-4 pb-0 text-xs align-middle border-t-0 whitespace-nowrap"
                                >
                                    <div class="flex items-center">
                                        <span class="mr-2 text-xs font-medium"
                                            >7%</span
                                        >
                                        <div class="relative w-full">
                                            <div
                                                class="w-full h-2 bg-gray-200 rounded-sm"
                                            >
                                                <div
                                                    class="h-2 bg-purple-500 rounded-sm"
                                                    style="width: 7%"
                                                ></div>
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
