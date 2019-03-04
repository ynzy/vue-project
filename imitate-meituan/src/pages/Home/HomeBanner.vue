<template>
  <div class="banner">
    <van-swipe class="banner-item"  :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banner">
          <img :src="item.image" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>

export default {
    data () {
        return {
            banner: []
        }
    },
    mounted () {
        this.axios.get('https://www.easy-mock.com/mock/5c7d08e7b7a08d1246bef9ff/api/banner').then(resp => {
            // console.log(resp.data)
            if(resp.data) {
                this.banner = resp.data.banner;
                console.log(this.banner)
            }
        }) 
    }
};
</script>

<style lang="less" scoped>
.banner {
    margin-top: 0.5rem;
    .banner-item {
        height: 1.2rem;
    }
}
</style>