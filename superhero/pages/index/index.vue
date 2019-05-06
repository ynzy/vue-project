<template>
	<view class="page">
		<!-- 轮播图 start -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="carousel">
			<swiper-item v-for="carousel in carouselList" :key="carousel.id"><image :src="carousel.image" class="carousel"></image></swiper-item>
		</swiper>
		<!-- 轮播图 end -->

		<!-- 热门超英 start -->
		<view class="page-block super-hot">
			<view class="hot-title-warpper">
				<image src="../../static/icos/hot.png" class="hot-ico"></image>
				<view class="hot-title">热门超英</view>
			</view>
		</view>

		<scroll-view scroll-x="true" class="page-block hot">
			<view class="single-poster" v-for="superhero in hotSuperheroList" :key="superhero.id">
				<view class="poster-warpper">
					<image :src="superhero.cover" class="poster"></image>
					<view class="movie-name">{{superhero.name}}</view>
					<view class="movie-score-warpper">
						<image src="../../static/icos/star-yellow.png" class="start-ico"></image>
						<image src="../../static/icos/star-yellow.png" class="start-ico"></image>
						<image src="../../static/icos/star-yellow.png" class="start-ico"></image>
						<image src="../../static/icos/star-yellow.png" class="start-ico"></image>
						<image src="../../static/icos/star-gray.png" class="start-ico"></image>
						<view class="movie-score">9.0</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 热门超英 end -->
		<trailerStars />
	</view>
</template>

<script>
// import common from "../../common/common.js"
import trailerStars from '../../components/trailerStars.vue';
export default {
	data() {
		return {
			carouselList: [],
			hotSuperheroList: []
		};
	},
	onLoad() {
		var me = this;

		// 获取common.js中的服务器地址
		// var serverUrl = common.serverUrl;
		// 通过挂载到main.js中获取服务器的地址，作为全局变量
		var serverUrl = this.serverUrl;
		//请求轮播图数据
		uni.request({
			url: serverUrl + '/index/carousel/list', //仅为示例，并非真实接口地址。
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: {
				qq: '466481615'
			},
			success: res => {
				// console.log(res.data);
				//获取真实数据之前，务必判断状态是否为200
				if (res.data.status == 200) {
					var carouselList = res.data.data;
					me.carouselList = carouselList;
				}
			}
		});
		// 查询热门超英
		uni.request({
			url: serverUrl + '/index/movie/hot?type=superhero',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: {
				qq: '466481615'
			},
			success: res => {
				console.log(res.data);
				// 获取真实数据之前，务必判断状态是否为200
				if (res.data.status == 200) {
					var hotSuperheroList = res.data.data;
					me.hotSuperheroList = hotSuperheroList;
				}
			}
		});
	},
	methods: {},
	components: {
		trailerStars
	}
};
</script>

<style lang="less">
@import url('index.less');
</style>
