import Vue from 'vue'
import Vuex from 'vuex'
// 导入api获取数据
import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout
} from '@/api'
Vue.use(Vuex)

const state = {
  code: '',
  token: window.localStorage.getItem('token') || '', // 没key的时候是null
  userinfo: {}
}
const mutations = {
  GETCODE (state, code) {
    state.code = code
  },
  USERLOGIN (state, token) {
    state.token = token
  },
  GETUSERINFO (state, userinfo) {
    state.userinfo = userinfo
  },
  CLEAR (state) {
    // 清除仓库和本地存储的
    state.token = ''
    state.userinfo = {}
    window.localStorage.removeItem('token')
  }
}
const actions = {
  // 获取验证码
  async getCode ({ commit }, phone) {
    const result = await reqGetCode(phone)
    console.log(result)
    // {"code":200,"message":"成功","data":"806731","ok":true}
    if (result.code === 200) {
      commit('GETCODE', result.data)
    }
  },
  // 用户注册
  async userRegister ({ commit }, data) {
    // console.log(data)
    const result = await reqUserRegister(data)
    // console.log('@@@@', result)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('注册失败'))
    }
  },
  // 用户登录
  async userLogin ({ commit }, data) {
    const result = await reqUserLogin(data)
    // console.log(result)
    if (result.code === 200) {
      commit('USERLOGIN', result.data.token)
      // 持久化存储token
      window.localStorage.setItem('token', result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('登录失败'))
    }
  },
  // 获取用户信息
  async getUserInfo ({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('没有用户信息'))
    }
  },
  // 退出登录
  async userLogout ({ commit }) {
    const result = await reqLogout()
    if (result.code === 200) {
      commit('CLEAR')
      return 'ok'
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
