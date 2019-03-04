<template>
  <div>
    <router-view/>
    <mu-paper class="g-footer">
      <mu-bottom-nav :value="bottomNav">
        <mu-bottom-nav-item to="/home" value="/home" title="首页" icon="home"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="/recent" value="/recent" title="附近" icon="pin_drop"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="/guang" value="/guang" title="逛一逛" icon="language"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="/order" value="/order" title="订单" icon="assignment"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="/me" value="/me" title="我的" icon="account_circle"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </mu-paper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bottomNav: "/home"
    };
  },
  methods: {},
  mounted() {
    //当每次重新挂载(重新刷新)时，重新匹配路由，使导航和路由路径相匹配
    // console.log(this.$route.path);
    let path = this.$route.path;
    if(path=="/")path="/home";
    this.bottomNav = path;
  }
};
</script>
<style lang="less" >
//TODO:由于museui字体图标无法显示，直接引入cdn库
@import "http://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css";

.g-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
.mu-bottom-item {
  min-width: 0.62rem;
}
</style>