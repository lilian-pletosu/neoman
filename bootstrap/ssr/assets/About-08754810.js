import { useModel, mergeProps, unref, useSSRContext, getCurrentInstance, withCtx, createTextVNode, toDisplayString, ref, createVNode, openBlock, createBlock, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$5 } from "./AdminLayout-d40237f3.js";
import { P as PrimaryButton } from "./PrimaryButton-84eba42e.js";
import { _ as _sfc_main$6 } from "./Modal-4741da5a.js";
import { useForm } from "@inertiajs/vue3";
import { route as route$1 } from "ziggy-js";
import { QuillEditor } from "@vueup/vue-quill";
import { _ as _sfc_main$4 } from "./SecondaryButton-0974b11b.js";
import "@heroicons/vue/20/solid/index.js";
import "./Dropdown-7075589d.js";
import "./ShortLogo-3a83a5f7.js";
import "./_plugin-vue_export-helper-cc2b3d55.js";
import "@heroicons/vue/24/outline/index.js";
const vueQuill_snow = "";
const _sfc_main$3 = {
  __name: "InputEditor",
  __ssrInlineRender: true,
  props: {
    "modelValue": {},
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const value = useModel(__props, "modelValue");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container border" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(QuillEditor), {
        content: value.value,
        "onUpdate:content": ($event) => value.value = $event,
        "content-type": "html",
        theme: "snow"
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/InputEditor.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "InputEditorAboutUs",
  __ssrInlineRender: true,
  emits: ["cancel", "close"],
  setup(__props, { emit: __emit }) {
    const app = getCurrentInstance();
    const form = useForm({
      title: "About Us",
      content: {}
    });
    const emits = __emit;
    function cancel() {
      form.reset();
      emits("close");
    }
    const submit = () => {
      form.post(route$1("admin.about_us.store"), {
        preserveScroll: true,
        onSuccess: () => {
          form.reset();
        },
        onFinish: () => {
          emits("close");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid-cols-1 space-y-2" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(app).appContext.config.globalProperties.$page.props.availableLanguages, (lang) => {
        _push(`<span class="space-y-4"><div class="py-2"><label${ssrRenderAttr("for", unref(form).content[lang])} class="text-sm font-semibold text-slate-800">${ssrInterpolate(_ctx.__(`content_${lang}`))}</label>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          id: unref(form).content[lang],
          modelValue: unref(form).content[lang],
          "onUpdate:modelValue": ($event) => unref(form).content[lang] = $event
        }, null, _parent));
        _push(`</div></span>`);
      });
      _push(`<!--]--><div class="flex flex-row justify-end">`);
      _push(ssrRenderComponent(PrimaryButton, {
        onClick: submit,
        class: "mx-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.__("submit"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.__("submit")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        onClick: ($event) => cancel(),
        class: "mx-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.__("cancel"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.__("cancel")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/InputEditorAboutUs.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "AboutUsContent",
  __ssrInlineRender: true,
  props: {
    resources: Object
  },
  setup(__props) {
    const props = __props;
    getCurrentInstance();
    const form = useForm({
      title: "About Us",
      content: props.resources.content
    });
    const edit = ref(false);
    const cancelEdit = () => {
      edit.value = false;
      form.content = props.resources.content;
    };
    const submit = () => {
      form.put(route("admin.about_us.update", { about_u: props.resources.id }), {
        preserveScroll: true,
        onSuccess: () => {
          edit.value = false;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (!edit.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-custom-rounded border border-1 border-slate-300 p-2 bg-slate-100/50 min-h-[150px]" }, _attrs))}><div>${__props.resources.content ?? ""}</div></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 space-y-2" }, _attrs))}><div class="grid-cols-1 space-y-2">`);
        _push(ssrRenderComponent(_sfc_main$3, {
          modelValue: unref(form).content,
          "onUpdate:modelValue": ($event) => unref(form).content = $event
        }, null, _parent));
        _push(`<div class="flex flex-row justify-end">`);
        _push(ssrRenderComponent(PrimaryButton, {
          onClick: submit,
          class: "mx-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.__("submit"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.__("submit")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$4, {
          onClick: ($event) => cancelEdit(),
          class: "mx-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.__("cancel"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.__("cancel")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AboutUsContent.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "About",
  __ssrInlineRender: true,
  props: {
    resources: Object
  },
  setup(__props) {
    getCurrentInstance();
    const isOpen = ref(false);
    const openModal = () => {
      isOpen.value = true;
    };
    const closeModal = () => {
      isOpen.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$5, mergeProps({
        "current-route": _ctx.initialRoute,
        title: "AboutUs"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full grid grid-cols-1 gap-4"${_scopeId}><div class="container-rounded"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><div${_scopeId}><h3 class="primary-text"${_scopeId}>${ssrInterpolate(_ctx.__("about_us"))}</h3><span class="secondary-text"${_scopeId}>${ssrInterpolate(_ctx.__("here_is_all_info_about_us"))}</span></div>`);
            if (!__props.resources) {
              _push2(`<div class="flex-shrink-0"${_scopeId}>`);
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
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col"${_scopeId}><div class="overflow-x-auto rounded-lg"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="flex flex-col mt-8"${_scopeId}><div class="overflow-x-auto rounded-lg p-2"${_scopeId}><section${_scopeId}>`);
            if (__props.resources) {
              _push2(ssrRenderComponent(_sfc_main$1, { resources: __props.resources }, null, _parent2, _scopeId));
            } else {
              _push2(`<div class="flex justify-center border-t pt-3"${_scopeId}>${ssrInterpolate(_ctx.__("no_content"))}... </div>`);
            }
            _push2(`</section></div></div></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              show: isOpen.value,
              onClose: closeModal,
              actions: false,
              closeable: true,
              "max-width": "6xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`<div class="flex flex-col gap-4 p-4"${_scopeId2}><div class="flex justify-between"${_scopeId2}><h3 class="primary-text"${_scopeId2}>${ssrInterpolate(_ctx.__("create_content_about_us"))}</h3></div>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    onCancel: closeModal,
                    onClose: ($event) => closeModal(),
                    key: (_a = __props.resources) == null ? void 0 : _a.id
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col gap-4 p-4" }, [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("h3", { class: "primary-text" }, toDisplayString(_ctx.__("create_content_about_us")), 1)
                      ]),
                      (openBlock(), createBlock(_sfc_main$2, {
                        onCancel: closeModal,
                        onClose: ($event) => closeModal(),
                        key: (_b = __props.resources) == null ? void 0 : _b.id
                      }, null, 8, ["onClose"]))
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
                      createVNode("h3", { class: "primary-text" }, toDisplayString(_ctx.__("about_us")), 1),
                      createVNode("span", { class: "secondary-text" }, toDisplayString(_ctx.__("here_is_all_info_about_us")), 1)
                    ]),
                    !__props.resources ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex-shrink-0"
                    }, [
                      createVNode(PrimaryButton, {
                        onClick: openModal,
                        class: "mx-2"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.__("create")), 1)
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "flex flex-col" }, [
                    createVNode("div", { class: "overflow-x-auto rounded-lg" }, [
                      createVNode("div", { class: "flex-shrink-0" }, [
                        createVNode("div", { class: "flex flex-col mt-8" }, [
                          createVNode("div", { class: "overflow-x-auto rounded-lg p-2" }, [
                            createVNode("section", null, [
                              __props.resources ? (openBlock(), createBlock(_sfc_main$1, {
                                key: 0,
                                resources: __props.resources
                              }, null, 8, ["resources"])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "flex justify-center border-t pt-3"
                              }, toDisplayString(_ctx.__("no_content")) + "... ", 1))
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode(_sfc_main$6, {
                    show: isOpen.value,
                    onClose: closeModal,
                    actions: false,
                    closeable: true,
                    "max-width": "6xl"
                  }, {
                    default: withCtx(() => {
                      var _a;
                      return [
                        createVNode("div", { class: "flex flex-col gap-4 p-4" }, [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("h3", { class: "primary-text" }, toDisplayString(_ctx.__("create_content_about_us")), 1)
                          ]),
                          (openBlock(), createBlock(_sfc_main$2, {
                            onCancel: closeModal,
                            onClose: ($event) => closeModal(),
                            key: (_a = __props.resources) == null ? void 0 : _a.id
                          }, null, 8, ["onClose"]))
                        ])
                      ];
                    }),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/About.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
