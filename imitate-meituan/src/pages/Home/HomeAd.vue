<template>
  <div class="homead">
    <van-row class="hairline-bottom hairline">
      <van-col  span="8">
        <div class="line">周三半价</div>
        <div class="linecolor">疯狂仅一天</div>
        <img src="../../../static/images/item1/dy.png" alt>
      </van-col>
      <van-col  span="8">
        <div class="line">免单伙食</div>
        <div class="linecolor">任性大派送</div>
        <img src="../../../static/images/item1/dy.png" alt>
      </van-col>
      <van-col  span="8">
        <div class="line">国庆特价</div>
        <div class="linecolor">泰国拼团甩尾</div>
        <img src="../../../static/images/item1/dy.png" alt>
      </van-col>
    </van-row>

    <van-row class="hairline" >
      <van-col span="6">
        <div class="line">10元红包</div>
        <div class="linecolor">领券看定影啦</div>
        <img src="../../../static/images/item1/dy.png" alt>
      </van-col>
      <van-col  span="6">
        <div class="line">免费专区</div>
        <div class="linecolor">免费抢不够</div>
        <img src="../../../static/images/item1/dy.png" alt>
      </van-col>
      <van-col span="6">
        <div class="line">畅想游乐</div>
        <div class="linecolor">全民嗨翻天</div>
        <img src="../../../static/images/item1/dy.png" alt>
      </van-col>
      <van-col span="6">
        <div class="line">优惠精选</div>
        <div class="linecolor">夏日好时光</div>
        <img src="../../../static/images/item1/dy.png" alt>
      </van-col>
    </van-row>

    <van-row class="adbig">
      <van-col span="24">大广告</van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  
};
</script>

<style lang="less" scoped>
.homead {
  margin-top: 10px;
}
.van-row {
  text-align: center;
  background: #fff;
}
.hairline {
    .van-col {
        border-right: 1px solid #eee;
    }
    .van-col:last-child {
        border-right: none;
    }
}
.van-col {
  padding-top: 10px;
  .line {
    font-weight: 700;
  }
  .linecolor {
    background-image: -webkit-gradient(
      linear,
      left 0,
      right 0,
      from(rgb(252, 126, 8)),
      to(rgb(240, 28, 21))
    );
    -webkit-background-clip: text; /*必需加前缀 -webkit- 才支持这个text值 */
    -webkit-text-fill-color: transparent; /*text-fill-color会覆盖color所定义的字体颜色： */
  }
  img {
    width: 50%;
  }
}
.adbig {
  margin-top: 10px;
  height: 100px;
  background: rgb(105, 17, 61);
}
</style>