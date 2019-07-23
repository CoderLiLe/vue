// 由于 webpack 是基于 Node 进行构建的，所有 webpack 的配置文件中，任何合法的 Node 代码都是支持的
var path = require('path')
// 在内存中，根据指定的模板页面生成一份内存中的首页，同时自动把打包好的 bundle 注入到页面底部
// 如果要配置插件，需要在导出的对象中挂载一个 plugins 节点
var htmlWebpackPlugin = require('html-webpack-plugin')

// Vue Loader v15 now requires an accompanying webpack plugin to function properly
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './src/main.js'), // 入口文件
    output: { // 指定输出选项
        path: path.join(__dirname, './dist'), // 输出路径
        filename: 'bundle.js' // 指定输出文件的名称
    },
    plugins: [ // 所有 webpack 插件的配置节点
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), // 指定模板文件路径
            filename: 'index.html' // 设置生成的内存页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module: { // 配置所有第三方 loader 模块
        rules: [ // 第三方模块的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
            { test: /\.vue$/, use: 'vue-loader' } // 处理 .vue 文件的 loader
        ]   
    }
}