import Vue from 'vue'
import Vuex from 'vuex'
// 导入api获取数据
import { reqGetCode, reqUserRegister } from '@/api'
Vue.use(Vuex)

const state = {
  code: ''
}
const mutations = {
  GETCODE (state, code) {
    state.code = code
  }
}
const actions = {
  async getCode ({ commit }, phone) {
    const result = await reqGetCode(phone)
    console.log(result)
    // {"code":200,"message":"成功","data":"806731","ok":true}
    if (result.code === 200) {
      commit('GETCODE', result.data)
    }
  },
  async userRegister (data) {
    const result = await reqUserRegister(data)
    console.log(result)
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
