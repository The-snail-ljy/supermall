import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'

//安装插件
Vue.use(Vuex)

//创建Store对象
const state = {
    cartList: []
}
const store = new Vuex.Store({
    state,
    mutations,
    actions,
})

//挂载Vue实例上    到main.js里将store挂载上去
export default store