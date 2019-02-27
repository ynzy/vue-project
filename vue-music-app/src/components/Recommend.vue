<template>
  <div class="recommend">
    <h2 class="recommendlist">推荐歌单</h2>
    <slider>
      <!-- TODO:使用插槽,通过组件的slot标签，替换数据 -->
      <div v-for="item in songList" class="banner">
        <a :href="item.linkUrl">
          <img class="bannerimg" :src="item.songImgSrc"  :alt="item.songName">
        </a>
      </div>
    </slider>
    <h2 class="recommendlist">推荐歌单</h2>
  </div>
</template>

<script>
import slider from "./slider.vue";

export default {
  data() {
    return { songList: [] };
  },
  components: {
    slider
  },
  methods: {
    getSongList() {
      this.$axios.get("/static/data/songList.json").then(resp => {
        if (resp.status == 200) {
          this.songList = resp.data;
        //   console.log(resp.data);
        }
      });
    }
  },
  mounted() {
    //TODO:vue实例挂载之后，只会执行一次,通常是在一些插件的使用或者组件的使用中进行操作
    this.getSongList();
  }
};
</script>

<style scoped  lang="stylus" rel="stylesheet/stylus">
.recommend {
  height: 300px;
  min-height: 100%;
  background: #fcfcfd;

  .recommendlist {
    height: 20px;
    line-height: 20px;
    text-align: center;
    padding-left: 9px;
    margin: 10px 0;
    font-size: 15px;
    font-weight: 400;
    border-left: 2px solid #d33a31;
  }
}
</style>