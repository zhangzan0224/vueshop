// 统一管理项目接口的模块
// 引入二次封装的axios（带有请求、响应的拦截器）

import requests from './requests'

// 引入mock的ajax

import mockRequests from './mockAjax'

// 三级菜单的请求地址  /api/product/getBaseCategoryList
// GET    没有任何参数

export const reqgetBaseCategoryList = () =>
  requests('/product/getBaseCategoryList')

// 导出mock 模拟接口的数据

export const reqGetBannerList = () => mockRequests.get('/banner')

export const reqGetFloorData = () => mockRequests.get('/floor')

// 获取注册的验证码
// api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) =>
  requests('/user/passport/sendCode/' + phone)
// 注册的接口
// api/user/passport/register

export const reqUserRegister = (data) =>
  requests({
    url: '/user/passport/register',
    method: 'post',
    data
  })
// /api/user/passport/login
// 登录的接口
export const reqUserLogin = (data) =>
  requests({
    url: '/user/passport/login',
    method: 'post',
    data
  })

// 添加了token校验获取用户登录信息，用户登录只保存用户的token
// /api/user/passport/auth/getUserInfo
export const reqUserInfo = () =>
  requests({
    url: '/user/passport/auth/getUserInfo',
    methond: 'get'
  })

// 退出登录 /api/user/passport/logout

export const reqLogout = () =>
  requests({
    url: '/user/passport/logout'
  })

// 获取搜索的商品列表 地址 /api/list
/* 参数
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/

export const reqGetSearchList = (data) =>
  requests({
    url: '/list',
    data,
    method: 'post'
  })
