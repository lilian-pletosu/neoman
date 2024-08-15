import { ref, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, withModifiers, withDirectives, vModelText, createCommentVNode, vModelRadio, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./FrontLayout-77cff396.js";
import { useForm } from "@inertiajs/vue3";
import { route } from "ziggy-js";
import { P as PrimaryButton } from "./PrimaryButton-84eba42e.js";
import "./ApplicationLogo-caba15c6.js";
import "@heroicons/vue/24/outline/index.js";
import "pinia";
import "axios";
import "@vueuse/core";
import "@headlessui/vue";
import "./_plugin-vue_export-helper-cc2b3d55.js";
import "radix-vue";
import "@iconify/vue";
import "./Dropdown-7075589d.js";
import "@heroicons/vue/24/solid/index.js";
import "./ShortLogo-3a83a5f7.js";
const _sfc_main = {
  __name: "ContactPage",
  __ssrInlineRender: true,
  props: {
    contacts: Object
  },
  setup(__props) {
    const form = useForm({
      name: "",
      email: "",
      phone: "",
      message: "",
      option: ""
    });
    const showSuccess = ref(false);
    const submitForm = () => {
      form.post(route("contacts.store"), {
        preserveScroll: true,
        onSuccess: () => {
          showSuccess.value = true;
          form.reset();
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-4"${_scopeId}><h1 class="text-2xl font-bold font-mulish dark:text-white"${_scopeId}>${ssrInterpolate(_ctx.__("contact"))}</h1><hr class="my-4"${_scopeId}><section class=""${_scopeId}><div class="mx-auto px-4 pb-4 sm:px-6 lg:px-8"${_scopeId}><div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5"${_scopeId}><div class="lg:col-span-2 lg:py-12"${_scopeId}><p class="max-w-xl text-lg font-semibold font-mulish"${_scopeId}>${ssrInterpolate(_ctx.__("your_opinion_counts_for_us"))}</p><hr class="py-2"${_scopeId}><span class="max-w-xl text-lg font-light font-mulish"${_scopeId}>${ssrInterpolate(_ctx.__("write_us"))}</span><div class="mt-8"${_scopeId}><a href="tel:+37378107017" class="text-2xl font-bold text-pink-600"${_scopeId}> +373 78 107 017 </a><address class="mt-2 not-italic"${_scopeId}>str.Varnita Chisinau, MD-2023, Strada Uzinelor 12a, Chișinău, Chisinau, Moldova </address></div></div><div class="rounded-lg bg-white p-8 shadow lg:col-span-3 lg:p-12 border-1 border-slate-600"${_scopeId}>`);
            if (!showSuccess.value) {
              _push2(`<form class="space-y-4"${_scopeId}><div${_scopeId}><label class="sr-only" for="name"${_scopeId}>${ssrInterpolate(_ctx.__("name"))}</label><input${ssrRenderAttr("value", unref(form).name)} class="w-full rounded-lg border-gray-200 p-3 text-sm"${ssrRenderAttr("placeholder", _ctx.__("name"))} type="text" id="name"${_scopeId}>`);
              if (unref(form).errors.name) {
                _push2(`<span class="py-1 text-red-600"${_scopeId}>${ssrInterpolate(_ctx.__(unref(form).errors.name))}*</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="grid grid-cols-1 gap-4 sm:grid-cols-2"${_scopeId}><div${_scopeId}><label class="sr-only" for="email"${_scopeId}>${ssrInterpolate(_ctx.__("email"))}</label><input${ssrRenderAttr("value", unref(form).email)} class="w-full rounded-lg border-gray-200 p-3 text-sm"${ssrRenderAttr("placeholder", _ctx.__("email"))} type="email" id="email"${_scopeId}>`);
              if (unref(form).errors.email) {
                _push2(`<span class="py-1 text-red-600"${_scopeId}>${ssrInterpolate(_ctx.__(unref(form).errors.email))}*</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="sr-only" for="phone"${_scopeId}>${ssrInterpolate(_ctx.__("phone"))}</label><input${ssrRenderAttr("value", unref(form).phone)} class="w-full rounded-lg border-gray-200 p-3 text-sm"${ssrRenderAttr("placeholder", _ctx.__("phone"))} type="tel" id="phone"${_scopeId}>`);
              if (unref(form).errors.phone) {
                _push2(`<span class="py-1 text-red-600"${_scopeId}>${ssrInterpolate(_ctx.__(unref(form).errors.phone))}*</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3"${_scopeId}><div${_scopeId}><label for="Option1" class="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white" tabindex="0"${_scopeId}><input class="sr-only" id="Option1" type="radio" tabindex="-1" value="reclamation"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).option, "reclamation")) ? " checked" : ""} name="reclamation"${_scopeId}><span class="text-sm"${_scopeId}>${ssrInterpolate(_ctx.__("reclamation"))}</span></label></div><div${_scopeId}><label for="Option2" class="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white" tabindex="0"${_scopeId}><input class="sr-only" id="Option2" type="radio" tabindex="-1" value="delivery"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).option, "delivery")) ? " checked" : ""} name="delivery"${_scopeId}><span class="text-sm"${_scopeId}>${ssrInterpolate(_ctx.__("delivery"))}</span></label></div><div${_scopeId}><label for="Option3" class="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white" tabindex="0"${_scopeId}><input class="sr-only" id="Option3" type="radio" tabindex="-1" value="collaboration"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).option, "collaboration")) ? " checked" : ""} name="collaboration"${_scopeId}><span class="text-sm"${_scopeId}>${ssrInterpolate(_ctx.__("collaboration"))}</span></label></div>`);
              if (unref(form).errors.option) {
                _push2(`<span class="py-1 text-red-600"${_scopeId}>${ssrInterpolate(_ctx.__(unref(form).errors.option))}*</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="sr-only" for="message"${_scopeId}>${ssrInterpolate(_ctx.__("message"))}</label><textarea class="w-full rounded-lg border-gray-200 p-3 text-sm"${ssrRenderAttr("placeholder", _ctx.__("message"))} rows="8" id="message"${_scopeId}>${ssrInterpolate(unref(form).message)}</textarea>`);
              if (unref(form).errors.message) {
                _push2(`<span class="py-1 text-red-600"${_scopeId}>${ssrInterpolate(_ctx.__(unref(form).errors.message))}*</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="mt-4"${_scopeId}>`);
              _push2(ssrRenderComponent(PrimaryButton, {
                class: { "opacity-25": unref(form).processing },
                disabled: unref(form).processing
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.__("send"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.__("send")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></form>`);
            } else {
              _push2(`<!---->`);
            }
            if (showSuccess.value) {
              _push2(`<div class="bg-white p-6 md:mx-auto"${_scopeId}><svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6"${_scopeId}><path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"${_scopeId}></path></svg><div class="text-center"${_scopeId}><h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center"${_scopeId}>${ssrInterpolate(_ctx.__("message_was_send"))}!</h3><p${_scopeId}>${ssrInterpolate(_ctx.__("success_message"))}</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></section></div>`);
          } else {
            return [
              createVNode("div", { class: "py-4" }, [
                createVNode("h1", { class: "text-2xl font-bold font-mulish dark:text-white" }, toDisplayString(_ctx.__("contact")), 1),
                createVNode("hr", { class: "my-4" }),
                createVNode("section", { class: "" }, [
                  createVNode("div", { class: "mx-auto px-4 pb-4 sm:px-6 lg:px-8" }, [
                    createVNode("div", { class: "grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5" }, [
                      createVNode("div", { class: "lg:col-span-2 lg:py-12" }, [
                        createVNode("p", { class: "max-w-xl text-lg font-semibold font-mulish" }, toDisplayString(_ctx.__("your_opinion_counts_for_us")), 1),
                        createVNode("hr", { class: "py-2" }),
                        createVNode("span", { class: "max-w-xl text-lg font-light font-mulish" }, toDisplayString(_ctx.__("write_us")), 1),
                        createVNode("div", { class: "mt-8" }, [
                          createVNode("a", {
                            href: "tel:+37378107017",
                            class: "text-2xl font-bold text-pink-600"
                          }, " +373 78 107 017 "),
                          createVNode("address", { class: "mt-2 not-italic" }, "str.Varnita Chisinau, MD-2023, Strada Uzinelor 12a, Chișinău, Chisinau, Moldova ")
                        ])
                      ]),
                      createVNode("div", { class: "rounded-lg bg-white p-8 shadow lg:col-span-3 lg:p-12 border-1 border-slate-600" }, [
                        !showSuccess.value ? (openBlock(), createBlock("form", {
                          key: 0,
                          onSubmit: withModifiers(submitForm, ["prevent"]),
                          class: "space-y-4"
                        }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              class: "sr-only",
                              for: "name"
                            }, toDisplayString(_ctx.__("name")), 1),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).name = $event,
                              class: "w-full rounded-lg border-gray-200 p-3 text-sm",
                              placeholder: _ctx.__("name"),
                              type: "text",
                              id: "name"
                            }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                              [vModelText, unref(form).name]
                            ]),
                            unref(form).errors.name ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "py-1 text-red-600"
                            }, toDisplayString(_ctx.__(unref(form).errors.name)) + "*", 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2" }, [
                            createVNode("div", null, [
                              createVNode("label", {
                                class: "sr-only",
                                for: "email"
                              }, toDisplayString(_ctx.__("email")), 1),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                class: "w-full rounded-lg border-gray-200 p-3 text-sm",
                                placeholder: _ctx.__("email"),
                                type: "email",
                                id: "email"
                              }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                                [vModelText, unref(form).email]
                              ]),
                              unref(form).errors.email ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "py-1 text-red-600"
                              }, toDisplayString(_ctx.__(unref(form).errors.email)) + "*", 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", {
                                class: "sr-only",
                                for: "phone"
                              }, toDisplayString(_ctx.__("phone")), 1),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                                class: "w-full rounded-lg border-gray-200 p-3 text-sm",
                                placeholder: _ctx.__("phone"),
                                type: "tel",
                                id: "phone"
                              }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                                [vModelText, unref(form).phone]
                              ]),
                              unref(form).errors.phone ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "py-1 text-red-600"
                              }, toDisplayString(_ctx.__(unref(form).errors.phone)) + "*", 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 gap-4 text-center sm:grid-cols-3" }, [
                            createVNode("div", null, [
                              createVNode("label", {
                                for: "Option1",
                                class: "block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white",
                                tabindex: "0"
                              }, [
                                withDirectives(createVNode("input", {
                                  class: "sr-only",
                                  id: "Option1",
                                  type: "radio",
                                  tabindex: "-1",
                                  value: "reclamation",
                                  "onUpdate:modelValue": ($event) => unref(form).option = $event,
                                  name: "reclamation"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelRadio, unref(form).option]
                                ]),
                                createVNode("span", { class: "text-sm" }, toDisplayString(_ctx.__("reclamation")), 1)
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", {
                                for: "Option2",
                                class: "block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white",
                                tabindex: "0"
                              }, [
                                withDirectives(createVNode("input", {
                                  class: "sr-only",
                                  id: "Option2",
                                  type: "radio",
                                  tabindex: "-1",
                                  value: "delivery",
                                  "onUpdate:modelValue": ($event) => unref(form).option = $event,
                                  name: "delivery"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelRadio, unref(form).option]
                                ]),
                                createVNode("span", { class: "text-sm" }, toDisplayString(_ctx.__("delivery")), 1)
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", {
                                for: "Option3",
                                class: "block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white",
                                tabindex: "0"
                              }, [
                                withDirectives(createVNode("input", {
                                  class: "sr-only",
                                  id: "Option3",
                                  type: "radio",
                                  tabindex: "-1",
                                  value: "collaboration",
                                  "onUpdate:modelValue": ($event) => unref(form).option = $event,
                                  name: "collaboration"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelRadio, unref(form).option]
                                ]),
                                createVNode("span", { class: "text-sm" }, toDisplayString(_ctx.__("collaboration")), 1)
                              ])
                            ]),
                            unref(form).errors.option ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "py-1 text-red-600"
                            }, toDisplayString(_ctx.__(unref(form).errors.option)) + "*", 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              class: "sr-only",
                              for: "message"
                            }, toDisplayString(_ctx.__("message")), 1),
                            withDirectives(createVNode("textarea", {
                              class: "w-full rounded-lg border-gray-200 p-3 text-sm",
                              placeholder: _ctx.__("message"),
                              "onUpdate:modelValue": ($event) => unref(form).message = $event,
                              rows: "8",
                              id: "message"
                            }, null, 8, ["placeholder", "onUpdate:modelValue"]), [
                              [vModelText, unref(form).message]
                            ]),
                            unref(form).errors.message ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "py-1 text-red-600"
                            }, toDisplayString(_ctx.__(unref(form).errors.message)) + "*", 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "mt-4" }, [
                            createVNode(PrimaryButton, {
                              class: { "opacity-25": unref(form).processing },
                              disabled: unref(form).processing
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.__("send")), 1)
                              ]),
                              _: 1
                            }, 8, ["class", "disabled"])
                          ])
                        ], 32)) : createCommentVNode("", true),
                        showSuccess.value ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "bg-white p-6 md:mx-auto"
                        }, [
                          (openBlock(), createBlock("svg", {
                            viewBox: "0 0 24 24",
                            class: "text-green-600 w-16 h-16 mx-auto my-6"
                          }, [
                            createVNode("path", {
                              fill: "currentColor",
                              d: "M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                            })
                          ])),
                          createVNode("div", { class: "text-center" }, [
                            createVNode("h3", { class: "md:text-2xl text-base text-gray-900 font-semibold text-center" }, toDisplayString(_ctx.__("message_was_send")) + "!", 1),
                            createVNode("p", null, toDisplayString(_ctx.__("success_message")), 1)
                          ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/ContactPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
