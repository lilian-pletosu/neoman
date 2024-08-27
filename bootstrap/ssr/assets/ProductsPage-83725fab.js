import { ref, computed, useAttrs, reactive, watch, onMounted, onBeforeUnmount, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, withDirectives, vModelText, Fragment, renderList, vModelCheckbox, createCommentVNode, Transition, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderClass } from "vue/server-renderer";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { PlusIcon, MinusIcon, PresentationChartBarIcon, ChevronDownIcon, FunnelIcon } from "@heroicons/vue/20/solid";
import { u as useCartStore, a as useWishlistStore, _ as _sfc_main$1, c as _sfc_main$2, f as formatPrice } from "./FrontLayout-84754b27.js";
import { HeartIcon } from "@heroicons/vue/24/outline/index.js";
import { router, Link } from "@inertiajs/vue3";
import { P as Pagination } from "./Pagination-cc4bc19e.js";
import "./ApplicationLogo-caba15c6.js";
import "pinia";
import "axios";
import "@vueuse/core";
import "./_plugin-vue_export-helper-cc2b3d55.js";
import "radix-vue";
import "@iconify/vue";
import "ziggy-js";
import "./Dropdown-7075589d.js";
import "@heroicons/vue/24/solid/index.js";
import "./PrimaryButton-84eba42e.js";
import "./ShortLogo-3a83a5f7.js";
const STORAGE_KEY = "filterParams";
const _sfc_main = {
  __name: "ProductsPage",
  __ssrInlineRender: true,
  props: {
    products: Object,
    subSubcategory: Object,
    brands: Array,
    attributes: Array
  },
  setup(__props) {
    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();
    const sortOptions = [
      { name: "Newest", value: "new", current: false },
      { name: "Price: Low to High", value: "asc", current: false },
      { name: "Price: High to Low", value: "desc", current: false }
    ];
    ref([0, 20]);
    const props = __props;
    const computedAttributes = computed(() => {
      const temp = props.attributes.map((attribute) => {
        if (attribute.name)
          return attribute;
      });
      return temp.filter((item) => {
        return item !== void 0;
      });
    });
    console.log("computeeeeeeeeed", computedAttributes.value);
    const mobileFiltersOpen = ref(false);
    useAttrs();
    const brandsFilter = ref([]);
    const attributesFilter = reactive({});
    const sortProducts = ref("");
    const priceRange = reactive(["", ""]);
    watch([brandsFilter, sortProducts, attributesFilter, priceRange], () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        brands: brandsFilter.value,
        sorts: sortProducts.value,
        attributes: attributesFilter,
        priceRange
      }));
      updateFilteredProducts();
    });
    if (window.innerWidth < 1024) {
      mobileFiltersOpen.value = false;
    }
    function updateFilteredProducts() {
      let isEmptyPriceRange = priceRange.every((item) => item === "");
      router.get(route("products_page", { subSubcategory: props.subSubcategory.slug }), {
        brands: brandsFilter.value,
        sorts: sortProducts.value,
        ...attributesFilter,
        price: !isEmptyPriceRange ? {
          from: priceRange[0],
          to: priceRange[1]
        } : null
      }, {
        preserveState: true,
        preserveScroll: true
      });
    }
    function addVariable(name, value) {
      if (attributesFilter[name]) {
        if (attributesFilter[name].includes(value)) {
          attributesFilter[name] = attributesFilter[name].filter((item) => item !== value);
        } else {
          attributesFilter[name].push(value);
        }
      } else {
        attributesFilter[name] = [value];
      }
    }
    function isOptionSelected(attribute, value) {
      return attributesFilter[attribute] && attributesFilter[attribute].includes(value);
    }
    onMounted(() => {
      const storedParams = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (storedParams) {
        brandsFilter.value = storedParams.brands || [];
        sortProducts.value = storedParams.sorts || "";
        Object.assign(attributesFilter, storedParams.attributes || {});
        Object.assign(priceRange, storedParams.priceRange || ["", ""]);
      }
    });
    onBeforeUnmount(() => {
      localStorage.removeItem(STORAGE_KEY);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-white"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              open: mobileFiltersOpen.value,
              title: _ctx.__("filter"),
              class: "lg:hidden",
              onClose: ($event) => mobileFiltersOpen.value = false
            }, {
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="px-4"${_scopeId2}><form class="block"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Disclosure), {
                    as: "div",
                    class: "border-b border-gray-200 py-6"
                  }, {
                    default: withCtx(({ open }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h3 class="-my-3 flow-root"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(DisclosureButton), { class: "flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="font-medium text-gray-900"${_scopeId4}>${ssrInterpolate(_ctx.__("price"))}</span><span class="ml-6 flex items-center"${_scopeId4}>`);
                              if (!open) {
                                _push5(ssrRenderComponent(unref(PlusIcon), {
                                  "aria-hidden": "true",
                                  class: "h-5 w-5"
                                }, null, _parent5, _scopeId4));
                              } else {
                                _push5(ssrRenderComponent(unref(MinusIcon), {
                                  "aria-hidden": "true",
                                  class: "h-5 w-5"
                                }, null, _parent5, _scopeId4));
                              }
                              _push5(`</span>`);
                            } else {
                              return [
                                createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(_ctx.__("price")), 1),
                                createVNode("span", { class: "ml-6 flex items-center" }, [
                                  !open ? (openBlock(), createBlock(unref(PlusIcon), {
                                    key: 0,
                                    "aria-hidden": "true",
                                    class: "h-5 w-5"
                                  })) : (openBlock(), createBlock(unref(MinusIcon), {
                                    key: 1,
                                    "aria-hidden": "true",
                                    class: "h-5 w-5"
                                  }))
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(`</h3>`);
                        _push4(ssrRenderComponent(unref(DisclosurePanel), {
                          unmount: true,
                          class: "pt-6"
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class=""${_scopeId4}><div class="flex justify-around space-x-2"${_scopeId4}><input${ssrRenderAttr("value", priceRange[0])}${ssrRenderAttr("min", 0)} class="w-full rounded-sm h-8" placeholder="min" type="number"${_scopeId4}><input${ssrRenderAttr("value", priceRange[1])}${ssrRenderAttr("min", 0)} class="w-full rounded-sm h-8" placeholder="max" type="number"${_scopeId4}></div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "" }, [
                                  createVNode("div", { class: "flex justify-around space-x-2" }, [
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => priceRange[0] = $event,
                                      min: 0,
                                      class: "w-full rounded-sm h-8",
                                      placeholder: "min",
                                      type: "number"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, priceRange[0]]
                                    ]),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => priceRange[1] = $event,
                                      min: 0,
                                      class: "w-full rounded-sm h-8",
                                      placeholder: "max",
                                      type: "number"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, priceRange[1]]
                                    ])
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("h3", { class: "-my-3 flow-root" }, [
                            createVNode(unref(DisclosureButton), { class: "flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(_ctx.__("price")), 1),
                                createVNode("span", { class: "ml-6 flex items-center" }, [
                                  !open ? (openBlock(), createBlock(unref(PlusIcon), {
                                    key: 0,
                                    "aria-hidden": "true",
                                    class: "h-5 w-5"
                                  })) : (openBlock(), createBlock(unref(MinusIcon), {
                                    key: 1,
                                    "aria-hidden": "true",
                                    class: "h-5 w-5"
                                  }))
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          createVNode(unref(DisclosurePanel), {
                            unmount: true,
                            class: "pt-6"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "" }, [
                                createVNode("div", { class: "flex justify-around space-x-2" }, [
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => priceRange[0] = $event,
                                    min: 0,
                                    class: "w-full rounded-sm h-8",
                                    placeholder: "min",
                                    type: "number"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, priceRange[0]]
                                  ]),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => priceRange[1] = $event,
                                    min: 0,
                                    class: "w-full rounded-sm h-8",
                                    placeholder: "max",
                                    type: "number"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, priceRange[1]]
                                  ])
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.brands, (brand) => {
                    _push3(ssrRenderComponent(unref(Disclosure), {
                      as: "div",
                      class: "border-b border-gray-200 py-6"
                    }, {
                      default: withCtx(({ open }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<h3 class="-my-3 flow-root"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(DisclosureButton), { class: "flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<span class="font-medium text-gray-900"${_scopeId4}>${ssrInterpolate(brand.name)}</span><span class="ml-6 flex items-center"${_scopeId4}>`);
                                if (!open) {
                                  _push5(ssrRenderComponent(unref(PlusIcon), {
                                    "aria-hidden": "true",
                                    class: "h-5 w-5"
                                  }, null, _parent5, _scopeId4));
                                } else {
                                  _push5(ssrRenderComponent(unref(MinusIcon), {
                                    "aria-hidden": "true",
                                    class: "h-5 w-5"
                                  }, null, _parent5, _scopeId4));
                                }
                                _push5(`</span>`);
                              } else {
                                return [
                                  createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(brand.name), 1),
                                  createVNode("span", { class: "ml-6 flex items-center" }, [
                                    !open ? (openBlock(), createBlock(unref(PlusIcon), {
                                      key: 0,
                                      "aria-hidden": "true",
                                      class: "h-5 w-5"
                                    })) : (openBlock(), createBlock(unref(MinusIcon), {
                                      key: 1,
                                      "aria-hidden": "true",
                                      class: "h-5 w-5"
                                    }))
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</h3>`);
                          _push4(ssrRenderComponent(unref(DisclosurePanel), { class: "pt-6" }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="space-y-4"${_scopeId4}><!--[-->`);
                                ssrRenderList(brand.options, (option, optionIdx) => {
                                  _push5(`<div class="flex items-center"${_scopeId4}><input${ssrIncludeBooleanAttr(Array.isArray(brandsFilter.value) ? ssrLooseContain(brandsFilter.value, option.id) : brandsFilter.value) ? " checked" : ""}${ssrRenderAttr("name", option.value)}${ssrRenderAttr("value", option.id)} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" type="checkbox"${_scopeId4}><label${ssrRenderAttr("for", option.value)} class="ml-3 text-sm text-gray-600 first-letter:uppercase"${_scopeId4}>${ssrInterpolate(option.value)}</label></div>`);
                                });
                                _push5(`<!--]--></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "space-y-4" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(brand.options, (option, optionIdx) => {
                                      return openBlock(), createBlock("div", { class: "flex items-center" }, [
                                        withDirectives(createVNode("input", {
                                          "onUpdate:modelValue": ($event) => brandsFilter.value = $event,
                                          name: option.value,
                                          value: option.id,
                                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
                                          type: "checkbox"
                                        }, null, 8, ["onUpdate:modelValue", "name", "value"]), [
                                          [vModelCheckbox, brandsFilter.value]
                                        ]),
                                        createVNode("label", {
                                          for: option.value,
                                          class: "ml-3 text-sm text-gray-600 first-letter:uppercase"
                                        }, toDisplayString(option.value), 9, ["for"])
                                      ]);
                                    }), 256))
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("h3", { class: "-my-3 flow-root" }, [
                              createVNode(unref(DisclosureButton), { class: "flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(brand.name), 1),
                                  createVNode("span", { class: "ml-6 flex items-center" }, [
                                    !open ? (openBlock(), createBlock(unref(PlusIcon), {
                                      key: 0,
                                      "aria-hidden": "true",
                                      class: "h-5 w-5"
                                    })) : (openBlock(), createBlock(unref(MinusIcon), {
                                      key: 1,
                                      "aria-hidden": "true",
                                      class: "h-5 w-5"
                                    }))
                                  ])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            createVNode(unref(DisclosurePanel), { class: "pt-6" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "space-y-4" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(brand.options, (option, optionIdx) => {
                                    return openBlock(), createBlock("div", { class: "flex items-center" }, [
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => brandsFilter.value = $event,
                                        name: option.value,
                                        value: option.id,
                                        class: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
                                        type: "checkbox"
                                      }, null, 8, ["onUpdate:modelValue", "name", "value"]), [
                                        [vModelCheckbox, brandsFilter.value]
                                      ]),
                                      createVNode("label", {
                                        for: option.value,
                                        class: "ml-3 text-sm text-gray-600 first-letter:uppercase"
                                      }, toDisplayString(option.value), 9, ["for"])
                                    ]);
                                  }), 256))
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--><!--[-->`);
                  ssrRenderList(computedAttributes.value, (attribute) => {
                    _push3(ssrRenderComponent(unref(Disclosure), {
                      as: "div",
                      class: "border-b border-gray-200 py-6"
                    }, {
                      default: withCtx(({ open }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<h3 class="-my-3 flow-root"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(DisclosureButton), { class: "flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<span class="font-medium text-gray-900"${_scopeId4}>${ssrInterpolate(attribute.name)}</span><span class="ml-6 flex items-center"${_scopeId4}>`);
                                if (!open) {
                                  _push5(ssrRenderComponent(unref(PlusIcon), {
                                    "aria-hidden": "true",
                                    class: "h-5 w-5"
                                  }, null, _parent5, _scopeId4));
                                } else {
                                  _push5(ssrRenderComponent(unref(MinusIcon), {
                                    "aria-hidden": "true",
                                    class: "h-5 w-5"
                                  }, null, _parent5, _scopeId4));
                                }
                                _push5(`</span>`);
                              } else {
                                return [
                                  createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(attribute.name), 1),
                                  createVNode("span", { class: "ml-6 flex items-center" }, [
                                    !open ? (openBlock(), createBlock(unref(PlusIcon), {
                                      key: 0,
                                      "aria-hidden": "true",
                                      class: "h-5 w-5"
                                    })) : (openBlock(), createBlock(unref(MinusIcon), {
                                      key: 1,
                                      "aria-hidden": "true",
                                      class: "h-5 w-5"
                                    }))
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</h3>`);
                          if (attribute.name) {
                            _push4(ssrRenderComponent(unref(DisclosurePanel), { class: "pt-6" }, {
                              default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="space-y-4"${_scopeId4}><!--[-->`);
                                  ssrRenderList(attribute.options, (option) => {
                                    _push5(`<div class="flex items-center"${_scopeId4}><input${ssrIncludeBooleanAttr(isOptionSelected(attribute.key, option.id)) ? " checked" : ""}${ssrRenderAttr("name", option.value)}${ssrRenderAttr("value", option.id)} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" type="checkbox"${_scopeId4}><label${ssrRenderAttr("for", option.value)} class="ml-3 text-sm text-gray-600 first-letter:uppercase"${_scopeId4}>${ssrInterpolate(option.value)}</label></div>`);
                                  });
                                  _push5(`<!--]--></div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "space-y-4" }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(attribute.options, (option) => {
                                        return openBlock(), createBlock("div", { class: "flex items-center" }, [
                                          createVNode("input", {
                                            checked: isOptionSelected(attribute.key, option.id),
                                            name: option.value,
                                            value: option.id,
                                            class: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
                                            type: "checkbox",
                                            onChange: ($event) => addVariable(attribute.key, option.id)
                                          }, null, 40, ["checked", "name", "value", "onChange"]),
                                          createVNode("label", {
                                            for: option.value,
                                            class: "ml-3 text-sm text-gray-600 first-letter:uppercase"
                                          }, toDisplayString(option.value), 9, ["for"])
                                        ]);
                                      }), 256))
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            createVNode("h3", { class: "-my-3 flow-root" }, [
                              createVNode(unref(DisclosureButton), { class: "flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(attribute.name), 1),
                                  createVNode("span", { class: "ml-6 flex items-center" }, [
                                    !open ? (openBlock(), createBlock(unref(PlusIcon), {
                                      key: 0,
                                      "aria-hidden": "true",
                                      class: "h-5 w-5"
                                    })) : (openBlock(), createBlock(unref(MinusIcon), {
                                      key: 1,
                                      "aria-hidden": "true",
                                      class: "h-5 w-5"
                                    }))
                                  ])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            attribute.name ? (openBlock(), createBlock(unref(DisclosurePanel), {
                              key: 0,
                              class: "pt-6"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "space-y-4" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(attribute.options, (option) => {
                                    return openBlock(), createBlock("div", { class: "flex items-center" }, [
                                      createVNode("input", {
                                        checked: isOptionSelected(attribute.key, option.id),
                                        name: option.value,
                                        value: option.id,
                                        class: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
                                        type: "checkbox",
                                        onChange: ($event) => addVariable(attribute.key, option.id)
                                      }, null, 40, ["checked", "name", "value", "onChange"]),
                                      createVNode("label", {
                                        for: option.value,
                                        class: "ml-3 text-sm text-gray-600 first-letter:uppercase"
                                      }, toDisplayString(option.value), 9, ["for"])
                                    ]);
                                  }), 256))
                                ])
                              ]),
                              _: 2
                            }, 1024)) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></form></div>`);
                } else {
                  return [
                    createVNode("div", { class: "px-4" }, [
                      createVNode("form", { class: "block" }, [
                        createVNode(unref(Disclosure), {
                          as: "div",
                          class: "border-b border-gray-200 py-6"
                        }, {
                          default: withCtx(({ open }) => [
                            createVNode("h3", { class: "-my-3 flow-root" }, [
                              createVNode(unref(DisclosureButton), { class: "flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(_ctx.__("price")), 1),
                                  createVNode("span", { class: "ml-6 flex items-center" }, [
                                    !open ? (openBlock(), createBlock(unref(PlusIcon), {
                                      key: 0,
                                      "aria-hidden": "true",
                                      class: "h-5 w-5"
                                    })) : (openBlock(), createBlock(unref(MinusIcon), {
                                      key: 1,
                                      "aria-hidden": "true",
                                      class: "h-5 w-5"
                                    }))
                                  ])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            createVNode(unref(DisclosurePanel), {
                              unmount: true,
                              class: "pt-6"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "" }, [
                                  createVNode("div", { class: "flex justify-around space-x-2" }, [
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => priceRange[0] = $event,
                                      min: 0,
                                      class: "w-full rounded-sm h-8",
                                      placeholder: "min",
                                      type: "number"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, priceRange[0]]
                                    ]),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => priceRange[1] = $event,
                                      min: 0,
                                      class: "w-full rounded-sm h-8",
                                      placeholder: "max",
                                      type: "number"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, priceRange[1]]
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.brands, (brand) => {
                          return openBlock(), createBlock(unref(Disclosure), {
                            as: "div",
                            class: "border-b border-gray-200 py-6"
                          }, {
                            default: withCtx(({ open }) => [
                              createVNode("h3", { class: "-my-3 flow-root" }, [
                                createVNode(unref(DisclosureButton), { class: "flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(brand.name), 1),
                                    createVNode("span", { class: "ml-6 flex items-center" }, [
                                      !open ? (openBlock(), createBlock(unref(PlusIcon), {
                                        key: 0,
                                        "aria-hidden": "true",
                                        class: "h-5 w-5"
                                      })) : (openBlock(), createBlock(unref(MinusIcon), {
                                        key: 1,
                                        "aria-hidden": "true",
                                        class: "h-5 w-5"
                                      }))
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              createVNode(unref(DisclosurePanel), { class: "pt-6" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "space-y-4" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(brand.options, (option, optionIdx) => {
                                      return openBlock(), createBlock("div", { class: "flex items-center" }, [
                                        withDirectives(createVNode("input", {
                                          "onUpdate:modelValue": ($event) => brandsFilter.value = $event,
                                          name: option.value,
                                          value: option.id,
                                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
                                          type: "checkbox"
                                        }, null, 8, ["onUpdate:modelValue", "name", "value"]), [
                                          [vModelCheckbox, brandsFilter.value]
                                        ]),
                                        createVNode("label", {
                                          for: option.value,
                                          class: "ml-3 text-sm text-gray-600 first-letter:uppercase"
                                        }, toDisplayString(option.value), 9, ["for"])
                                      ]);
                                    }), 256))
                                  ])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024);
                        }), 256)),
                        (openBlock(true), createBlock(Fragment, null, renderList(computedAttributes.value, (attribute) => {
                          return openBlock(), createBlock(unref(Disclosure), {
                            as: "div",
                            class: "border-b border-gray-200 py-6"
                          }, {
                            default: withCtx(({ open }) => [
                              createVNode("h3", { class: "-my-3 flow-root" }, [
                                createVNode(unref(DisclosureButton), { class: "flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(attribute.name), 1),
                                    createVNode("span", { class: "ml-6 flex items-center" }, [
                                      !open ? (openBlock(), createBlock(unref(PlusIcon), {
                                        key: 0,
                                        "aria-hidden": "true",
                                        class: "h-5 w-5"
                                      })) : (openBlock(), createBlock(unref(MinusIcon), {
                                        key: 1,
                                        "aria-hidden": "true",
                                        class: "h-5 w-5"
                                      }))
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              attribute.name ? (openBlock(), createBlock(unref(DisclosurePanel), {
                                key: 0,
                                class: "pt-6"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "space-y-4" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(attribute.options, (option) => {
                                      return openBlock(), createBlock("div", { class: "flex items-center" }, [
                                        createVNode("input", {
                                          checked: isOptionSelected(attribute.key, option.id),
                                          name: option.value,
                                          value: option.id,
                                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
                                          type: "checkbox",
                                          onChange: ($event) => addVariable(attribute.key, option.id)
                                        }, null, 40, ["checked", "name", "value", "onChange"]),
                                        createVNode("label", {
                                          for: option.value,
                                          class: "ml-3 text-sm text-gray-600 first-letter:uppercase"
                                        }, toDisplayString(option.value), 9, ["for"])
                                      ]);
                                    }), 256))
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024);
                        }), 256))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<main class="mx-auto max-w-full px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark"${_scopeId}><div class="flex items-center justify-between border-b border-gray-200 pb-2 pt-4 text-dark dark:text-white"${_scopeId}><h1 class="font-mulish font-bold text-lg md:text-xl lg:text-2xl"${_scopeId}>${ssrInterpolate(__props.subSubcategory.name)}</h1><div class="flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Menu), {
              as: "div",
              class: "relative inline-block text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(MenuButton), { class: "group inline-flex justify-center text-sm font-medium text-gray-400 hover:text-gray-500" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="hidden sm:flex"${_scopeId3}>${ssrInterpolate(_ctx.__("sort"))}</span><span class="flex sm:hidden"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(PresentationChartBarIcon), {
                          "aria-hidden": "true",
                          class: "h-5 w-5"
                        }, null, _parent4, _scopeId3));
                        _push4(`</span>`);
                        _push4(ssrRenderComponent(unref(ChevronDownIcon), {
                          "aria-hidden": "true",
                          class: "-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("span", { class: "hidden sm:flex" }, toDisplayString(_ctx.__("sort")), 1),
                          createVNode("span", { class: "flex sm:hidden" }, [
                            createVNode(unref(PresentationChartBarIcon), {
                              "aria-hidden": "true",
                              class: "h-5 w-5"
                            })
                          ]),
                          createVNode(unref(ChevronDownIcon), {
                            "aria-hidden": "true",
                            class: "-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(MenuItems), { class: "absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="py-1"${_scopeId3}><!--[-->`);
                        ssrRenderList(sortOptions, (option) => {
                          _push4(ssrRenderComponent(unref(MenuItem), {
                            key: option.name
                          }, {
                            default: withCtx(({ active }, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<span class="${ssrRenderClass([[option.current ? "font-medium text-gray-900" : "text-gray-500", active ? "bg-gray-100" : "", "block px-4 py-2 text-sm"], "cursor-pointer"])}"${_scopeId4}>${ssrInterpolate(option.name)}</span>`);
                              } else {
                                return [
                                  createVNode("span", {
                                    class: [[option.current ? "font-medium text-gray-900" : "text-gray-500", active ? "bg-gray-100" : "", "block px-4 py-2 text-sm"], "cursor-pointer"],
                                    onClick: ($event) => sortProducts.value = option.value
                                  }, toDisplayString(option.name), 11, ["onClick"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]--></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "py-1" }, [
                            (openBlock(), createBlock(Fragment, null, renderList(sortOptions, (option) => {
                              return createVNode(unref(MenuItem), {
                                key: option.name
                              }, {
                                default: withCtx(({ active }) => [
                                  createVNode("span", {
                                    class: [[option.current ? "font-medium text-gray-900" : "text-gray-500", active ? "bg-gray-100" : "", "block px-4 py-2 text-sm"], "cursor-pointer"],
                                    onClick: ($event) => sortProducts.value = option.value
                                  }, toDisplayString(option.name), 11, ["onClick"])
                                ]),
                                _: 2
                              }, 1024);
                            }), 64))
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode(unref(MenuButton), { class: "group inline-flex justify-center text-sm font-medium text-gray-400 hover:text-gray-500" }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "hidden sm:flex" }, toDisplayString(_ctx.__("sort")), 1),
                          createVNode("span", { class: "flex sm:hidden" }, [
                            createVNode(unref(PresentationChartBarIcon), {
                              "aria-hidden": "true",
                              class: "h-5 w-5"
                            })
                          ]),
                          createVNode(unref(ChevronDownIcon), {
                            "aria-hidden": "true",
                            class: "-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(Transition, {
                      "enter-active-class": "transition ease-out duration-100",
                      "enter-from-class": "transform opacity-0 scale-95",
                      "enter-to-class": "transform opacity-100 scale-100",
                      "leave-active-class": "transition ease-in duration-75",
                      "leave-from-class": "transform opacity-100 scale-100",
                      "leave-to-class": "transform opacity-0 scale-95"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(MenuItems), { class: "absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "py-1" }, [
                              (openBlock(), createBlock(Fragment, null, renderList(sortOptions, (option) => {
                                return createVNode(unref(MenuItem), {
                                  key: option.name
                                }, {
                                  default: withCtx(({ active }) => [
                                    createVNode("span", {
                                      class: [[option.current ? "font-medium text-gray-900" : "text-gray-500", active ? "bg-gray-100" : "", "block px-4 py-2 text-sm"], "cursor-pointer"],
                                      onClick: ($event) => sortProducts.value = option.value
                                    }, toDisplayString(option.name), 11, ["onClick"])
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 64))
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden" type="button"${_scopeId}><span class="sr-only"${_scopeId}>Filters</span>`);
            _push2(ssrRenderComponent(unref(FunnelIcon), {
              "aria-hidden": "true",
              class: "h-5 w-5"
            }, null, _parent2, _scopeId));
            _push2(`</button></div></div><section aria-labelledby="products-heading" class="pb-24 pt-6"${_scopeId}><h2 id="products-heading" class="sr-only"${_scopeId}>${ssrInterpolate(_ctx.__("products"))}</h2><div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-6"${_scopeId}><form class="hidden lg:block"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Disclosure), {
              as: "div",
              class: "border-b border-gray-200 py-6"
            }, {
              default: withCtx(({ open }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h3 class="-my-3 flow-root"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(DisclosureButton), { class: "flex w-full items-center justify-between bg-white py-3 text-gray-400 hover:text-gray-500 dark:bg-dark" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-xs 2xl:text-sm 4xl:text-base text-gray-900 dark:text-slate-200"${_scopeId3}>${ssrInterpolate(_ctx.__("price"))}</span><span class="ml-6 flex items-center"${_scopeId3}>`);
                        if (!open) {
                          _push4(ssrRenderComponent(unref(PlusIcon), {
                            "aria-hidden": "true",
                            class: "h-5 w-5"
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(unref(MinusIcon), {
                            "aria-hidden": "true",
                            class: "h-5 w-5"
                          }, null, _parent4, _scopeId3));
                        }
                        _push4(`</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-xs 2xl:text-sm 4xl:text-base text-gray-900 dark:text-slate-200" }, toDisplayString(_ctx.__("price")), 1),
                          createVNode("span", { class: "ml-6 flex items-center" }, [
                            !open ? (openBlock(), createBlock(unref(PlusIcon), {
                              key: 0,
                              "aria-hidden": "true",
                              class: "h-5 w-5"
                            })) : (openBlock(), createBlock(unref(MinusIcon), {
                              key: 1,
                              "aria-hidden": "true",
                              class: "h-5 w-5"
                            }))
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</h3>`);
                  _push3(ssrRenderComponent(unref(DisclosurePanel), {
                    unmount: true,
                    class: "pt-6"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class=""${_scopeId3}><div class="flex justify-around space-x-2"${_scopeId3}><input${ssrRenderAttr("value", priceRange[0])}${ssrRenderAttr("min", 0)} class="w-full rounded-sm h-8" placeholder="min" type="number"${_scopeId3}><input${ssrRenderAttr("value", priceRange[1])}${ssrRenderAttr("min", 0)} class="w-full rounded-sm h-8" placeholder="max" type="number"${_scopeId3}></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "" }, [
                            createVNode("div", { class: "flex justify-around space-x-2" }, [
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => priceRange[0] = $event,
                                min: 0,
                                class: "w-full rounded-sm h-8",
                                placeholder: "min",
                                type: "number"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, priceRange[0]]
                              ]),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => priceRange[1] = $event,
                                min: 0,
                                class: "w-full rounded-sm h-8",
                                placeholder: "max",
                                type: "number"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, priceRange[1]]
                              ])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h3", { class: "-my-3 flow-root" }, [
                      createVNode(unref(DisclosureButton), { class: "flex w-full items-center justify-between bg-white py-3 text-gray-400 hover:text-gray-500 dark:bg-dark" }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "text-xs 2xl:text-sm 4xl:text-base text-gray-900 dark:text-slate-200" }, toDisplayString(_ctx.__("price")), 1),
                          createVNode("span", { class: "ml-6 flex items-center" }, [
                            !open ? (openBlock(), createBlock(unref(PlusIcon), {
                              key: 0,
                              "aria-hidden": "true",
                              class: "h-5 w-5"
                            })) : (openBlock(), createBlock(unref(MinusIcon), {
                              key: 1,
                              "aria-hidden": "true",
                              class: "h-5 w-5"
                            }))
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    createVNode(unref(DisclosurePanel), {
                      unmount: true,
                      class: "pt-6"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "" }, [
                          createVNode("div", { class: "flex justify-around space-x-2" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => priceRange[0] = $event,
                              min: 0,
                              class: "w-full rounded-sm h-8",
                              placeholder: "min",
                              type: "number"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, priceRange[0]]
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => priceRange[1] = $event,
                              min: 0,
                              class: "w-full rounded-sm h-8",
                              placeholder: "max",
                              type: "number"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, priceRange[1]]
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(__props.brands, (brand) => {
              _push2(ssrRenderComponent(unref(Disclosure), {
                as: "div",
                class: "border-b border-gray-200 py-6"
              }, {
                default: withCtx(({ open }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h3 class="-my-3 flow-root"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(DisclosureButton), { class: "flex w-full items-center justify-between dark:bg-dark py-3 text-gray-400 hover:text-gray-500" }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="text-xs 2xl:text-sm 4xl:text-base text-gray-900 dark:text-slate-200"${_scopeId3}>${ssrInterpolate(brand.name)}</span><span class="ml-6 flex items-center"${_scopeId3}>`);
                          if (!open) {
                            _push4(ssrRenderComponent(unref(PlusIcon), {
                              "aria-hidden": "true",
                              class: "h-5 w-5"
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(unref(MinusIcon), {
                              "aria-hidden": "true",
                              class: "h-5 w-5"
                            }, null, _parent4, _scopeId3));
                          }
                          _push4(`</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "text-xs 2xl:text-sm 4xl:text-base text-gray-900 dark:text-slate-200" }, toDisplayString(brand.name), 1),
                            createVNode("span", { class: "ml-6 flex items-center" }, [
                              !open ? (openBlock(), createBlock(unref(PlusIcon), {
                                key: 0,
                                "aria-hidden": "true",
                                class: "h-5 w-5"
                              })) : (openBlock(), createBlock(unref(MinusIcon), {
                                key: 1,
                                "aria-hidden": "true",
                                class: "h-5 w-5"
                              }))
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</h3>`);
                    _push3(ssrRenderComponent(unref(DisclosurePanel), { class: "pt-6" }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="space-y-4"${_scopeId3}><!--[-->`);
                          ssrRenderList(brand.options, (option, optionIdx) => {
                            _push4(`<div class="flex items-center"${_scopeId3}><input${ssrIncludeBooleanAttr(Array.isArray(brandsFilter.value) ? ssrLooseContain(brandsFilter.value, option.id) : brandsFilter.value) ? " checked" : ""}${ssrRenderAttr("name", option.value)}${ssrRenderAttr("value", option.id)} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" type="checkbox"${_scopeId3}><label${ssrRenderAttr("for", option.value)} class="ml-3 text-sm text-gray-600 first-letter:uppercase"${_scopeId3}>${ssrInterpolate(`${option.value} (${option.count})`)}</label></div>`);
                          });
                          _push4(`<!--]--></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "space-y-4" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(brand.options, (option, optionIdx) => {
                                return openBlock(), createBlock("div", { class: "flex items-center" }, [
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => brandsFilter.value = $event,
                                    name: option.value,
                                    value: option.id,
                                    class: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
                                    type: "checkbox"
                                  }, null, 8, ["onUpdate:modelValue", "name", "value"]), [
                                    [vModelCheckbox, brandsFilter.value]
                                  ]),
                                  createVNode("label", {
                                    for: option.value,
                                    class: "ml-3 text-sm text-gray-600 first-letter:uppercase"
                                  }, toDisplayString(`${option.value} (${option.count})`), 9, ["for"])
                                ]);
                              }), 256))
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("h3", { class: "-my-3 flow-root" }, [
                        createVNode(unref(DisclosureButton), { class: "flex w-full items-center justify-between dark:bg-dark py-3 text-gray-400 hover:text-gray-500" }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "text-xs 2xl:text-sm 4xl:text-base text-gray-900 dark:text-slate-200" }, toDisplayString(brand.name), 1),
                            createVNode("span", { class: "ml-6 flex items-center" }, [
                              !open ? (openBlock(), createBlock(unref(PlusIcon), {
                                key: 0,
                                "aria-hidden": "true",
                                class: "h-5 w-5"
                              })) : (openBlock(), createBlock(unref(MinusIcon), {
                                key: 1,
                                "aria-hidden": "true",
                                class: "h-5 w-5"
                              }))
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      createVNode(unref(DisclosurePanel), { class: "pt-6" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-4" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(brand.options, (option, optionIdx) => {
                              return openBlock(), createBlock("div", { class: "flex items-center" }, [
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => brandsFilter.value = $event,
                                  name: option.value,
                                  value: option.id,
                                  class: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
                                  type: "checkbox"
                                }, null, 8, ["onUpdate:modelValue", "name", "value"]), [
                                  [vModelCheckbox, brandsFilter.value]
                                ]),
                                createVNode("label", {
                                  for: option.value,
                                  class: "ml-3 text-sm text-gray-600 first-letter:uppercase"
                                }, toDisplayString(`${option.value} (${option.count})`), 9, ["for"])
                              ]);
                            }), 256))
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--><!--[-->`);
            ssrRenderList(computedAttributes.value, (attribute) => {
              _push2(ssrRenderComponent(unref(Disclosure), {
                as: "div",
                class: "border-b border-gray-200 py-6"
              }, {
                default: withCtx(({ open }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h3 class="-my-3 flow-root"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(DisclosureButton), { class: "flex w-full items-center justify-between dark:bg-dark py-3 text-gray-400 hover:text-gray-500" }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="text-xs 2xl:text-sm 4xl:text-base text-gray-900 dark:text-slate-200"${_scopeId3}>${ssrInterpolate(attribute.name)}</span><span class="ml-6 flex items-center"${_scopeId3}>`);
                          if (!open) {
                            _push4(ssrRenderComponent(unref(PlusIcon), {
                              "aria-hidden": "true",
                              class: "h-5 w-5"
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(unref(MinusIcon), {
                              "aria-hidden": "true",
                              class: "h-5 w-5"
                            }, null, _parent4, _scopeId3));
                          }
                          _push4(`</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "text-xs 2xl:text-sm 4xl:text-base text-gray-900 dark:text-slate-200" }, toDisplayString(attribute.name), 1),
                            createVNode("span", { class: "ml-6 flex items-center" }, [
                              !open ? (openBlock(), createBlock(unref(PlusIcon), {
                                key: 0,
                                "aria-hidden": "true",
                                class: "h-5 w-5"
                              })) : (openBlock(), createBlock(unref(MinusIcon), {
                                key: 1,
                                "aria-hidden": "true",
                                class: "h-5 w-5"
                              }))
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</h3>`);
                    _push3(ssrRenderComponent(unref(DisclosurePanel), { class: "pt-6" }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="space-y-4"${_scopeId3}><!--[-->`);
                          ssrRenderList(attribute.options, (option) => {
                            _push4(`<div class="flex items-center"${_scopeId3}><input${ssrIncludeBooleanAttr(isOptionSelected(attribute.key, option.id)) ? " checked" : ""}${ssrRenderAttr("name", option.value)}${ssrRenderAttr("value", option.id)} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" type="checkbox"${_scopeId3}><label${ssrRenderAttr("for", option.value)} class="ml-3 text-sm text-gray-600 first-letter:uppercase"${_scopeId3}>`);
                            if (option.value == 1) {
                              _push4(`<!--[-->${ssrInterpolate(_ctx.__("yes"))}<!--]-->`);
                            } else {
                              _push4(`<!--[-->${ssrInterpolate(option.value)}<!--]-->`);
                            }
                            _push4(`</label></div>`);
                          });
                          _push4(`<!--]--></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "space-y-4" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(attribute.options, (option) => {
                                return openBlock(), createBlock("div", { class: "flex items-center" }, [
                                  createVNode("input", {
                                    checked: isOptionSelected(attribute.key, option.id),
                                    name: option.value,
                                    value: option.id,
                                    class: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
                                    type: "checkbox",
                                    onChange: ($event) => addVariable(attribute.key, option.id)
                                  }, null, 40, ["checked", "name", "value", "onChange"]),
                                  createVNode("label", {
                                    for: option.value,
                                    class: "ml-3 text-sm text-gray-600 first-letter:uppercase"
                                  }, [
                                    option.value == 1 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                      createTextVNode(toDisplayString(_ctx.__("yes")), 1)
                                    ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                      createTextVNode(toDisplayString(option.value), 1)
                                    ], 64))
                                  ], 8, ["for"])
                                ]);
                              }), 256))
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("h3", { class: "-my-3 flow-root" }, [
                        createVNode(unref(DisclosureButton), { class: "flex w-full items-center justify-between dark:bg-dark py-3 text-gray-400 hover:text-gray-500" }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "text-xs 2xl:text-sm 4xl:text-base text-gray-900 dark:text-slate-200" }, toDisplayString(attribute.name), 1),
                            createVNode("span", { class: "ml-6 flex items-center" }, [
                              !open ? (openBlock(), createBlock(unref(PlusIcon), {
                                key: 0,
                                "aria-hidden": "true",
                                class: "h-5 w-5"
                              })) : (openBlock(), createBlock(unref(MinusIcon), {
                                key: 1,
                                "aria-hidden": "true",
                                class: "h-5 w-5"
                              }))
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      createVNode(unref(DisclosurePanel), { class: "pt-6" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-4" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(attribute.options, (option) => {
                              return openBlock(), createBlock("div", { class: "flex items-center" }, [
                                createVNode("input", {
                                  checked: isOptionSelected(attribute.key, option.id),
                                  name: option.value,
                                  value: option.id,
                                  class: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
                                  type: "checkbox",
                                  onChange: ($event) => addVariable(attribute.key, option.id)
                                }, null, 40, ["checked", "name", "value", "onChange"]),
                                createVNode("label", {
                                  for: option.value,
                                  class: "ml-3 text-sm text-gray-600 first-letter:uppercase"
                                }, [
                                  option.value == 1 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                    createTextVNode(toDisplayString(_ctx.__("yes")), 1)
                                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                    createTextVNode(toDisplayString(option.value), 1)
                                  ], 64))
                                ], 8, ["for"])
                              ]);
                            }), 256))
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></form>`);
            if (__props.products.data.length > 0) {
              _push2(`<div class="md:grid-cols-3 lg:col-span-5"${_scopeId}><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:col-span-4 2xl:grid-cols-3 4xl:grid-cols-4 gap-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.products.data, (product) => {
                _push2(`<div${_scopeId}><div class="container-rounded bg-3 relative group/card xl:min-h-[27.5rem]"${_scopeId}><div class="absolute w-full -top-0 left-0"${_scopeId}><div class="flex justify-center"${_scopeId}><div class="flex items-center rounded-b-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-10 py-0.5 p h-auto shadow border-1 border-slate-600"${_scopeId}><span class="text-xs text-white font-semibold"${_scopeId}>${ssrInterpolate(_ctx.__("credit"))} 0%</span></div></div></div><div class="hover:cursor-pointer pb-2"${_scopeId}><div${_scopeId}><div class="static"${_scopeId}><div class="w-12 absolute left-2 top-2 z-80"${_scopeId}><img${ssrRenderAttr("alt", product.brand.name)}${ssrRenderAttr("src", product.brand.image)} class="mix-blend-multiply"${_scopeId}></div><div class="absolute group right-2 top-2 bg-white rounded-xl p-2 bg-opacity-40 cursor-pointer"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(HeartIcon), {
                  class: [{ "text-red-500 fill-red-500": unref(wishlistStore).checkIfProductExistInWishlist(product.id) }, "w-4 group-hover:text-red-500 group-hover:fill-red-500"]
                }, null, _parent2, _scopeId));
                _push2(`</div></div></div>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("product_page", { slug: product.slug })
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div${_scopeId2}><div class="mt-2"${_scopeId2}><img${ssrRenderAttr("src", product.images[0].image1)} alt="Product Image" class="transition hover:scale-110 w-56 h-56 mx-auto aspect-square object-contain opacity-100 mix-blend-multiply"${_scopeId2}></div></div><div class="relative my-8 md:my-6"${_scopeId2}><p class="font-mulish font-bold text-shadow-lg text-xs md:text-lg text-black"${_scopeId2}>${ssrInterpolate(product.name.slice(0, 42) + "...")}</p></div>`);
                    } else {
                      return [
                        createVNode("div", null, [
                          createVNode("div", { class: "mt-2" }, [
                            createVNode("img", {
                              src: product.images[0].image1,
                              alt: "Product Image",
                              class: "transition hover:scale-110 w-56 h-56 mx-auto aspect-square object-contain opacity-100 mix-blend-multiply"
                            }, null, 8, ["src"])
                          ])
                        ]),
                        createVNode("div", { class: "relative my-8 md:my-6" }, [
                          createVNode("p", { class: "font-mulish font-bold text-shadow-lg text-xs md:text-lg text-black" }, toDisplayString(product.name.slice(0, 42) + "..."), 1)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div><div class="absolute bottom-2 left-2 right-2 flex justify-between items-center"${_scopeId}><div class="flex flex-col items-start"${_scopeId}>`);
                if (product.has_discount) {
                  _push2(`<div class="flex flex-row space-x-1"${_scopeId}><p class="font-mulish text-sm line-through font-medium"${_scopeId}>${ssrInterpolate(unref(formatPrice)(product.price))} ${ssrInterpolate(_ctx.__("lei"))}</p><span class="bg-red-400 text-white text-xs font-medium me-2 px-0.5 sm:px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"${_scopeId}>${ssrInterpolate(product.sale)}</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (product.promotion_price) {
                  _push2(`<p class="font-mulish text-xl font-medium"${_scopeId}>${ssrInterpolate(unref(formatPrice)(product.promotion_price))} ${ssrInterpolate(_ctx.__("lei"))}</p>`);
                } else {
                  _push2(`<p class="font-mulish text-xl font-medium"${_scopeId}>${ssrInterpolate(unref(formatPrice)(product.price))} ${ssrInterpolate(_ctx.__("lei"))}</p>`);
                }
                _push2(`</div><div class="${ssrRenderClass([unref(cartStore).checkIfProductExistInCart(product.id) ? "bg-[#1FC8F3]" : "bg-white", "shadow rounded-lg transition p-4 sm:p-4 hover:scale-110 hover:bg-[#1FC8F3] cursor-pointer group/cart"])}"${_scopeId}><svg class="${ssrRenderClass([unref(cartStore).checkIfProductExistInCart(product.id) ? "text-white" : "text-black", "h-4 w-4 group-hover/cart:text-white"])}" fill="currentColor" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"${_scopeId}></path></svg></div></div></div></div>`);
              });
              _push2(`<!--]--></div><div class="flex place-content-center p-4 mt-4"${_scopeId}>`);
              if (__props.products.links) {
                _push2(ssrRenderComponent(Pagination, {
                  links: __props.products.links
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.products.data.length <= 0) {
              _push2(`<div class="lg:col-span-3 mx-auto"${_scopeId}><p class="text-2xl py-12 font-bold text-gray-500"${_scopeId}>${ssrInterpolate(_ctx.__("no_products"))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></section></main></div></div>`);
          } else {
            return [
              createVNode("div", { class: "bg-white" }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$2, {
                    open: mobileFiltersOpen.value,
                    title: _ctx.__("filter"),
                    class: "lg:hidden",
                    onClose: ($event) => mobileFiltersOpen.value = false
                  }, {
                    content: withCtx(() => [
                      createVNode("div", { class: "px-4" }, [
                        createVNode("form", { class: "block" }, [
                          createVNode(unref(Disclosure), {
                            as: "div",
                            class: "border-b border-gray-200 py-6"
                          }, {
                            default: withCtx(({ open }) => [
                              createVNode("h3", { class: "-my-3 flow-root" }, [
                                createVNode(unref(DisclosureButton), { class: "flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(_ctx.__("price")), 1),
                                    createVNode("span", { class: "ml-6 flex items-center" }, [
                                      !open ? (openBlock(), createBlock(unref(PlusIcon), {
                                        key: 0,
                                        "aria-hidden": "true",
                                        class: "h-5 w-5"
                                      })) : (openBlock(), createBlock(unref(MinusIcon), {
                                        key: 1,
                                        "aria-hidden": "true",
                                        class: "h-5 w-5"
                                      }))
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              createVNode(unref(DisclosurePanel), {
                                unmount: true,
                                class: "pt-6"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "" }, [
                                    createVNode("div", { class: "flex justify-around space-x-2" }, [
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => priceRange[0] = $event,
                                        min: 0,
                                        class: "w-full rounded-sm h-8",
                                        placeholder: "min",
                                        type: "number"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, priceRange[0]]
                                      ]),
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => priceRange[1] = $event,
                                        min: 0,
                                        class: "w-full rounded-sm h-8",
                                        placeholder: "max",
                                        type: "number"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, priceRange[1]]
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.brands, (brand) => {
                            return openBlock(), createBlock(unref(Disclosure), {
                              as: "div",
                              class: "border-b border-gray-200 py-6"
                            }, {
                              default: withCtx(({ open }) => [
                                createVNode("h3", { class: "-my-3 flow-root" }, [
                                  createVNode(unref(DisclosureButton), { class: "flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(brand.name), 1),
                                      createVNode("span", { class: "ml-6 flex items-center" }, [
                                        !open ? (openBlock(), createBlock(unref(PlusIcon), {
                                          key: 0,
                                          "aria-hidden": "true",
                                          class: "h-5 w-5"
                                        })) : (openBlock(), createBlock(unref(MinusIcon), {
                                          key: 1,
                                          "aria-hidden": "true",
                                          class: "h-5 w-5"
                                        }))
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                createVNode(unref(DisclosurePanel), { class: "pt-6" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "space-y-4" }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(brand.options, (option, optionIdx) => {
                                        return openBlock(), createBlock("div", { class: "flex items-center" }, [
                                          withDirectives(createVNode("input", {
                                            "onUpdate:modelValue": ($event) => brandsFilter.value = $event,
                                            name: option.value,
                                            value: option.id,
                                            class: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
                                            type: "checkbox"
                                          }, null, 8, ["onUpdate:modelValue", "name", "value"]), [
                                            [vModelCheckbox, brandsFilter.value]
                                          ]),
                                          createVNode("label", {
                                            for: option.value,
                                            class: "ml-3 text-sm text-gray-600 first-letter:uppercase"
                                          }, toDisplayString(option.value), 9, ["for"])
                                        ]);
                                      }), 256))
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 256)),
                          (openBlock(true), createBlock(Fragment, null, renderList(computedAttributes.value, (attribute) => {
                            return openBlock(), createBlock(unref(Disclosure), {
                              as: "div",
                              class: "border-b border-gray-200 py-6"
                            }, {
                              default: withCtx(({ open }) => [
                                createVNode("h3", { class: "-my-3 flow-root" }, [
                                  createVNode(unref(DisclosureButton), { class: "flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(attribute.name), 1),
                                      createVNode("span", { class: "ml-6 flex items-center" }, [
                                        !open ? (openBlock(), createBlock(unref(PlusIcon), {
                                          key: 0,
                                          "aria-hidden": "true",
                                          class: "h-5 w-5"
                                        })) : (openBlock(), createBlock(unref(MinusIcon), {
                                          key: 1,
                                          "aria-hidden": "true",
                                          class: "h-5 w-5"
                                        }))
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                attribute.name ? (openBlock(), createBlock(unref(DisclosurePanel), {
                                  key: 0,
                                  class: "pt-6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "space-y-4" }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(attribute.options, (option) => {
                                        return openBlock(), createBlock("div", { class: "flex items-center" }, [
                                          createVNode("input", {
                                            checked: isOptionSelected(attribute.key, option.id),
                                            name: option.value,
                                            value: option.id,
                                            class: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
                                            type: "checkbox",
                                            onChange: ($event) => addVariable(attribute.key, option.id)
                                          }, null, 40, ["checked", "name", "value", "onChange"]),
                                          createVNode("label", {
                                            for: option.value,
                                            class: "ml-3 text-sm text-gray-600 first-letter:uppercase"
                                          }, toDisplayString(option.value), 9, ["for"])
                                        ]);
                                      }), 256))
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1024);
                          }), 256))
                        ])
                      ])
                    ]),
                    _: 1
                  }, 8, ["open", "title", "onClose"]),
                  createVNode("main", { class: "mx-auto max-w-full px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark" }, [
                    createVNode("div", { class: "flex items-center justify-between border-b border-gray-200 pb-2 pt-4 text-dark dark:text-white" }, [
                      createVNode("h1", { class: "font-mulish font-bold text-lg md:text-xl lg:text-2xl" }, toDisplayString(__props.subSubcategory.name), 1),
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode(unref(Menu), {
                          as: "div",
                          class: "relative inline-block text-left"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", null, [
                              createVNode(unref(MenuButton), { class: "group inline-flex justify-center text-sm font-medium text-gray-400 hover:text-gray-500" }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "hidden sm:flex" }, toDisplayString(_ctx.__("sort")), 1),
                                  createVNode("span", { class: "flex sm:hidden" }, [
                                    createVNode(unref(PresentationChartBarIcon), {
                                      "aria-hidden": "true",
                                      class: "h-5 w-5"
                                    })
                                  ]),
                                  createVNode(unref(ChevronDownIcon), {
                                    "aria-hidden": "true",
                                    class: "-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode(Transition, {
                              "enter-active-class": "transition ease-out duration-100",
                              "enter-from-class": "transform opacity-0 scale-95",
                              "enter-to-class": "transform opacity-100 scale-100",
                              "leave-active-class": "transition ease-in duration-75",
                              "leave-from-class": "transform opacity-100 scale-100",
                              "leave-to-class": "transform opacity-0 scale-95"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(MenuItems), { class: "absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "py-1" }, [
                                      (openBlock(), createBlock(Fragment, null, renderList(sortOptions, (option) => {
                                        return createVNode(unref(MenuItem), {
                                          key: option.name
                                        }, {
                                          default: withCtx(({ active }) => [
                                            createVNode("span", {
                                              class: [[option.current ? "font-medium text-gray-900" : "text-gray-500", active ? "bg-gray-100" : "", "block px-4 py-2 text-sm"], "cursor-pointer"],
                                              onClick: ($event) => sortProducts.value = option.value
                                            }, toDisplayString(option.name), 11, ["onClick"])
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 64))
                                    ])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("button", {
                          class: "-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden",
                          type: "button",
                          onClick: ($event) => mobileFiltersOpen.value = true
                        }, [
                          createVNode("span", { class: "sr-only" }, "Filters"),
                          createVNode(unref(FunnelIcon), {
                            "aria-hidden": "true",
                            class: "h-5 w-5"
                          })
                        ], 8, ["onClick"])
                      ])
                    ]),
                    createVNode("section", {
                      "aria-labelledby": "products-heading",
                      class: "pb-24 pt-6"
                    }, [
                      createVNode("h2", {
                        id: "products-heading",
                        class: "sr-only"
                      }, toDisplayString(_ctx.__("products")), 1),
                      createVNode("div", { class: "grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-6" }, [
                        createVNode("form", { class: "hidden lg:block" }, [
                          createVNode(unref(Disclosure), {
                            as: "div",
                            class: "border-b border-gray-200 py-6"
                          }, {
                            default: withCtx(({ open }) => [
                              createVNode("h3", { class: "-my-3 flow-root" }, [
                                createVNode(unref(DisclosureButton), { class: "flex w-full items-center justify-between bg-white py-3 text-gray-400 hover:text-gray-500 dark:bg-dark" }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "text-xs 2xl:text-sm 4xl:text-base text-gray-900 dark:text-slate-200" }, toDisplayString(_ctx.__("price")), 1),
                                    createVNode("span", { class: "ml-6 flex items-center" }, [
                                      !open ? (openBlock(), createBlock(unref(PlusIcon), {
                                        key: 0,
                                        "aria-hidden": "true",
                                        class: "h-5 w-5"
                                      })) : (openBlock(), createBlock(unref(MinusIcon), {
                                        key: 1,
                                        "aria-hidden": "true",
                                        class: "h-5 w-5"
                                      }))
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              createVNode(unref(DisclosurePanel), {
                                unmount: true,
                                class: "pt-6"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "" }, [
                                    createVNode("div", { class: "flex justify-around space-x-2" }, [
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => priceRange[0] = $event,
                                        min: 0,
                                        class: "w-full rounded-sm h-8",
                                        placeholder: "min",
                                        type: "number"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, priceRange[0]]
                                      ]),
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => priceRange[1] = $event,
                                        min: 0,
                                        class: "w-full rounded-sm h-8",
                                        placeholder: "max",
                                        type: "number"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, priceRange[1]]
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.brands, (brand) => {
                            return openBlock(), createBlock(unref(Disclosure), {
                              as: "div",
                              class: "border-b border-gray-200 py-6"
                            }, {
                              default: withCtx(({ open }) => [
                                createVNode("h3", { class: "-my-3 flow-root" }, [
                                  createVNode(unref(DisclosureButton), { class: "flex w-full items-center justify-between dark:bg-dark py-3 text-gray-400 hover:text-gray-500" }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "text-xs 2xl:text-sm 4xl:text-base text-gray-900 dark:text-slate-200" }, toDisplayString(brand.name), 1),
                                      createVNode("span", { class: "ml-6 flex items-center" }, [
                                        !open ? (openBlock(), createBlock(unref(PlusIcon), {
                                          key: 0,
                                          "aria-hidden": "true",
                                          class: "h-5 w-5"
                                        })) : (openBlock(), createBlock(unref(MinusIcon), {
                                          key: 1,
                                          "aria-hidden": "true",
                                          class: "h-5 w-5"
                                        }))
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                createVNode(unref(DisclosurePanel), { class: "pt-6" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "space-y-4" }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(brand.options, (option, optionIdx) => {
                                        return openBlock(), createBlock("div", { class: "flex items-center" }, [
                                          withDirectives(createVNode("input", {
                                            "onUpdate:modelValue": ($event) => brandsFilter.value = $event,
                                            name: option.value,
                                            value: option.id,
                                            class: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
                                            type: "checkbox"
                                          }, null, 8, ["onUpdate:modelValue", "name", "value"]), [
                                            [vModelCheckbox, brandsFilter.value]
                                          ]),
                                          createVNode("label", {
                                            for: option.value,
                                            class: "ml-3 text-sm text-gray-600 first-letter:uppercase"
                                          }, toDisplayString(`${option.value} (${option.count})`), 9, ["for"])
                                        ]);
                                      }), 256))
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 256)),
                          (openBlock(true), createBlock(Fragment, null, renderList(computedAttributes.value, (attribute) => {
                            return openBlock(), createBlock(unref(Disclosure), {
                              as: "div",
                              class: "border-b border-gray-200 py-6"
                            }, {
                              default: withCtx(({ open }) => [
                                createVNode("h3", { class: "-my-3 flow-root" }, [
                                  createVNode(unref(DisclosureButton), { class: "flex w-full items-center justify-between dark:bg-dark py-3 text-gray-400 hover:text-gray-500" }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "text-xs 2xl:text-sm 4xl:text-base text-gray-900 dark:text-slate-200" }, toDisplayString(attribute.name), 1),
                                      createVNode("span", { class: "ml-6 flex items-center" }, [
                                        !open ? (openBlock(), createBlock(unref(PlusIcon), {
                                          key: 0,
                                          "aria-hidden": "true",
                                          class: "h-5 w-5"
                                        })) : (openBlock(), createBlock(unref(MinusIcon), {
                                          key: 1,
                                          "aria-hidden": "true",
                                          class: "h-5 w-5"
                                        }))
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                createVNode(unref(DisclosurePanel), { class: "pt-6" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "space-y-4" }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(attribute.options, (option) => {
                                        return openBlock(), createBlock("div", { class: "flex items-center" }, [
                                          createVNode("input", {
                                            checked: isOptionSelected(attribute.key, option.id),
                                            name: option.value,
                                            value: option.id,
                                            class: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
                                            type: "checkbox",
                                            onChange: ($event) => addVariable(attribute.key, option.id)
                                          }, null, 40, ["checked", "name", "value", "onChange"]),
                                          createVNode("label", {
                                            for: option.value,
                                            class: "ml-3 text-sm text-gray-600 first-letter:uppercase"
                                          }, [
                                            option.value == 1 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                              createTextVNode(toDisplayString(_ctx.__("yes")), 1)
                                            ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                              createTextVNode(toDisplayString(option.value), 1)
                                            ], 64))
                                          ], 8, ["for"])
                                        ]);
                                      }), 256))
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 256))
                        ]),
                        __props.products.data.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "md:grid-cols-3 lg:col-span-5"
                        }, [
                          createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:col-span-4 2xl:grid-cols-3 4xl:grid-cols-4 gap-4" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.products.data, (product) => {
                              return openBlock(), createBlock("div", null, [
                                createVNode("div", { class: "container-rounded bg-3 relative group/card xl:min-h-[27.5rem]" }, [
                                  createVNode("div", { class: "absolute w-full -top-0 left-0" }, [
                                    createVNode("div", { class: "flex justify-center" }, [
                                      createVNode("div", { class: "flex items-center rounded-b-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-10 py-0.5 p h-auto shadow border-1 border-slate-600" }, [
                                        createVNode("span", { class: "text-xs text-white font-semibold" }, toDisplayString(_ctx.__("credit")) + " 0%", 1)
                                      ])
                                    ])
                                  ]),
                                  createVNode("div", { class: "hover:cursor-pointer pb-2" }, [
                                    createVNode("div", null, [
                                      createVNode("div", { class: "static" }, [
                                        createVNode("div", { class: "w-12 absolute left-2 top-2 z-80" }, [
                                          createVNode("img", {
                                            alt: product.brand.name,
                                            src: product.brand.image,
                                            class: "mix-blend-multiply"
                                          }, null, 8, ["alt", "src"])
                                        ]),
                                        createVNode("div", {
                                          class: "absolute group right-2 top-2 bg-white rounded-xl p-2 bg-opacity-40 cursor-pointer",
                                          onClick: ($event) => unref(wishlistStore).addProductInWishlist(product.id)
                                        }, [
                                          createVNode(unref(HeartIcon), {
                                            class: [{ "text-red-500 fill-red-500": unref(wishlistStore).checkIfProductExistInWishlist(product.id) }, "w-4 group-hover:text-red-500 group-hover:fill-red-500"]
                                          }, null, 8, ["class"])
                                        ], 8, ["onClick"])
                                      ])
                                    ]),
                                    createVNode(unref(Link), {
                                      href: _ctx.route("product_page", { slug: product.slug })
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", null, [
                                          createVNode("div", { class: "mt-2" }, [
                                            createVNode("img", {
                                              src: product.images[0].image1,
                                              alt: "Product Image",
                                              class: "transition hover:scale-110 w-56 h-56 mx-auto aspect-square object-contain opacity-100 mix-blend-multiply"
                                            }, null, 8, ["src"])
                                          ])
                                        ]),
                                        createVNode("div", { class: "relative my-8 md:my-6" }, [
                                          createVNode("p", { class: "font-mulish font-bold text-shadow-lg text-xs md:text-lg text-black" }, toDisplayString(product.name.slice(0, 42) + "..."), 1)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1032, ["href"])
                                  ]),
                                  createVNode("div", { class: "absolute bottom-2 left-2 right-2 flex justify-between items-center" }, [
                                    createVNode("div", { class: "flex flex-col items-start" }, [
                                      product.has_discount ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "flex flex-row space-x-1"
                                      }, [
                                        createVNode("p", { class: "font-mulish text-sm line-through font-medium" }, toDisplayString(unref(formatPrice)(product.price)) + " " + toDisplayString(_ctx.__("lei")), 1),
                                        createVNode("span", { class: "bg-red-400 text-white text-xs font-medium me-2 px-0.5 sm:px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300" }, toDisplayString(product.sale), 1)
                                      ])) : createCommentVNode("", true),
                                      product.promotion_price ? (openBlock(), createBlock("p", {
                                        key: 1,
                                        class: "font-mulish text-xl font-medium"
                                      }, toDisplayString(unref(formatPrice)(product.promotion_price)) + " " + toDisplayString(_ctx.__("lei")), 1)) : (openBlock(), createBlock("p", {
                                        key: 2,
                                        class: "font-mulish text-xl font-medium"
                                      }, toDisplayString(unref(formatPrice)(product.price)) + " " + toDisplayString(_ctx.__("lei")), 1))
                                    ]),
                                    createVNode("div", {
                                      class: [unref(cartStore).checkIfProductExistInCart(product.id) ? "bg-[#1FC8F3]" : "bg-white", "shadow rounded-lg transition p-4 sm:p-4 hover:scale-110 hover:bg-[#1FC8F3] cursor-pointer group/cart"],
                                      onClick: ($event) => unref(cartStore).addProductInCart(product.id, "default")
                                    }, [
                                      (openBlock(), createBlock("svg", {
                                        class: [unref(cartStore).checkIfProductExistInCart(product.id) ? "text-white" : "text-black", "h-4 w-4 group-hover/cart:text-white"],
                                        fill: "currentColor",
                                        xmlns: "http://www.w3.org/2000/svg"
                                      }, [
                                        createVNode("path", { d: "M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" })
                                      ], 2))
                                    ], 10, ["onClick"])
                                  ])
                                ])
                              ]);
                            }), 256))
                          ]),
                          createVNode("div", { class: "flex place-content-center p-4 mt-4" }, [
                            __props.products.links ? (openBlock(), createBlock(Pagination, {
                              key: 0,
                              links: __props.products.links
                            }, null, 8, ["links"])) : createCommentVNode("", true)
                          ])
                        ])) : createCommentVNode("", true),
                        __props.products.data.length <= 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "lg:col-span-3 mx-auto"
                        }, [
                          createVNode("p", { class: "text-2xl py-12 font-bold text-gray-500" }, toDisplayString(_ctx.__("no_products")), 1)
                        ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/ProductsPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
