<template>
	<view class="page">
		<view class="search-block">
			<view class="search-ico-wapper"><image src="../../static/icos/search.png" class="search-ico"></image></view>
			<view class=""><input type="text" placeholder="搜索预告" maxlength="10" class="search-text" confirm-type="search" @confirm="searchMe" /></view>
		</view>
		<view class="movie-list page-block">
			<view class="movie-warpper" v-for="trailer in trailerList" :key="trailer.id">
				<image 
				:src="trailer.cover" 
				:data-trailerId="trailer.id"
				@click="showTrailer"
				class="poster"></image>
				<view class="movie-title">{{ trailer.name }}</view>
			</view>
			<!-- <view class="movie-warpper">
				<image src="http://122.152.205.72:88/superhero/MARVEL/SpiderManHomecoming/cover.png" class="poster"></image>
			</view> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			trailerList: [],
			keywords: '', // 搜索的关键字
			page: 1, // 当前第几页
			pageSize: 9,
			totalPages: 1 // 总页数
		};
	},
	onLoad() {
		uni.showLoading({
			title: '加载中...',
			mask: true
		});
		uni.showNavigationBarLoading();

		var serverUrl = this.serverUrl;
		// 猜你喜欢
		uni.request({
			url: serverUrl + '/search/list',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: {
				keywords: '',
				qq: '466481615',
				page: '',
				pageSize: ''
			},
			success: res => {
				// console.log(res.data);
				// 获取真实数据之前，务必判断状态是否为200
				if (res.data.status == 200) {
					var trailerList = res.data.data.rows;
					this.trailerList = trailerList;
					// console.log(this.trailerList)
				}
			},
			complete: () => {
				uni.hideNavigationBarLoading();
				uni.hideLoading();
			}
		});
	},
	onReachBottom() {
		var page = this.page + 1;
		var totalPages = this.totalPages;
		// 如果当前需要分页的分页数和总页数相等，就不分页
		if (page > totalPages) {
			return;
		}
		this.pagedTrailerList(this.keywords, page, 15);
	},
	methods: {
		showTrailer(e) {
			// console.log(e)
			var trailerId = e.currentTarget.dataset.trailerid;
			uni.navigateTo({
				url: '../movie/movie?trailerId=' + trailerId,
			});
		},
		pagedTrailerList(keywords, page, pageSize) {
			//搜索内容列表
			var serverUrl = this.serverUrl;
			// 猜你喜欢
			uni.request({
				url: serverUrl + '/search/list',
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					keywords: keywords,
					qq: '466481615',
					page: page,
					pageSize: pageSize
				},
				success: res => {
					// console.log(res.data);
					// 获取真实数据之前，务必判断状态是否为200
					if (res.data.status == 200) {
						var tempList = res.data.data.rows;
						//拼接获取到的数据
						this.trailerList = this.trailerList.concat(tempList);
						this.totalPages = res.data.data.total; //获取总页数
						this.page = page; //覆盖当前页面里的page
						// console.log(this.trailerList)
					}
				},
				complete: () => {
					uni.hideNavigationBarLoading();
					uni.hideLoading();
				}
			});
		},
		searchMe(e) {
			//获取搜索内容
			// console.log(e);
			this.keywords = e.detail.value;
			this.trailerList = [];
			this.pagedTrailerList(this.keywords, 1, 15);
		}
	}
};
</script>

<style lang="less">
@import url('search.less');
</style>
