<template>
  <div class="mebanner">
    <div class="loginbar">
      <van-row class="login" type="flex" justify="center">
        <mu-avatar :size="size">
          <img src="/static/head/uicon.jpg">
        </mu-avatar>
        <a>请点击此登录</a>
      </van-row>
    </div>
    <van-row class="menu" type="flex" justify="space-around">
      <van-col span="6">
          <van-icon name="star" />
          <div class="cont">收藏</div>
      </van-col>
      <van-col span="6">
          <van-icon name="column" />
          <div class="cont">订单</div>
      </van-col>
      <van-col span="6">
          <van-icon name="comment" />
          <div class="cont">消息</div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: 56
    };
  }
};
</script>

<style lang="less" scoped>
.mebanner {
  padding-top: 0.4rem;
}
.loginbar {
  padding-top: 0.2rem;
  height: 1rem;
  background: #009688;
  .login {
    flex-direction: column;
    align-items: center;
  }
}
.menu {
  align-items: center;
  padding: 5px 0;
  .van-col {
    text-align: center;
  }
}
.van-icon {
    font-size: 24px;
}
</style>