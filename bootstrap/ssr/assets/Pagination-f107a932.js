import { Link } from "@inertiajs/vue3";
import { resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {
  components: {
    Link
  },
  props: {
    links: Array
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Link = resolveComponent("Link");
  _push(`<div${ssrRenderAttrs(mergeProps({
    style: $props.links.length > 3 ? null : { display: "none" }
  }, _attrs))}><div class="flex flex-wrap -mb-1"><!--[-->`);
  ssrRenderList($props.links, (link, key) => {
    _push(`<!--[-->`);
    if (link.url === null) {
      _push(`<div class="mr-1 mb-1 px-2 py-3 text-base leading-4 text-gray-400 hover:text-black text-bold">${_ctx.__(link.label) ?? ""}</div>`);
    } else {
      _push(ssrRenderComponent(_component_Link, {
        key,
        class: ["mr-1 mb-1 px-2 py-3 leading-4 hover:text-gray-700 text-gray-400", { "text-black font-bold underline": link.active }],
        href: link.url
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>${_ctx.__(link.label) ?? ""}</span>`);
          } else {
            return [
              createVNode("span", {
                innerHTML: _ctx.__(link.label)
              }, null, 8, ["innerHTML"])
            ];
          }
        }),
        _: 2
      }, _parent));
    }
    _push(`<!--]-->`);
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Pagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Pagination = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Pagination as P
};
