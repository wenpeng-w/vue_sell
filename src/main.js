import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods.vue';
import ratings from 'components/ratings/ratings.vue';
import seller from 'components/seller/seller.vue';

import 'common/stylus/index.css';

Vue.use(VueRouter);
Vue.use(VueResource);

//const routes = [
//	{
//		path: '/',
//		component: goods
//	},
//	{
//		path: '/goods',
//		component: goods
//	},
//	{
//		path: '/ratings',
//		component: ratings
//	},
//	{
//		path: '/seller',
//		component: seller
//	}
//];
//
//const router = new VueRouter({
//	linkActiveClass: 'active',
//	routes
//});

/* eslint-disable no-new */
//new Vue({
//	el: '#app',
//	router,
//	render: h => h(App)
//});

let routes = [
  {path: '/', name: 'index', component: App, children: [{path: '/goods', component: goods}, {path: '/ratings', component: ratings}, {path: '/seller', component: seller}]}
];
let router = new VueRouter({
  'linkActiveClass': 'active',
   routes // （缩写）相当于 routes: routes
});
let app = new Vue({
  router
}).$mount('#app');
  router.push('/goods');
export default app;
