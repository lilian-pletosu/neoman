import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { createPinia } from "pinia";
import { ZiggyVue } from "ziggy-js";
import PrimeVue from "primevue/config/config.esm.js";
import Aura from "@primevue/themes/aura";
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
  resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Admin/About.vue": () => import("./assets/About-45f1ec7c.js"), "./Pages/Admin/Associations.vue": () => import("./assets/Associations-fd48045c.js"), "./Pages/Admin/Attributes.vue": () => import("./assets/Attributes-d2721bbe.js"), "./Pages/Admin/Banners.vue": () => import("./assets/Banners-8ba4c705.js"), "./Pages/Admin/Brands.vue": () => import("./assets/Brands-c24a6bec.js"), "./Pages/Admin/Categories.vue": () => import("./assets/Categories-93c26b4e.js"), "./Pages/Admin/Dashboard.vue": () => import("./assets/Dashboard-4886327b.js"), "./Pages/Admin/ImportedProducts.vue": () => import("./assets/ImportedProducts-5881bd5d.js"), "./Pages/Admin/Orders.vue": () => import("./assets/Orders-add3a50e.js"), "./Pages/Admin/Privacy.vue": () => import("./assets/Privacy-3abf67c8.js"), "./Pages/Admin/Product.vue": () => import("./assets/Product-f73eb1a5.js"), "./Pages/Admin/Products.vue": () => import("./assets/Products-50abd70b.js"), "./Pages/Admin/Promotions.vue": () => import("./assets/Promotions-41d23d27.js"), "./Pages/Admin/Settings.vue": () => import("./assets/Settings-4a3fd8e1.js"), "./Pages/Admin/SubSubcategories.vue": () => import("./assets/SubSubcategories-72cae8d7.js"), "./Pages/Admin/Subcategories.vue": () => import("./assets/Subcategories-9cf47676.js"), "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-1324929f.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-b549e19f.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-4f09bc61.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-78aaa992.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-95a1fde5.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-94df0fc7.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-a3b0c9d0.js"), "./Pages/Profile/Edit.vue": () => import("./assets/Edit-6d167d48.js"), "./Pages/Profile/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-496e75a0.js"), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-69a4f8a0.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm-bf6e892e.js"), "./Pages/User/AboutPage.vue": () => import("./assets/AboutPage-ab6e3146.js"), "./Pages/User/AllProductsPage.vue": () => import("./assets/AllProductsPage-6f34994b.js"), "./Pages/User/CartPage.vue": () => import("./assets/CartPage-40d8bc18.js"), "./Pages/User/CategoryPage.vue": () => import("./assets/CategoryPage-07599522.js"), "./Pages/User/ContactPage.vue": () => import("./assets/ContactPage-bec225b8.js"), "./Pages/User/HomePage.vue": () => import("./assets/HomePage-6876a09d.js"), "./Pages/User/PrivacyPage.vue": () => import("./assets/PrivacyPage-7d5d0a77.js"), "./Pages/User/ProductPage.vue": () => import("./assets/ProductPage-77d6e0a9.js"), "./Pages/User/ProductsPage.vue": () => import("./assets/ProductsPage-c3820b50.js"), "./Pages/User/SubcategoryPage.vue": () => import("./assets/SubcategoryPage-ef2f0778.js"), "./Pages/User/TermsPage.vue": () => import("./assets/TermsPage-ff0907b5.js"), "./Pages/Welcome.vue": () => import("./assets/Welcome-9b6118ff.js") })),
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
    return app2.use(plugin).use(PrimeVue, {
      // Default theme configuration
      theme: {
        preset: Aura,
        options: {
          prefix: "p",
          darkModeSelector: "system",
          cssLayer: false
        }
      }
    }).use(ZiggyVue, Ziggy, "route").mount(el);
  },
  progress: {
    // color: '#d3405b',
    color: "#5b98dc"
  }
});
