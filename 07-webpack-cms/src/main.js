// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)

// 导入 MUI 的样式表，和 Bootstrap 的用法没有差别
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

// 按需导入 Mint-UI 组件
import { Header, Swipe, SwipeItem } from 'mint-ui'
// 使用 Vue.component 注册按钮组件
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem) 

// 1.3 导入自己的 router.js 路由模块
import router from './router.js'

import app from './App.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(app), // render 会把 el 指定的容器中所有的内容都清空覆盖，所以不要把路由的 router-view 和 router-link 直接写到 le 所控制的元素中
    router // 4、将路由对象挂载到 vm 上
})
// 注意： App 这个组件，是通过 VM 实例的 render 函数，渲染出来的， render 函数如果要渲染 组件， 渲染出来的组件，只能放到 el: '#app' 所指定的 元素中；
// Account 和 GoodsList 组件， 是通过 路由匹配监听到的，所以， 这两个组件，只能展示到 属于 路由的 <router-view></router-view> 中去；