<template>
    <div class="search" ref="search">
		<div class="inputcover">
			<input type="search"  v-model="currentSearch"   name="search" class="input" placeholder="" value="" autocomplete="off">
		</div>
		<div class="hotsearch" v-if="hotShow">
			<ul>
				<li class="item" v-for="item in hotSearchList" @click="getResult(item)">
					<a href="##">{{item.hotName}}</a>
				</li>
			</ul>
		</div>
		<transition name="fade">
			<songList :song-list="resultList" v-if="resultShow"></songList>
		</transition>
	</div>
</template>

<script>
import songList from "./Songlist.vue"
    export default {
        data() {
            return {
                currentSearch: "",
                hotSearchList: [],
                resultList: [],
                hotShow: true,
                resultShow: false
            }
        },
        watch: {
            currentSearch(val,oldval) {
                if(val == '') {
                    this.hotShow = true,
                    this.resultShow = false
                }
            }
        },
        methods: {
            getHotList() {
                this.$axios.get('/hot').then((response) => {
                    this.hotSearchList = response.data;
                })
            },
            getResult(item) {
                this.currentSearch = item.hotName;
                this.hotShow = false
                this.$axios.get('/recommend').then((response) => {
                    this.resultShow = true;
                    this.resultList = response.data;
                })
            }
        },
        mounted () {
            this.getHotList();
        },
        components: {
            songList
        }
    }
</script>

<style scoped  lang="stylus" rel="stylesheet/stylus">
    @import "../common/css/reset"
    .fade-enter-active,.fade-leave-active 
        transition  all 0.3s
    .fade-enter
        transform translateX(100%)
    .fade-leave-to
        transform translateX(100%)      
.search
    padding-left 20px
    padding-right 20px
    padding-top 10px
    .inputcover
        position: relative;
        width: 100%;
        height: 30px;
        padding: 0 30px;
        box-sizing: border-box;
        background: #ebecec;
        border-radius: 30px;
        margin-bottom 20px 
        .input 
            width: 100%;
            height: 30px;
            line-height: 18px;
            background: transparent;
            font-size: 16px;
            color: #333;       
            -webkit-appearance: none;
            border-radius: 0;
            border: 0; 
        .input:focus
            outline none   
    .hotsearch
    	.item
            display: inline-block;
            height: 25px;
            margin-right: 8px;
            margin-bottom: 8px;
            padding: 0 14px;
            font-size: 12px;
            line-height: 25px;
            color: #333; 
            border-radius: 32px; 
            border: 1px solid #d3d4da	
            a
            	font-size 14px            
    .resultlist
        .song
            background  url('/static/img/search_sprite.png') left center no-repeat
            background-size 15px 15px 
            padding-left 20%
            padding-top 8px
            padding-bottom 8px
            font-size 16px
            border-bottom 1px solid #eee
            border-top 1px solid #eee
                       
</style>