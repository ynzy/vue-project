<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-card v-for="(item,index) in list" :key="index">
        <div slot="title">
          <strong>{{item.desc}}</strong>
          <div class="distance">< 500m</div>
        </div>
        <div slot="desc">{{item.pos}}{{item.id}}</div>
        <div slot="price">
          <span>￥{{item.price}}</span>
          <van-tag size="medium" type="danger">劲爆</van-tag>
          <div class="workoff">已售{{item.sales}}</div>
        </div>
        <div slot="thumb">
          <img :src="'/static/shoplog/'+ item.imgurl" alt>
        </div>
      </van-card>
    </van-list>
  </div>
</template>

<script>
var shopList = "http://localhost:8066/static/json/shopList.json";

import { getShopList } from "@/api/shop";

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 0
    };
  },
  mounted() {
    
  },
  methods: {
    onLoad() {
      this.page++; //每次加载刷新，页数加1
      // 数据全部加载完成
      setTimeout(() => {
        getShopList(this.page)
          .then(res => {
            if (res.data.success) {
              console.log("123");
              // console.log(this.list);
              // console.log(res.data.shop);
              res.data.shop.forEach(item => {
                this.list.push(item);
              });
              // 加载状态结束
              this.loading = false;
            }
          })
          .catch(function(err) {
            alert("接口错误：" + err);
          });
      }, 2000);
      //如果获取数据长度超过了70,则不再获取数据
      if (this.list.length >= 70) {
        this.finished = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.van-list {
  /deep/ .van-card {
    background: #fff;
  }
}
.van-card__price {
  margin-top: 5px;
  width: 100%;
}
.van-card__content {
  strong {
    font-size: 14px;
  }
}
.distance {
  float: right;
  width: 0.6rem;
  text-align: right;
  font-weight: 500;
  color: #000;
}
.workoff {
  float: right;
  width: 0.6rem;
  text-align: right;
  font-weight: 500;
  color: #000;
}
</style>