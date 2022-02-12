import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入store
import store from '@/store'
// 引入路由信息
import routes from './routes'
Vue.use(VueRouter)
// 需要重写VueRouter.prototype原型对象身上的push|replace方法
// 先把VueRouter.prototype身上的push|replace方法进行保存一份
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function (location, resolve, reject) {
  // 第一个形参：路由跳转的配置对象（query|params））
  // 第二个参数：undefined|箭头函数（成功的回调）
  // 第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    // push方法传递第二个参数|第三个参数（箭头函数）
    // originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject)
  } else {
    // push方法没有产地第二个参数|第三个参数
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
// 重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

const router = new VueRouter({
  routes,
  // 路由滚动行为
  scrollBehavior (to, from, savedPosition) {
    return { y: 0 }
  }
})
// 路由全局前置守卫

router.beforeEach(async (to, from, next) => {
  // 如果用户登录过,有token,那就不能再去login页面了
  // 有token说明登录了
  const token = store.state.user.token
  //  空对象也是真,得通过里面的属性是否存在值
  // Bollean({}) === true
  const userName = store.state.user.userinfo.name
  if (token) {
    // 用户已经登录还想再去login,休想,停留在首页
    if (to.path === '/login') {
      next('/home')
    } else {
      // 登录了,但去的不是login,可能去的是(home|search)
      // 有用户名信息,放行,要不一刷新就没有了用户信息
      if (userName) {
        next()
      } else {
        // 没有用户信息,派发action让仓库存储用户信息再去跳转,有用户信息,再去跳转
        try {
          const result = await store.dispatch('getUserInfo')
          if (result === 'ok') {
            next()
          }
        } catch (error) {
          // token失效了,得清空信息
          // 清除所有的信息,跳转到登录界面
          const result = await store.dispatch('userLogout')
          if (result === 'ok') {
            next('/login')
          }
        }
      }
    }
  } else {
    // !未登录 先放行
    // ! 未登录不能去交易相关,支付相关,不能去个人中心
    const toPath = to.path
    if (
      toPath.indexOf('/trade') != -1 ||
      toPath.indexOf('/pay') != -1 ||
      toPath.indexOf('/center') != -1
    ) {
      // 将之前要跳转的路由信息保存到query参数中去; 可以使用decodeURIComponent('%2Fcenter%2Fmyorder%2F1')解析参数
      /**
       * decodeURIComponent('%2Fcenter%2Fmyorder%2F1')
       * '/center/myorder/1',
       * 然后在跳转的时候进行判断,是否有query参数,如果存在,别跳到query
       */
      next('/login?redirect=' + toPath)
    } else {
      next()
    }
  }
})
export default router
