import './bootstrap';

import Vue from 'vue';

new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue.js!'
    },
    template: '<div>{{ message }}</div>'
});
