import { ref, watch, unref, useSSRContext, getCurrentInstance, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$2, t as toast } from "./AdminLayout-fd678994.js";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import { P as Pagination } from "./Pagination-cc4bc19e.js";
import { P as PrimaryButton } from "./PrimaryButton-84eba42e.js";
import { _ as _sfc_main$5 } from "./Modal-4741da5a.js";
import { _ as _sfc_main$4 } from "./SecondaryButton-0974b11b.js";
import { D as DangerButton } from "./DangerButton-8045b8f5.js";
import { _ as _sfc_main$3 } from "./TextInput-ee18b23f.js";
import "@inertiajs/inertia";
import "@heroicons/vue/20/solid/index.js";
import "./Dropdown-7075589d.js";
import "./ShortLogo-3a83a5f7.js";
import "ziggy-js";
import "./_plugin-vue_export-helper-cc2b3d55.js";
import "@heroicons/vue/24/outline/index.js";
const _sfc_main$1 = {
  __name: "BlackSelectorImport",
  __ssrInlineRender: true,
  props: {
    options: {
      type: Object,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    field: {
      type: String,
      default: "value"
    },
    errorMessage: {
      type: String
    },
    value: {}
  },
  emits: ["update:status"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    let status = ref(props.value || "");
    watch(() => props.value, (newValue) => {
      status.value = newValue;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><label for="status" class="block mt-4 mb-2 text-sm font-medium text-gray-900">${ssrInterpolate(_ctx.__(__props.label))}</label><select id="status" class="${ssrRenderClass([{ "border-2 dark:border-red-600": __props.errorMessage }, "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"])}"><option disabled${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), null) : ssrLooseEqual(unref(status), null)) ? " selected" : ""}>${ssrInterpolate(_ctx.__(`select`))}</option><!--[-->`);
      ssrRenderList(__props.options, (option, key) => {
        _push(`<option${ssrRenderAttr("value", option.id)}>${ssrInterpolate(_ctx.__(`${option.name}`))}</option>`);
      });
      _push(`<!--]--></select>`);
      if (__props.errorMessage) {
        _push(`<div><p class="text-sm text-red-500">${ssrInterpolate(__props.errorMessage)}* </p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/BlackSelectorImport.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "ImportedProducts",
  __ssrInlineRender: true,
  props: {
    initialRoute: {
      type: String
    },
    resourceType: {
      type: String
    },
    resources: {
      type: Object
    }
  },
  setup(__props) {
    const app = getCurrentInstance();
    const props = __props;
    const isOpen = ref(false);
    ref(false);
    ref();
    const selectedProduct = ref([]);
    const page = usePage();
    const dt = ref("");
    const search = ref(false);
    const isSelected = (product) => {
      return selectedProduct.value.includes(product);
    };
    const selectProducts = (product) => {
      if (selectedProduct.value.includes(product)) {
        selectedProduct.value = selectedProduct.value.filter((item) => item !== product);
      } else {
        selectedProduct.value = [...selectedProduct.value, product];
      }
    };
    const selectAll = () => {
      if (selectedProduct.value.length === props.resources.data.length) {
        selectedProduct.value = [];
      } else {
        selectedProduct.value = [...props.resources.data];
      }
    };
    watch(selectedProduct, (newState, oldState) => {
      form.products = newState;
    });
    const form = useForm({
      products: [],
      category: null,
      subcategory: null,
      sub_subcategory: null
    });
    const submit = () => {
      form.post(route("admin.imported-products.store"), {
        preserveScroll: true,
        onSuccess: () => {
          toast.add({ message: page.props.toast });
          isOpen.value = false;
          selectedProduct.value = [];
          form.category = null;
          form.subcategory = null;
          form.sub_subcategory = null;
        },
        onError: (e) => console.log(e)
      });
    };
    function deleteSelectedProducts() {
      const confirmed = app.appContext.config.globalProperties.__("are_you_sure_delete");
      if (confirm(confirmed)) {
        form.delete(route("admin.imported-products.destroy", { imported_product: selectedProduct.value }), {
          preserveScroll: true,
          onSuccess: () => {
            toast.add({ message: page.props.toast });
            selectedProduct.value = [];
          },
          onError: (e) => toast.add({ message: e })
        });
      }
    }
    function closeModal() {
      isOpen.value = false;
      form.category = null;
      form.subcategory = null;
      form.sub_subcategory = null;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        "current-route": __props.initialRoute,
        title: "Products"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid w-full grid-cols-1 gap-4"${_scopeId}><div class="container-rounded"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><div${_scopeId}><h3 class="primary-text"${_scopeId}>${ssrInterpolate(_ctx.__("products_for_importing"))}</h3><span class="secondary-text"${_scopeId}>${ssrInterpolate(_ctx.__("products_for_importing_description_admin"))}. </span> <br${_scopeId}><span class="text-xs text-gray-500 underline"${_scopeId}>${ssrInterpolate(_ctx.__("attention_imported_products_will_not_be_visible_until_they_are_saved_to_a_category"))}</span></div>`);
            if (Object.keys(selectedProduct.value).length !== 0) {
              _push2(`<div class="flex justify-end mb-2"${_scopeId}>`);
              _push2(ssrRenderComponent(PrimaryButton, {
                class: "mx-2",
                onClick: ($event) => isOpen.value = !isOpen.value
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.__("save_imported_products"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.__("save_imported_products")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(DangerButton, { onClick: deleteSelectedProducts }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.__("delete_selected"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.__("delete_selected")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="my-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              modelValue: dt.value,
              "onUpdate:modelValue": ($event) => dt.value = $event,
              placeholder: _ctx.__("search"),
              class: "min-w-16",
              onBlur: ($event) => search.value = !search.value
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              data: { search: dt.value },
              href: _ctx.route(`${unref(page).props.searchRoute}.index`),
              "preserve-state": ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$4, { class: "mx-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(_ctx.__("search"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(_ctx.__("search")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$4, { class: "mx-2" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.__("search")), 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.resources.data.length !== 0) {
              _push2(`<div class="flex flex-col mt-8"${_scopeId}><div class="border"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm"${_scopeId}><thead class=""${_scopeId}><tr class="flex-1 text-base text-left"${_scopeId}><th class="flex sticky inset-y-0 start-0 bg-white px-4 py-2"${_scopeId}><label class="sr-only" for="SelectAll"${_scopeId}>Select All</label><input id="SelectAll"${ssrIncludeBooleanAttr(selectedProduct.value.length === __props.resources.data.length) ? " checked" : ""} class="size-5 rounded border-gray-300" type="checkbox"${_scopeId}></th><th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.__("image"))}</th><th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.__("name"))}</th><th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.__("sub_subcategory"))}</th><th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.__("brand"))}</th><th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.__("price"))}</th></tr></thead><tbody class="divide-y divide-gray-200"${_scopeId}><!--[-->`);
              ssrRenderList(__props.resources.data, (resource, key) => {
                var _a, _b, _c;
                _push2(`<tr${_scopeId}><td class="sticky inset-y-0 start-0 bg-white px-4 py-2"${_scopeId}><input id="Row1"${ssrIncludeBooleanAttr(isSelected(resource)) ? " checked" : ""} class="size-5 rounded border-gray-300" type="checkbox"${_scopeId}></td><td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-default"${_scopeId}><img${ssrRenderAttr("src", ((_a = resource.images) == null ? void 0 : _a.image1) ?? "https://banner2.cleanpng.com/20180815/sit/a1fff69c4e6de4ea9f7a7f388f4b51cb.webp")} alt="no" class="w-10 h-10"${_scopeId}></td><td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-default"${_scopeId}>${ssrInterpolate(resource.name.ro)}</td><td class="whitespace-nowrap px-4 py-2 text-gray-700"${_scopeId}>${ssrInterpolate((_b = resource.sub_sub_category) == null ? void 0 : _b.name)}</td><td class="whitespace-nowrap px-4 py-2 text-gray-700"${_scopeId}>${ssrInterpolate((_c = resource.brand) == null ? void 0 : _c.name)}</td><td class="whitespace-nowrap px-4 py-2 text-gray-700"${_scopeId}>${ssrInterpolate(resource.price)}</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div><div class="flex mt-4 place-content-start"${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, {
                links: __props.resources.links
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div${_scopeId}>`);
            if (__props.resources.data.length === 0) {
              _push2(`<h2 class="flex justify-center"${_scopeId}>${ssrInterpolate(_ctx.__("no_products"))}...</h2>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              actions: false,
              closeable: true,
              show: isOpen.value,
              onClose: closeModal
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="h-auto p-4 bg-gray-100"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    column: _ctx.name,
                    label: _ctx.__("select_category_where_save_products"),
                    options: unref(page).props.categories,
                    "onUpdate:status": (val) => unref(form).category = val
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    column: _ctx.name,
                    label: _ctx.__("select_subcategory_where_save_products"),
                    options: unref(page).props.subcategories,
                    "onUpdate:status": (val) => unref(form).subcategory = val
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    column: _ctx.name,
                    label: _ctx.__("select_sub_subcategory_where_save_products"),
                    options: unref(page).props.sub_subcategories,
                    "onUpdate:status": (val) => unref(form).sub_subcategory = val
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex justify-end mt-4 space-x-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    onClick: ($event) => isOpen.value = !isOpen.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(_ctx.__("cancel"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(_ctx.__("cancel")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(PrimaryButton, {
                    class: "mx-2",
                    onClick: ($event) => submit()
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(_ctx.__("save_imported_products"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(_ctx.__("save_imported_products")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "h-auto p-4 bg-gray-100" }, [
                      createVNode(_sfc_main$1, {
                        column: _ctx.name,
                        label: _ctx.__("select_category_where_save_products"),
                        options: unref(page).props.categories,
                        "onUpdate:status": (val) => unref(form).category = val
                      }, null, 8, ["column", "label", "options", "onUpdate:status"]),
                      createVNode(_sfc_main$1, {
                        column: _ctx.name,
                        label: _ctx.__("select_subcategory_where_save_products"),
                        options: unref(page).props.subcategories,
                        "onUpdate:status": (val) => unref(form).subcategory = val
                      }, null, 8, ["column", "label", "options", "onUpdate:status"]),
                      createVNode(_sfc_main$1, {
                        column: _ctx.name,
                        label: _ctx.__("select_sub_subcategory_where_save_products"),
                        options: unref(page).props.sub_subcategories,
                        "onUpdate:status": (val) => unref(form).sub_subcategory = val
                      }, null, 8, ["column", "label", "options", "onUpdate:status"]),
                      createVNode("div", { class: "flex justify-end mt-4 space-x-2" }, [
                        createVNode(_sfc_main$4, {
                          onClick: ($event) => isOpen.value = !isOpen.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.__("cancel")), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(PrimaryButton, {
                          class: "mx-2",
                          onClick: ($event) => submit()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.__("save_imported_products")), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "grid w-full grid-cols-1 gap-4" }, [
                createVNode("div", { class: "container-rounded" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                    createVNode("div", null, [
                      createVNode("h3", { class: "primary-text" }, toDisplayString(_ctx.__("products_for_importing")), 1),
                      createVNode("span", { class: "secondary-text" }, toDisplayString(_ctx.__("products_for_importing_description_admin")) + ". ", 1),
                      createTextVNode(),
                      createVNode("br"),
                      createVNode("span", { class: "text-xs text-gray-500 underline" }, toDisplayString(_ctx.__("attention_imported_products_will_not_be_visible_until_they_are_saved_to_a_category")), 1)
                    ]),
                    Object.keys(selectedProduct.value).length !== 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-end mb-2"
                    }, [
                      createVNode(PrimaryButton, {
                        class: "mx-2",
                        onClick: ($event) => isOpen.value = !isOpen.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.__("save_imported_products")), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(DangerButton, { onClick: deleteSelectedProducts }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.__("delete_selected")), 1)
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "my-2" }, [
                    createVNode(_sfc_main$3, {
                      modelValue: dt.value,
                      "onUpdate:modelValue": ($event) => dt.value = $event,
                      placeholder: _ctx.__("search"),
                      class: "min-w-16",
                      onBlur: ($event) => search.value = !search.value
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "onBlur"]),
                    createVNode(unref(Link), {
                      data: { search: dt.value },
                      href: _ctx.route(`${unref(page).props.searchRoute}.index`),
                      "preserve-state": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$4, { class: "mx-2" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.__("search")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["data", "href"])
                  ]),
                  __props.resources.data.length !== 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex flex-col mt-8"
                  }, [
                    createVNode("div", { class: "border" }, [
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y-2 divide-gray-200 bg-white text-sm" }, [
                          createVNode("thead", { class: "" }, [
                            createVNode("tr", { class: "flex-1 text-base text-left" }, [
                              createVNode("th", { class: "flex sticky inset-y-0 start-0 bg-white px-4 py-2" }, [
                                createVNode("label", {
                                  class: "sr-only",
                                  for: "SelectAll"
                                }, "Select All"),
                                createVNode("input", {
                                  id: "SelectAll",
                                  checked: selectedProduct.value.length === __props.resources.data.length,
                                  class: "size-5 rounded border-gray-300",
                                  type: "checkbox",
                                  onChange: selectAll
                                }, null, 40, ["checked"])
                              ]),
                              createVNode("th", { class: "whitespace-nowrap px-4 py-2 font-medium text-gray-900" }, toDisplayString(_ctx.__("image")), 1),
                              createVNode("th", { class: "whitespace-nowrap px-4 py-2 font-medium text-gray-900" }, toDisplayString(_ctx.__("name")), 1),
                              createVNode("th", { class: "whitespace-nowrap px-4 py-2 font-medium text-gray-900" }, toDisplayString(_ctx.__("sub_subcategory")), 1),
                              createVNode("th", { class: "whitespace-nowrap px-4 py-2 font-medium text-gray-900" }, toDisplayString(_ctx.__("brand")), 1),
                              createVNode("th", { class: "whitespace-nowrap px-4 py-2 font-medium text-gray-900" }, toDisplayString(_ctx.__("price")), 1)
                            ])
                          ]),
                          createVNode("tbody", { class: "divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.resources.data, (resource, key) => {
                              var _a, _b, _c;
                              return openBlock(), createBlock("tr", { key }, [
                                createVNode("td", { class: "sticky inset-y-0 start-0 bg-white px-4 py-2" }, [
                                  createVNode("input", {
                                    id: "Row1",
                                    checked: isSelected(resource),
                                    class: "size-5 rounded border-gray-300",
                                    type: "checkbox",
                                    onChange: ($event) => selectProducts(resource)
                                  }, null, 40, ["checked", "onChange"])
                                ]),
                                createVNode("td", {
                                  class: "whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-default",
                                  onClick: ($event) => selectProducts(resource)
                                }, [
                                  createVNode("img", {
                                    src: ((_a = resource.images) == null ? void 0 : _a.image1) ?? "https://banner2.cleanpng.com/20180815/sit/a1fff69c4e6de4ea9f7a7f388f4b51cb.webp",
                                    alt: "no",
                                    class: "w-10 h-10"
                                  }, null, 8, ["src"])
                                ], 8, ["onClick"]),
                                createVNode("td", {
                                  class: "whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-default",
                                  onClick: ($event) => selectProducts(resource)
                                }, toDisplayString(resource.name.ro), 9, ["onClick"]),
                                createVNode("td", { class: "whitespace-nowrap px-4 py-2 text-gray-700" }, toDisplayString((_b = resource.sub_sub_category) == null ? void 0 : _b.name), 1),
                                createVNode("td", { class: "whitespace-nowrap px-4 py-2 text-gray-700" }, toDisplayString((_c = resource.brand) == null ? void 0 : _c.name), 1),
                                createVNode("td", { class: "whitespace-nowrap px-4 py-2 text-gray-700" }, toDisplayString(resource.price), 1)
                              ]);
                            }), 128))
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "flex mt-4 place-content-start" }, [
                        createVNode(Pagination, {
                          links: __props.resources.links
                        }, null, 8, ["links"])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", null, [
                    __props.resources.data.length === 0 ? (openBlock(), createBlock("h2", {
                      key: 0,
                      class: "flex justify-center"
                    }, toDisplayString(_ctx.__("no_products")) + "...", 1)) : createCommentVNode("", true)
                  ]),
                  createVNode(_sfc_main$5, {
                    actions: false,
                    closeable: true,
                    show: isOpen.value,
                    onClose: closeModal
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "h-auto p-4 bg-gray-100" }, [
                        createVNode(_sfc_main$1, {
                          column: _ctx.name,
                          label: _ctx.__("select_category_where_save_products"),
                          options: unref(page).props.categories,
                          "onUpdate:status": (val) => unref(form).category = val
                        }, null, 8, ["column", "label", "options", "onUpdate:status"]),
                        createVNode(_sfc_main$1, {
                          column: _ctx.name,
                          label: _ctx.__("select_subcategory_where_save_products"),
                          options: unref(page).props.subcategories,
                          "onUpdate:status": (val) => unref(form).subcategory = val
                        }, null, 8, ["column", "label", "options", "onUpdate:status"]),
                        createVNode(_sfc_main$1, {
                          column: _ctx.name,
                          label: _ctx.__("select_sub_subcategory_where_save_products"),
                          options: unref(page).props.sub_subcategories,
                          "onUpdate:status": (val) => unref(form).sub_subcategory = val
                        }, null, 8, ["column", "label", "options", "onUpdate:status"]),
                        createVNode("div", { class: "flex justify-end mt-4 space-x-2" }, [
                          createVNode(_sfc_main$4, {
                            onClick: ($event) => isOpen.value = !isOpen.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.__("cancel")), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(PrimaryButton, {
                            class: "mx-2",
                            onClick: ($event) => submit()
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.__("save_imported_products")), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
                      ])
                    ]),
                    _: 1
                  }, 8, ["show"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/ImportedProducts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
