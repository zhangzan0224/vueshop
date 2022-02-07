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
  }
]

export default routes
