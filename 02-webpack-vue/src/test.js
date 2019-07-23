// 这是 Node 中向外暴露成员的形式
// module.exports = {}

/**
 * 在 ES6 中，也通过规范的形式规定了 ES6 中如何 导入 和 导出 模块
 * 在 ES6 中导入模块使用 import 模块名称  from '模块标识符' import '表示路径'
 * 
 * 在 ES6 中，使用 export default 和 export 向外暴露成员
 */
var info = {
    name: 'lile',
    age: 20
}

/**
 * 注意一：
 * （1）export default 向外暴露的成员可以使用任意的变量来接收
 * （2）在一个模块中，export default 只允许向外暴露 1 次
 * （3）在一个模块中，可以同时使用 export default 和 export 向外暴露成员
 * 
 * 注意二：
 * （1）使用 export 向外暴露的成员，只能使用 {} 的形式来接收，这种形式叫做 【按需导出】
 * （2）export 可以向外暴露多个成员，同时如果某些成员我们在 import 的时候不需要，则可以不在 {} 中定义
 * （3）使用 export 导出的成员，必须严格按照导出时候的名称，来使用 {} 按需接收
 * （4）使用 export 导出的成员，如果就想换个名称来接收，则可以使用 as 来起个别名
 */
// export default info

export default {
    address: '北京'
}

export var title = '小星星'
export var content = '哈哈哈'

// 在 Node 中，使用 var 名称 = require('模块标识符') 
// module.exports 和 exports 来暴露成员