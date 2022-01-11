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
