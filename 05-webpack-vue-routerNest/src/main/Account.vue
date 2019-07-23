<template>
  <div>
    <h1>这是 Account 组件</h1>

    <router-link to="/account/login">登录</router-link>
    <router-link to="/account/register">注册</router-link>

    <router-view></router-view>
  </div>
</template>


<script>
</script>

// 普通的 style 标签只支持 普通的 样式，如果想要启用 scss 或 less ，需要为 style 元素，设置 lang 属性
<style lang="scss" scoped>
// 只要 style 标签是在 .vue 组件中定义的，那么推荐都为 style 开启 scoped 属性
body {
  div {
    font-style: italic;
  }
}
</style>
