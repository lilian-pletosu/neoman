import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "CustomNotification",
  __ssrInlineRender: true,
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "success"
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["absolute sm:bottom-16 right-4", { "hidden": !__props.show }]
      }, _attrs))}><div class="${ssrRenderClass([{ "bg-red-400": __props.type === "wrong", "bg-green-400": __props.type === "success" }, "flex items-center text-white max-w-sm w-full shadow-md rounded-lg overflow-hidden mx-auto"])}"><div class="border-r flex justify-center px-2">`);
      if (__props.type === "success") {
        _push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.type === "wrong") {
        _push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center px-2 py-3"><div class="mx-3"><p>${ssrInterpolate(__props.message)}</p></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CustomNotification.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
