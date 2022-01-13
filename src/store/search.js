import Vue from 'vue'
import Vuex from 'vuex'
// 导入api获取数据
import { reqGetSearchList } from '@/api'
Vue.use(Vuex)

const state = {
  listData: {}
}
const mutations = {
  GET_SEARCH_LIST (state, listData) {
    state.listData = listData
  }
}
const actions = {
  async getSearchList ({ commit }, params = {}) {
    const result = await reqGetSearchList(params)
    // console.log(result)
    if (result.code === 200) {
      commit('GET_SEARCH_LIST', result.data)
    }
  }
}
const getters = {
  attrsList (state) {
    return state.listData.attrsList
  },
  goodsList (state) {
    return state.listData.goodsList
  },
  trademarkList (state) {
    return state.listData.trademarkList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
