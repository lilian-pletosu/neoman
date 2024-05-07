import { unref, withCtx, renderSlot, createTextVNode, toDisplayString, createVNode, useSSRContext, ref, mergeProps, getCurrentInstance, openBlock, createBlock, Fragment, renderList } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { A as AdminLayout } from "./AdminLayout-e4a8ca54.js";
import { P as PrimaryButton } from "./PrimaryButton-84eba42e.js";
import { router, useForm } from "@inertiajs/vue3";
import { route } from "ziggy-js";
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/16/solid/index.js";
import { _ as _sfc_main$3 } from "./Modal-f5dacef9.js";
import { AlertDialogRoot, AlertDialogTrigger, AlertDialogPortal, AlertDialogOverlay, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "radix-vue";
import { _ as _sfc_main$6 } from "./SecondaryButton-0974b11b.js";
import { _ as _sfc_main$4, a as _sfc_main$5 } from "./BlackSelector-e9f3b662.js";
import "@heroicons/vue/20/solid/index.js";
import "./Dropdown-7075589d.js";
import "./_plugin-vue_export-helper-cc2b3d55.js";
import "notiwind";
const _sfc_main$2 = {
  __name: "AlertDialog",
  __ssrInlineRender: true,
  props: {
    action: Function,
    name: {
      required: true,
      type: String
    },
    message: {
      required: true,
      type: String
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AlertDialogRoot), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(AlertDialogTrigger), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(AlertDialogPortal), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(AlertDialogOverlay), { class: "bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(AlertDialogContent), { class: "z-[100] text-[15px] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(AlertDialogTitle), { class: "text-mauve12 m-0 text-[17px] font-semibold" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.name)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.name), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(AlertDialogDescription), { class: "text-mauve11 mt-4 mb-5 text-[15px] leading-normal" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.message)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.message), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="flex justify-end gap-[25px]"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(AlertDialogCancel), { class: "text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(_ctx.__("cancel"))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(_ctx.__("cancel")), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(AlertDialogAction), {
                          class: "text-red-700 bg-red-100 hover:bg-red-200 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]",
                          onClick: ($event) => __props.action()
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(_ctx.__("yes_delete"))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(_ctx.__("yes_delete")), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode(unref(AlertDialogTitle), { class: "text-mauve12 m-0 text-[17px] font-semibold" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.name), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(AlertDialogDescription), { class: "text-mauve11 mt-4 mb-5 text-[15px] leading-normal" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.message), 1)
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "flex justify-end gap-[25px]" }, [
                            createVNode(unref(AlertDialogCancel), { class: "text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.__("cancel")), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(unref(AlertDialogAction), {
                              class: "text-red-700 bg-red-100 hover:bg-red-200 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]",
                              onClick: ($event) => __props.action()
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.__("yes_delete")), 1)
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(AlertDialogOverlay), { class: "bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30" }),
                    createVNode(unref(AlertDialogContent), { class: "z-[100] text-[15px] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none" }, {
                      default: withCtx(() => [
                        createVNode(unref(AlertDialogTitle), { class: "text-mauve12 m-0 text-[17px] font-semibold" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.name), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(AlertDialogDescription), { class: "text-mauve11 mt-4 mb-5 text-[15px] leading-normal" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.message), 1)
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "flex justify-end gap-[25px]" }, [
                          createVNode(unref(AlertDialogCancel), { class: "text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.__("cancel")), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(AlertDialogAction), {
                            class: "text-red-700 bg-red-100 hover:bg-red-200 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]",
                            onClick: ($event) => __props.action()
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.__("yes_delete")), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(AlertDialogTrigger), null, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }),
              createVNode(unref(AlertDialogPortal), null, {
                default: withCtx(() => [
                  createVNode(unref(AlertDialogOverlay), { class: "bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30" }),
                  createVNode(unref(AlertDialogContent), { class: "z-[100] text-[15px] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none" }, {
                    default: withCtx(() => [
                      createVNode(unref(AlertDialogTitle), { class: "text-mauve12 m-0 text-[17px] font-semibold" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.name), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(AlertDialogDescription), { class: "text-mauve11 mt-4 mb-5 text-[15px] leading-normal" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.message), 1)
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex justify-end gap-[25px]" }, [
                        createVNode(unref(AlertDialogCancel), { class: "text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.__("cancel")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(AlertDialogAction), {
                          class: "text-red-700 bg-red-100 hover:bg-red-200 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]",
                          onClick: ($event) => __props.action()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.__("yes_delete")), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick"])
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
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AlertDialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Installments",
  __ssrInlineRender: true,
  props: {
    credit: Object
  },
  setup(__props) {
    const props = __props;
    const formData = ref({
      type: props.credit.type,
      num_of_installments: props.credit.num_of_installments,
      interest_rate: props.credit.interest_rate
    });
    const edit = ref(false);
    const removeCredit = () => {
      router.delete(route("admin.settings.destroy", { setting: props.credit.id }));
    };
    const showModal = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative grid grid-cols-1 2xl:grid-cols-2 gap-2 container-custom-rounded p-2 border border-1 border-slate-300" }, _attrs))}><div class="col-span-1 flex flex-col"><span>${ssrInterpolate(_ctx.__("installments"))}</span><input type="text"${ssrRenderAttr("value", formData.value.num_of_installments)} class="rounded disabled:bg-slate-100 disabled:border-0 w-full"${ssrIncludeBooleanAttr(!edit.value) ? " disabled" : ""}></div><div class="col-span-1 flex flex-col pb-6"><span>${ssrInterpolate(_ctx.__("interest_rate"))}</span><input type="text"${ssrRenderAttr("value", formData.value.interest_rate)} class="rounded disabled:bg-slate-100 disabled:border-0 w-full"${ssrIncludeBooleanAttr(!edit.value) ? " disabled" : ""}></div><div class="${ssrRenderClass([edit.value ? "" : "absolute", "right-1 bottom-1 flex j col-span-2 text-center gap-2"])}">`);
      if (!edit.value) {
        _push(ssrRenderComponent(unref(PencilSquareIcon), {
          onClick: ($event) => edit.value = !edit.value,
          class: "w-5 cursor-pointer text-slate-500 hover:text-slate-700"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (edit.value) {
        _push(`<p class="cursor-pointer border w-full border-[#3d55cc] text-[#3d55cc] font-medium p-1 rounded-lg bg-white shadow">${ssrInterpolate(_ctx.__("cancel"))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (edit.value) {
        _push(`<p class="cursor-pointer w-full text-white border p-1 font-medium rounded-lg bg-[#3d55cc] shadow">${ssrInterpolate(_ctx.__("submit"))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        show: showModal.value,
        closeable: false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p${_scopeId}> Are you sure you want to delete this ?</p><button class="bg-red-500 text-white py-2 px-4"${_scopeId}>Delete</button>`);
          } else {
            return [
              createVNode("p", null, " Are you sure you want to delete this ?"),
              createVNode("button", {
                class: "bg-red-500 text-white py-2 px-4",
                onClick: removeCredit
              }, "Delete")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        class: "absolute",
        action: removeCredit,
        key: __props.credit.id,
        name: _ctx.__("are_you_sure"),
        message: _ctx.__("action_cannot_be_undone")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TrashIcon), { class: "w-4 cursor-pointer absolute right-1 top-1 text-slate-300 hover:text-red-300" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(TrashIcon), { class: "w-4 cursor-pointer absolute right-1 top-1 text-slate-300 hover:text-red-300" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Installments.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Settings",
  __ssrInlineRender: true,
  props: {
    resources: Object
  },
  setup(__props) {
    getCurrentInstance();
    const form = useForm({
      num_of_installments: "",
      interest_rate: "",
      type: ""
    });
    const isOpen = ref(false);
    const openModal = () => {
      isOpen.value = true;
    };
    const closeModal = () => {
      isOpen.value = false;
      form.reset();
    };
    const submit = (type) => {
      form.post(route("admin.settings.store"), {
        preserveScroll: true,
        onSuccess: () => {
          closeModal();
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        "current-route": _ctx.initialRoute,
        title: "Promotions"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full grid grid-cols-1 gap-4"${_scopeId}><div class="container-rounded"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><div${_scopeId}><h3 class="primary-text"${_scopeId}>${ssrInterpolate(_ctx.__("settings"))}</h3><span class="secondary-text"${_scopeId}>${ssrInterpolate(_ctx.__("here_is_all_settings"))}</span></div><div class="flex-shrink-0"${_scopeId}>`);
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
            _push2(`</div></div><div class="flex flex-col mt-8"${_scopeId}><div class="overflow-x-auto rounded-lg"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="flex flex-col mt-8"${_scopeId}><div class="overflow-x-auto rounded-lg p-2"${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-2 gap-3"${_scopeId}><section${_scopeId}><span class="font-medium text-lg"${_scopeId}>${ssrInterpolate(_ctx.__("credit_info"))}</span><div class="container-custom-rounded border border-1 border-slate-300 p-2 bg-slate-100/50 min-h-[150px]"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(__props.resources.credit, (credit) => {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                credit,
                key: credit.id
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div></section><section${_scopeId}><span class="font-medium text-lg"${_scopeId}>${ssrInterpolate(_ctx.__("installments_info"))}</span><div class="container-custom-rounded border border-1 border-slate-300 p-2 bg-slate-100/50 min-h-[150px]"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(__props.resources.installments, (installments) => {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                credit: installments,
                key: installments.id
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div></section></div></div></div></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              show: isOpen.value,
              onClose: closeModal,
              actions: false,
              closeable: true
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col gap-4 p-4"${_scopeId2}><div class="flex justify-between"${_scopeId2}><h3 class="primary-text"${_scopeId2}>${ssrInterpolate(_ctx.__("add_new_credit"))}</h3></div><div class="grid grid-cols-1 md:grid-cols-2 gap-2"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    modelValue: unref(form).num_of_installments,
                    "onUpdate:modelValue": ($event) => unref(form).num_of_installments = $event,
                    type: "number",
                    "error-message": _ctx.__(unref(form).errors.num_of_installments),
                    label: _ctx.__("num_of_installments")
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    modelValue: unref(form).interest_rate,
                    "onUpdate:modelValue": ($event) => unref(form).interest_rate = $event,
                    type: "number",
                    "error-message": _ctx.__(unref(form).errors.interest_rate),
                    label: _ctx.__("interest_rate")
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="col-span-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    modelValue: unref(form).type,
                    "onUpdate:modelValue": ($event) => unref(form).type = $event,
                    "onUpdate:status": ($event) => unref(form).type = $event,
                    options: [
                      { id: "credit", value: "credit", label: "Credit" },
                      { id: "installments", value: "installments", label: "Installments" }
                    ],
                    value: unref(form).type,
                    "error-message": _ctx.__(unref(form).errors.type),
                    label: _ctx.__("type")
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="mt-6 flex justify-end"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    class: "mx-2",
                    onClick: closeModal
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
                    onClick: submit,
                    class: "mx-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(_ctx.__("submit"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(_ctx.__("submit")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col gap-4 p-4" }, [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("h3", { class: "primary-text" }, toDisplayString(_ctx.__("add_new_credit")), 1)
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-2" }, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$4, {
                            modelValue: unref(form).num_of_installments,
                            "onUpdate:modelValue": ($event) => unref(form).num_of_installments = $event,
                            type: "number",
                            "error-message": _ctx.__(unref(form).errors.num_of_installments),
                            label: _ctx.__("num_of_installments")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-message", "label"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$4, {
                            modelValue: unref(form).interest_rate,
                            "onUpdate:modelValue": ($event) => unref(form).interest_rate = $event,
                            type: "number",
                            "error-message": _ctx.__(unref(form).errors.interest_rate),
                            label: _ctx.__("interest_rate")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-message", "label"])
                        ]),
                        createVNode("div", { class: "col-span-2" }, [
                          createVNode(_sfc_main$5, {
                            modelValue: unref(form).type,
                            "onUpdate:modelValue": ($event) => unref(form).type = $event,
                            "onUpdate:status": ($event) => unref(form).type = $event,
                            options: [
                              { id: "credit", value: "credit", label: "Credit" },
                              { id: "installments", value: "installments", label: "Installments" }
                            ],
                            value: unref(form).type,
                            "error-message": _ctx.__(unref(form).errors.type),
                            label: _ctx.__("type")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onUpdate:status", "value", "error-message", "label"])
                        ])
                      ]),
                      createVNode("div", { class: "mt-6 flex justify-end" }, [
                        createVNode(_sfc_main$6, {
                          class: "mx-2",
                          onClick: closeModal
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.__("cancel")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(PrimaryButton, {
                          onClick: submit,
                          class: "mx-2"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.__("submit")), 1)
                          ]),
                          _: 1
                        })
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
              createVNode("div", { class: "w-full grid grid-cols-1 gap-4" }, [
                createVNode("div", { class: "container-rounded" }, [
                  createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h3", { class: "primary-text" }, toDisplayString(_ctx.__("settings")), 1),
                      createVNode("span", { class: "secondary-text" }, toDisplayString(_ctx.__("here_is_all_settings")), 1)
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
                          createVNode("div", { class: "overflow-x-auto rounded-lg p-2" }, [
                            createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-3" }, [
                              createVNode("section", null, [
                                createVNode("span", { class: "font-medium text-lg" }, toDisplayString(_ctx.__("credit_info")), 1),
                                createVNode("div", { class: "container-custom-rounded border border-1 border-slate-300 p-2 bg-slate-100/50 min-h-[150px]" }, [
                                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-2" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.resources.credit, (credit) => {
                                      return openBlock(), createBlock("div", null, [
                                        (openBlock(), createBlock(_sfc_main$1, {
                                          credit,
                                          key: credit.id
                                        }, null, 8, ["credit"]))
                                      ]);
                                    }), 256))
                                  ])
                                ])
                              ]),
                              createVNode("section", null, [
                                createVNode("span", { class: "font-medium text-lg" }, toDisplayString(_ctx.__("installments_info")), 1),
                                createVNode("div", { class: "container-custom-rounded border border-1 border-slate-300 p-2 bg-slate-100/50 min-h-[150px]" }, [
                                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-2" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.resources.installments, (installments) => {
                                      return openBlock(), createBlock("div", null, [
                                        (openBlock(), createBlock(_sfc_main$1, {
                                          credit: installments,
                                          key: installments.id
                                        }, null, 8, ["credit"]))
                                      ]);
                                    }), 256))
                                  ])
                                ])
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode(_sfc_main$3, {
                    show: isOpen.value,
                    onClose: closeModal,
                    actions: false,
                    closeable: true
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex flex-col gap-4 p-4" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("h3", { class: "primary-text" }, toDisplayString(_ctx.__("add_new_credit")), 1)
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-2" }, [
                          createVNode("div", null, [
                            createVNode(_sfc_main$4, {
                              modelValue: unref(form).num_of_installments,
                              "onUpdate:modelValue": ($event) => unref(form).num_of_installments = $event,
                              type: "number",
                              "error-message": _ctx.__(unref(form).errors.num_of_installments),
                              label: _ctx.__("num_of_installments")
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-message", "label"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$4, {
                              modelValue: unref(form).interest_rate,
                              "onUpdate:modelValue": ($event) => unref(form).interest_rate = $event,
                              type: "number",
                              "error-message": _ctx.__(unref(form).errors.interest_rate),
                              label: _ctx.__("interest_rate")
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-message", "label"])
                          ]),
                          createVNode("div", { class: "col-span-2" }, [
                            createVNode(_sfc_main$5, {
                              modelValue: unref(form).type,
                              "onUpdate:modelValue": ($event) => unref(form).type = $event,
                              "onUpdate:status": ($event) => unref(form).type = $event,
                              options: [
                                { id: "credit", value: "credit", label: "Credit" },
                                { id: "installments", value: "installments", label: "Installments" }
                              ],
                              value: unref(form).type,
                              "error-message": _ctx.__(unref(form).errors.type),
                              label: _ctx.__("type")
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "onUpdate:status", "value", "error-message", "label"])
                          ])
                        ]),
                        createVNode("div", { class: "mt-6 flex justify-end" }, [
                          createVNode(_sfc_main$6, {
                            class: "mx-2",
                            onClick: closeModal
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.__("cancel")), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(PrimaryButton, {
                            onClick: submit,
                            class: "mx-2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.__("submit")), 1)
                            ]),
                            _: 1
                          })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
