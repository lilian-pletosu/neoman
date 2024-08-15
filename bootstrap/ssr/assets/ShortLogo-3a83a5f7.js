import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
const _sfc_main = {
  __name: "ShortLogo",
  __ssrInlineRender: true,
  props: {
    w: {
      default: "w-10"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps({
        class: __props.w,
        viewBox: "0 0 475 483",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, _attrs))}><g filter="url(#filter0_d_1_26)"><path d="M472.5 427L45.5 0H165.5L384 218.5V0H472.5V427Z" fill="#83E509"></path><path d="M2 478.5V54.5L432 478.5H306L91 263.5V478.5H2Z" fill="#1FC8F2"></path></g><defs><filter id="filter0_d_1_26" x="0" y="0" width="474.5" height="482.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="2"></feOffset><feGaussianBlur stdDeviation="1"></feGaussianBlur><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_26"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_26" result="shape"></feBlend></filter></defs></svg>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ShortLogo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
