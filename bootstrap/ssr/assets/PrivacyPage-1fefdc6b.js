import { unref, mergeProps, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
<<<<<<<< HEAD:bootstrap/ssr/assets/PrivacyPage-41988ac4.js
import { _ as _sfc_main$2 } from "./FrontLayout-fec85b0a.js";
========
import { _ as _sfc_main$2 } from "./FrontLayout-2d8a94b7.js";
>>>>>>>> origin/master:bootstrap/ssr/assets/PrivacyPage-1fefdc6b.js
import { AccordionRoot, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent } from "radix-vue";
import { Icon } from "@iconify/vue";
import "./ApplicationLogo-caba15c6.js";
import "@heroicons/vue/24/outline/index.js";
import "@inertiajs/vue3";
import "pinia";
import "axios";
import "@vueuse/core";
import "@headlessui/vue";
import "./_plugin-vue_export-helper-cc2b3d55.js";
import "ziggy-js";
import "./Dropdown-7075589d.js";
import "@heroicons/vue/24/solid/index.js";
import "./PrimaryButton-84eba42e.js";
import "./ShortLogo-3a83a5f7.js";
const _sfc_main$1 = {
  __name: "AccordionVue",
  __ssrInlineRender: true,
  props: {
    privacy: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AccordionRoot), mergeProps({
        class: "bg-mauve6 w-full rounded-md shadow-[0_2px_10px] shadow-black/5",
        "default-value": "item-1",
        type: "single",
        collapsible: true
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.privacy, (item) => {
              _push2(ssrRenderComponent(unref(AccordionItem), {
                class: "focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10",
                value: item.id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(AccordionHeader), { class: "flex" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(AccordionTrigger), { class: "text-grass11 font-bold shadow-mauve6 hover:bg-mauve2 flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none group" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<span${_scopeId4}>${ssrInterpolate(item.title)}</span>`);
                                _push5(ssrRenderComponent(unref(Icon), {
                                  icon: "radix-icons:chevron-down",
                                  class: "text-green10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180",
                                  "aria-hidden": ""
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode("span", null, toDisplayString(item.title), 1),
                                  createVNode(unref(Icon), {
                                    icon: "radix-icons:chevron-down",
                                    class: "text-green10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180",
                                    "aria-hidden": ""
                                  })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(AccordionTrigger), { class: "text-grass11 font-bold shadow-mauve6 hover:bg-mauve2 flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none group" }, {
                              default: withCtx(() => [
                                createVNode("span", null, toDisplayString(item.title), 1),
                                createVNode(unref(Icon), {
                                  icon: "radix-icons:chevron-down",
                                  class: "text-green10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180",
                                  "aria-hidden": ""
                                })
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(AccordionContent), { class: "text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="px-5 py-4"${_scopeId3}>${ssrInterpolate(item.content)}</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "px-5 py-4" }, toDisplayString(item.content), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(AccordionHeader), { class: "flex" }, {
                        default: withCtx(() => [
                          createVNode(unref(AccordionTrigger), { class: "text-grass11 font-bold shadow-mauve6 hover:bg-mauve2 flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none group" }, {
                            default: withCtx(() => [
                              createVNode("span", null, toDisplayString(item.title), 1),
                              createVNode(unref(Icon), {
                                icon: "radix-icons:chevron-down",
                                class: "text-green10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180",
                                "aria-hidden": ""
                              })
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(unref(AccordionContent), { class: "text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "px-5 py-4" }, toDisplayString(item.content), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.privacy, (item) => {
                return openBlock(), createBlock(unref(AccordionItem), {
                  key: item.id,
                  class: "focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10",
                  value: item.id
                }, {
                  default: withCtx(() => [
                    createVNode(unref(AccordionHeader), { class: "flex" }, {
                      default: withCtx(() => [
                        createVNode(unref(AccordionTrigger), { class: "text-grass11 font-bold shadow-mauve6 hover:bg-mauve2 flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none group" }, {
                          default: withCtx(() => [
                            createVNode("span", null, toDisplayString(item.title), 1),
                            createVNode(unref(Icon), {
                              icon: "radix-icons:chevron-down",
                              class: "text-green10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180",
                              "aria-hidden": ""
                            })
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(unref(AccordionContent), { class: "text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "px-5 py-4" }, toDisplayString(item.content), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1032, ["value"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AccordionVue.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "PrivacyPage",
  __ssrInlineRender: true,
  props: {
    content: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-4"${_scopeId}><h1 class="text-2xl font-bold font-mulish dark:text-white"${_scopeId}>${ssrInterpolate(_ctx.__("privacy"))}</h1><hr class="my-4"${_scopeId}><section class="pt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, { privacy: __props.content }, null, _parent2, _scopeId));
            _push2(`</section></div>`);
          } else {
            return [
              createVNode("div", { class: "py-4" }, [
                createVNode("h1", { class: "text-2xl font-bold font-mulish dark:text-white" }, toDisplayString(_ctx.__("privacy")), 1),
                createVNode("hr", { class: "my-4" }),
                createVNode("section", { class: "pt-4" }, [
                  createVNode(_sfc_main$1, { privacy: __props.content }, null, 8, ["privacy"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/PrivacyPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
