import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './assets/iconfont/iconfont.css'
import store from './store/index'
import toast from './components/common/toast/index'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

//new一个vue实例作为事件总线
Vue.prototype.$bus = new Vue()
Vue.use(toast)

//解决移动端300ms延迟的问题
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyLoad,{
  loading: require ('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
