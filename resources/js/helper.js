import {getCurrentInstance} from "vue";

const app = getCurrentInstance();

export function __(value) {
    return app.appContext.config.globalProperties.__(value);
}
