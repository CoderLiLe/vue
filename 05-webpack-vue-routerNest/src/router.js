import VueRouter from 'vue-router'

import account from './main/Account.vue'
import goodslist from './main/GoodsList.vue'

import login from './subcom/login.vue'
import register from './subcom/register.vue'

// 3、创建路由对象
var router = new VueRouter({
    routes: [
        {
            path: '/account',
            component: account,
            children: [
                { path: 'login', component: login },
                { path: 'register', component: register}
            ]
        },
        { path: '/goodslist', component: goodslist }
    ]
})

// 把路由对象暴露出去
export default router
