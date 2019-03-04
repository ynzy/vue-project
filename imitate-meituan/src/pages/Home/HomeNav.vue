<template>
  <div class="nav">
    <van-row type="flex" class="item">
      <van-col class="left" type="flex" justify="center" span="4">
          保定
        <van-icon name="arrow-down"/>
      </van-col>
      <van-col span="17">
        <van-search placeholder="请输入搜索关键词"/>
      </van-col>
      <van-col span="3">
           <van-icon size="25px" name="scan"/>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    }
  }
};
</script>

<style lang="less" scoped>
.nav {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 22;
    background: #fff;
    // line-height: 54px;
    .item {
        align-items: center;
       .left {
           padding-left: 10px;
       }
    }
}
</style>