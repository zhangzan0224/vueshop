const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home')
  },
  {
    path: '/home',
    name: 'Home',
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
    component: () => import(/* webpackChunkName: "trade" */ '../views/Trade'),

    beforeEnter: (to, from, next) => {
      //  !路由独享守卫,如果从购物车界面过来的,可以放行,不能直接进来
      if (from.path === '/shopcart') {
        next()
      } else {
        if (from.path === '/') {
          console.log('if')
          next('/home')
        } else {
          // console.log('else')
          if (from.query.redirect) {
            next(from.query)
          }
          next(false) // 从哪里来回哪里去
        }
      }
    }
  },
  // 支付界面
  {
    path: '/pay',
    name: 'Pay',
    component: () => import(/* webpackChunkName: "pay" */ '../views/Pay'),
    /* 只能从交易界面, 才能跳转到支付界面 */
    beforeEnter (to, from, next) {
      if (from.path === '/trade') {
        next()
      } else {
        // console.log('pay退回来的')
        next('/trade') // 退到trade,如果从/来的退到/home
      }
    }
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
