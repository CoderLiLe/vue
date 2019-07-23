// 如何在 webpack 构建的项目中，使用 Vue 进行开发

/**
 * 复习：在普通网页中如何使用 vue：
 * （1）使用 script 标签，引入 vue 的包
 * （2）在 index 页面中，创建一个 id 为 app 的 div 容器
 * （3）通过 new Vue 得到一个 vm 实例
 */

/**
 * 在 webpack 中尝试使用 Vue：
 * 注意：在 webpack 中使用 import Vue from 'vue' 导入的 Vue 构造函数，功能不完整，只提供了 runtime-only 的方式，并没有提供像网页中那样的使用方式；
 * 
 * 回顾 - 包的查找规则：
 * （1）找 项目根目录中有没有 node_modules 文件夹
 * （2）在 node_modules 中根据包名，找对应的 vue 文件夹
 * （3）在 vue 文件夹中，找一个叫做 package.json 的包配置文件
 * （4）在 package.json 文件中，查找一个 main 属性【main 属性指定了这个包在被加载时候的入口文件】
 * 
 * var login = {
 *      template: '<h1>这是 login 组件，是使用网页形式创建出来的组件</h1>'
 * }
 * 
 * 默认 webpack 无法打包 .vue 文件，需要安装相关的 loader：
 * cnpm i vue-loader vue-template-compiler -D
 * 
 * 在配置文件中新增：{ test: /\.vue$/, use: 'vue-loader' }
 */
import Vue from 'vue'
// import Vue from '../node_modules/vue/dist/vue.js'

// var login = {
//     template: '<h1>这是login组件，是使用网页中形式创建出来的组件</h1>'
// }

// 1、导入 login 组件
import login from './login.vue'

var vm = new Vue({
    el: '#app',
    data: {
        msg: '123'
    },
    // components: {
    //     login
    // }
    // render: function (createElements) { // 在 webpack 中，如果想要通过 vue， 把一个组件放到页面中去展示，vm 实例中的 render 函数可以实现
    //     return createElements(login)
    // }
    render: c => c(login)
})

/**
 * 总结 - webpack 中如何使用 vue：
 * （1）安装 vue 的包：cnpm i vue -S
 * （2）由于在 webpack 中推荐使用 .vue 这个组件模板文件定义组件，所以需要安装能解析这种文件的 loader 
 * （3）在 main.js 中导入 vue 模块：import Vue from 'vue'
 * （4）定义一个 .vue 结尾的组件，组件由三部分组成：template script style
 * （5）使用 import login from './login.vue' 导入这个组件
 * （6）创建一个 vm 实例：var vm = new Vue({ el: '#app', render: c => c(login) })
 * （7）在页面中创建一个 id 为 app 的 div 元素，作为 vm 实例要控制的区域
 */

import m22, { title as title123, content } from './test.js'
console.log(m22)
console.log(title123 + ' ----- ' + content)

