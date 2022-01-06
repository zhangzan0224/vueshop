import Vue from 'vue'
import Vuex from 'vuex'
// 导入api获取数据
import { reqgetBaseCategoryList } from '@/api'
Vue.use(Vuex)

const state = {
  // home仓库中存储三级菜单的数据
  categoryList: []
}
const mutations = {
  GETBASECATEGORYLIST (state, categoryList) {
    state.categoryList = categoryList
  }
}
const actions = {
  async getBaseCategoryList ({ commit }) {
    const res = await reqgetBaseCategoryList()
    // console.log(res)
    if (res.code === 200) {
      commit('GETBASECATEGORYLIST', res.data)
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
