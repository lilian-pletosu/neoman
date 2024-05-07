import { unref, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
const Welcome_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  __name: "Welcome",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Welcome" }, null, _parent));
      _push(`<div class="antialiased max-h-screen bg-cover bg-no-repeat"><div class="bg-gradient-to-r m-4"><img class="w-40 h-auto" src="img/neo_logo_new.png" alt="neoman.md"></div><div class="flex flex-col justify-between"><div class="flex justify-center h-96 items-center"><h1 class="flex text-black font-normal text-lg md:text-2xl lg:text-7xl">Great things coming soon.</h1></div><div class="flex justify-center"><p>We are a small and growing shop with big ideas.</p></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Welcome.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
