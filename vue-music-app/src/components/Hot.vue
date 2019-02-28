<template>
  <div id="hot">	
		<div class="banner">
			热门歌曲
		</div>
		<songList :song-list="hotList"></songList>
	</div>
</template>

<script>
import songList from "./Songlist.vue"
    export default {
        		data() {
			return {hotList: []}
		},
		methods: {
			getHotList() {
				 this.$axios.get("/recommend").then(resp => {
					 
                    if (resp.status == 200) {
                    	this.hotList = resp.data;
                    }
                });
			}
        },
        mounted() {
            this.getHotList()
        },
        components: {
            songList
        }
    }
</script>

<style scoped  lang="stylus" rel="stylesheet/stylus">
    @import "../common/css/reset"
    .banner
    	padding-top 70px;
    	background url('/static/img/hot_banner.jpg')
    	font-size 20px
    	color white
    	padding-left 50px
    	padding-bottom 70px
    	margin-bottom 20px
</style>