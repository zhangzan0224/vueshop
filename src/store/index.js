import Vue from 'vue'
import Vuex from 'vuex'

// 导入home的store
import home from './home'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    home
  }
})
