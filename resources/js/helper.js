import { getCurrentInstance } from "vue";

const app = getCurrentInstance();

export function __(value) {
    return app.appContext.config.globalProperties.__(value);
}

export function clone(obj) {
    if (obj == null || typeof obj != "object") return obj;
    var temp = new obj.constructor();
    for (var key in obj) temp[key] = clone(obj[key]);
    return temp;
}
export function formatDate(date, format = "DD.MM.YYYY") {
    if (!date) return "";

    const d = new Date(date);

    const map = {
        DD: String(d.getDate()).padStart(2, "0"),
        MM: String(d.getMonth() + 1).padStart(2, "0"),
        YYYY: d.getFullYear(),
        HH: String(d.getHours()).padStart(2, "0"),
        mm: String(d.getMinutes()).padStart(2, "0"),
        ss: String(d.getSeconds()).padStart(2, "0"),
    };

    return format.replace(/DD|MM|YYYY|HH|mm|ss/g, (matched) => map[matched]);
}
