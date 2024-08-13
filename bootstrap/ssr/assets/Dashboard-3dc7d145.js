import { getCurrentInstance, mergeProps, withCtx, unref, createVNode, createTextVNode, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { A as AdminLayout } from "./AdminLayout-ff29a823.js";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import "@inertiajs/vue3";
import "@heroicons/vue/20/solid/index.js";
import "./Dropdown-7075589d.js";
import "./ShortLogo-3a83a5f7.js";
import "ziggy-js";
import "./_plugin-vue_export-helper-cc2b3d55.js";
import "notiwind";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    "route": String
  },
  setup(__props) {
    const app = getCurrentInstance();
    Chart.register(...registerables);
    let testData = {
      labels: [app.appContext.config.globalProperties.__("pending"), app.appContext.config.globalProperties.__("confirmed"), app.appContext.config.globalProperties.__("shipped"), app.appContext.config.globalProperties.__("delivered"), app.appContext.config.globalProperties.__("canceled")],
      datasets: [
        {
          label: app.appContext.config.globalProperties.__("comenzi"),
          data: [app.appContext.config.globalProperties.$page.props.orders["pending"], app.appContext.config.globalProperties.$page.props.orders["confirmed"], app.appContext.config.globalProperties.$page.props.orders["shipped"], app.appContext.config.globalProperties.$page.props.orders["delivered"], app.appContext.config.globalProperties.$page.props.orders["canceled"]],
          backgroundColor: ["#77CEFF", "#0079AF", "#123E6B", "#97B0C4", "#A5C8ED"]
        }
      ]
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        "current-route": __props.route,
        title: "Dashboard"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4"${_scopeId}><div class="container-rounded"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(BarChart), { chartData: unref(testData) }, null, _parent2, _scopeId));
            _push2(`</div><div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><div${_scopeId}><h3 class="primary-text"${_scopeId}>Ultimele comenzi</h3><span class="secondary-text"${_scopeId}>This is a list of latest transactions</span></div><div class="flex-shrink-0"${_scopeId}><a href="#" class="text-link-blue"${_scopeId}>View all</a></div></div><div class="flex flex-col mt-8"${_scopeId}><div class="overflow-x-auto rounded-lg"${_scopeId}><div class="align-middle inline-block min-w-full"${_scopeId}><div class="shadow overflow-hidden sm:rounded-lg"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Transactions </th><th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Date &amp; Time </th><th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Amount </th></tr></thead><tbody class="bg-white"${_scopeId}><tr${_scopeId}><td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900"${_scopeId}> Payment from <span class="font-semibold"${_scopeId}>Bonnie Green</span></td><td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500"${_scopeId}> Apr 23 ,2021 </td><td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900"${_scopeId}> $2300 </td></tr><tr class="bg-gray-50"${_scopeId}><td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left"${_scopeId}> Payment refund to <span class="font-semibold"${_scopeId}>#00910</span></td><td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500"${_scopeId}> Apr 23 ,2021 </td><td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900"${_scopeId}> -$670 </td></tr><tr${_scopeId}><td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900"${_scopeId}> Payment failed from <span class="font-semibold"${_scopeId}>#087651</span></td><td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500"${_scopeId}> Apr 18 ,2021 </td><td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900"${_scopeId}> $234 </td></tr><tr class="bg-gray-50"${_scopeId}><td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left"${_scopeId}> Payment from <span class="font-semibold"${_scopeId}>Lana Byrd</span></td><td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500"${_scopeId}> Apr 15 ,2021 </td><td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900"${_scopeId}> $5000 </td></tr><tr${_scopeId}><td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900"${_scopeId}> Payment from <span class="font-semibold"${_scopeId}>Jese Leos</span></td><td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500"${_scopeId}> Apr 15 ,2021 </td><td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900"${_scopeId}> $2300 </td></tr><tr class="bg-gray-50"${_scopeId}><td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left"${_scopeId}> Payment from <span class="font-semibold"${_scopeId}>THEMESBERG LLC</span></td><td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500"${_scopeId}> Apr 11 ,2021 </td><td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900"${_scopeId}> $560 </td></tr><tr${_scopeId}><td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900"${_scopeId}> Payment from <span class="font-semibold"${_scopeId}>Lana Lysle</span></td><td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500"${_scopeId}> Apr 6 ,2021 </td><td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900"${_scopeId}> $1437 </td></tr></tbody></table></div></div></div></div></div></div><div class="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"${_scopeId}><div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><span class="big-text"${_scopeId}>2,340</span><h3 class="secondary-text"${_scopeId}>New products this week</h3></div><div class="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold"${_scopeId}> 14.6% <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"${_scopeId}></path></svg></div></div></div><div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900"${_scopeId}>5,355</span><h3 class="text-base font-normal text-gray-500"${_scopeId}>Visitors this week</h3></div><div class="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold"${_scopeId}> 32.9% <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"${_scopeId}></path></svg></div></div></div><div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900"${_scopeId}>385</span><h3 class="text-base font-normal text-gray-500"${_scopeId}>User signups this week</h3></div><div class="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold"${_scopeId}> -2.7% <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path fill-rule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"${_scopeId}></path></svg></div></div></div></div><div class="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4"${_scopeId}><div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h3 class="text-xl font-bold leading-none text-gray-900"${_scopeId}>Latest Customers</h3><a href="#" class="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2"${_scopeId}> View all </a></div><div class="flow-root"${_scopeId}><ul role="list" class="divide-y divide-gray-200"${_scopeId}><li class="py-3 sm:py-4"${_scopeId}><div class="flex items-center space-x-4"${_scopeId}><div class="flex-shrink-0"${_scopeId}><img class="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil image"${_scopeId}></div><div class="flex-1 min-w-0"${_scopeId}><p class="text-sm font-medium text-gray-900 truncate"${_scopeId}> Neil Sims </p><p class="text-sm text-gray-500 truncate"${_scopeId}><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="17727a767e7b57607e7973646372653974787a"${_scopeId}>[email protected]</a></p></div><div class="inline-flex items-center text-base font-semibold text-gray-900"${_scopeId}> $320 </div></div></li><li class="py-3 sm:py-4"${_scopeId}><div class="flex items-center space-x-4"${_scopeId}><div class="flex-shrink-0"${_scopeId}><img class="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/bonnie-green.png" alt="Neil image"${_scopeId}></div><div class="flex-1 min-w-0"${_scopeId}><p class="text-sm font-medium text-gray-900 truncate"${_scopeId}> Bonnie Green </p><p class="text-sm text-gray-500 truncate"${_scopeId}><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="d4b1b9b5bdb894a3bdbab0a7a0b1a6fab7bbb9"${_scopeId}>[email protected]</a></p></div><div class="inline-flex items-center text-base font-semibold text-gray-900"${_scopeId}> $3467 </div></div></li><li class="py-3 sm:py-4"${_scopeId}><div class="flex items-center space-x-4"${_scopeId}><div class="flex-shrink-0"${_scopeId}><img class="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/michael-gough.png" alt="Neil image"${_scopeId}></div><div class="flex-1 min-w-0"${_scopeId}><p class="text-sm font-medium text-gray-900 truncate"${_scopeId}> Michael Gough </p><p class="text-sm text-gray-500 truncate"${_scopeId}><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="57323a363e3b17203e3933242332257934383a"${_scopeId}>[email protected]</a></p></div><div class="inline-flex items-center text-base font-semibold text-gray-900"${_scopeId}> $67 </div></div></li><li class="py-3 sm:py-4"${_scopeId}><div class="flex items-center space-x-4"${_scopeId}><div class="flex-shrink-0"${_scopeId}><img class="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/thomas-lean.png" alt="Neil image"${_scopeId}></div><div class="flex-1 min-w-0"${_scopeId}><p class="text-sm font-medium text-gray-900 truncate"${_scopeId}> Thomes Lean </p><p class="text-sm text-gray-500 truncate"${_scopeId}><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="284d45494144685f41464c5b5c4d5a064b4745"${_scopeId}>[email protected]</a></p></div><div class="inline-flex items-center text-base font-semibold text-gray-900"${_scopeId}> $2367 </div></div></li><li class="pt-3 sm:pt-4 pb-0"${_scopeId}><div class="flex items-center space-x-4"${_scopeId}><div class="flex-shrink-0"${_scopeId}><img class="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/lana-byrd.png" alt="Neil image"${_scopeId}></div><div class="flex-1 min-w-0"${_scopeId}><p class="text-sm font-medium text-gray-900 truncate"${_scopeId}> Lana Byrd </p><p class="text-sm text-gray-500 truncate"${_scopeId}><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="a2c7cfc3cbcee2d5cbccc6d1d6c7d08cc1cdcf"${_scopeId}>[email protected]</a></p></div><div class="inline-flex items-center text-base font-semibold text-gray-900"${_scopeId}> $367 </div></div></li></ul></div></div><div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8"${_scopeId}><h3 class="text-xl leading-none font-bold text-gray-900 mb-10"${_scopeId}>Acquisition Overview</h3><div class="block w-full overflow-x-auto"${_scopeId}><table class="items-center w-full bg-transparent border-collapse"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th class="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap"${_scopeId}> Top Channels </th><th class="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap"${_scopeId}> Users </th><th class="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px"${_scopeId}></th></tr></thead><tbody class="divide-y divide-gray-100"${_scopeId}><tr class="text-gray-500"${_scopeId}><th class="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left"${_scopeId}> Organic Search </th><td class="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4"${_scopeId}> 5,649 </td><td class="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4"${_scopeId}><div class="flex items-center"${_scopeId}><span class="mr-2 text-xs font-medium"${_scopeId}>30%</span><div class="relative w-full"${_scopeId}><div class="w-full bg-gray-200 rounded-sm h-2"${_scopeId}><div class="bg-cyan-600 h-2 rounded-sm" style="${ssrRenderStyle({ "width": "30%" })}"${_scopeId}></div></div></div></div></td></tr><tr class="text-gray-500"${_scopeId}><th class="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left"${_scopeId}> Referral </th><td class="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4"${_scopeId}> 4,025 </td><td class="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4"${_scopeId}><div class="flex items-center"${_scopeId}><span class="mr-2 text-xs font-medium"${_scopeId}>24%</span><div class="relative w-full"${_scopeId}><div class="w-full bg-gray-200 rounded-sm h-2"${_scopeId}><div class="bg-orange-300 h-2 rounded-sm" style="${ssrRenderStyle({ "width": "24%" })}"${_scopeId}></div></div></div></div></td></tr><tr class="text-gray-500"${_scopeId}><th class="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left"${_scopeId}> Direct </th><td class="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4"${_scopeId}> 3,105 </td><td class="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4"${_scopeId}><div class="flex items-center"${_scopeId}><span class="mr-2 text-xs font-medium"${_scopeId}>18%</span><div class="relative w-full"${_scopeId}><div class="w-full bg-gray-200 rounded-sm h-2"${_scopeId}><div class="bg-teal-400 h-2 rounded-sm" style="${ssrRenderStyle({ "width": "18%" })}"${_scopeId}></div></div></div></div></td></tr><tr class="text-gray-500"${_scopeId}><th class="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left"${_scopeId}> Social </th><td class="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4"${_scopeId}> 1251 </td><td class="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4"${_scopeId}><div class="flex items-center"${_scopeId}><span class="mr-2 text-xs font-medium"${_scopeId}>12%</span><div class="relative w-full"${_scopeId}><div class="w-full bg-gray-200 rounded-sm h-2"${_scopeId}><div class="bg-pink-600 h-2 rounded-sm" style="${ssrRenderStyle({ "width": "12%" })}"${_scopeId}></div></div></div></div></td></tr><tr class="text-gray-500"${_scopeId}><th class="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left"${_scopeId}> Other </th><td class="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4"${_scopeId}> 734 </td><td class="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4"${_scopeId}><div class="flex items-center"${_scopeId}><span class="mr-2 text-xs font-medium"${_scopeId}>9%</span><div class="relative w-full"${_scopeId}><div class="w-full bg-gray-200 rounded-sm h-2"${_scopeId}><div class="bg-indigo-600 h-2 rounded-sm" style="${ssrRenderStyle({ "width": "9%" })}"${_scopeId}></div></div></div></div></td></tr><tr class="text-gray-500"${_scopeId}><th class="border-t-0 align-middle text-sm font-normal whitespace-nowrap p-4 pb-0 text-left"${_scopeId}> Email </th><td class="border-t-0 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4 pb-0"${_scopeId}> 456 </td><td class="border-t-0 align-middle text-xs whitespace-nowrap p-4 pb-0"${_scopeId}><div class="flex items-center"${_scopeId}><span class="mr-2 text-xs font-medium"${_scopeId}>7%</span><div class="relative w-full"${_scopeId}><div class="w-full bg-gray-200 rounded-sm h-2"${_scopeId}><div class="bg-purple-500 h-2 rounded-sm" style="${ssrRenderStyle({ "width": "7%" })}"${_scopeId}></div></div></div></div></td></tr></tbody></table></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4" }, [
                createVNode("div", { class: "container-rounded" }, [
                  createVNode(unref(BarChart), { chartData: unref(testData) }, null, 8, ["chartData"])
                ]),
                createVNode("div", { class: "bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8" }, [
                  createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h3", { class: "primary-text" }, "Ultimele comenzi"),
                      createVNode("span", { class: "secondary-text" }, "This is a list of latest transactions")
                    ]),
                    createVNode("div", { class: "flex-shrink-0" }, [
                      createVNode("a", {
                        href: "#",
                        class: "text-link-blue"
                      }, "View all")
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-col mt-8" }, [
                    createVNode("div", { class: "overflow-x-auto rounded-lg" }, [
                      createVNode("div", { class: "align-middle inline-block min-w-full" }, [
                        createVNode("div", { class: "shadow overflow-hidden sm:rounded-lg" }, [
                          createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                            createVNode("thead", { class: "bg-gray-50" }, [
                              createVNode("tr", null, [
                                createVNode("th", {
                                  scope: "col",
                                  class: "p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                }, " Transactions "),
                                createVNode("th", {
                                  scope: "col",
                                  class: "p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                }, " Date & Time "),
                                createVNode("th", {
                                  scope: "col",
                                  class: "p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                }, " Amount ")
                              ])
                            ]),
                            createVNode("tbody", { class: "bg-white" }, [
                              createVNode("tr", null, [
                                createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-normal text-gray-900" }, [
                                  createTextVNode(" Payment from "),
                                  createVNode("span", { class: "font-semibold" }, "Bonnie Green")
                                ]),
                                createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-normal text-gray-500" }, " Apr 23 ,2021 "),
                                createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-semibold text-gray-900" }, " $2300 ")
                              ]),
                              createVNode("tr", { class: "bg-gray-50" }, [
                                createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left" }, [
                                  createTextVNode(" Payment refund to "),
                                  createVNode("span", { class: "font-semibold" }, "#00910")
                                ]),
                                createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-normal text-gray-500" }, " Apr 23 ,2021 "),
                                createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-semibold text-gray-900" }, " -$670 ")
                              ]),
                              createVNode("tr", null, [
                                createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-normal text-gray-900" }, [
                                  createTextVNode(" Payment failed from "),
                                  createVNode("span", { class: "font-semibold" }, "#087651")
                                ]),
                                createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-normal text-gray-500" }, " Apr 18 ,2021 "),
                                createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-semibold text-gray-900" }, " $234 ")
                              ]),
                              createVNode("tr", { class: "bg-gray-50" }, [
                                createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left" }, [
                                  createTextVNode(" Payment from "),
                                  createVNode("span", { class: "font-semibold" }, "Lana Byrd")
                                ]),
                                createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-normal text-gray-500" }, " Apr 15 ,2021 "),
                                createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-semibold text-gray-900" }, " $5000 ")
                              ]),
                              createVNode("tr", null, [
                                createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-normal text-gray-900" }, [
                                  createTextVNode(" Payment from "),
                                  createVNode("span", { class: "font-semibold" }, "Jese Leos")
                                ]),
                                createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-normal text-gray-500" }, " Apr 15 ,2021 "),
                                createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-semibold text-gray-900" }, " $2300 ")
                              ]),
                              createVNode("tr", { class: "bg-gray-50" }, [
                                createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left" }, [
                                  createTextVNode(" Payment from "),
                                  createVNode("span", { class: "font-semibold" }, "THEMESBERG LLC")
                                ]),
                                createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-normal text-gray-500" }, " Apr 11 ,2021 "),
                                createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-semibold text-gray-900" }, " $560 ")
                              ]),
                              createVNode("tr", null, [
                                createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-normal text-gray-900" }, [
                                  createTextVNode(" Payment from "),
                                  createVNode("span", { class: "font-semibold" }, "Lana Lysle")
                                ]),
                                createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-normal text-gray-500" }, " Apr 6 ,2021 "),
                                createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-semibold text-gray-900" }, " $1437 ")
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" }, [
                createVNode("div", { class: "bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8" }, [
                  createVNode("div", { class: "flex items-center" }, [
                    createVNode("div", { class: "flex-shrink-0" }, [
                      createVNode("span", { class: "big-text" }, "2,340"),
                      createVNode("h3", { class: "secondary-text" }, "New products this week")
                    ]),
                    createVNode("div", { class: "ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold" }, [
                      createTextVNode(" 14.6% "),
                      (openBlock(), createBlock("svg", {
                        class: "w-5 h-5",
                        fill: "currentColor",
                        viewBox: "0 0 20 20",
                        xmlns: "http://www.w3.org/2000/svg"
                      }, [
                        createVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z",
                          "clip-rule": "evenodd"
                        })
                      ]))
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8" }, [
                  createVNode("div", { class: "flex items-center" }, [
                    createVNode("div", { class: "flex-shrink-0" }, [
                      createVNode("span", { class: "text-2xl sm:text-3xl leading-none font-bold text-gray-900" }, "5,355"),
                      createVNode("h3", { class: "text-base font-normal text-gray-500" }, "Visitors this week")
                    ]),
                    createVNode("div", { class: "ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold" }, [
                      createTextVNode(" 32.9% "),
                      (openBlock(), createBlock("svg", {
                        class: "w-5 h-5",
                        fill: "currentColor",
                        viewBox: "0 0 20 20",
                        xmlns: "http://www.w3.org/2000/svg"
                      }, [
                        createVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z",
                          "clip-rule": "evenodd"
                        })
                      ]))
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8" }, [
                  createVNode("div", { class: "flex items-center" }, [
                    createVNode("div", { class: "flex-shrink-0" }, [
                      createVNode("span", { class: "text-2xl sm:text-3xl leading-none font-bold text-gray-900" }, "385"),
                      createVNode("h3", { class: "text-base font-normal text-gray-500" }, "User signups this week")
                    ]),
                    createVNode("div", { class: "ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold" }, [
                      createTextVNode(" -2.7% "),
                      (openBlock(), createBlock("svg", {
                        class: "w-5 h-5",
                        fill: "currentColor",
                        viewBox: "0 0 20 20",
                        xmlns: "http://www.w3.org/2000/svg"
                      }, [
                        createVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z",
                          "clip-rule": "evenodd"
                        })
                      ]))
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4" }, [
                createVNode("div", { class: "bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                    createVNode("h3", { class: "text-xl font-bold leading-none text-gray-900" }, "Latest Customers"),
                    createVNode("a", {
                      href: "#",
                      class: "text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2"
                    }, " View all ")
                  ]),
                  createVNode("div", { class: "flow-root" }, [
                    createVNode("ul", {
                      role: "list",
                      class: "divide-y divide-gray-200"
                    }, [
                      createVNode("li", { class: "py-3 sm:py-4" }, [
                        createVNode("div", { class: "flex items-center space-x-4" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode("img", {
                              class: "h-8 w-8 rounded-full",
                              src: "https://demo.themesberg.com/windster/images/users/neil-sims.png",
                              alt: "Neil image"
                            })
                          ]),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("p", { class: "text-sm font-medium text-gray-900 truncate" }, " Neil Sims "),
                            createVNode("p", { class: "text-sm text-gray-500 truncate" }, [
                              createVNode("a", {
                                href: "/cdn-cgi/l/email-protection",
                                class: "__cf_email__",
                                "data-cfemail": "17727a767e7b57607e7973646372653974787a"
                              }, "[email protected]")
                            ])
                          ]),
                          createVNode("div", { class: "inline-flex items-center text-base font-semibold text-gray-900" }, " $320 ")
                        ])
                      ]),
                      createVNode("li", { class: "py-3 sm:py-4" }, [
                        createVNode("div", { class: "flex items-center space-x-4" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode("img", {
                              class: "h-8 w-8 rounded-full",
                              src: "https://demo.themesberg.com/windster/images/users/bonnie-green.png",
                              alt: "Neil image"
                            })
                          ]),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("p", { class: "text-sm font-medium text-gray-900 truncate" }, " Bonnie Green "),
                            createVNode("p", { class: "text-sm text-gray-500 truncate" }, [
                              createVNode("a", {
                                href: "/cdn-cgi/l/email-protection",
                                class: "__cf_email__",
                                "data-cfemail": "d4b1b9b5bdb894a3bdbab0a7a0b1a6fab7bbb9"
                              }, "[email protected]")
                            ])
                          ]),
                          createVNode("div", { class: "inline-flex items-center text-base font-semibold text-gray-900" }, " $3467 ")
                        ])
                      ]),
                      createVNode("li", { class: "py-3 sm:py-4" }, [
                        createVNode("div", { class: "flex items-center space-x-4" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode("img", {
                              class: "h-8 w-8 rounded-full",
                              src: "https://demo.themesberg.com/windster/images/users/michael-gough.png",
                              alt: "Neil image"
                            })
                          ]),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("p", { class: "text-sm font-medium text-gray-900 truncate" }, " Michael Gough "),
                            createVNode("p", { class: "text-sm text-gray-500 truncate" }, [
                              createVNode("a", {
                                href: "/cdn-cgi/l/email-protection",
                                class: "__cf_email__",
                                "data-cfemail": "57323a363e3b17203e3933242332257934383a"
                              }, "[email protected]")
                            ])
                          ]),
                          createVNode("div", { class: "inline-flex items-center text-base font-semibold text-gray-900" }, " $67 ")
                        ])
                      ]),
                      createVNode("li", { class: "py-3 sm:py-4" }, [
                        createVNode("div", { class: "flex items-center space-x-4" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode("img", {
                              class: "h-8 w-8 rounded-full",
                              src: "https://demo.themesberg.com/windster/images/users/thomas-lean.png",
                              alt: "Neil image"
                            })
                          ]),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("p", { class: "text-sm font-medium text-gray-900 truncate" }, " Thomes Lean "),
                            createVNode("p", { class: "text-sm text-gray-500 truncate" }, [
                              createVNode("a", {
                                href: "/cdn-cgi/l/email-protection",
                                class: "__cf_email__",
                                "data-cfemail": "284d45494144685f41464c5b5c4d5a064b4745"
                              }, "[email protected]")
                            ])
                          ]),
                          createVNode("div", { class: "inline-flex items-center text-base font-semibold text-gray-900" }, " $2367 ")
                        ])
                      ]),
                      createVNode("li", { class: "pt-3 sm:pt-4 pb-0" }, [
                        createVNode("div", { class: "flex items-center space-x-4" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode("img", {
                              class: "h-8 w-8 rounded-full",
                              src: "https://demo.themesberg.com/windster/images/users/lana-byrd.png",
                              alt: "Neil image"
                            })
                          ]),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("p", { class: "text-sm font-medium text-gray-900 truncate" }, " Lana Byrd "),
                            createVNode("p", { class: "text-sm text-gray-500 truncate" }, [
                              createVNode("a", {
                                href: "/cdn-cgi/l/email-protection",
                                class: "__cf_email__",
                                "data-cfemail": "a2c7cfc3cbcee2d5cbccc6d1d6c7d08cc1cdcf"
                              }, "[email protected]")
                            ])
                          ]),
                          createVNode("div", { class: "inline-flex items-center text-base font-semibold text-gray-900" }, " $367 ")
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8" }, [
                  createVNode("h3", { class: "text-xl leading-none font-bold text-gray-900 mb-10" }, "Acquisition Overview"),
                  createVNode("div", { class: "block w-full overflow-x-auto" }, [
                    createVNode("table", { class: "items-center w-full bg-transparent border-collapse" }, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap" }, " Top Channels "),
                          createVNode("th", { class: "px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap" }, " Users "),
                          createVNode("th", { class: "px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px" })
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-gray-100" }, [
                        createVNode("tr", { class: "text-gray-500" }, [
                          createVNode("th", { class: "border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left" }, " Organic Search "),
                          createVNode("td", { class: "border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4" }, " 5,649 "),
                          createVNode("td", { class: "border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4" }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("span", { class: "mr-2 text-xs font-medium" }, "30%"),
                              createVNode("div", { class: "relative w-full" }, [
                                createVNode("div", { class: "w-full bg-gray-200 rounded-sm h-2" }, [
                                  createVNode("div", {
                                    class: "bg-cyan-600 h-2 rounded-sm",
                                    style: { "width": "30%" }
                                  })
                                ])
                              ])
                            ])
                          ])
                        ]),
                        createVNode("tr", { class: "text-gray-500" }, [
                          createVNode("th", { class: "border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left" }, " Referral "),
                          createVNode("td", { class: "border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4" }, " 4,025 "),
                          createVNode("td", { class: "border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4" }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("span", { class: "mr-2 text-xs font-medium" }, "24%"),
                              createVNode("div", { class: "relative w-full" }, [
                                createVNode("div", { class: "w-full bg-gray-200 rounded-sm h-2" }, [
                                  createVNode("div", {
                                    class: "bg-orange-300 h-2 rounded-sm",
                                    style: { "width": "24%" }
                                  })
                                ])
                              ])
                            ])
                          ])
                        ]),
                        createVNode("tr", { class: "text-gray-500" }, [
                          createVNode("th", { class: "border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left" }, " Direct "),
                          createVNode("td", { class: "border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4" }, " 3,105 "),
                          createVNode("td", { class: "border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4" }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("span", { class: "mr-2 text-xs font-medium" }, "18%"),
                              createVNode("div", { class: "relative w-full" }, [
                                createVNode("div", { class: "w-full bg-gray-200 rounded-sm h-2" }, [
                                  createVNode("div", {
                                    class: "bg-teal-400 h-2 rounded-sm",
                                    style: { "width": "18%" }
                                  })
                                ])
                              ])
                            ])
                          ])
                        ]),
                        createVNode("tr", { class: "text-gray-500" }, [
                          createVNode("th", { class: "border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left" }, " Social "),
                          createVNode("td", { class: "border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4" }, " 1251 "),
                          createVNode("td", { class: "border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4" }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("span", { class: "mr-2 text-xs font-medium" }, "12%"),
                              createVNode("div", { class: "relative w-full" }, [
                                createVNode("div", { class: "w-full bg-gray-200 rounded-sm h-2" }, [
                                  createVNode("div", {
                                    class: "bg-pink-600 h-2 rounded-sm",
                                    style: { "width": "12%" }
                                  })
                                ])
                              ])
                            ])
                          ])
                        ]),
                        createVNode("tr", { class: "text-gray-500" }, [
                          createVNode("th", { class: "border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left" }, " Other "),
                          createVNode("td", { class: "border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4" }, " 734 "),
                          createVNode("td", { class: "border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4" }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("span", { class: "mr-2 text-xs font-medium" }, "9%"),
                              createVNode("div", { class: "relative w-full" }, [
                                createVNode("div", { class: "w-full bg-gray-200 rounded-sm h-2" }, [
                                  createVNode("div", {
                                    class: "bg-indigo-600 h-2 rounded-sm",
                                    style: { "width": "9%" }
                                  })
                                ])
                              ])
                            ])
                          ])
                        ]),
                        createVNode("tr", { class: "text-gray-500" }, [
                          createVNode("th", { class: "border-t-0 align-middle text-sm font-normal whitespace-nowrap p-4 pb-0 text-left" }, " Email "),
                          createVNode("td", { class: "border-t-0 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4 pb-0" }, " 456 "),
                          createVNode("td", { class: "border-t-0 align-middle text-xs whitespace-nowrap p-4 pb-0" }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("span", { class: "mr-2 text-xs font-medium" }, "7%"),
                              createVNode("div", { class: "relative w-full" }, [
                                createVNode("div", { class: "w-full bg-gray-200 rounded-sm h-2" }, [
                                  createVNode("div", {
                                    class: "bg-purple-500 h-2 rounded-sm",
                                    style: { "width": "7%" }
                                  })
                                ])
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
