import { ref, defineComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { A as AdminLayout } from "./AdminLayout-e4a8ca54.js";
import { Link } from "@inertiajs/vue3";
import { P as PrimaryButton } from "./PrimaryButton-84eba42e.js";
import { D as DataTable } from "./DataTable-c39cb4cc.js";
import { _ as _sfc_main$1 } from "./SchemaFormBuilder-e4d70e64.js";
import "@heroicons/vue/20/solid/index.js";
import "./Dropdown-7075589d.js";
import "ziggy-js";
import "./_plugin-vue_export-helper-cc2b3d55.js";
import "notiwind";
import "./Pagination-cc4bc19e.js";
import "@vueuse/core";
import "./Modal-f5dacef9.js";
import "./BlackSelector-e9f3b662.js";
import "./SecondaryButton-0974b11b.js";
import "radix-vue";
const _sfc_main = {
  __name: "Privacy",
  __ssrInlineRender: true,
  props: {
    resourceType: {
      type: String
    },
    resources: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    ref(false);
    ref(false);
    const notification = ref(false);
    const type = ref("modal");
    const method = ref("POST");
    const notifyType = ref();
    const modalIsOpen = ref(false);
    const res = ref();
    const showNotify = (type2) => {
      notifyType.value = type2;
      notification.value = !notification.value;
      setTimeout(() => {
        notification.value = !notification.value;
      }, 2e3);
    };
    function schemaForm(resource = null, sendType, sendMethod) {
      method.value = sendMethod;
      type.value = sendType;
      modalIsOpen.value = !modalIsOpen.value;
      if (resource) {
        res.value = resource;
      }
    }
    defineComponent({
      name: "Privacy",
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
        "current-route": _ctx.$page.props.initialRoute,
        title: "Privacy"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full grid grid-cols-1 gap-4"${_scopeId}><div class="container-rounded"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><div${_scopeId}><h3 class="primary-text"${_scopeId}>${ssrInterpolate(_ctx.__("privacy"))}</h3><span class="secondary-text"${_scopeId}>This is a list of latest transactions</span></div><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(PrimaryButton, {
              onClick: ($event) => schemaForm(null, "create", "POST"),
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
            _push2(`</div></div><div class="flex flex-col mt-8"${_scopeId}><div class="overflow-x-auto rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(DataTable, {
              onEmitClick: (args) => schemaForm(args, "modal", "PUT"),
              resources: __props.resources,
              columnsOrder: _ctx.$page.props.columnsOrder,
              columns: _ctx.$page.props.columns,
              "initial-route": _ctx.$page.props.initialRoute,
              "search-route": _ctx.$page.props.searchRoute
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div${_scopeId}>`);
            if (__props.resources.data.length === 0) {
              _push2(`<h2 class="flex justify-center"${_scopeId}>${ssrInterpolate(_ctx.__("no_privacy"))}...</h2>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              type: type.value,
              "modal-is-open": modalIsOpen.value,
              onClose: schemaForm,
              onCloseModal: schemaForm,
              onShowNotify: showNotify,
              resource: res.value,
              "resource-type": __props.resourceType,
              endpoint: _ctx.$page.props.initialRoute,
              method: method.value,
              columns: ["id", "title", "content"],
              "resource-route": _ctx.$page.props.resourceRoute,
              fields: _ctx.$page.props.columnsOrder
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "w-full grid grid-cols-1 gap-4" }, [
                createVNode("div", { class: "container-rounded" }, [
                  createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h3", { class: "primary-text" }, toDisplayString(_ctx.__("privacy")), 1),
                      createVNode("span", { class: "secondary-text" }, "This is a list of latest transactions")
                    ]),
                    createVNode("div", { class: "flex-shrink-0" }, [
                      createVNode(PrimaryButton, {
                        onClick: ($event) => schemaForm(null, "create", "POST"),
                        class: "mx-2"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.__("create")), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-col mt-8" }, [
                    createVNode("div", { class: "overflow-x-auto rounded-lg" }, [
                      createVNode(DataTable, {
                        onEmitClick: (args) => schemaForm(args, "modal", "PUT"),
                        resources: __props.resources,
                        columnsOrder: _ctx.$page.props.columnsOrder,
                        columns: _ctx.$page.props.columns,
                        "initial-route": _ctx.$page.props.initialRoute,
                        "search-route": _ctx.$page.props.searchRoute
                      }, null, 8, ["onEmitClick", "resources", "columnsOrder", "columns", "initial-route", "search-route"])
                    ])
                  ]),
                  createVNode("div", null, [
                    __props.resources.data.length === 0 ? (openBlock(), createBlock("h2", {
                      key: 0,
                      class: "flex justify-center"
                    }, toDisplayString(_ctx.__("no_privacy")) + "...", 1)) : createCommentVNode("", true)
                  ]),
                  createVNode(_sfc_main$1, {
                    type: type.value,
                    "modal-is-open": modalIsOpen.value,
                    onClose: schemaForm,
                    onCloseModal: schemaForm,
                    onShowNotify: showNotify,
                    resource: res.value,
                    "resource-type": __props.resourceType,
                    endpoint: _ctx.$page.props.initialRoute,
                    method: method.value,
                    columns: ["id", "title", "content"],
                    "resource-route": _ctx.$page.props.resourceRoute,
                    fields: _ctx.$page.props.columnsOrder
                  }, null, 8, ["type", "modal-is-open", "resource", "resource-type", "endpoint", "method", "resource-route", "fields"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Privacy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
