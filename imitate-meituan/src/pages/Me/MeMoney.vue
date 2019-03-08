<template>
  <div class="memoney">
    <van-cell-group id="qianbao">
      <van-cell is-link>
        <template slot="icon">
          <van-icon name="shop-o"/>
        </template>
        <template slot="title">
          <span class="custom-text">单元格</span>
        </template>
      </van-cell>
      <van-cell is-link>
        <template slot="icon">
          <van-icon name="shop-o"/>
        </template>
        <template slot="title">
          <span class="custom-text">单元格</span>
        </template>
      </van-cell>
      <van-cell is-link>
        <template slot="icon">
          <van-icon name="shop-o"/>
        </template>
        <template slot="title">
          <span class="custom-text">单元格</span>
        </template>
      </van-cell>
      <van-cell is-link>
        <template slot="icon">
          <van-icon name="shop-o"/>
        </template>
        <template slot="title">
          <span class="custom-text">单元格</span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
#qianbao {
    .van-icon {
        color: orange;
    }
}
</style>