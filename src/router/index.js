import Vue from 'vue'
import Router from 'vue-router'
// 引入 userElement 组件
import UserElement from '../components/userElement.vue'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import Users from '../components/home/layout/users/users.vue'
import Roles from "../components/home/roles/roles.vue"
import Rights from "../components/home/rights/rights.vue"
import Categories from "../components/home/categories/categories.vue"
import Goods from "../components/goods/goods.vue"
Vue.use(Router)

export default new Router({
  routes: [
    // 当请求 根目录 重定向到 /home 中
    { path: '/', redirect:  '/home'}, // 重定向
    { path: '/', redirect: { name: 'home' } },
    { path: '/userelement', component: UserElement }, // 使用 elementui 的路由
    { path: '/login', name: 'login', component: Login }, // 登录的路由
    { path: '/home', name: 'home', component: Home ,
    children:[
      {path:"/users",name:"users",component:Users},
      {path:"/roles",name:"roles",component:Roles},
      {path:"/rights",name:"rights",component:Rights},
      {path:"/categories",name:"categories",component:Categories},
      {path:"/goods",name:"goods",component:Goods}
    ]
   } // home 的路由
  ]
})
