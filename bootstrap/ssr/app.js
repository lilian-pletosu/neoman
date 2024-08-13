import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { createPinia } from "pinia";
import { ZiggyVue } from "ziggy-js";
import PrimeVue from "primevue/config/config.esm.js";
const app = "";
async function resolvePageComponent(path, pages) {
  const page = pages[path];
  if (typeof page === "undefined") {
    throw new Error(`Page not found: ${path}`);
  }
  return typeof page === "function" ? page() : page;
}
const theme = "";
const appName = "Neoman";
const appDescription = "Alături la fiecare etapă în viață";
const pinia = createPinia();
createInertiaApp({
  title: (title) => `${appName}.md - ${appDescription}`,
  description: (description) => description,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Admin/About.vue": () => import("./assets/About-994cdde5.js"), "./Pages/Admin/Associations.vue": () => import("./assets/Associations-66ba46a1.js"), "./Pages/Admin/Attributes.vue": () => import("./assets/Attributes-86cb4257.js"), "./Pages/Admin/Banners.vue": () => import("./assets/Banners-2227d741.js"), "./Pages/Admin/Brands.vue": () => import("./assets/Brands-5bf61aeb.js"), "./Pages/Admin/Categories.vue": () => import("./assets/Categories-66a71278.js"), "./Pages/Admin/Dashboard.vue": () => import("./assets/Dashboard-3dc7d145.js"), "./Pages/Admin/ImportedProducts.vue": () => import("./assets/ImportedProducts-b575094f.js"), "./Pages/Admin/Orders.vue": () => import("./assets/Orders-2750e63a.js"), "./Pages/Admin/Privacy.vue": () => import("./assets/Privacy-9105b4ff.js"), "./Pages/Admin/Products.vue": () => import("./assets/Products-36bb82eb.js"), "./Pages/Admin/Promotions.vue": () => import("./assets/Promotions-9cc4643f.js"), "./Pages/Admin/Settings.vue": () => import("./assets/Settings-98d3ad44.js"), "./Pages/Admin/SubSubcategories.vue": () => import("./assets/SubSubcategories-05a834ab.js"), "./Pages/Admin/Subcategories.vue": () => import("./assets/Subcategories-e4847519.js"), "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-96df9122.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-264e7834.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-dc98413b.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-b8cf98c6.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-5d20697e.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-94df0fc7.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-a3b0c9d0.js"), "./Pages/Profile/Edit.vue": () => import("./assets/Edit-b143fc4c.js"), "./Pages/Profile/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-89fdc0d7.js"), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-00523cfc.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm-cbd0200d.js"), "./Pages/User/AboutPage.vue": () => import("./assets/AboutPage-e0b527e1.js"), "./Pages/User/AllProductsPage.vue": () => import("./assets/AllProductsPage-3dd89916.js"), "./Pages/User/CartPage.vue": () => import("./assets/CartPage-1301c052.js"), "./Pages/User/CategoryPage.vue": () => import("./assets/CategoryPage-8b18ef12.js"), "./Pages/User/ContactPage.vue": () => import("./assets/ContactPage-735afe89.js"), "./Pages/User/HomePage.vue": () => import("./assets/HomePage-0860045e.js"), "./Pages/User/PrivacyPage.vue": () => import("./assets/PrivacyPage-935ab6a8.js"), "./Pages/User/ProductPage.vue": () => import("./assets/ProductPage-ff1cf951.js"), "./Pages/User/ProductsPage.vue": () => import("./assets/ProductsPage-2cb44f64.js"), "./Pages/User/SubcategoryPage.vue": () => import("./assets/SubcategoryPage-ad1b9401.js"), "./Pages/User/TermsPage.vue": () => import("./assets/TermsPage-4ff53f88.js"), "./Pages/Welcome.vue": () => import("./assets/Welcome-9b6118ff.js") })),
  setup({ el, App, props, plugin }) {
    const app2 = createApp({ render: () => h(App, props) });
    app2.config.globalProperties.__ = (str, replace) => {
      str = props.initialPage.props.localization[str] ?? str;
      if (replace) {
        if (typeof replace === "object") {
          for (const property in replace) {
            str = str.replace(`${property}`, replace[property]);
          }
        }
        if (typeof replace === "string") {
          str = str.replace("%s%", replace);
        }
      }
      return str;
    };
    app2.config.globalProperties.truncate = (str, length) => {
      if (str.length > length) {
        return str.substring(0, length) + "...";
      } else {
        return str;
      }
    };
    app2.config.globalProperties.asset = (path) => {
      var base_path = window._asset || "";
      return base_path + path;
    };
    app2.config.globalProperties.fetchedSchemaFormBuild = (schema) => {
      let form = {};
      schema.fields.forEach((f) => form[f.name] = f.value);
      form.relations = schema.relations;
      form.image = null;
      return form;
    };
    app2.use(pinia);
    return app2.use(plugin).use(PrimeVue).use(ZiggyVue, Ziggy, "route").mount(el);
  },
  progress: {
    // color: '#d3405b',
    color: "#5b98dc"
  }
});
