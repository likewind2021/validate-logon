import Vue from 'vue'
import VueRouter from 'vue-router'

// Vue中运用import的懒加载语句以及webpack的魔法注释，在项目进行webpack打包的时候，对不同模块进行代码分割，
// 在首屏加载时，用到哪个模块再加载哪个模块，实现懒加载进行页面的优化
// const Login = () => import(/* webpackChunkName: 'login */ '../views/Login.vue')
// const Reg = () => import(/* webpackChunkName: 'reg */ '../views/Reg.vue')
// const Forget = () => import(/* webpackChunkName: 'forget */ '../views/Forget.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login */ '../views/Login.vue')
  },
  {
    path: '/reg',
    name: 'reg',
    component: () => import(/* webpackChunkName: 'reg */ '../views/Reg.vue'),
    beforeEnter: (to, from, next) => {
      if (from.name === 'login') {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import(/* webpackChunkName: 'forget */ '../views/Forget.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
