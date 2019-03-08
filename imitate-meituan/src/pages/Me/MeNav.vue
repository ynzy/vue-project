<template>
  <div class="menav">
    <van-nav-bar title="个人中心">
      <van-icon name="manager" slot="right"/>
      <van-icon name="setting" slot="right"/>
      <van-icon name="bell" slot="right"/>
    </van-nav-bar>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.menav {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9999;
}
.van-icon {
    display: inline-block;
    font-size: 20px;
    &:nth-child(2) {
        margin: 0 15px;
    }
}
</style>