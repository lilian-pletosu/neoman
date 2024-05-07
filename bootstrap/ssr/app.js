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
  resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Admin/Associations.vue": () => import("./assets/Associations-1b0069b0.js"), "./Pages/Admin/Attributes.vue": () => import("./assets/Attributes-4fde6ad9.js"), "./Pages/Admin/Banners.vue": () => import("./assets/Banners-fbebe485.js"), "./Pages/Admin/Brands.vue": () => import("./assets/Brands-c19a4b59.js"), "./Pages/Admin/Categories.vue": () => import("./assets/Categories-d4cee242.js"), "./Pages/Admin/Dashboard.vue": () => import("./assets/Dashboard-d9871d86.js"), "./Pages/Admin/Orders.vue": () => import("./assets/Orders-81794793.js"), "./Pages/Admin/Privacy.vue": () => import("./assets/Privacy-394802c8.js"), "./Pages/Admin/Products.vue": () => import("./assets/Products-9221e634.js"), "./Pages/Admin/Promotions.vue": () => import("./assets/Promotions-bca8dc6d.js"), "./Pages/Admin/Settings.vue": () => import("./assets/Settings-031bfb4f.js"), "./Pages/Admin/SubSubcategories.vue": () => import("./assets/SubSubcategories-886866ab.js"), "./Pages/Admin/Subcategories.vue": () => import("./assets/Subcategories-cd9b8140.js"), "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-6b703fc6.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-9344c9d7.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-c213b73c.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-9cedad50.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-c264ca7e.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-1f018232.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-a3b0c9d0.js"), "./Pages/Profile/Edit.vue": () => import("./assets/Edit-da6ed19a.js"), "./Pages/Profile/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-b14e15ed.js"), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-00523cfc.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm-cbd0200d.js"), "./Pages/User/AboutPage.vue": () => import("./assets/AboutPage-61cda7af.js"), "./Pages/User/CartPage.vue": () => import("./assets/CartPage-f36dc55b.js"), "./Pages/User/CategoryPage.vue": () => import("./assets/CategoryPage-aff586a5.js"), "./Pages/User/ContactPage.vue": () => import("./assets/ContactPage-48711d5d.js"), "./Pages/User/HomePage.vue": () => import("./assets/HomePage-81e54559.js"), "./Pages/User/PrivacyPage.vue": () => import("./assets/PrivacyPage-a72144f0.js"), "./Pages/User/ProductPage.vue": () => import("./assets/ProductPage-771551fa.js"), "./Pages/User/ProductsPage.vue": () => import("./assets/ProductsPage-f7ee584d.js"), "./Pages/User/SubcategoryPage.vue": () => import("./assets/SubcategoryPage-ff53bf3f.js"), "./Pages/User/TermsPage.vue": () => import("./assets/TermsPage-d7c9aea9.js"), "./Pages/Welcome.vue": () => import("./assets/Welcome-9b6118ff.js") })),
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
