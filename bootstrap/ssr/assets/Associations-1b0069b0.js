import { defineComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { A as AdminLayout } from "./AdminLayout-e4a8ca54.js";
import { Link } from "@inertiajs/vue3";
import "@heroicons/vue/20/solid/index.js";
import "./Dropdown-7075589d.js";
import "ziggy-js";
import "./_plugin-vue_export-helper-cc2b3d55.js";
import "notiwind";
const _sfc_main = {
  __name: "Associations",
  __ssrInlineRender: true,
  props: {
    initialRoute: {
      type: String
    }
  },
  setup(__props) {
    defineComponent({
      name: "Products",
      components: {
        AdminLayout,
        Link
      },
      data() {
        return {
          data: Array
        };
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        "current-route": __props.initialRoute,
        title: _ctx.Products
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full grid grid-cols-1 gap-4"${_scopeId}><div class="container-rounded"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><div${_scopeId}><h3 class="primary-text"${_scopeId}>${ssrInterpolate(_ctx.__("associations"))}</h3><span class="secondary-text"${_scopeId}>This is a list of latest transactions</span></div><div class="flex-shrink-0"${_scopeId}><a href="#" class="text-link-blue"${_scopeId}>View all</a></div></div><div class="flex flex-col mt-8"${_scopeId}><div class="overflow-x-auto rounded-lg"${_scopeId}></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "w-full grid grid-cols-1 gap-4" }, [
                createVNode("div", { class: "container-rounded" }, [
                  createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h3", { class: "primary-text" }, toDisplayString(_ctx.__("associations")), 1),
                      createVNode("span", { class: "secondary-text" }, "This is a list of latest transactions")
                    ]),
                    createVNode("div", { class: "flex-shrink-0" }, [
                      createVNode("a", {
                        href: "#",
                        class: "text-link-blue"
                      }, "View all")
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-col mt-8" }, [
                    createVNode("div", { class: "overflow-x-auto rounded-lg" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Associations.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
