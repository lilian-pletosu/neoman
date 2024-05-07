import {getCurrentInstance} from "vue";

const app = getCurrentInstance();

export function __(value) {
    return app.appContext.config.globalProperties.__(value);
}

export function clone(obj) {
    if (obj == null || typeof (obj) != 'object')
        return obj;
    var temp = new obj.constructor();
    for (var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}
