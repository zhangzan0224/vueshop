import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入api工具
// import * as API from '@/api'

// 定义全局组件：在入口文件注册一次之后，在任何组件当中都可以使用
import typeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
// 导入mock的服务器接口
// 只是执行这个js文件,不需要使用其中的函数等等
import '@/mock/mockServer'
// 引入swiper 的css样式,在全局引用,因为很多模块使用
import 'swiper/css/swiper.css'
// 全局组件：第一个参数 组件名字  第二个参数：那个组件
Vue.component(typeNav.name, typeNav)
Vue.component(Carousel.name, Carousel)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate () {
    // Vue.prototype.$API = API
  }
}).$mount('#app')
