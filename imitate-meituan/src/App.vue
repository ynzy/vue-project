<template>
  <div id="app">
    <!-- <mu-appbar style="width: 100%;" color="primary"></mu-appbar> -->
    <router-view/>
    
  </div>
</template>

<script>
export default {
  name: "App",
 
};
</script>

<style lang="less" >
@import 'http://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css'; 
.hairline-bottom {
    border-bottom: 1px solid #eee;
}
.hairline-right {
    border-right: 1px solid #eee;
}
.hairline-lr {
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
}
</style>
