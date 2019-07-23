import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入 bootstrap 样式
import 'bootstrap/dist/css/bootstrap.css'
import './css/app.css'

// 导入 MUI 的样式表，和 Bootstrap 的用法没有差别
import './lib/mui/css/mui.min.css'

// 按需导入 Mint-UI 组件
import { Button } from 'mint-ui'
// 使用 Vue.component 注册按钮组件
Vue.component(Button.name, Button) 
console.log(Button.name)

import app from './App.vue'
import router from './router.js'

var vm = new Vue({
    el: '#app',
    render: c => c(app), // render 会把 el 指定的容器中所有的内容都清空覆盖，所以不要把路由的 router-view 和 router-link 直接写到 le 所控制的元素中
    router // 4、将路由对象挂载到 vm 上
})
// 注意： App 这个组件，是通过 VM 实例的 render 函数，渲染出来的， render 函数如果要渲染 组件， 渲染出来的组件，只能放到 el: '#app' 所指定的 元素中；
// Account 和 GoodsList 组件， 是通过 路由匹配监听到的，所以， 这两个组件，只能展示到 属于 路由的 <router-view></router-view> 中去；