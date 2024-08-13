import { ref, defineComponent, mergeProps, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { A as AdminLayout } from "./AdminLayout-ff29a823.js";
import { useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./SchemaFormBuilder-dfb2e1a6.js";
import DataTable from "primevue/datatable/datatable.esm.js";
import Column from "primevue/column/column.esm.js";
import { P as Pagination } from "./Pagination-cc4bc19e.js";
import "@heroicons/vue/20/solid/index.js";
import "./Dropdown-7075589d.js";
import "./ShortLogo-3a83a5f7.js";
import "ziggy-js";
import "./_plugin-vue_export-helper-cc2b3d55.js";
import "notiwind";
import "./Modal-4741da5a.js";
import "./BlackSelector-e9f3b662.js";
import "./SecondaryButton-0974b11b.js";
import "./PrimaryButton-84eba42e.js";
import "radix-vue";
const _sfc_main = {
  __name: "ImportedProducts",
  __ssrInlineRender: true,
  props: {
    initialRoute: {
      type: String
    },
    resourceType: {
      type: String
    },
    resources: {
      type: Object
    }
  },
  setup(__props) {
    ref(false);
    const modalIsOpen = ref(false);
    const notifyType = ref();
    const notification = ref(false);
    const method = ref("POST");
    const type = ref("modal");
    const res = ref();
    const selectedProduct = ref();
    useForm({
      file: null
    });
    const showNotify = (type2) => {
      notifyType.value = type2;
      notification.value = !notification.value;
      setTimeout(() => {
        notification.value = !notification.value;
      }, 2e3);
    };
    function schemaForm(resource = null, sendType, sendMethod) {
      console.log(resource);
      method.value = sendMethod;
      type.value = sendType;
      modalIsOpen.value = !modalIsOpen.value;
      if (resource) {
        res.value = resource;
        res.value["brand_name"] = res.value["brand"]["name"];
        res.value["sub_sub_category_name"] = res.value["sub_sub_category"]["name"];
      }
    }
    defineComponent({
      name: "Products",
      components: {
        AdminLayout,
        Link,
        useForm
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        "current-route": __props.initialRoute,
        title: "Products"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full grid grid-cols-1 gap-4"${_scopeId}><div class="container-rounded"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><div${_scopeId}><h3 class="primary-text"${_scopeId}>${ssrInterpolate(_ctx.__("products"))}</h3><span class="secondary-text"${_scopeId}>${ssrInterpolate(_ctx.__("products_description_admin"))}</span></div></div><div class="flex flex-col mt-8"${_scopeId}><div class="container-rounded"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DataTable), {
              selection: selectedProduct.value,
              "onUpdate:selection": ($event) => selectedProduct.value = $event,
              value: __props.resources.data,
              dataKey: "id"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Column), {
                    class: "border",
                    headerStyle: "width: 3rem",
                    selectionMode: "multiple"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Column), {
                    header: _ctx.__("name"),
                    field: "name"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Column), {
                    header: _ctx.__("sub_subcategory"),
                    field: "sub_sub_category.name"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Column), {
                    header: _ctx.__("brand"),
                    field: "brand.name"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Column), {
                      class: "border",
                      headerStyle: "width: 3rem",
                      selectionMode: "multiple"
                    }),
                    createVNode(unref(Column), {
                      header: _ctx.__("name"),
                      field: "name"
                    }, null, 8, ["header"]),
                    createVNode(unref(Column), {
                      header: _ctx.__("sub_subcategory"),
                      field: "sub_sub_category.name"
                    }, null, 8, ["header"]),
                    createVNode(unref(Column), {
                      header: _ctx.__("brand"),
                      field: "brand.name"
                    }, null, 8, ["header"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex place-content-start mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(Pagination, {
              links: __props.resources.links
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div${_scopeId}>`);
            if (__props.resources.data.length === 0) {
              _push2(`<h2 class="flex justify-center"${_scopeId}>${ssrInterpolate(_ctx.__("no_products"))}...</h2>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              columns: ["name", "description", "product_code", "price", "brand_name", "sub_sub_category_name", "attributes"],
              endpoint: __props.initialRoute,
              fields: _ctx.$page.props.columnsOrder,
              method: method.value,
              "modal-is-open": modalIsOpen.value,
              resource: res.value,
              "resource-route": _ctx.$page.props.resourceRoute,
              "resource-type": __props.resourceType,
              type: type.value,
              onClose: schemaForm,
              onShowNotify: showNotify,
              onCloseModal: schemaForm
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "w-full grid grid-cols-1 gap-4" }, [
                createVNode("div", { class: "container-rounded" }, [
                  createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h3", { class: "primary-text" }, toDisplayString(_ctx.__("products")), 1),
                      createVNode("span", { class: "secondary-text" }, toDisplayString(_ctx.__("products_description_admin")), 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-col mt-8" }, [
                    createVNode("div", { class: "container-rounded" }, [
                      createVNode(unref(DataTable), {
                        selection: selectedProduct.value,
                        "onUpdate:selection": ($event) => selectedProduct.value = $event,
                        value: __props.resources.data,
                        dataKey: "id"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Column), {
                            class: "border",
                            headerStyle: "width: 3rem",
                            selectionMode: "multiple"
                          }),
                          createVNode(unref(Column), {
                            header: _ctx.__("name"),
                            field: "name"
                          }, null, 8, ["header"]),
                          createVNode(unref(Column), {
                            header: _ctx.__("sub_subcategory"),
                            field: "sub_sub_category.name"
                          }, null, 8, ["header"]),
                          createVNode(unref(Column), {
                            header: _ctx.__("brand"),
                            field: "brand.name"
                          }, null, 8, ["header"])
                        ]),
                        _: 1
                      }, 8, ["selection", "onUpdate:selection", "value"]),
                      createVNode("div", { class: "flex place-content-start mt-4" }, [
                        createVNode(Pagination, {
                          links: __props.resources.links
                        }, null, 8, ["links"])
                      ])
                    ])
                  ]),
                  createVNode("div", null, [
                    __props.resources.data.length === 0 ? (openBlock(), createBlock("h2", {
                      key: 0,
                      class: "flex justify-center"
                    }, toDisplayString(_ctx.__("no_products")) + "...", 1)) : createCommentVNode("", true)
                  ]),
                  createVNode(_sfc_main$1, {
                    columns: ["name", "description", "product_code", "price", "brand_name", "sub_sub_category_name", "attributes"],
                    endpoint: __props.initialRoute,
                    fields: _ctx.$page.props.columnsOrder,
                    method: method.value,
                    "modal-is-open": modalIsOpen.value,
                    resource: res.value,
                    "resource-route": _ctx.$page.props.resourceRoute,
                    "resource-type": __props.resourceType,
                    type: type.value,
                    onClose: schemaForm,
                    onShowNotify: showNotify,
                    onCloseModal: schemaForm
                  }, null, 8, ["endpoint", "fields", "method", "modal-is-open", "resource", "resource-route", "resource-type", "type"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/ImportedProducts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
