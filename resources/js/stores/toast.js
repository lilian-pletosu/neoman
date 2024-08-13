import {reactive} from "vue";

export default reactive({
    items: [],

    add(item) {
        this.items.unshift({
            key: Symbol(),
            ...item
        });
    },
    remove(index) {
        this.items.splice(index, 1);
    }
});
