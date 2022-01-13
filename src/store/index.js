import Vue from 'vue'
import Vuex from 'vuex'

// 导入home的store
import home from './home'
// 导入user的store
import user from './user'
// 导入search的store
import search from './search'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    home,
    user,
    search
  }
})
