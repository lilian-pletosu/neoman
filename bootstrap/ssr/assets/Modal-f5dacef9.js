import { watch, onMounted, onUnmounted, computed, withCtx, unref, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrRenderStyle, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/vue/20/solid/index.js";
import { _ as _sfc_main$1 } from "./Dropdown-7075589d.js";
const _sfc_main = {
  __name: "Modal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: "2xl"
    },
    marginTop: {
      type: String,
      default: "mt-0"
    },
    closeable: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    modalType: {
      type: String,
      default: "modal"
    },
    actions: {
      type: Boolean,
      default: true
    }
  },
  emits: ["close", "edit", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    watch(
      () => props.show,
      () => {
        if (props.show) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = null;
        }
      }
    );
    const close = () => {
      if (props.closeable) {
        emit("close");
      }
    };
    const closeOnEscape = (e) => {
      if (e.key === "Escape" && props.show) {
        close();
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = null;
    });
    const maxWidthClass = computed(() => {
      return {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        "3xl": "sm:max-w-3xl",
        "4xl": "sm:max-w-4xl",
        "6xl": "sm:max-w-6xl"
      }[props.maxWidth];
    });
    const marginTopClass = computed(() => {
      return {
        "mt-60": "mt-60"
      }[props.marginTop];
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50" scroll-region><div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="fixed inset-0 transform transition-all"><div class="absolute inset-0 bg-gray-500 opacity-75"></div></div><div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="${ssrRenderClass([[marginTopClass.value, maxWidthClass.value], "mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto"])}"><div class="flex absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer">`);
        if (__props.actions) {
          _push2(`<!--[-->`);
          if (["edit", "modal"].includes(__props.modalType)) {
            _push2(ssrRenderComponent(_sfc_main$1, null, {
              trigger: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(`<span class=""${_scopeId}>`);
                  _push3(ssrRenderComponent(unref(EllipsisVerticalIcon), { class: "h-6 w-6" }, null, _parent2, _scopeId));
                  _push3(`</span>`);
                } else {
                  return [
                    createVNode("span", { class: "" }, [
                      createVNode(unref(EllipsisVerticalIcon), { class: "h-6 w-6" })
                    ])
                  ];
                }
              }),
              content: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(`<ul class="px-2 items-start"${_scopeId}><li class="hover:bg-gray-100"${_scopeId}>${ssrInterpolate(_ctx.__("edit"))}</li><li class="hover:bg-gray-100"${_scopeId}>${ssrInterpolate(_ctx.__("delete"))}</li></ul>`);
                } else {
                  return [
                    createVNode("ul", { class: "px-2 items-start" }, [
                      createVNode("li", {
                        class: "hover:bg-gray-100",
                        onClick: ($event) => emit("edit")
                      }, toDisplayString(_ctx.__("edit")), 9, ["onClick"]),
                      createVNode("li", {
                        class: "hover:bg-gray-100",
                        onClick: ($event) => emit("delete")
                      }, toDisplayString(_ctx.__("delete")), 9, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push2(`<!---->`);
          }
          _push2(`<!--]-->`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<button style="${ssrRenderStyle(__props.showClose ? null : { display: "none" })}">`);
        _push2(ssrRenderComponent(unref(XMarkIcon), { class: "h-6 w-6" }, null, _parent));
        _push2(`</button></div>`);
        if (__props.show) {
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div></div>`);
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Modal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
