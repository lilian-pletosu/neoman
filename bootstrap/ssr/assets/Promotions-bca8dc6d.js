import { getCurrentInstance, ref, mergeProps, withCtx, createTextVNode, toDisplayString, unref, createVNode, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { A as AdminLayout } from "./AdminLayout-e4a8ca54.js";
import { D as DataTable } from "./DataTable-c39cb4cc.js";
import { _ as _sfc_main$1 } from "./Modal-f5dacef9.js";
import { P as PrimaryButton } from "./PrimaryButton-84eba42e.js";
import { useForm } from "@inertiajs/vue3";
import "@heroicons/vue/20/solid/index.js";
import "./Dropdown-7075589d.js";
import "ziggy-js";
import "./_plugin-vue_export-helper-cc2b3d55.js";
import "notiwind";
import "./Pagination-cc4bc19e.js";
import "@vueuse/core";
const _sfc_main = {
  __name: "Promotions",
  __ssrInlineRender: true,
  props: {
    initialRoute: {
      type: String
    },
    resources: Object
  },
  setup(__props) {
    const app = getCurrentInstance();
    let isModalOpen = ref(false);
    const form = useForm({
      name: null,
      description: null,
      start_date: null,
      end_date: null,
      discount: null,
      status: null,
      sub_subcategory: null,
      subcategory: null,
      category: null,
      brand: null
    });
    const openModal = () => {
      isModalOpen.value = true;
    };
    const closeModal = () => {
      isModalOpen.value = false;
      form.reset();
    };
    const addPromotion = async () => {
      await form.post(route("admin.promotions.store"), {
        preserveScroll: true,
        onSuccess: () => {
          closeModal();
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        "current-route": __props.initialRoute,
        title: "Promotions"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full grid grid-cols-1 gap-4"${_scopeId}><div class="container-rounded"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><div${_scopeId}><h3 class="primary-text"${_scopeId}>${ssrInterpolate(_ctx.__("promotions"))}</h3><span class="secondary-text"${_scopeId}>${ssrInterpolate(_ctx.__("here_is_all_promotions"))}</span></div><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(PrimaryButton, {
              onClick: openModal,
              class: "mx-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.__("create"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.__("create")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-col mt-8"${_scopeId}><div class="overflow-x-auto rounded-lg"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="flex flex-col mt-8"${_scopeId}><div class="overflow-x-auto rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(DataTable, {
              onEmitClick: (order) => _ctx.modal(order),
              resources: __props.resources,
              columnsOrder: _ctx.$page.props.columnsOrder,
              columns: _ctx.$page.props.columns,
              "initial-route": _ctx.$page.props.initialRoute,
              "search-route": _ctx.$page.props.searchRoute
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div${_scopeId}>`);
            if (__props.resources.data.length === 0) {
              _push2(`<h2 class="flex justify-center"${_scopeId}>${ssrInterpolate(_ctx.__("no_promotions"))}...</h2>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              show: unref(isModalOpen),
              actions: false,
              onClose: closeModal,
              "max-width": "6xl",
              "margin-top": 0
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid grid-cols-2 p-4 mt-5 gap-2"${_scopeId2}><div class="col-span-2"${_scopeId2}><label class="block mb-2 text-sm font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(_ctx.__("name"))}</label><input class="${ssrRenderClass([{ "border-2 dark:border-red-600": unref(form).errors.name }, "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"])}" type="text"${ssrRenderAttr("value", unref(form).name)} min="1" max="100"${ssrRenderAttr("placeholder", _ctx.__("name"))}${_scopeId2}>`);
                  if (unref(form).errors.name) {
                    _push3(`<div${_scopeId2}><p class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(_ctx.__(unref(form).errors.name))}* </p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="col-span-2"${_scopeId2}><label class="block mb-2 text-sm font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(_ctx.__("description"))}</label><textarea${ssrRenderAttr("placeholder", _ctx.__("description"))} class="scroll-smooth bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full"${_scopeId2}>${ssrInterpolate(unref(form).description)}</textarea></div><div class="flex flex-col"${_scopeId2}><label class="block mb-2 text-sm font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(_ctx.__("start_date"))}</label><input type="date" id="start_date" class="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"${ssrRenderAttr("value", unref(form).start_date)}${_scopeId2}></div><div class="flex flex-col"${_scopeId2}><label class="block mb-2 text-sm font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(_ctx.__("end_date"))}</label><input type="date" class="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"${ssrRenderAttr("value", unref(form).end_date)}${_scopeId2}></div><div${_scopeId2}><label for="status" class="block mb-2 mt-4 text-sm font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(_ctx.__("status"))}</label><select id="status" class="${ssrRenderClass([{ "border-2 dark:border-red-600": unref(form).errors.status }, "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"])}"${_scopeId2}><option selected disabled${ssrRenderAttr("value", null)}${_scopeId2}>${ssrInterpolate(_ctx.__("select_status"))}</option><!--[-->`);
                  ssrRenderList([{ id: 1, value: "active" }, { id: 0, value: "inactive" }], (option, key) => {
                    _push3(`<option${ssrRenderAttr("value", option.id)}${_scopeId2}>${ssrInterpolate(_ctx.__(`${option.value}`))}</option>`);
                  });
                  _push3(`<!--]--></select>`);
                  if (unref(form).errors.status) {
                    _push3(`<div${_scopeId2}><p class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(_ctx.__(unref(form).errors.status))}* </p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="col-span-1 mt-4"${_scopeId2}><label class="block mb-2 text-sm font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(_ctx.__("discount"))}</label><input class="${ssrRenderClass([{ "border-2 dark:border-red-600": unref(form).errors.discount }, "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"])}" type="number"${ssrRenderAttr("value", unref(form).discount)} min="1" max="100"${ssrRenderAttr("placeholder", _ctx.__("discount"))}${_scopeId2}>`);
                  if (unref(form).errors.name) {
                    _push3(`<div${_scopeId2}><p class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(_ctx.__(unref(form).errors.discount))}* </p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="col-span-1 w-full"${_scopeId2}><label for="status" class="block mb-2 mt-1 text-sm font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(_ctx.__("brands"))}</label><select class="${ssrRenderClass([{ "border-2 dark:border-red-600": unref(form).errors.brand }, "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"])}"${_scopeId2}><option selected disabled${_scopeId2}>${ssrInterpolate(_ctx.__("select_brand"))}</option><!--[-->`);
                  ssrRenderList(unref(app).appContext.config.globalProperties.$page.props.brands, (brand) => {
                    _push3(`<option${ssrRenderAttr("value", brand.id)}${_scopeId2}>${ssrInterpolate(brand.name)}</option>`);
                  });
                  _push3(`<!--]--></select></div><div class="col-span-1 w-full"${_scopeId2}><label for="status" class="block mb-2 mt-1 text-sm font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(_ctx.__("sub_subcategory"))}</label><select class="${ssrRenderClass([{ "border-2 dark:border-red-600": unref(form).errors.sub_subcategory }, "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"])}"${_scopeId2}><option selected disabled${_scopeId2}>${ssrInterpolate(_ctx.__("select_sub_subcategory"))}</option><!--[-->`);
                  ssrRenderList(unref(app).appContext.config.globalProperties.$page.props.sub_subcategories, (sub_subcategory) => {
                    _push3(`<option${ssrRenderAttr("value", sub_subcategory.id)}${_scopeId2}>${ssrInterpolate(sub_subcategory.name)}</option>`);
                  });
                  _push3(`<!--]--></select></div><div class="col-span-1 w-full"${_scopeId2}><label for="status" class="block mb-2 mt-1 text-sm font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(_ctx.__("subcategory"))}</label><select class="${ssrRenderClass([{ "border-2 dark:border-red-600": unref(form).errors.subcategory }, "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"])}"${_scopeId2}><option selected disabled${_scopeId2}>${ssrInterpolate(_ctx.__("select_subcategory"))}</option><!--[-->`);
                  ssrRenderList(unref(app).appContext.config.globalProperties.$page.props.subcategories, (subcategory) => {
                    _push3(`<option${ssrRenderAttr("value", subcategory.id)}${_scopeId2}>${ssrInterpolate(subcategory.name)}</option>`);
                  });
                  _push3(`<!--]--></select></div><div class="col-span-1 w-full"${_scopeId2}><label for="status" class="block mb-2 mt-1 text-sm font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(_ctx.__("category"))}</label><select class="${ssrRenderClass([{ "border-2 dark:border-red-600": unref(form).errors.category }, "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"])}"${_scopeId2}><option selected disabled${_scopeId2}>${ssrInterpolate(_ctx.__("select_category"))}</option><!--[-->`);
                  ssrRenderList(unref(app).appContext.config.globalProperties.$page.props.categories, (category) => {
                    _push3(`<option${ssrRenderAttr("value", category.id)}${_scopeId2}>${ssrInterpolate(category.name)}</option>`);
                  });
                  _push3(`<!--]--></select></div><hr class="col-span-2 mb-4 mt-1"${_scopeId2}><button type="submit" class="btn btn-primary mx-auto w-full bg-slate-200 p-3 rounded-lg col-span-2 flex justify-center cursor-pointer"${_scopeId2}>${ssrInterpolate(_ctx.__("create"))}</button></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-2 p-4 mt-5 gap-2" }, [
                      createVNode("div", { class: "col-span-2" }, [
                        createVNode("label", { class: "block mb-2 text-sm font-medium text-gray-900" }, toDisplayString(_ctx.__("name")), 1),
                        withDirectives(createVNode("input", {
                          class: ["bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", { "border-2 dark:border-red-600": unref(form).errors.name }],
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          min: "1",
                          max: "100",
                          placeholder: _ctx.__("name"),
                          ref: "input"
                        }, null, 10, ["onUpdate:modelValue", "placeholder"]), [
                          [vModelText, unref(form).name]
                        ]),
                        unref(form).errors.name ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("p", { class: "text-sm text-red-500" }, toDisplayString(_ctx.__(unref(form).errors.name)) + "* ", 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "col-span-2" }, [
                        createVNode("label", { class: "block mb-2 text-sm font-medium text-gray-900" }, toDisplayString(_ctx.__("description")), 1),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                          placeholder: _ctx.__("description"),
                          class: "scroll-smooth bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full"
                        }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                          [vModelText, unref(form).description]
                        ])
                      ]),
                      createVNode("div", { class: "flex flex-col" }, [
                        createVNode("label", { class: "block mb-2 text-sm font-medium text-gray-900" }, toDisplayString(_ctx.__("start_date")), 1),
                        withDirectives(createVNode("input", {
                          type: "date",
                          id: "start_date",
                          class: "col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg",
                          "onUpdate:modelValue": ($event) => unref(form).start_date = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).start_date]
                        ])
                      ]),
                      createVNode("div", { class: "flex flex-col" }, [
                        createVNode("label", { class: "block mb-2 text-sm font-medium text-gray-900" }, toDisplayString(_ctx.__("end_date")), 1),
                        withDirectives(createVNode("input", {
                          type: "date",
                          class: "col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg",
                          "onUpdate:modelValue": ($event) => unref(form).end_date = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).end_date]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "status",
                          class: "block mb-2 mt-4 text-sm font-medium text-gray-900"
                        }, toDisplayString(_ctx.__("status")), 1),
                        createVNode("select", {
                          id: "status",
                          onChange: ($event) => unref(form).status = $event.target.value,
                          class: [{ "border-2 dark:border-red-600": unref(form).errors.status }, "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"]
                        }, [
                          createVNode("option", {
                            selected: "",
                            disabled: "",
                            value: null
                          }, toDisplayString(_ctx.__("select_status")), 1),
                          (openBlock(), createBlock(Fragment, null, renderList([{ id: 1, value: "active" }, { id: 0, value: "inactive" }], (option, key) => {
                            return createVNode("option", {
                              value: option.id
                            }, toDisplayString(_ctx.__(`${option.value}`)), 9, ["value"]);
                          }), 64))
                        ], 42, ["onChange"]),
                        unref(form).errors.status ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("p", { class: "text-sm text-red-500" }, toDisplayString(_ctx.__(unref(form).errors.status)) + "* ", 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "col-span-1 mt-4" }, [
                        createVNode("label", { class: "block mb-2 text-sm font-medium text-gray-900" }, toDisplayString(_ctx.__("discount")), 1),
                        withDirectives(createVNode("input", {
                          class: ["bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", { "border-2 dark:border-red-600": unref(form).errors.discount }],
                          type: "number",
                          "onUpdate:modelValue": ($event) => unref(form).discount = $event,
                          min: "1",
                          max: "100",
                          placeholder: _ctx.__("discount"),
                          ref: "input"
                        }, null, 10, ["onUpdate:modelValue", "placeholder"]), [
                          [vModelText, unref(form).discount]
                        ]),
                        unref(form).errors.name ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("p", { class: "text-sm text-red-500" }, toDisplayString(_ctx.__(unref(form).errors.discount)) + "* ", 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "col-span-1 w-full" }, [
                        createVNode("label", {
                          for: "status",
                          class: "block mb-2 mt-1 text-sm font-medium text-gray-900"
                        }, toDisplayString(_ctx.__("brands")), 1),
                        createVNode("select", {
                          class: ["bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", { "border-2 dark:border-red-600": unref(form).errors.brand }],
                          onChange: ($event) => unref(form).brand = $event.target.value
                        }, [
                          createVNode("option", {
                            selected: "",
                            disabled: ""
                          }, toDisplayString(_ctx.__("select_brand")), 1),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(app).appContext.config.globalProperties.$page.props.brands, (brand) => {
                            return openBlock(), createBlock("option", {
                              value: brand.id
                            }, toDisplayString(brand.name), 9, ["value"]);
                          }), 256))
                        ], 42, ["onChange"])
                      ]),
                      createVNode("div", { class: "col-span-1 w-full" }, [
                        createVNode("label", {
                          for: "status",
                          class: "block mb-2 mt-1 text-sm font-medium text-gray-900"
                        }, toDisplayString(_ctx.__("sub_subcategory")), 1),
                        createVNode("select", {
                          class: ["bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", { "border-2 dark:border-red-600": unref(form).errors.sub_subcategory }],
                          onChange: ($event) => unref(form).sub_subcategory = $event.target.value
                        }, [
                          createVNode("option", {
                            selected: "",
                            disabled: ""
                          }, toDisplayString(_ctx.__("select_sub_subcategory")), 1),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(app).appContext.config.globalProperties.$page.props.sub_subcategories, (sub_subcategory) => {
                            return openBlock(), createBlock("option", {
                              value: sub_subcategory.id
                            }, toDisplayString(sub_subcategory.name), 9, ["value"]);
                          }), 256))
                        ], 42, ["onChange"])
                      ]),
                      createVNode("div", { class: "col-span-1 w-full" }, [
                        createVNode("label", {
                          for: "status",
                          class: "block mb-2 mt-1 text-sm font-medium text-gray-900"
                        }, toDisplayString(_ctx.__("subcategory")), 1),
                        createVNode("select", {
                          class: ["bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", { "border-2 dark:border-red-600": unref(form).errors.subcategory }],
                          onChange: ($event) => unref(form).subcategory = $event.target.value
                        }, [
                          createVNode("option", {
                            selected: "",
                            disabled: ""
                          }, toDisplayString(_ctx.__("select_subcategory")), 1),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(app).appContext.config.globalProperties.$page.props.subcategories, (subcategory) => {
                            return openBlock(), createBlock("option", {
                              value: subcategory.id
                            }, toDisplayString(subcategory.name), 9, ["value"]);
                          }), 256))
                        ], 42, ["onChange"])
                      ]),
                      createVNode("div", { class: "col-span-1 w-full" }, [
                        createVNode("label", {
                          for: "status",
                          class: "block mb-2 mt-1 text-sm font-medium text-gray-900"
                        }, toDisplayString(_ctx.__("category")), 1),
                        createVNode("select", {
                          class: ["bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", { "border-2 dark:border-red-600": unref(form).errors.category }],
                          onChange: ($event) => unref(form).category = $event.target.value
                        }, [
                          createVNode("option", {
                            selected: "",
                            disabled: ""
                          }, toDisplayString(_ctx.__("select_category")), 1),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(app).appContext.config.globalProperties.$page.props.categories, (category) => {
                            return openBlock(), createBlock("option", {
                              value: category.id
                            }, toDisplayString(category.name), 9, ["value"]);
                          }), 256))
                        ], 42, ["onChange"])
                      ]),
                      createVNode("hr", { class: "col-span-2 mb-4 mt-1" }),
                      createVNode("button", {
                        type: "submit",
                        onClick: ($event) => addPromotion(),
                        class: "btn btn-primary mx-auto w-full bg-slate-200 p-3 rounded-lg col-span-2 flex justify-center cursor-pointer"
                      }, toDisplayString(_ctx.__("create")), 9, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "w-full grid grid-cols-1 gap-4" }, [
                createVNode("div", { class: "container-rounded" }, [
                  createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h3", { class: "primary-text" }, toDisplayString(_ctx.__("promotions")), 1),
                      createVNode("span", { class: "secondary-text" }, toDisplayString(_ctx.__("here_is_all_promotions")), 1)
                    ]),
                    createVNode("div", { class: "flex-shrink-0" }, [
                      createVNode(PrimaryButton, {
                        onClick: openModal,
                        class: "mx-2"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.__("create")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-col mt-8" }, [
                    createVNode("div", { class: "overflow-x-auto rounded-lg" }, [
                      createVNode("div", { class: "flex-shrink-0" }, [
                        createVNode("div", { class: "flex flex-col mt-8" }, [
                          createVNode("div", { class: "overflow-x-auto rounded-lg" }, [
                            createVNode(DataTable, {
                              onEmitClick: (order) => _ctx.modal(order),
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
                          }, toDisplayString(_ctx.__("no_promotions")) + "...", 1)) : createCommentVNode("", true)
                        ])
                      ])
                    ]),
                    createVNode(_sfc_main$1, {
                      show: unref(isModalOpen),
                      actions: false,
                      onClose: closeModal,
                      "max-width": "6xl",
                      "margin-top": 0
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "grid grid-cols-2 p-4 mt-5 gap-2" }, [
                          createVNode("div", { class: "col-span-2" }, [
                            createVNode("label", { class: "block mb-2 text-sm font-medium text-gray-900" }, toDisplayString(_ctx.__("name")), 1),
                            withDirectives(createVNode("input", {
                              class: ["bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", { "border-2 dark:border-red-600": unref(form).errors.name }],
                              type: "text",
                              "onUpdate:modelValue": ($event) => unref(form).name = $event,
                              min: "1",
                              max: "100",
                              placeholder: _ctx.__("name"),
                              ref: "input"
                            }, null, 10, ["onUpdate:modelValue", "placeholder"]), [
                              [vModelText, unref(form).name]
                            ]),
                            unref(form).errors.name ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("p", { class: "text-sm text-red-500" }, toDisplayString(_ctx.__(unref(form).errors.name)) + "* ", 1)
                            ])) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "col-span-2" }, [
                            createVNode("label", { class: "block mb-2 text-sm font-medium text-gray-900" }, toDisplayString(_ctx.__("description")), 1),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).description = $event,
                              placeholder: _ctx.__("description"),
                              class: "scroll-smooth bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full"
                            }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                              [vModelText, unref(form).description]
                            ])
                          ]),
                          createVNode("div", { class: "flex flex-col" }, [
                            createVNode("label", { class: "block mb-2 text-sm font-medium text-gray-900" }, toDisplayString(_ctx.__("start_date")), 1),
                            withDirectives(createVNode("input", {
                              type: "date",
                              id: "start_date",
                              class: "col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg",
                              "onUpdate:modelValue": ($event) => unref(form).start_date = $event
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).start_date]
                            ])
                          ]),
                          createVNode("div", { class: "flex flex-col" }, [
                            createVNode("label", { class: "block mb-2 text-sm font-medium text-gray-900" }, toDisplayString(_ctx.__("end_date")), 1),
                            withDirectives(createVNode("input", {
                              type: "date",
                              class: "col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg",
                              "onUpdate:modelValue": ($event) => unref(form).end_date = $event
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).end_date]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "status",
                              class: "block mb-2 mt-4 text-sm font-medium text-gray-900"
                            }, toDisplayString(_ctx.__("status")), 1),
                            createVNode("select", {
                              id: "status",
                              onChange: ($event) => unref(form).status = $event.target.value,
                              class: [{ "border-2 dark:border-red-600": unref(form).errors.status }, "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"]
                            }, [
                              createVNode("option", {
                                selected: "",
                                disabled: "",
                                value: null
                              }, toDisplayString(_ctx.__("select_status")), 1),
                              (openBlock(), createBlock(Fragment, null, renderList([{ id: 1, value: "active" }, { id: 0, value: "inactive" }], (option, key) => {
                                return createVNode("option", {
                                  value: option.id
                                }, toDisplayString(_ctx.__(`${option.value}`)), 9, ["value"]);
                              }), 64))
                            ], 42, ["onChange"]),
                            unref(form).errors.status ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("p", { class: "text-sm text-red-500" }, toDisplayString(_ctx.__(unref(form).errors.status)) + "* ", 1)
                            ])) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "col-span-1 mt-4" }, [
                            createVNode("label", { class: "block mb-2 text-sm font-medium text-gray-900" }, toDisplayString(_ctx.__("discount")), 1),
                            withDirectives(createVNode("input", {
                              class: ["bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", { "border-2 dark:border-red-600": unref(form).errors.discount }],
                              type: "number",
                              "onUpdate:modelValue": ($event) => unref(form).discount = $event,
                              min: "1",
                              max: "100",
                              placeholder: _ctx.__("discount"),
                              ref: "input"
                            }, null, 10, ["onUpdate:modelValue", "placeholder"]), [
                              [vModelText, unref(form).discount]
                            ]),
                            unref(form).errors.name ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("p", { class: "text-sm text-red-500" }, toDisplayString(_ctx.__(unref(form).errors.discount)) + "* ", 1)
                            ])) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "col-span-1 w-full" }, [
                            createVNode("label", {
                              for: "status",
                              class: "block mb-2 mt-1 text-sm font-medium text-gray-900"
                            }, toDisplayString(_ctx.__("brands")), 1),
                            createVNode("select", {
                              class: ["bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", { "border-2 dark:border-red-600": unref(form).errors.brand }],
                              onChange: ($event) => unref(form).brand = $event.target.value
                            }, [
                              createVNode("option", {
                                selected: "",
                                disabled: ""
                              }, toDisplayString(_ctx.__("select_brand")), 1),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(app).appContext.config.globalProperties.$page.props.brands, (brand) => {
                                return openBlock(), createBlock("option", {
                                  value: brand.id
                                }, toDisplayString(brand.name), 9, ["value"]);
                              }), 256))
                            ], 42, ["onChange"])
                          ]),
                          createVNode("div", { class: "col-span-1 w-full" }, [
                            createVNode("label", {
                              for: "status",
                              class: "block mb-2 mt-1 text-sm font-medium text-gray-900"
                            }, toDisplayString(_ctx.__("sub_subcategory")), 1),
                            createVNode("select", {
                              class: ["bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", { "border-2 dark:border-red-600": unref(form).errors.sub_subcategory }],
                              onChange: ($event) => unref(form).sub_subcategory = $event.target.value
                            }, [
                              createVNode("option", {
                                selected: "",
                                disabled: ""
                              }, toDisplayString(_ctx.__("select_sub_subcategory")), 1),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(app).appContext.config.globalProperties.$page.props.sub_subcategories, (sub_subcategory) => {
                                return openBlock(), createBlock("option", {
                                  value: sub_subcategory.id
                                }, toDisplayString(sub_subcategory.name), 9, ["value"]);
                              }), 256))
                            ], 42, ["onChange"])
                          ]),
                          createVNode("div", { class: "col-span-1 w-full" }, [
                            createVNode("label", {
                              for: "status",
                              class: "block mb-2 mt-1 text-sm font-medium text-gray-900"
                            }, toDisplayString(_ctx.__("subcategory")), 1),
                            createVNode("select", {
                              class: ["bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", { "border-2 dark:border-red-600": unref(form).errors.subcategory }],
                              onChange: ($event) => unref(form).subcategory = $event.target.value
                            }, [
                              createVNode("option", {
                                selected: "",
                                disabled: ""
                              }, toDisplayString(_ctx.__("select_subcategory")), 1),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(app).appContext.config.globalProperties.$page.props.subcategories, (subcategory) => {
                                return openBlock(), createBlock("option", {
                                  value: subcategory.id
                                }, toDisplayString(subcategory.name), 9, ["value"]);
                              }), 256))
                            ], 42, ["onChange"])
                          ]),
                          createVNode("div", { class: "col-span-1 w-full" }, [
                            createVNode("label", {
                              for: "status",
                              class: "block mb-2 mt-1 text-sm font-medium text-gray-900"
                            }, toDisplayString(_ctx.__("category")), 1),
                            createVNode("select", {
                              class: ["bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", { "border-2 dark:border-red-600": unref(form).errors.category }],
                              onChange: ($event) => unref(form).category = $event.target.value
                            }, [
                              createVNode("option", {
                                selected: "",
                                disabled: ""
                              }, toDisplayString(_ctx.__("select_category")), 1),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(app).appContext.config.globalProperties.$page.props.categories, (category) => {
                                return openBlock(), createBlock("option", {
                                  value: category.id
                                }, toDisplayString(category.name), 9, ["value"]);
                              }), 256))
                            ], 42, ["onChange"])
                          ]),
                          createVNode("hr", { class: "col-span-2 mb-4 mt-1" }),
                          createVNode("button", {
                            type: "submit",
                            onClick: ($event) => addPromotion(),
                            class: "btn btn-primary mx-auto w-full bg-slate-200 p-3 rounded-lg col-span-2 flex justify-center cursor-pointer"
                          }, toDisplayString(_ctx.__("create")), 9, ["onClick"])
                        ])
                      ]),
                      _: 1
                    }, 8, ["show"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Promotions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
