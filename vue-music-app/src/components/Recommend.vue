<template>
  <div class="recommend">
    <h2 class="recommendlist">推荐歌单</h2>
    <slider>
      <!-- TODO:使用插槽,通过组件的slot标签，替换数据 -->
      <div v-for="item in slider" class="banner">
        <a :href="item.linkUrl">
          <img class="bannerimg" :src="item.songImgSrc"  :alt="item.songName">
        </a>
      </div>
    </slider>
    <h2 class="recommendlist">推荐歌单</h2>
    <div class="loadingcontainer">
			<loading v-show="!songList.length"></loading>
		</div>
    <!-- 动态绑定数据，子组件通过props接收数据 -->
    <songList :song-list="songList"></songList>
    	
  </div>
</template>

<script>
import slider from "./slider.vue";
import songList from "./Songlist.vue"
import loading from "./loading.vue"
export default {
  data() {
    return { 
      slider: [], 
      songList: []
    };
  },
  components: {
    slider,
    songList,
    loading
  },
  methods: {
    getSlider() {
      this.$axios.get("/song/").then(resp => {
        if (resp.status == 200) {
          this.slider = resp.data;
        }
      });
    },
    getSongList() {
      this.$axios.get("/recommend/").then(resp => {
        if (resp.status == 200) {
          this.songList = resp.data;
        }
      });
    }
  },
  mounted() {
    //TODO:vue实例挂载之后，只会执行一次,通常是在一些插件的使用或者组件的使用中进行操作
    this.getSlider();
    setTimeout(() => {
      this.getSongList();
    }, 1000);
    
  }
};
</script>

<style scoped  lang="stylus" rel="stylesheet/stylus">
    @import "../common/css/reset"
    .recommend
    	background #fcfcfd
    	height 300px
    	min-height 100%
    	ul
    		height 300px
    	.clearleft
    		clear left
    	li
    		width 32%
    		float left
    		padding-left 1%
    		position relative
    		text-align center
    		img
    			width 100%
    			height 100%
    			border-radius 10px
            .songName
    		    position absolute
    		    top 0px
    		    text-align center
    		    color white
    		    font-family "微软雅黑"	
    		    font-size 12px
    		    margin 0 auto
    .recommendlist
    	padding-left 9px
    	height 20px
    	line-height 20px
    	font-size 15px
    	margin-top 10px
    	text-align center
    	margin-bottom 10px
    	font-weight 400 
    	border-left 2px solid #d33a31
    .loadingcontainer
    	position relative
    	top 50px	
</style>