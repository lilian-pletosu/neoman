import { mergeProps, useSSRContext, getCurrentInstance, mergeModels, useModel, ref, unref, defineComponent, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, withDirectives, vShow, withKeys, vModelText, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$3 } from "./AdminLayout-d40237f3.js";
import { Link, router } from "@inertiajs/vue3";
import { D as DataTable } from "./DataTable-a2eebc6b.js";
import axios from "axios";
import { onClickOutside, useDateFormat } from "@vueuse/core";
import { _ as _sfc_main$4 } from "./Modal-4741da5a.js";
import { PencilSquareIcon, TrashIcon, ArrowPathIcon } from "@heroicons/vue/16/solid/index.js";
import "ziggy-js";
import "@heroicons/vue/20/solid/index.js";
import "./Dropdown-7075589d.js";
import "./ShortLogo-3a83a5f7.js";
import "./_plugin-vue_export-helper-cc2b3d55.js";
import "@heroicons/vue/24/outline/index.js";
import "./Pagination-f107a932.js";
import "./PrimaryButton-84eba42e.js";
const _sfc_main$2 = {
  __name: "CreditDetailTable",
  __ssrInlineRender: true,
  props: {
    order: {
      required: true,
      default: {}
    }
  },
  setup(__props) {
    function calculateInstallmentWithInterest(productPrice, numOfInstallments, interestRate) {
      let interest_rate = productPrice * (interestRate / 100);
      let finalPrice = productPrice + interest_rate;
      let installment = finalPrice / numOfInstallments;
      return installment.toFixed();
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      _push(`<table${ssrRenderAttrs(mergeProps({ class: "text-red-700 text-lg border" }, _attrs))}><tr class="border"><td class="border">${ssrInterpolate(_ctx.__("order_type"))}</td><td class="border">${ssrInterpolate(_ctx.__((_a = __props.order.credit) == null ? void 0 : _a.type))}</td></tr><tr class="border"><td class="border">${ssrInterpolate(_ctx.__("num_of_installments"))}</td><td class="border">${ssrInterpolate((_b = __props.order.credit) == null ? void 0 : _b.num_of_installments)}</td></tr><tr class="border"><td class="border">${ssrInterpolate(_ctx.__("interest_rate"))}</td><td class="border">${ssrInterpolate(parseFloat((_c = __props.order.credit) == null ? void 0 : _c.interest_rate, 0))}%</td></tr><tr class="border"><td class="border">${ssrInterpolate(_ctx.__("installment"))}</td><td class="border">${ssrInterpolate(calculateInstallmentWithInterest((_d = __props.order) == null ? void 0 : _d.products[0].price, (_e = __props.order.credit) == null ? void 0 : _e.num_of_installments, (_f = __props.order.credit) == null ? void 0 : _f.interest_rate))} ${ssrInterpolate(_ctx.__("lei"))}</td></tr></table>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CreditDetailTable.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
getCurrentInstance();
function clone(obj) {
  if (obj == null || typeof obj != "object")
    return obj;
  var temp = new obj.constructor();
  for (var key in obj)
    temp[key] = clone(obj[key]);
  return temp;
}
const _sfc_main$1 = {
  __name: "EditableInput",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    name: {
      required: true,
      type: String
    }
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const formData = useModel(__props, "modelValue");
    const cloneFormData = clone(formData.value);
    const edit = ref({
      fullName: false,
      phoneNumber: false,
      email: false,
      address: false,
      city: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><span class="text-sm text-slate-500">${ssrInterpolate(_ctx.__(__props.name))}</span><div class="relative">`);
      if (!edit.value[__props.name]) {
        _push(`<p class="rounded bg-slate-100 border-0.5 border-slate-200 w-full hover:bg-slate-100 p-2 cursor-pointer">${ssrInterpolate(unref(cloneFormData)[__props.name])}</p>`);
      } else {
        _push(`<input type="text"${ssrRenderAttr("value", unref(cloneFormData)[__props.name])} class="rounded disabled:bg-slate-100 disabled:border-0.5 border-slate-200 w-full"${ssrIncludeBooleanAttr(!edit.value[__props.name]) ? " disabled" : ""}>`);
      }
      if (edit.value[__props.name]) {
        _push(`<div class="absolute flex right-2"><span class="border p-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg></span><span class="border p-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"></path></svg></span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/EditableInput.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Orders",
  __ssrInlineRender: true,
  props: {
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
  },
  setup(__props) {
    const app = getCurrentInstance();
    const props = __props;
    defineComponent({
      name: "Products",
      components: {
        AdminLayout: _sfc_main$3,
        Link
      },
      data() {
        return {
          data: Array
        };
      }
    });
    ref(false);
    ref("modal");
    ref("POST");
    ref();
    const modalIsOpen = ref(false);
    ref();
    const loadProducts = ref(false);
    const showSelectStatus = ref(false);
    const showDeliveryPriceInput = ref(false);
    const target = ref(null);
    ref(false);
    onClickOutside(target, () => {
      if (showDeliveryPriceInput.value) {
        showDeliveryPriceInput.value = false;
      }
    });
    const orderLoad = ref({});
    const fetchOrder = async (order) => {
      axios.get(route("api.fetchOrder", order.id)).then((res) => {
        orderLoad.value = res.data;
      }).finally(() => loadProducts.value = false);
    };
    const removeProductFromOrder = (productId, order) => {
      const confirmed = confirm(app.appContext.config.globalProperties.__("are_you_sure_delete"));
      if (confirmed) {
        const data = {
          type: "deleteProduct",
          product_id: productId
        };
        if (orderLoad.value.products.length === 1) {
          updateOrder(data).finally(() => modal());
        } else {
          updateOrder(data);
        }
      }
    };
    const updateOrderDeliveryPrice = (delivery_price) => {
      const data = {
        type: "updateDeliveryPrice",
        delivery_price
      };
      showDeliveryPriceInput.value = !showDeliveryPriceInput.value;
      updateOrder(data);
    };
    const updateOrderStatus = (new_status) => {
      const data = {
        type: "updateStatus",
        status: new_status
      };
      updateOrder(data).finally(() => showSelectStatus.value = !showSelectStatus.value);
    };
    const updateOrder = async (data) => {
      await router.visit(route(`${props.initialRoute}.update`, orderLoad.value.id), {
        method: "put",
        data,
        preserveState: true,
        preserveScroll: true,
        onStart: () => loadProducts.value = true,
        onSuccess: () => fetchOrder(orderLoad.value)
      });
    };
    function modal(resource) {
      if (resource) {
        fetchOrder(resource);
      }
      modalIsOpen.value = !modalIsOpen.value;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$3, mergeProps({
        "current-route": __props.initialRoute,
        title: "Orders"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full grid grid-cols-1 gap-4"${_scopeId}><div class="container-rounded"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><div${_scopeId}><h3 class="primary-text"${_scopeId}>${ssrInterpolate(_ctx.__("orders"))}</h3><span class="secondary-text"${_scopeId}>${ssrInterpolate(_ctx.__("here_is_all_orders"))}</span></div><div class="flex-shrink-0"${_scopeId}></div></div><div class="flex flex-col mt-8"${_scopeId}><div class="overflow-x-auto rounded-lg"${_scopeId}><div class="flex flex-col mt-8"${_scopeId}><div class="overflow-x-auto rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(DataTable, {
              onEmitClick: (order) => modal(order),
              resources: __props.resources,
              columnsOrder: _ctx.$page.props.columnsOrder,
              columns: _ctx.$page.props.columns,
              "initial-route": _ctx.$page.props.initialRoute,
              "search-route": _ctx.$page.props.searchRoute
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div${_scopeId}>`);
            if (__props.resources.data.length === 0) {
              _push2(`<h2 class="flex justify-center"${_scopeId}>${ssrInterpolate(_ctx.__("no_orders"))}...</h2>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              show: modalIsOpen.value,
              actions: false,
              onClose: modal,
              "max-width": "6xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid grid-cols-1 p-4 pt-10 gap-4"${_scopeId2}><div class="flex rounded items-center space-x-3"${_scopeId2}><p class="font-bold sm:text-xl font-mulish"${_scopeId2}>${ssrInterpolate(_ctx.__("order_number"))}: ${ssrInterpolate(orderLoad.value.order_number)}</p>`);
                  if (!showSelectStatus.value) {
                    _push3(`<div class="${ssrRenderClass([{
                      "status-pending": orderLoad.value.status === "pending",
                      "status-confirmed": orderLoad.value.status === "confirmed",
                      "status-shipped": orderLoad.value.status === "shipped",
                      "status-delivered": orderLoad.value.status === "delivered",
                      "status-canceled": orderLoad.value.status === "canceled"
                    }, "rounded py-0.5 px-2 text-center shadow"])}"${_scopeId2}><p class="${ssrRenderClass([{ "text-white": orderLoad.value.status === "canceled" }, "text-white flex gap-2 items-center"])}"${_scopeId2}>${ssrInterpolate(_ctx.__(orderLoad.value.status))}</p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (showSelectStatus.value) {
                    _push3(`<div${_scopeId2}><select${_scopeId2}><option${ssrIncludeBooleanAttr(orderLoad.value.status === "pending") ? " selected" : ""} value="pending"${_scopeId2}>${ssrInterpolate(_ctx.__("pending"))}</option><option${ssrIncludeBooleanAttr(orderLoad.value.status === "confirmed") ? " selected" : ""} value="confirmed"${_scopeId2}>${ssrInterpolate(_ctx.__("confirmed"))}</option><option${ssrIncludeBooleanAttr(orderLoad.value.status === "shipped") ? " selected" : ""} value="shipped"${_scopeId2}>${ssrInterpolate(_ctx.__("shipped"))}</option><option${ssrIncludeBooleanAttr(orderLoad.value.status === "delivered") ? " selected" : ""} value="delivered"${_scopeId2}>${ssrInterpolate(_ctx.__("delivered"))}</option><option${ssrIncludeBooleanAttr(orderLoad.value.status === "canceled") ? " selected" : ""} value="canceled"${_scopeId2}>${ssrInterpolate(_ctx.__("canceled"))}</option></select></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(unref(PencilSquareIcon), {
                    onClick: ($event) => showSelectStatus.value = !showSelectStatus.value,
                    class: "w-6"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}><p class="text-sm text-slate-500"${_scopeId2}>${ssrInterpolate(_ctx.__("date"))}: ${ssrInterpolate(unref(useDateFormat)(orderLoad.value.created_at, "DD.MM.YYYY, HH:mm", { locales: "rum" }).value)}</p></div>`);
                  if (["credit", "installments"].includes(orderLoad.value.type)) {
                    _push3(ssrRenderComponent(_sfc_main$2, {
                      order: orderLoad.value,
                      key: orderLoad.value.id
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    modelValue: orderLoad.value,
                    "onUpdate:modelValue": ($event) => orderLoad.value = $event,
                    name: "full_name",
                    key: orderLoad.value.id
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    modelValue: orderLoad.value,
                    "onUpdate:modelValue": ($event) => orderLoad.value = $event,
                    name: "phone",
                    key: orderLoad.value.id
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    modelValue: orderLoad.value,
                    "onUpdate:modelValue": ($event) => orderLoad.value = $event,
                    name: "email",
                    key: orderLoad.value.id
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    modelValue: orderLoad.value,
                    "onUpdate:modelValue": ($event) => orderLoad.value = $event,
                    name: "city",
                    key: orderLoad.value.id
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    modelValue: orderLoad.value,
                    "onUpdate:modelValue": ($event) => orderLoad.value = $event,
                    name: "address",
                    key: orderLoad.value.id
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    modelValue: orderLoad.value,
                    "onUpdate:modelValue": ($event) => orderLoad.value = $event,
                    name: "message",
                    key: orderLoad.value.id
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}><span class="text-sm text-slate-500 font-mulish"${_scopeId2}>${ssrInterpolate(_ctx.__("products"))}</span><div class="bg-slate-50 container-custom-rounded border"${_scopeId2}>`);
                  if (!loadProducts.value) {
                    _push3(`<div class="overflow-x overflow-scroll"${_scopeId2}><table class="min-w-full table-auto"${_scopeId2}><thead class="bg-gray-200 border-b"${_scopeId2}><tr${_scopeId2}><th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"${_scopeId2}> # </th><th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"${_scopeId2}>${ssrInterpolate(_ctx.__("product"))}</th><th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"${_scopeId2}>${ssrInterpolate(_ctx.__("qty"))}</th><th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"${_scopeId2}>${ssrInterpolate(_ctx.__("unit_price"))}</th><th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"${_scopeId2}>${ssrInterpolate(_ctx.__("color"))}</th><th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"${_scopeId2}>${ssrInterpolate(_ctx.__("brand"))}</th><th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"${_scopeId2}>${ssrInterpolate(_ctx.__("actions"))}</th></tr></thead><tbody${_scopeId2}><!--[-->`);
                    ssrRenderList(orderLoad.value.products, (product, index) => {
                      _push3(`<tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"${_scopeId2}><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(++index)}</td><td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap"${_scopeId2}>${ssrInterpolate(product.name ?? "---")}</td><td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"${_scopeId2}>${ssrInterpolate(product.qty ?? "---")}</td><td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"${_scopeId2}>${ssrInterpolate(product.price ?? "---")}</td><td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"${_scopeId2}>${ssrInterpolate(product.color_value ?? "---")}</td><td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"${_scopeId2}>${ssrInterpolate(product.brand ?? "---")}</td><td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(TrashIcon), {
                        onClick: ($event) => removeProductFromOrder(product.id, orderLoad.value),
                        class: "w-6"
                      }, null, _parent3, _scopeId2));
                      _push3(`</td></tr>`);
                    });
                    _push3(`<!--]--></tbody></table><div class="grid grid-cols-6 border p-4"${_scopeId2}><div class="col-span-5 text-end"${_scopeId2}><p class="text-lg font-semibold"${_scopeId2}>${ssrInterpolate(_ctx.__("subtotal"))}:</p><p class="text-lg font-semibold"${_scopeId2}>${ssrInterpolate(_ctx.__("shipping"))}:</p><p class="text-lg font-semibold"${_scopeId2}>${ssrInterpolate(_ctx.__("total_price"))}:</p></div><div class="col-span-1 text-end"${_scopeId2}><p class="text-lg font-semibold"${_scopeId2}>${ssrInterpolate(orderLoad.value.total_price)} ${ssrInterpolate(_ctx.__("lei"))}</p><p style="${ssrRenderStyle(!showDeliveryPriceInput.value ? null : { display: "none" })}" class="text-lg font-semibold text-red-400 cursor-pointer"${_scopeId2}>${ssrInterpolate(orderLoad.value.delivery_price ?? 0)} ${ssrInterpolate(_ctx.__("lei"))}</p><div class="flex justify-end space-x-2" style="${ssrRenderStyle(showDeliveryPriceInput.value ? null : { display: "none" })}"${_scopeId2}><input${ssrRenderAttr("value", orderLoad.value.delivery_price)} type="number" class="border rounded p-1 w-20"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(ArrowPathIcon), {
                      onClick: ($event) => updateOrderDeliveryPrice(orderLoad.value.delivery_price),
                      class: "w-4 cursor-pointer"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><p class="text-lg font-semibold"${_scopeId2}>${ssrInterpolate(parseFloat(orderLoad.value.total_price) + parseFloat(orderLoad.value.delivery_price ?? 0))} ${ssrInterpolate(_ctx.__("lei"))}</p></div></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (loadProducts.value) {
                    _push3(`<div class="flex justify-center w-full mx-auto p-4"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20 " fill="currentColor" class="w-5 h-5 animate-spin"${_scopeId2}><path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clip-rule="evenodd"${_scopeId2}></path></svg> ${ssrInterpolate(_ctx.__("processing"))}... </div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 p-4 pt-10 gap-4" }, [
                      createVNode("div", { class: "flex rounded items-center space-x-3" }, [
                        createVNode("p", { class: "font-bold sm:text-xl font-mulish" }, toDisplayString(_ctx.__("order_number")) + ": " + toDisplayString(orderLoad.value.order_number), 1),
                        !showSelectStatus.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: ["rounded py-0.5 px-2 text-center shadow", {
                            "status-pending": orderLoad.value.status === "pending",
                            "status-confirmed": orderLoad.value.status === "confirmed",
                            "status-shipped": orderLoad.value.status === "shipped",
                            "status-delivered": orderLoad.value.status === "delivered",
                            "status-canceled": orderLoad.value.status === "canceled"
                          }]
                        }, [
                          createVNode("p", {
                            class: ["text-white flex gap-2 items-center", { "text-white": orderLoad.value.status === "canceled" }]
                          }, toDisplayString(_ctx.__(orderLoad.value.status)), 3)
                        ], 2)) : createCommentVNode("", true),
                        showSelectStatus.value ? (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode("select", {
                            onChange: (event) => updateOrderStatus(event.target.value)
                          }, [
                            createVNode("option", {
                              selected: orderLoad.value.status === "pending",
                              value: "pending"
                            }, toDisplayString(_ctx.__("pending")), 9, ["selected"]),
                            createVNode("option", {
                              selected: orderLoad.value.status === "confirmed",
                              value: "confirmed"
                            }, toDisplayString(_ctx.__("confirmed")), 9, ["selected"]),
                            createVNode("option", {
                              selected: orderLoad.value.status === "shipped",
                              value: "shipped"
                            }, toDisplayString(_ctx.__("shipped")), 9, ["selected"]),
                            createVNode("option", {
                              selected: orderLoad.value.status === "delivered",
                              value: "delivered"
                            }, toDisplayString(_ctx.__("delivered")), 9, ["selected"]),
                            createVNode("option", {
                              selected: orderLoad.value.status === "canceled",
                              value: "canceled"
                            }, toDisplayString(_ctx.__("canceled")), 9, ["selected"])
                          ], 40, ["onChange"])
                        ])) : createCommentVNode("", true),
                        createVNode(unref(PencilSquareIcon), {
                          onClick: ($event) => showSelectStatus.value = !showSelectStatus.value,
                          class: "w-6"
                        }, null, 8, ["onClick"])
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm text-slate-500" }, toDisplayString(_ctx.__("date")) + ": " + toDisplayString(unref(useDateFormat)(orderLoad.value.created_at, "DD.MM.YYYY, HH:mm", { locales: "rum" }).value), 1)
                      ]),
                      ["credit", "installments"].includes(orderLoad.value.type) ? (openBlock(), createBlock(_sfc_main$2, {
                        order: orderLoad.value,
                        key: orderLoad.value.id
                      }, null, 8, ["order"])) : createCommentVNode("", true),
                      createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-2" }, [
                        (openBlock(), createBlock(_sfc_main$1, {
                          modelValue: orderLoad.value,
                          "onUpdate:modelValue": ($event) => orderLoad.value = $event,
                          name: "full_name",
                          key: orderLoad.value.id
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])),
                        (openBlock(), createBlock(_sfc_main$1, {
                          modelValue: orderLoad.value,
                          "onUpdate:modelValue": ($event) => orderLoad.value = $event,
                          name: "phone",
                          key: orderLoad.value.id
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])),
                        (openBlock(), createBlock(_sfc_main$1, {
                          modelValue: orderLoad.value,
                          "onUpdate:modelValue": ($event) => orderLoad.value = $event,
                          name: "email",
                          key: orderLoad.value.id
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])),
                        (openBlock(), createBlock(_sfc_main$1, {
                          modelValue: orderLoad.value,
                          "onUpdate:modelValue": ($event) => orderLoad.value = $event,
                          name: "city",
                          key: orderLoad.value.id
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])),
                        (openBlock(), createBlock(_sfc_main$1, {
                          modelValue: orderLoad.value,
                          "onUpdate:modelValue": ($event) => orderLoad.value = $event,
                          name: "address",
                          key: orderLoad.value.id
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])),
                        (openBlock(), createBlock(_sfc_main$1, {
                          modelValue: orderLoad.value,
                          "onUpdate:modelValue": ($event) => orderLoad.value = $event,
                          name: "message",
                          key: orderLoad.value.id
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "text-sm text-slate-500 font-mulish" }, toDisplayString(_ctx.__("products")), 1),
                        createVNode("div", { class: "bg-slate-50 container-custom-rounded border" }, [
                          !loadProducts.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "overflow-x overflow-scroll"
                          }, [
                            createVNode("table", { class: "min-w-full table-auto" }, [
                              createVNode("thead", { class: "bg-gray-200 border-b" }, [
                                createVNode("tr", null, [
                                  createVNode("th", {
                                    scope: "col",
                                    class: "text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                  }, " # "),
                                  createVNode("th", {
                                    scope: "col",
                                    class: "text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                  }, toDisplayString(_ctx.__("product")), 1),
                                  createVNode("th", {
                                    scope: "col",
                                    class: "text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                  }, toDisplayString(_ctx.__("qty")), 1),
                                  createVNode("th", {
                                    scope: "col",
                                    class: "text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                  }, toDisplayString(_ctx.__("unit_price")), 1),
                                  createVNode("th", {
                                    scope: "col",
                                    class: "text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                  }, toDisplayString(_ctx.__("color")), 1),
                                  createVNode("th", {
                                    scope: "col",
                                    class: "text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                  }, toDisplayString(_ctx.__("brand")), 1),
                                  createVNode("th", {
                                    scope: "col",
                                    class: "text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                  }, toDisplayString(_ctx.__("actions")), 1)
                                ])
                              ]),
                              createVNode("tbody", null, [
                                (openBlock(true), createBlock(Fragment, null, renderList(orderLoad.value.products, (product, index) => {
                                  return openBlock(), createBlock("tr", {
                                    key: product,
                                    class: "bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                  }, [
                                    createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" }, toDisplayString(++index), 1),
                                    createVNode("td", { class: "text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap" }, toDisplayString(product.name ?? "---"), 1),
                                    createVNode("td", { class: "text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" }, toDisplayString(product.qty ?? "---"), 1),
                                    createVNode("td", { class: "text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" }, toDisplayString(product.price ?? "---"), 1),
                                    createVNode("td", { class: "text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" }, toDisplayString(product.color_value ?? "---"), 1),
                                    createVNode("td", { class: "text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" }, toDisplayString(product.brand ?? "---"), 1),
                                    createVNode("td", { class: "text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" }, [
                                      createVNode(unref(TrashIcon), {
                                        onClick: ($event) => removeProductFromOrder(product.id, orderLoad.value),
                                        class: "w-6"
                                      }, null, 8, ["onClick"])
                                    ])
                                  ]);
                                }), 128))
                              ])
                            ]),
                            createVNode("div", { class: "grid grid-cols-6 border p-4" }, [
                              createVNode("div", { class: "col-span-5 text-end" }, [
                                createVNode("p", { class: "text-lg font-semibold" }, toDisplayString(_ctx.__("subtotal")) + ":", 1),
                                createVNode("p", { class: "text-lg font-semibold" }, toDisplayString(_ctx.__("shipping")) + ":", 1),
                                createVNode("p", { class: "text-lg font-semibold" }, toDisplayString(_ctx.__("total_price")) + ":", 1)
                              ]),
                              createVNode("div", { class: "col-span-1 text-end" }, [
                                createVNode("p", { class: "text-lg font-semibold" }, toDisplayString(orderLoad.value.total_price) + " " + toDisplayString(_ctx.__("lei")), 1),
                                withDirectives(createVNode("p", {
                                  onClick: ($event) => showDeliveryPriceInput.value = !showDeliveryPriceInput.value,
                                  class: "text-lg font-semibold text-red-400 cursor-pointer"
                                }, toDisplayString(orderLoad.value.delivery_price ?? 0) + " " + toDisplayString(_ctx.__("lei")), 9, ["onClick"]), [
                                  [vShow, !showDeliveryPriceInput.value]
                                ]),
                                withDirectives(createVNode("div", {
                                  ref_key: "target",
                                  ref: target,
                                  class: "flex justify-end space-x-2"
                                }, [
                                  withDirectives(createVNode("input", {
                                    onKeydown: withKeys(($event) => updateOrderDeliveryPrice(orderLoad.value.delivery_price), ["enter"]),
                                    "onUpdate:modelValue": ($event) => orderLoad.value.delivery_price = $event,
                                    type: "number",
                                    class: "border rounded p-1 w-20"
                                  }, null, 40, ["onKeydown", "onUpdate:modelValue"]), [
                                    [vModelText, orderLoad.value.delivery_price]
                                  ]),
                                  createVNode(unref(ArrowPathIcon), {
                                    onClick: ($event) => updateOrderDeliveryPrice(orderLoad.value.delivery_price),
                                    class: "w-4 cursor-pointer"
                                  }, null, 8, ["onClick"])
                                ], 512), [
                                  [vShow, showDeliveryPriceInput.value]
                                ]),
                                createVNode("p", { class: "text-lg font-semibold" }, toDisplayString(parseFloat(orderLoad.value.total_price) + parseFloat(orderLoad.value.delivery_price ?? 0)) + " " + toDisplayString(_ctx.__("lei")), 1)
                              ])
                            ])
                          ])) : createCommentVNode("", true),
                          loadProducts.value ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex justify-center w-full mx-auto p-4"
                          }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              viewBox: "0 0 20 20 ",
                              fill: "currentColor",
                              class: "w-5 h-5 animate-spin"
                            }, [
                              createVNode("path", {
                                "fill-rule": "evenodd",
                                d: "M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z",
                                "clip-rule": "evenodd"
                              })
                            ])),
                            createTextVNode(" " + toDisplayString(_ctx.__("processing")) + "... ", 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "w-full grid grid-cols-1 gap-4" }, [
                createVNode("div", { class: "container-rounded" }, [
                  createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h3", { class: "primary-text" }, toDisplayString(_ctx.__("orders")), 1),
                      createVNode("span", { class: "secondary-text" }, toDisplayString(_ctx.__("here_is_all_orders")), 1)
                    ]),
                    createVNode("div", { class: "flex-shrink-0" })
                  ]),
                  createVNode("div", { class: "flex flex-col mt-8" }, [
                    createVNode("div", { class: "overflow-x-auto rounded-lg" }, [
                      createVNode("div", { class: "flex flex-col mt-8" }, [
                        createVNode("div", { class: "overflow-x-auto rounded-lg" }, [
                          createVNode(DataTable, {
                            onEmitClick: (order) => modal(order),
                            resources: __props.resources,
                            columnsOrder: _ctx.$page.props.columnsOrder,
                            columns: _ctx.$page.props.columns,
                            "initial-route": _ctx.$page.props.initialRoute,
                            "search-route": _ctx.$page.props.searchRoute
                          }, null, 8, ["onEmitClick", "resources", "columnsOrder", "columns", "initial-route", "search-route"])
                        ])
                      ]),
                      createVNode("div", null, [
                        __props.resources.data.length === 0 ? (openBlock(), createBlock("h2", {
                          key: 0,
                          class: "flex justify-center"
                        }, toDisplayString(_ctx.__("no_orders")) + "...", 1)) : createCommentVNode("", true)
                      ]),
                      createVNode(_sfc_main$4, {
                        show: modalIsOpen.value,
                        actions: false,
                        onClose: modal,
                        "max-width": "6xl"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid grid-cols-1 p-4 pt-10 gap-4" }, [
                            createVNode("div", { class: "flex rounded items-center space-x-3" }, [
                              createVNode("p", { class: "font-bold sm:text-xl font-mulish" }, toDisplayString(_ctx.__("order_number")) + ": " + toDisplayString(orderLoad.value.order_number), 1),
                              !showSelectStatus.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: ["rounded py-0.5 px-2 text-center shadow", {
                                  "status-pending": orderLoad.value.status === "pending",
                                  "status-confirmed": orderLoad.value.status === "confirmed",
                                  "status-shipped": orderLoad.value.status === "shipped",
                                  "status-delivered": orderLoad.value.status === "delivered",
                                  "status-canceled": orderLoad.value.status === "canceled"
                                }]
                              }, [
                                createVNode("p", {
                                  class: ["text-white flex gap-2 items-center", { "text-white": orderLoad.value.status === "canceled" }]
                                }, toDisplayString(_ctx.__(orderLoad.value.status)), 3)
                              ], 2)) : createCommentVNode("", true),
                              showSelectStatus.value ? (openBlock(), createBlock("div", { key: 1 }, [
                                createVNode("select", {
                                  onChange: (event) => updateOrderStatus(event.target.value)
                                }, [
                                  createVNode("option", {
                                    selected: orderLoad.value.status === "pending",
                                    value: "pending"
                                  }, toDisplayString(_ctx.__("pending")), 9, ["selected"]),
                                  createVNode("option", {
                                    selected: orderLoad.value.status === "confirmed",
                                    value: "confirmed"
                                  }, toDisplayString(_ctx.__("confirmed")), 9, ["selected"]),
                                  createVNode("option", {
                                    selected: orderLoad.value.status === "shipped",
                                    value: "shipped"
                                  }, toDisplayString(_ctx.__("shipped")), 9, ["selected"]),
                                  createVNode("option", {
                                    selected: orderLoad.value.status === "delivered",
                                    value: "delivered"
                                  }, toDisplayString(_ctx.__("delivered")), 9, ["selected"]),
                                  createVNode("option", {
                                    selected: orderLoad.value.status === "canceled",
                                    value: "canceled"
                                  }, toDisplayString(_ctx.__("canceled")), 9, ["selected"])
                                ], 40, ["onChange"])
                              ])) : createCommentVNode("", true),
                              createVNode(unref(PencilSquareIcon), {
                                onClick: ($event) => showSelectStatus.value = !showSelectStatus.value,
                                class: "w-6"
                              }, null, 8, ["onClick"])
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm text-slate-500" }, toDisplayString(_ctx.__("date")) + ": " + toDisplayString(unref(useDateFormat)(orderLoad.value.created_at, "DD.MM.YYYY, HH:mm", { locales: "rum" }).value), 1)
                            ]),
                            ["credit", "installments"].includes(orderLoad.value.type) ? (openBlock(), createBlock(_sfc_main$2, {
                              order: orderLoad.value,
                              key: orderLoad.value.id
                            }, null, 8, ["order"])) : createCommentVNode("", true),
                            createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-2" }, [
                              (openBlock(), createBlock(_sfc_main$1, {
                                modelValue: orderLoad.value,
                                "onUpdate:modelValue": ($event) => orderLoad.value = $event,
                                name: "full_name",
                                key: orderLoad.value.id
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])),
                              (openBlock(), createBlock(_sfc_main$1, {
                                modelValue: orderLoad.value,
                                "onUpdate:modelValue": ($event) => orderLoad.value = $event,
                                name: "phone",
                                key: orderLoad.value.id
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])),
                              (openBlock(), createBlock(_sfc_main$1, {
                                modelValue: orderLoad.value,
                                "onUpdate:modelValue": ($event) => orderLoad.value = $event,
                                name: "email",
                                key: orderLoad.value.id
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])),
                              (openBlock(), createBlock(_sfc_main$1, {
                                modelValue: orderLoad.value,
                                "onUpdate:modelValue": ($event) => orderLoad.value = $event,
                                name: "city",
                                key: orderLoad.value.id
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])),
                              (openBlock(), createBlock(_sfc_main$1, {
                                modelValue: orderLoad.value,
                                "onUpdate:modelValue": ($event) => orderLoad.value = $event,
                                name: "address",
                                key: orderLoad.value.id
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])),
                              (openBlock(), createBlock(_sfc_main$1, {
                                modelValue: orderLoad.value,
                                "onUpdate:modelValue": ($event) => orderLoad.value = $event,
                                name: "message",
                                key: orderLoad.value.id
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                            ]),
                            createVNode("div", null, [
                              createVNode("span", { class: "text-sm text-slate-500 font-mulish" }, toDisplayString(_ctx.__("products")), 1),
                              createVNode("div", { class: "bg-slate-50 container-custom-rounded border" }, [
                                !loadProducts.value ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "overflow-x overflow-scroll"
                                }, [
                                  createVNode("table", { class: "min-w-full table-auto" }, [
                                    createVNode("thead", { class: "bg-gray-200 border-b" }, [
                                      createVNode("tr", null, [
                                        createVNode("th", {
                                          scope: "col",
                                          class: "text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        }, " # "),
                                        createVNode("th", {
                                          scope: "col",
                                          class: "text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        }, toDisplayString(_ctx.__("product")), 1),
                                        createVNode("th", {
                                          scope: "col",
                                          class: "text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        }, toDisplayString(_ctx.__("qty")), 1),
                                        createVNode("th", {
                                          scope: "col",
                                          class: "text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        }, toDisplayString(_ctx.__("unit_price")), 1),
                                        createVNode("th", {
                                          scope: "col",
                                          class: "text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        }, toDisplayString(_ctx.__("color")), 1),
                                        createVNode("th", {
                                          scope: "col",
                                          class: "text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        }, toDisplayString(_ctx.__("brand")), 1),
                                        createVNode("th", {
                                          scope: "col",
                                          class: "text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        }, toDisplayString(_ctx.__("actions")), 1)
                                      ])
                                    ]),
                                    createVNode("tbody", null, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(orderLoad.value.products, (product, index) => {
                                        return openBlock(), createBlock("tr", {
                                          key: product,
                                          class: "bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                        }, [
                                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" }, toDisplayString(++index), 1),
                                          createVNode("td", { class: "text-sm text-gray-900 font-light px-6 py-4 whitespace-wrap" }, toDisplayString(product.name ?? "---"), 1),
                                          createVNode("td", { class: "text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" }, toDisplayString(product.qty ?? "---"), 1),
                                          createVNode("td", { class: "text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" }, toDisplayString(product.price ?? "---"), 1),
                                          createVNode("td", { class: "text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" }, toDisplayString(product.color_value ?? "---"), 1),
                                          createVNode("td", { class: "text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" }, toDisplayString(product.brand ?? "---"), 1),
                                          createVNode("td", { class: "text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" }, [
                                            createVNode(unref(TrashIcon), {
                                              onClick: ($event) => removeProductFromOrder(product.id, orderLoad.value),
                                              class: "w-6"
                                            }, null, 8, ["onClick"])
                                          ])
                                        ]);
                                      }), 128))
                                    ])
                                  ]),
                                  createVNode("div", { class: "grid grid-cols-6 border p-4" }, [
                                    createVNode("div", { class: "col-span-5 text-end" }, [
                                      createVNode("p", { class: "text-lg font-semibold" }, toDisplayString(_ctx.__("subtotal")) + ":", 1),
                                      createVNode("p", { class: "text-lg font-semibold" }, toDisplayString(_ctx.__("shipping")) + ":", 1),
                                      createVNode("p", { class: "text-lg font-semibold" }, toDisplayString(_ctx.__("total_price")) + ":", 1)
                                    ]),
                                    createVNode("div", { class: "col-span-1 text-end" }, [
                                      createVNode("p", { class: "text-lg font-semibold" }, toDisplayString(orderLoad.value.total_price) + " " + toDisplayString(_ctx.__("lei")), 1),
                                      withDirectives(createVNode("p", {
                                        onClick: ($event) => showDeliveryPriceInput.value = !showDeliveryPriceInput.value,
                                        class: "text-lg font-semibold text-red-400 cursor-pointer"
                                      }, toDisplayString(orderLoad.value.delivery_price ?? 0) + " " + toDisplayString(_ctx.__("lei")), 9, ["onClick"]), [
                                        [vShow, !showDeliveryPriceInput.value]
                                      ]),
                                      withDirectives(createVNode("div", {
                                        ref_key: "target",
                                        ref: target,
                                        class: "flex justify-end space-x-2"
                                      }, [
                                        withDirectives(createVNode("input", {
                                          onKeydown: withKeys(($event) => updateOrderDeliveryPrice(orderLoad.value.delivery_price), ["enter"]),
                                          "onUpdate:modelValue": ($event) => orderLoad.value.delivery_price = $event,
                                          type: "number",
                                          class: "border rounded p-1 w-20"
                                        }, null, 40, ["onKeydown", "onUpdate:modelValue"]), [
                                          [vModelText, orderLoad.value.delivery_price]
                                        ]),
                                        createVNode(unref(ArrowPathIcon), {
                                          onClick: ($event) => updateOrderDeliveryPrice(orderLoad.value.delivery_price),
                                          class: "w-4 cursor-pointer"
                                        }, null, 8, ["onClick"])
                                      ], 512), [
                                        [vShow, showDeliveryPriceInput.value]
                                      ]),
                                      createVNode("p", { class: "text-lg font-semibold" }, toDisplayString(parseFloat(orderLoad.value.total_price) + parseFloat(orderLoad.value.delivery_price ?? 0)) + " " + toDisplayString(_ctx.__("lei")), 1)
                                    ])
                                  ])
                                ])) : createCommentVNode("", true),
                                loadProducts.value ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "flex justify-center w-full mx-auto p-4"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    viewBox: "0 0 20 20 ",
                                    fill: "currentColor",
                                    class: "w-5 h-5 animate-spin"
                                  }, [
                                    createVNode("path", {
                                      "fill-rule": "evenodd",
                                      d: "M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z",
                                      "clip-rule": "evenodd"
                                    })
                                  ])),
                                  createTextVNode(" " + toDisplayString(_ctx.__("processing")) + "... ", 1)
                                ])) : createCommentVNode("", true)
                              ])
                            ])
                          ])
                        ]),
                        _: 1
                      }, 8, ["show"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Orders.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
