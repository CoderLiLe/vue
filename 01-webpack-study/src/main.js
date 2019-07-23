// 这个 main.js 是我们项目 JS 的入口文件

// import *** from *** 是 ES6 中导入模块的方式
// 由于 ES6 的代码太高级了，无法被浏览器解析，所以，这一行执行会报错
import $ from 'jquery'
// const $ = require('jquery')

// 使用 import 语法导入 css 样式表
/**
 * 注意：webpack 默认只能打包处理 JS 类型的文件，无法处理其他非 JS 类型的文件
 * 如果要处理 非JS 类型的文件，我们需要手动安装一些 合适的 第三方 loader 加载器
 * 
 * 1、css
 * （1）安装：cnpm i style-loader css-loader -D
 * （2）在 webpack.config.js 这个配置文件中，新增一个配置节点 module，它是一个对象；在这个 module 对象身上，有个 rules 属性，这个 rules 属性是个数组；在这个数组中存放了所有第三方文件的匹配和处理规则
 * 
 * 2、less
 *      cnpm i less -D
 *      cnpm i less-loader -D
 * 
 * 3、scss
 *      cnpm i node-sass -D
 *      cnpm i sass-loader -D
 * 
 * 
 * webpack 处理第三方文件类型的过程：
 * （1）发现这个 要处理的文件不是JS文件，然后就去 配置文件 中查找有没有对应的第三方 loader 规则
 * （2）如果能找到对应的规则，就会调用 对应的 loader 处理 这种类型的文件
 * （3）在调用 loader 的时候，是从后往前调用的
 * （4）当最后一个 loader 调用完毕，会把处理的结果直接交给 webpack 进行打包合并，最终输出到 bundle.js 中。
 */
import './css/index.css'
import './css/index.less'
import './css/index.scss'

import 'bootstrap/dist/css/bootstrap.css'

$(function () {
    $('li:odd').css('backgroundColor', 'green')
    $('li:even').css('backgroundColor', function () {
        return '#' + 'D97634'
    })
})

/*
* 经过刚才的演示，webpack 可以做什么事情？
* 1、webpack 能够处理 JS 文件之间的互相依赖关系
* 2、webpack 能够处理 JS 的兼容问题，把 高级的、浏览器不识别的语法，转为 低级的、浏览器能识别的语法
*
* webpack 4 中的命令格式：webpack 要打包的文件路径 打包好的输出文件的路径
* */


/*
* 使用 webpack-dev-server 这个工具，来实现自动打包编译的功能
* 1、运行 npm i webpack-dev-server -D 把这个工具安装到项目的本地开发依赖
* 2、安装完毕后，这个工具的用法和 webpack 命令的用法完全一样
* 3、由于我们在项目中本地安装的 webpack-dev-server，所以无法把它当作 脚本命令在 powershell 终端直接运行（只有那些 安装到 全局 -g 的工具才能在终端中正常执行）
* 4、注意：webpack-dev-server 这个工具，如果想要正常运行要求在本地项目中必须安装 webpack
* 5、webpack-dev-server 帮我们打包生成的 bundle.js 文件，该文件并没有存放到实际的物理磁盘中，而是直接托管到了电脑的内存中，所以我们在项目的根目录中找不到 这个打包好的 bundle.js
* 6、我们可以认为 webpack-dev-server 把打包好的文件以一种虚拟的形式托管到了项目的根目录中。虽然我们看不到它，但是可以认为和 dist src node_modules 平级，有一个看不见的文件叫做 bundle.js
*
* */

/*********************************** webpack 中 babel 的使用 begin ******************************************/

// class 关键字是 ES6 中提供的新语法，是用来实现 ES6 中面向对象编程的方式
class Person {
    // 使用 static 关键字可以定义静态属性
    // 所谓静态属性就是可以直接通过 类名 访问的属性
    // 实例属性：只能通过类的实例来访问的属性
    static info = { name: 'lile', age: 18 }
}

/**
 * 在 webpack 中，默认只能处理 一部分 ES6 的新语法，一些更高级的 ES6 或者 ES7 语法，webpack 是处理不了的；
 * 这时候需要借助第三方的 loader 来帮助 webpack 处理这些高级的语法，当第三方 loader 把 高级语法 转为 低级语法 后，就会把结果交给 webpack 去打包到 bundle.js 中
 * 
 * 通过 Babel 可以将 高级语法 转为 低级语法
 * 1. 在 webpack 中可以运行如下两套命令去安装 Babel 相关的 loader 功能
 *    1.1 第一套包：cnpm i babel-core babel-loader babel-plugin-transform-runtime -D
 *    1.2 第二套包：cnpm i babel-preset-env babel-preset-stage-0 -D
 * 2. 打开 webpack 的配置文件，在 module 节点下的 rules 数组中，添加一个新的匹配规则：
 *    2.1 { test:/\.js$/, use: 'babel-loader', exclude:/node_modules/ }
 *    2.2 注意：在配置 babel 的 loader 规则的时候，必须把 node_modules 目录通过 exclude 选项排除，原因有二：
 *        2.2.1 如果不排除 node_modules，则 Babel 会把 node_modules 中所有的第三方 JS 文件都打包编译，这样会非常消耗 CPU，同时打包速度非常慢
 *        2.2.2 即使最终 Babel 把所有 node_modeles 中的 JS 转换完毕了，项目也无法运行
 * 3. 在项目的根目录中，创建一个叫做 .babelrc 的 Babel 配置文件，这个配置文件属于 JSON 格式，所以在写 .babelrc 配置的时候，必须符合 JSON 语法规范：不能写注释，字符串必须用双引号
 *      {
 *          "presets": ["env", "stage-0"],
 *          "plugins": ["transform-runtime"]
 *      }
 * 4. 了解：目前我们安装的 babel-preset-env 是比较新的 ES 语法，之前我们安装的是 babel-preset-es2015，现在出了一个更新的语法插件 babel-preset-env，它包含了所有和 es*** 相关的语法
 */
console.log(Person.info)

function Animal(name) {
    this.name = name
}

Animal.info = 123

var a1 = new Animal('小明')

// 访问静态属性
console.log(Animal.info)
// 访问实例属性
console.log(a1.name)

/*********************************** webpack 中 babel 的使用 end ******************************************/

/*********************************** webpack-vue begin ******************************************/
/**
 * 如何在普通网页中使用 vue ？
 * （1）使用 script 标签引入 vue 包
 * （2）在 index 页面中创建一个 id 为 app 的 div 容器
 * （3）通过 new Vue 得到一个 vm 实例
 * 
 * 如何在 webpack 构建的项目中使用 Vue 进行开发？
 * 注意：在 webpack 中使用 import Vue from 'vue' 导入的 Vue 构造函数功能不完善，只提供了 runtime-only 的方式，并没有提供像网页中那样的使用方式
 *
 * 包的查找规则：
 * （1）找 项目根目录中有么有 node_modules 文件夹
 * （2）在 node_modules 中根据包名找对应的 vue 文件夹
 * （3）在 vue 文件夹中找一个叫做 package.json 的包配置文件
 * （4）在 package.json 中查找一个 main 属性【main 属性指定了这个包在被加载的时候的入口文件】
 * 
 */

import Vue from 'vue'
// import Vue from '../node_modules/vue/dist/vue.js'

 var login = {
     template: '<h1>这是 login 组件，是使用网页中形式创建出来的组件</h1>'
 }

 var vm = new Vue({
     el: '#app',
     data: {
        msg: '123'
     },
     components: {
         login
     }
 })

/*********************************** webpack-vue end ******************************************/