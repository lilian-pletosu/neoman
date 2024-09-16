import { getCurrentInstance, mergeProps, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AdminLayout-d40237f3.js";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { useDateFormat } from "@vueuse/core";
import "@inertiajs/vue3";
import "@heroicons/vue/20/solid/index.js";
import "./Dropdown-7075589d.js";
import "./ShortLogo-3a83a5f7.js";
import "ziggy-js";
import "./_plugin-vue_export-helper-cc2b3d55.js";
import "@heroicons/vue/24/outline/index.js";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    "route": String,
    "orders": Object,
    "latestConfimerdOrders": Object,
    "productImportedPercentage": Array,
    "totalProducts": Number,
    "totalOrders": Number
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
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        "current-route": __props.route,
        title: "Dashboard"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4"${_scopeId}><div class="container-rounded"${_scopeId}><h3 class="primary-text"${_scopeId}>${ssrInterpolate(_ctx.__("orders_statistics"))}</h3>`);
            _push2(ssrRenderComponent(unref(BarChart), { chartData: unref(testData) }, null, _parent2, _scopeId));
            _push2(`</div><div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h3 class="primary-text"${_scopeId}>Ultimele comenzi</h3></div></div><div class="flex flex-col mt-8"${_scopeId}><div class="overflow-x-auto rounded-lg"${_scopeId}><div class="align-middle inline-block min-w-full"${_scopeId}><div class="shadow overflow-hidden sm:rounded-lg"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col"${_scopeId}>${ssrInterpolate(_ctx.__("transaction"))}</th><th class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col"${_scopeId}>${ssrInterpolate(_ctx.__("date"))}</th><th class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col"${_scopeId}>${ssrInterpolate(_ctx.__("price"))}</th></tr></thead><tbody class="bg-white"${_scopeId}><!--[-->`);
            ssrRenderList(__props.latestConfimerdOrders, (transaction) => {
              _push2(`<tr${_scopeId}><td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.__("payment_from"))} <span class="font-semibold"${_scopeId}>${ssrInterpolate(transaction.full_name)}</span></td><td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500 uppercase"${_scopeId}>${ssrInterpolate(unref(useDateFormat)(transaction.created_at, "dddd, D MMMM", { locales: "rum" }).value)}</td><td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(transaction.total_price)} ${ssrInterpolate(_ctx.__("lei"))}</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div></div></div></div><div class="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"${_scopeId}><div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><span class="big-text"${_scopeId}>${ssrInterpolate(__props.productImportedPercentage.currentWeekCount)}</span><h3 class="secondary-text"${_scopeId}>Produse noi venite</h3></div><div class="${ssrRenderClass([__props.productImportedPercentage.percentageChange > 0 ? "" : "text-red-500", "ml-5 w-0 flex items-center justify-end flex-1 text-base font-bold"])}"${_scopeId}>${ssrInterpolate(__props.productImportedPercentage.percentageChange.toFixed(0))}% `);
            if (__props.productImportedPercentage.percentageChange > 0) {
              _push2(`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path clip-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" fill-rule="evenodd"${_scopeId}></path></svg>`);
            } else {
              _push2(`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path clip-rule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" fill-rule="evenodd"${_scopeId}></path></svg>`);
            }
            _push2(`</div></div></div><div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900"${_scopeId}>${ssrInterpolate(__props.totalProducts)}</span><h3 class="text-base font-normal text-gray-500"${_scopeId}>${ssrInterpolate(_ctx.__("total_products"))}</h3></div></div></div><div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900"${_scopeId}>${ssrInterpolate(__props.totalOrders)}</span><h3 class="text-base font-normal text-gray-500"${_scopeId}>${ssrInterpolate(_ctx.__("total_orders"))}</h3></div></div></div></div><div class="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4"${_scopeId}><div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h3 class="text-xl font-bold leading-none text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.__("latest_customers"))}</h3></div><div class="flow-root"${_scopeId}><ul class="divide-y divide-gray-200" role="list"${_scopeId}><!--[-->`);
            ssrRenderList(__props.orders, (order) => {
              _push2(`<li class="py-3 sm:py-4"${_scopeId}><div class="flex items-center space-x-4"${_scopeId}><div class="flex-shrink-0 flex items-center"${_scopeId}><span class="h-8 w-8 p-2 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-600"${_scopeId}>${ssrInterpolate(order.full_name[0])}</span></div><div class="flex-1 min-w-0"${_scopeId}><p class="text-sm font-medium text-gray-900 truncate"${_scopeId}>${ssrInterpolate(order.full_name)}</p><p class="text-sm text-gray-500 truncate"${_scopeId}>${ssrInterpolate(order.email ?? "")}</p></div><div class="inline-flex items-center text-base font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(order.total_price)} ${ssrInterpolate(_ctx.__("lei"))}</div></div></li>`);
            });
            _push2(`<!--]--></ul></div></div><div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8"${_scopeId}><h3 class="text-xl leading-none font-bold text-gray-900 mb-10"${_scopeId}>Acquisition Overview</h3><div class="block w-full overflow-x-auto"${_scopeId}><table class="items-center w-full bg-transparent border-collapse"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th class="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap"${_scopeId}> Top Channels </th><th class="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap"${_scopeId}> Users </th><th class="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px"${_scopeId}></th></tr></thead><tbody class="divide-y divide-gray-100"${_scopeId}><tr class="text-gray-500"${_scopeId}><th class="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left"${_scopeId}> Organic Search </th><td class="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4"${_scopeId}> 5,649 </td><td class="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4"${_scopeId}><div class="flex items-center"${_scopeId}><span class="mr-2 text-xs font-medium"${_scopeId}>30%</span><div class="relative w-full"${_scopeId}><div class="w-full bg-gray-200 rounded-sm h-2"${_scopeId}><div class="bg-cyan-600 h-2 rounded-sm" style="${ssrRenderStyle({ "width": "30%" })}"${_scopeId}></div></div></div></div></td></tr><tr class="text-gray-500"${_scopeId}><th class="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left"${_scopeId}> Referral </th><td class="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4"${_scopeId}> 4,025 </td><td class="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4"${_scopeId}><div class="flex items-center"${_scopeId}><span class="mr-2 text-xs font-medium"${_scopeId}>24%</span><div class="relative w-full"${_scopeId}><div class="w-full bg-gray-200 rounded-sm h-2"${_scopeId}><div class="bg-orange-300 h-2 rounded-sm" style="${ssrRenderStyle({ "width": "24%" })}"${_scopeId}></div></div></div></div></td></tr><tr class="text-gray-500"${_scopeId}><th class="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left"${_scopeId}> Direct </th><td class="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4"${_scopeId}> 3,105 </td><td class="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4"${_scopeId}><div class="flex items-center"${_scopeId}><span class="mr-2 text-xs font-medium"${_scopeId}>18%</span><div class="relative w-full"${_scopeId}><div class="w-full bg-gray-200 rounded-sm h-2"${_scopeId}><div class="bg-teal-400 h-2 rounded-sm" style="${ssrRenderStyle({ "width": "18%" })}"${_scopeId}></div></div></div></div></td></tr><tr class="text-gray-500"${_scopeId}><th class="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left"${_scopeId}> Social </th><td class="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4"${_scopeId}> 1251 </td><td class="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4"${_scopeId}><div class="flex items-center"${_scopeId}><span class="mr-2 text-xs font-medium"${_scopeId}>12%</span><div class="relative w-full"${_scopeId}><div class="w-full bg-gray-200 rounded-sm h-2"${_scopeId}><div class="bg-pink-600 h-2 rounded-sm" style="${ssrRenderStyle({ "width": "12%" })}"${_scopeId}></div></div></div></div></td></tr><tr class="text-gray-500"${_scopeId}><th class="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left"${_scopeId}> Other </th><td class="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4"${_scopeId}> 734 </td><td class="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4"${_scopeId}><div class="flex items-center"${_scopeId}><span class="mr-2 text-xs font-medium"${_scopeId}>9%</span><div class="relative w-full"${_scopeId}><div class="w-full bg-gray-200 rounded-sm h-2"${_scopeId}><div class="bg-indigo-600 h-2 rounded-sm" style="${ssrRenderStyle({ "width": "9%" })}"${_scopeId}></div></div></div></div></td></tr><tr class="text-gray-500"${_scopeId}><th class="border-t-0 align-middle text-sm font-normal whitespace-nowrap p-4 pb-0 text-left"${_scopeId}> Email </th><td class="border-t-0 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4 pb-0"${_scopeId}> 456 </td><td class="border-t-0 align-middle text-xs whitespace-nowrap p-4 pb-0"${_scopeId}><div class="flex items-center"${_scopeId}><span class="mr-2 text-xs font-medium"${_scopeId}>7%</span><div class="relative w-full"${_scopeId}><div class="w-full bg-gray-200 rounded-sm h-2"${_scopeId}><div class="bg-purple-500 h-2 rounded-sm" style="${ssrRenderStyle({ "width": "7%" })}"${_scopeId}></div></div></div></div></td></tr></tbody></table></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4" }, [
                createVNode("div", { class: "container-rounded" }, [
                  createVNode("h3", { class: "primary-text" }, toDisplayString(_ctx.__("orders_statistics")), 1),
                  createVNode(unref(BarChart), { chartData: unref(testData) }, null, 8, ["chartData"])
                ]),
                createVNode("div", { class: "bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h3", { class: "primary-text" }, "Ultimele comenzi")
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
                                  class: "p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                  scope: "col"
                                }, toDisplayString(_ctx.__("transaction")), 1),
                                createVNode("th", {
                                  class: "p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                  scope: "col"
                                }, toDisplayString(_ctx.__("date")), 1),
                                createVNode("th", {
                                  class: "p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                  scope: "col"
                                }, toDisplayString(_ctx.__("price")), 1)
                              ])
                            ]),
                            createVNode("tbody", { class: "bg-white" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.latestConfimerdOrders, (transaction) => {
                                return openBlock(), createBlock("tr", {
                                  key: transaction.id
                                }, [
                                  createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-normal text-gray-900" }, [
                                    createTextVNode(toDisplayString(_ctx.__("payment_from")) + " ", 1),
                                    createVNode("span", { class: "font-semibold" }, toDisplayString(transaction.full_name), 1)
                                  ]),
                                  createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-normal text-gray-500 uppercase" }, toDisplayString(unref(useDateFormat)(transaction.created_at, "dddd, D MMMM", { locales: "rum" }).value), 1),
                                  createVNode("td", { class: "p-4 whitespace-nowrap text-sm font-semibold text-gray-900" }, toDisplayString(transaction.total_price) + " " + toDisplayString(_ctx.__("lei")), 1)
                                ]);
                              }), 128))
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
                      createVNode("span", { class: "big-text" }, toDisplayString(__props.productImportedPercentage.currentWeekCount), 1),
                      createVNode("h3", { class: "secondary-text" }, "Produse noi venite")
                    ]),
                    createVNode("div", {
                      class: [__props.productImportedPercentage.percentageChange > 0 ? "" : "text-red-500", "ml-5 w-0 flex items-center justify-end flex-1 text-base font-bold"]
                    }, [
                      createTextVNode(toDisplayString(__props.productImportedPercentage.percentageChange.toFixed(0)) + "% ", 1),
                      __props.productImportedPercentage.percentageChange > 0 ? (openBlock(), createBlock("svg", {
                        key: 0,
                        class: "w-5 h-5",
                        fill: "currentColor",
                        viewBox: "0 0 20 20",
                        xmlns: "http://www.w3.org/2000/svg"
                      }, [
                        createVNode("path", {
                          "clip-rule": "evenodd",
                          d: "M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z",
                          "fill-rule": "evenodd"
                        })
                      ])) : (openBlock(), createBlock("svg", {
                        key: 1,
                        class: "w-5 h-5",
                        fill: "currentColor",
                        viewBox: "0 0 20 20",
                        xmlns: "http://www.w3.org/2000/svg"
                      }, [
                        createVNode("path", {
                          "clip-rule": "evenodd",
                          d: "M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z",
                          "fill-rule": "evenodd"
                        })
                      ]))
                    ], 2)
                  ])
                ]),
                createVNode("div", { class: "bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8" }, [
                  createVNode("div", { class: "flex items-center" }, [
                    createVNode("div", { class: "flex-shrink-0" }, [
                      createVNode("span", { class: "text-2xl sm:text-3xl leading-none font-bold text-gray-900" }, toDisplayString(__props.totalProducts), 1),
                      createVNode("h3", { class: "text-base font-normal text-gray-500" }, toDisplayString(_ctx.__("total_products")), 1)
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8" }, [
                  createVNode("div", { class: "flex items-center" }, [
                    createVNode("div", { class: "flex-shrink-0" }, [
                      createVNode("span", { class: "text-2xl sm:text-3xl leading-none font-bold text-gray-900" }, toDisplayString(__props.totalOrders), 1),
                      createVNode("h3", { class: "text-base font-normal text-gray-500" }, toDisplayString(_ctx.__("total_orders")), 1)
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4" }, [
                createVNode("div", { class: "bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                    createVNode("h3", { class: "text-xl font-bold leading-none text-gray-900" }, toDisplayString(_ctx.__("latest_customers")), 1)
                  ]),
                  createVNode("div", { class: "flow-root" }, [
                    createVNode("ul", {
                      class: "divide-y divide-gray-200",
                      role: "list"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.orders, (order) => {
                        return openBlock(), createBlock("li", {
                          key: order.id,
                          class: "py-3 sm:py-4"
                        }, [
                          createVNode("div", { class: "flex items-center space-x-4" }, [
                            createVNode("div", { class: "flex-shrink-0 flex items-center" }, [
                              createVNode("span", { class: "h-8 w-8 p-2 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-600" }, toDisplayString(order.full_name[0]), 1)
                            ]),
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("p", { class: "text-sm font-medium text-gray-900 truncate" }, toDisplayString(order.full_name), 1),
                              createVNode("p", { class: "text-sm text-gray-500 truncate" }, toDisplayString(order.email ?? ""), 1)
                            ]),
                            createVNode("div", { class: "inline-flex items-center text-base font-semibold text-gray-900" }, toDisplayString(order.total_price) + " " + toDisplayString(_ctx.__("lei")), 1)
                          ])
                        ]);
                      }), 128))
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
