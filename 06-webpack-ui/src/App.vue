<template>
  <div>
    <h1>这是 App 组件</h1>

    <mt-button type="danger" icon="more" @click="show">default</mt-button>

    <mt-button type="danger" size="large" plain>default</mt-button>

    <mt-button type="danger" size="small" disabled>default</mt-button>

    <button type="button" class="mui-btn mui-btn-royal">
      紫色
    </button>

    <router-link to="/account">Account</router-link>
    <router-link to="/goodslist">Goodslist</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
import { Toast } from "mint-ui"

export default {
  data() {
    return {
      toastInstanse: null
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      // 模拟获取列表的一个 Ajax 方法
      // 在获取数据之前，立即弹出 Toast 提示用户正在加载数据
      this.show();
      setTimeout(() => {
        // 当 3 秒过后，数据获取回来了，要把 Toast 移除
        this.toastInstanse.close();
      }, 3000);
    },
    show() {
      this.toastInstanse = Toast({
        message: "这是消息",
        duration: 5000, // 如果是 -1，则弹出之后不消失
        position: "top",
        iconClass: "glyphicon glyphicon-heart", // 设置图标的类
        className: "mytoast" // 自定义 Toast 的样式，需要自己提供一个类名
      });
    }
  }
}
</script>


<style>

</style>



