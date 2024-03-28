export default {
    methods: {
        clearObject: function (obj, val = '') {
            Object.keys(obj).forEach(k => {
                if (Array.isArray(obj[k])) {
                    obj[k] = [];
                } else if (typeof obj[k] === 'object' && obj[k] !== null) {
                    this.clearObject(obj[k]);
                } else {
                    obj[k] = val
                }
            });
        },
    },
};
