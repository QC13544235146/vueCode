// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import './style/common.css'
import './style/picker-extend.css'
import Api from './api/index.js';

Vue.prototype.$api = Api;

Vue.use(VueRouter)
const router = new VueRouter({
	routes
})

new Vue({
	router
}).$mount('#app')