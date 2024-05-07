import { getCurrentInstance, ref, onMounted, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { P as Pagination } from "./Pagination-cc4bc19e.js";
import { useForm, router } from "@inertiajs/vue3";
import { P as PrimaryButton } from "./PrimaryButton-84eba42e.js";
import { XCircleIcon } from "@heroicons/vue/20/solid/index.js";
import { useDateFormat } from "@vueuse/core";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const DataTable_vue_vue_type_style_index_0_scoped_da439cb9_lang = "";
const _sfc_main = {
  __name: "DataTable",
  __ssrInlineRender: true,
  props: {
    resources: {
      type: Object
    },
    columnsOrder: {
      type: Array
    },
    columns: {
      type: Array
    },
    searchRoute: {
      type: String,
      required: true
    },
    initialRoute: {
      type: String,
      required: true
    },
    resourceType: {
      type: String
    }
  },
  emits: ["emitClick"],
  setup(__props, { emit: __emit }) {
    const app = getCurrentInstance();
    let searchText = ref();
    useForm({});
    const search = () => {
      submitSearch();
    };
    const submitSearch = () => {
      router.visit(route(`${app.props.searchRoute}.index`, {
        search: searchText.value
      }, { only: ["resources"] }));
    };
    const applyFormat = (columnName, columnValue) => {
      if (["is_enabled", "is_active"].includes(columnName)) {
        if (columnValue === 1) {
          return "active";
        }
        return "inactive";
      }
      if (columnName === "description") {
        if (columnValue === null) {
          return "---";
        }
        return columnValue.slice(0, 23) + "...";
      }
      if (columnName === "icon") {
        if (columnValue === null) {
          return "---";
        }
        return columnValue;
      }
      if (columnName === "created_at") {
        if (columnValue === null) {
          return "---;";
        }
        return useDateFormat(columnValue, "dddd, D MMMM", { locales: "rum" }).value;
      }
      return columnValue;
    };
    const clearSearch = () => {
      searchText.value = "";
      router.visit(route(`${app.props.searchRoute}.index`, {
        search: searchText.value
      }));
    };
    onMounted(() => {
      searchText.value = app.appContext.config.globalProperties.$page.props.filters.search;
      document.querySelector('input[id="search"]').focus();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="flex mb-4" data-v-da439cb9><div class="flex lg:w-1/2 xl:w-4/12 relative" data-v-da439cb9><input type="text" id="search"${ssrRenderAttr("value", unref(searchText))}${ssrRenderAttr("aria-label", _ctx.__("search"))}${ssrRenderAttr("placeholder", _ctx.__("search..."))} class="block flex rounded-md border-gray-300 shadow-sm focus:border-teal-500 flex-auto pr-10" data-v-da439cb9>`);
      _push(ssrRenderComponent(unref(XCircleIcon), {
        class: "w-5 absolute right-2 top-2/4 transform -translate-y-2/4 cursor-pointer text-gray-500",
        onClick: clearSearch
      }, null, _parent));
      _push(`</div><div class="flex" data-v-da439cb9>`);
      _push(ssrRenderComponent(PrimaryButton, {
        class: "mx-1 w-full h-full",
        onClick: search
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.__("search"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.__("search")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex flex-col mt-8" data-v-da439cb9><div class="overflow-x-auto md:overflow-hidden flex rounded-lg" data-v-da439cb9><div class="align-middle inline-block w-full" data-v-da439cb9><div class="shadow overflow-hidden sm:rounded-lg" data-v-da439cb9><table class="w-full divide-y divide-gray-200" data-v-da439cb9><thead class="bg-gray-50" data-v-da439cb9><tr data-v-da439cb9><!--[-->`);
      ssrRenderList(__props.columnsOrder, (column) => {
        _push(`<th scope="col" class="${ssrRenderClass([{ "hidden xl:block": column === "description" }, "p-4 text-xs font-medium text-gray-500 uppercase tracking-wider flex-1"])}" data-v-da439cb9>${ssrInterpolate(_ctx.__(column))}</th>`);
      });
      _push(`<!--]--></tr></thead><tbody class="bg-white" data-v-da439cb9><!--[-->`);
      ssrRenderList(__props.resources.data, (resource, index) => {
        _push(`<tr class="hover:bg-gray-100 w-full" data-v-da439cb9><!--[-->`);
        ssrRenderList(__props.columnsOrder, (columnInOrder) => {
          _push(`<!--[--><!--[-->`);
          ssrRenderList(__props.columns, (column) => {
            _push(`<!--[-->`);
            if (column === columnInOrder) {
              _push(`<td class="${ssrRenderClass([{ "hidden xl:block": columnInOrder === "description" }, "py-2 px-6 text-sm text-gray-900 whitespace-wrap"])}" data-v-da439cb9>`);
              if (columnInOrder === "image") {
                _push(`<!--[-->`);
                if (resource[columnInOrder] && resource[columnInOrder] !== "image") {
                  _push(`<img class="w-16 mx-auto"${ssrRenderAttr("src", resource[columnInOrder])} alt="image if" data-v-da439cb9>`);
                } else if (resource[columnInOrder]) {
                  _push(`<img class="w-16 mx-auto"${ssrRenderAttr("src", "/img/no_image.svg")} alt="image else" data-v-da439cb9>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`<!--]-->`);
              } else if (column === "website") {
                _push(`<div class="rounded flex justify-center" data-v-da439cb9><a rel="stylesheet" title="sds"${ssrRenderAttr("href", `http://${resource[columnInOrder]}`)} data-v-da439cb9>${ssrInterpolate(resource[columnInOrder])}</a></div>`);
              } else if (column === "is_enabled") {
                _push(`<div class="${ssrRenderClass([{
                  "status-active text-white": resource[columnInOrder] === 1,
                  "status-inactive text-white": resource[columnInOrder] === 0
                }, "rounded p-1 text-center text-black shadow mx-auto"])}" data-v-da439cb9>${ssrInterpolate(_ctx.__(applyFormat(column, resource[columnInOrder])) ?? "--")}</div>`);
              } else if (column === "is_active") {
                _push(`<div class="${ssrRenderClass([{
                  "status-active text-white": resource[columnInOrder] === 1,
                  "status-inactive text-white": resource[columnInOrder] === 0
                }, "rounded p-1 text-center text-black shadow mx-auto"])}" data-v-da439cb9>${ssrInterpolate(_ctx.__(applyFormat(column, resource[columnInOrder])) ?? "--")}</div>`);
              } else if (column === "status") {
                _push(`<div class="${ssrRenderClass([{
                  "status-pending text-white": resource[columnInOrder] === "pending",
                  "status-confirmed text-white": resource[columnInOrder] === "confirmed",
                  "status-shipped text-white": resource[columnInOrder] === "shipped",
                  "status-delivered text-white": resource[columnInOrder] === "delivered",
                  "status-canceled text-white": resource[columnInOrder] === "canceled",
                  "status-inactive text-white": resource[columnInOrder] === "inactive",
                  "status-active text-white": resource[columnInOrder] === "active"
                }, "rounded p-1 text-center text-black shadow mx-auto"])}" data-v-da439cb9><p data-v-da439cb9>${ssrInterpolate(_ctx.__(applyFormat(column, resource[columnInOrder])) ?? "--")}</p></div>`);
              } else if (column === "icon") {
                _push(`<div class="flex items-center justify-center first-letter:uppercase" data-v-da439cb9><p data-v-da439cb9>${resource[columnInOrder]}</p></div>`);
              } else {
                _push(`<div class="flex items-center justify-center first-letter:uppercase" data-v-da439cb9><p class="first-letter:uppercase" data-v-da439cb9>${ssrInterpolate(_ctx.__(applyFormat(column, resource[columnInOrder])) ?? "---")}</p></div>`);
              }
              _push(`</td>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          });
          _push(`<!--]-->`);
          if (_ctx.$page.props.relationColumns) {
            _push(`<!--[-->`);
            ssrRenderList(_ctx.$page.props.relationColumns, (relationColumn) => {
              var _a;
              _push(`<!--[-->`);
              if (relationColumn.label === columnInOrder) {
                _push(`<td class="py-2 px-6 text-sm text-gray-900 whitespace-nowrap hover text-center first-letter:uppercase" data-v-da439cb9>${ssrInterpolate(((_a = resource[relationColumn.relation]) == null ? void 0 : _a.name) ?? "---")}</td>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<!--]-->`);
            });
            _push(`<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="flex place-content-start mt-4" data-v-da439cb9>`);
      _push(ssrRenderComponent(Pagination, {
        links: __props.resources.links
      }, null, _parent));
      _push(`</div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DataTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DataTable = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-da439cb9"]]);
export {
  DataTable as D
};
