const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/Home')
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: "login&register" */ '../views/Register'),
    meta: {
      isHideFooter: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login&register" */ '../views/Login'),
    meta: {
      isHideFooter: true
    }
  },
  {
    // 当有占位符的时候,需最少有一个参数,也可以加个?可传可不传,要不跳转的路径存在异常
    path: '/search/:keyword?',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search')
  },
  {
    // 当有占位符的时候,需最少有一个参数,也可以加个?可传可不传,要不跳转的路径存在异常
    // 当传递的params存在空串的时候,需要使用'' || undefinded 解决,否则路径会出现问题
    path: '/detail/:skuId?',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "detail" */ '../views/Detail')
  },
  // 引入添加购物车成功的路由
  {
    path: '/addcartsuccess',
    name: 'AddCartSuccess',
    component: () =>
      import(/* webpackChunkName: "addcartsuccess" */ '../views/AddCartSuccess')
  },
  // 购物车
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: () =>
      import(/* webpackChunkName: "addcartsuccess" */ '../views/ShopCart')
  },
  // 结算界面
  {
    path: '/trade',
    name: 'Trade',
    component: () => import(/* webpackChunkName: "trade" */ '../views/Trade')
  },
  // 支付界面
  {
    path: '/pay',
    name: 'Pay',
    component: () => import(/* webpackChunkName: "pay" */ '../views/Pay')
  },
  // 支付成功界面
  {
    path: '/paysuccess',
    name: 'PaySuccess',
    component: () => import(/* webpackChunkName: "pay" */ '../views/PaySuccess')
  },
  // 个人中心
  {
    path: '/center',
    name: 'Center',
    component: () => import(/* webpackChunkName: "pay" */ '../views/Center'),
    redirect: (to) => {
      // 方法接收目标路由作为参数
      // return 重定向的字符串路径/路径对象
      return { name: 'MyOrder', params: { pageNo: 1 } }
    },
    children: [
      {
        path: 'myorder/:pageNo?',
        name: 'MyOrder',
        component: () =>
          import(/* webpackChunkName: "center" */ '../views/Center/MyOrder')
      },
      {
        path: 'grouporder',
        component: () =>
          import(/* webpackChunkName: "center" */ '../views/Center/GroupOrder')
      }
    ]
  }
]

export default routes
