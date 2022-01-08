import Vue from 'vue'
import Vuex from 'vuex'
// 导入api获取数据
import {
  reqgetBaseCategoryList,
  reqGetBannerList,
  reqGetFloorData
} from '@/api'
Vue.use(Vuex)

const state = {
  // home仓库中存储三级菜单的数据
  categoryList: [],
  // 轮播图的数据
  bannerList: [],
  // Floor组件的数据
  floorList: []
}
const mutations = {
  GETBASECATEGORYLIST (state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST (state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST (state, floorList) {
    state.floorList = floorList
  }
}
const actions = {
  async getBaseCategoryList ({ commit }) {
    const res = await reqgetBaseCategoryList()
    // console.log(res)
    if (res.code === 200) {
      commit('GETBASECATEGORYLIST', res.data)
    }
  },
  async getBannerList ({ commit }) {
    const res = await reqGetBannerList()
    // console.log(res)
    if (res.code === 200) {
      commit('GETBANNERLIST', res.data)
    }
  },
  async getFloorData ({ commit }) {
    const res = await reqGetFloorData()
    // console.log(res)
    if (res.code === 200) {
      commit('GETFLOORLIST', res.data)
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
