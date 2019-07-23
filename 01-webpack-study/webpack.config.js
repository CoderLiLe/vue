// 导入处理路径的模块
const path = require('path')
// 启用热更新 的 第2步
const webpack = require('webpack')
// 导入在内存中生成 HTML 页面的插件
// 只要是插件，都一定要放到 plugins 节点中去
// 这个插件的两个作用：
// 1、自动在内存中根据指定页面生成一个内存中的页面
// 2、自动把打包好的 bundle.js 追加到页面中去
const htmlWebpackPlugin = require('html-webpack-plugin')

// node.js 语法，这个配置文件，其实就是一个 JS 文件，通过 Node 中的模块操作，向外暴露了一个 配置对象
module.exports = {
    // 在配置文件中，需要手动指定 入口 和 出口
    entry: path.join(__dirname, './src/main.js'), // 入口，表示要使用 webpack 打包那个文件
    output: {
        path: path.join(__dirname, './dist'), // 指定打包好的文件输出到那个目录中去
        filename: 'bundle.js' // 指定输出文件的名称
    },
    devServer: { // 这是配置 dev-server 命令参数的第二种形式，相对来说要麻烦一些
        // --open --port 3000 --contentBase src --hot
        open: true, // 自动打开浏览器
        port: 3000, // 设置启动时候的运行端口
        contentBase: 'src', // 指定托管的根目录
        hot: true // 启用热更新 的 第1步
    },
    plugins: [ // 配置插件的节点
        new webpack.HotModuleReplacementPlugin(), // ne 一个热更新的 模块对象，这是 启用热更新的第3步
        new htmlWebpackPlugin({ // 创建一个 在内存中 生成 HTML 页面的插件
            template: path.join(__dirname, './src/index.html'), // 指定模板页面，将来会根据指定的页面路径去生成内存中的页面
            filename: 'index.html' // 指定生成的页面名称
        })
    ],
    module:{ // 这个节点用于配置 所有 第三方模块 加载器
        rules: [ // 所有第三方模块的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 配置处理 .css 文件的第三方 loader 规则
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 配置处理 .less 文件的第三方 loader 规则
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 配置处理 .scss 文件的第三方 loader 规则
            // 处理 图片路径的 loader
            // limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串
            /**
             * 处理图片路径的 loader
             * 
             * limit：图片的大小，单位是 byte ，如果引用的图片 >= limit，则不会被转为 base64 格式的字符串；否则会被转为 base64 格式的字符串
             */
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' },
            { test: /\.(ttf|woff2|woff|eot|svg)$/, use: 'url-loader' }, // 处理 字体文件的 loader 
            { test:/\.js$/, use: 'babel-loader', exclude:/node_modules/ }
        ]
    }
}

/*
*  当我们在 控制台 直接输入 webpack 命令执行的时候，webpack 做了以下几步：
*  1、首先 webpack 发现我们并没有通过命令的形式给它指定 入口 和 出口
*  2、webpack 就会去项目的根目录中查找一个叫做 webpack.config.js 的配置文件
*  3、当找到配置对象后，webpack 就会去解析执行这个 配置文件，当解析执行完配置文件后，就得到了 配置文件中导出的配置对象
*  4、当 webpack 拿到配置对象后，就拿到了配置对象中指定的 入口 和 出口，然后进行打包构建
* */