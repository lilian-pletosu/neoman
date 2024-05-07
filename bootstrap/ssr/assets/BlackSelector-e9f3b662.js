import { ref, mergeProps, useSSRContext, watch, unref } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
const _sfc_main$1 = {
  __name: "BlackInput",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      required: true
    },
    errorMessage: {
      type: String
    },
    label: {
      type: String
    },
    type: {
      type: String
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const input = ref(null);
    __expose({ focus: () => input.value.focus() });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-5" }, _attrs))}><label class="block mb-2 text-sm font-medium text-gray-900">${ssrInterpolate(__props.label)}</label>`);
      if (__props.type === "text") {
        _push(`<input${ssrRenderAttr("type", __props.type)} autofocus${ssrRenderAttr("value", __props.modelValue)} class="${ssrRenderClass([{ "border-2 dark:border-red-600": __props.errorMessage }, "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"])}"${ssrRenderAttr("placeholder", __props.label)}>`);
      } else {
        _push(`<!---->`);
      }
      if (["number"].includes(__props.type)) {
        _push(`<input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"${ssrRenderAttr("id", _ctx.id)} step=".01"${ssrRenderAttr("type", __props.type)}${ssrRenderAttr("value", __props.modelValue)}${ssrRenderAttr("min", _ctx.min)}${ssrRenderAttr("max", _ctx.max)}${ssrRenderAttr("placeholder", __props.label)}>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.type === "textarea") {
        _push(`<textarea class="${ssrRenderClass([{ "border-2 dark:border-red-600": __props.errorMessage }, "scroll-smooth bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"])}"${ssrRenderAttr("placeholder", __props.label)}>${ssrInterpolate(__props.modelValue)}</textarea>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.errorMessage) {
        _push(`<div><p class="text-sm text-red-500">${ssrInterpolate(__props.errorMessage)}* </p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/BlackInput.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "BlackSelector",
  __ssrInlineRender: true,
  props: {
    options: {
      type: Object,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    errorMessage: {
      type: String
    },
    value: {}
  },
  emits: ["update:status"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    let status = ref(props.value || "");
    watch(() => props.value, (newValue) => {
      status.value = newValue;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><label for="status" class="block mb-2 mt-4 text-sm font-medium text-gray-900">${ssrInterpolate(_ctx.__(__props.label))}</label><select id="status" class="${ssrRenderClass([{ "border-2 dark:border-red-600": __props.errorMessage }, "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"])}"><option disabled${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), null) : ssrLooseEqual(unref(status), null)) ? " selected" : ""}>${ssrInterpolate(_ctx.__(`select`))}</option><!--[-->`);
      ssrRenderList(__props.options, (option, key) => {
        _push(`<option${ssrRenderAttr("value", option.id)}>${ssrInterpolate(_ctx.__(`${option.value}`))}</option>`);
      });
      _push(`<!--]--></select>`);
      if (__props.errorMessage) {
        _push(`<div><p class="text-sm text-red-500">${ssrInterpolate(__props.errorMessage)}* </p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/BlackSelector.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main as a
};
