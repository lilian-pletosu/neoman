import { withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./FrontLayout-43d5da65.js";
import "./ApplicationLogo-caba15c6.js";
import "@heroicons/vue/24/outline/index.js";
import "@inertiajs/vue3";
import "pinia";
import "axios";
import "@vueuse/core";
import "@headlessui/vue";
import "./_plugin-vue_export-helper-cc2b3d55.js";
import "radix-vue";
import "@iconify/vue";
import "ziggy-js";
import "./Dropdown-7075589d.js";
import "@heroicons/vue/24/solid/index.js";
import "./PrimaryButton-84eba42e.js";
import "./ShortLogo-3a83a5f7.js";
const _sfc_main = {
  __name: "TermsPage",
  __ssrInlineRender: true,
  props: {
    content: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-4"${_scopeId}><h1 class="text-2xl font-bold font-mulish dark:text-white"${_scopeId}>${ssrInterpolate(_ctx.__("terms"))}</h1><section class="pt-4"${_scopeId}><span${_scopeId}>sss</span></section></div>`);
          } else {
            return [
              createVNode("div", { class: "py-4" }, [
                createVNode("h1", { class: "text-2xl font-bold font-mulish dark:text-white" }, toDisplayString(_ctx.__("terms")), 1),
                createVNode("section", { class: "pt-4" }, [
                  createVNode("span", null, "sss")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/TermsPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
