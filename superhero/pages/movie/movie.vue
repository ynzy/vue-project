<template>
	<view>
		<!-- 视频播放 start -->
		<view class="player">
			<video 
			id="myTrailer"
			:src="trailerInfo.trailer" 
			:poster="trailerInfo.poster"
			 class="movie"
			  :autoplay="true"
			   controls></video></view>
		<!-- 视频播放 end -->

		<!-- 影片基本信息 start -->
		<view class="movie-info">
			<navigator :url="'../cover/cover?cover=' + trailerInfo.cover"><image :src="trailerInfo.cover" class="cover"></image></navigator>
			<view class="movie-desc">
				<view class="title">{{ trailerInfo.name }}</view>
				<view class="basic-info">{{ trailerInfo.basicInfo }}</view>
				<view class="basic-info">{{ trailerInfo.originalName }}</view>
				<view class="basic-info">{{ trailerInfo.totalTime }}</view>
				<view class="basic-info">{{ trailerInfo.releaseDate }}</view>
				<view class="score-block">
					<view class="big-score">
						<view class="score-words">综合评分：</view>
						<view class="movie-score">{{ trailerInfo.score }}</view>
					</view>
					<view class="score-stars">
						<!-- 页面加载时trailerInfo没有数据，传入星星组件中的score为undefined，
						* 会出现显示不出真实评分的bug，
						* 所以加入判断语句，只有有数据才会进入星星组件 -->
						<block v-if="trailerInfo.score >= 0"><trailerStars :innerScore="trailerInfo.score" :showNum="0" /></block>
						<view class="prise-counts">{{ trailerInfo.prisedCounts }} 人点赞</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 影片基本信息 end -->

		<view class="line-wapper"><view class="line"></view></view>

		<!-- 剧情介绍 start -->
		<view class="plots-block">
			<view class="plots-title">剧情介绍</view>
			<view class="plots-desc">{{ trailerInfo.plotDesc }}</view>
		</view>
		<!-- 剧情介绍 end -->

		<!-- 演职人员 start-->
		<view class="scroll-block">
			<view class="plots-title">演职人员</view>
			<scroll-view scroll-x class="scroll-list">
				<!-- 多数组图片预览，由于是数组对象拼接，我们要获得每一个数组里的对象，
				* 然后把每一个对象的url拿出来拼成一个新的数组，新的url，随后做预览功能 -->
				<view class="actor-wapper" v-for="(director, staffIndex) in directorArray" :key="director.staffId">
					<image :src="director.photo" class="single-actor" mode="aspectFill" @click="lookStaffs" :data-staffIndex="staffIndex"></image>
					<view class="actor-name">{{ director.name }}</view>
					<view class="actor-role">{{ director.actName }}</view>
				</view>
				<view class="actor-wapper" v-for="(actor, actorIndex) in actorArray" :key="actor.staffId">
					<!-- 拼接index使用 -->
					<image :src="actor.photo" class="single-actor" mode="aspectFill" @click="lookStaffs" :data-staffIndex="actorIndex + directorArray.length"></image>
					<view class="actor-name">{{ actor.name }}</view>
					<view class="actor-role">{{ actor.actName }}</view>
				</view>
			</scroll-view>
		</view>
		<!-- 演职人员 end-->

		<!-- 剧照 start-->
		<view class="scroll-block">
			<view class="plots-title">剧照</view>
			<scroll-view scroll-x class="scroll-list">
				<image v-for="(img, imgIndex) in plotPicsArray" :key="imgIndex" :src="img" class="plot-image" mode="aspectFill" :data-imgIndex="imgIndex" @click="lookMe"></image>
			</scroll-view>
		</view>
		<!-- 剧照 end-->
	</view>
</template>

<script>
import trailerStars from '../../components/trailerStars.vue';
export default {
	data() {
		return {
			trailerInfo: {},
			plotPicsArray: [], // 剧照
			directorArray: [], // 导演列表
			actorArray: [] // 演员列表
		};
	},
	onReady() {
		//页面初次渲染完成，获得视频上下文对象
		this.videoContext = uni.createVideoContext('myTrailer');
		
	},
	onHide() {
		//页面隐藏的时候，暂停播放
		this.videoContext.pause();
	},
	onShow() {
		// 页面再次显示的时候，可以继续播放
		if (this.videoContext) {
			this.videoContext.play();
		}
		
	},
	onLoad(params) {
		// 获取上一个页面传入的参数
		// console.log(params)
		var trailerId = params.trailerId;

		// 通过api修改导航栏的属性
		uni.setNavigationBarColor({
			frontColor: '#ffffff',
			backgroundColor: '#000000'
		});

		// 获取预告片的详细信息
		var serverUrl = this.serverUrl;
		uni.request({
			url: serverUrl + '/search/trailer/' + trailerId,
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: {
				qq: '466481615'
			},
			success: res => {
				// 获取真实数据之前，务必判断状态是否为200
				if (res.data.status == 200) {
					var trailerInfo = res.data.data;
					this.trailerInfo = trailerInfo;

					// 把剧照的字符串转换为json array
					this.plotPicsArray = JSON.parse(trailerInfo.plotPics);
					// debugger;
				}
			}
		});

		// 获取导演
		uni.request({
			url: serverUrl + '/search/staff/' + trailerId + '/1',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: {
				qq: '466481615'
			},
			success: res => {
				// 获取真实数据之前，务必判断状态是否为200
				if (res.data.status == 200) {
					this.directorArray = res.data.data;
					// debugger;
				}
			}
		});

		// 获取获取演员
		uni.request({
			url: serverUrl + '/search/staff/' + trailerId + '/2',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: {
				qq: '466481615'
			},
			success: res => {
				// 获取真实数据之前，务必判断状态是否为200
				if (res.data.status == 200) {
					this.actorArray = res.data.data;
					// debugger;
				}
			}
		});
	},
	// 此函数仅仅支持在小程序端的分享，分享到微信群或微信好友
	onShareAppMessage(res) {
		var me = this;
		return {
			title: me.trailerInfo.name,
			path: '/pages/movie/movie?trailerId=' + me.trailerInfo.id
		};
	},
	//监听导航栏的按钮
	onNavigationBarButtonTap(e) {
		var me = this;
		var index = e.index;
		// console.log(index)
		
		var trailerInfo = this.trailerInfo;
		var trailerId = trailerInfo.id;
		var trailerName = trailerInfo.name;
		var cover = trailerInfo.cover;
		var poster = trailerInfo.poster;
		//index为0，进行分享
		if (index == 0) {
			uni.share({
					provider: "weixin",
					scene: "WXSenceTimeline",
					type: 0,
					href: "http://www.imovietrailer.com/#/pages/movie/movie?trailerId=" + trailerId,
					title: "NEXT超英预告：《" + trailerName + "》",
					summary: "NEXT超英预告：《" + trailerName + "》",
					imageUrl: cover,
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					}
				});
		}
	},
	methods: {
		lookMe(e) {
			// console.log(e);
			var me = this;
			var imgIndex = e.currentTarget.dataset.imgindex;
			uni.previewImage({
				current: me.plotPicsArray[imgIndex],
				urls: me.plotPicsArray
			});
		},
		lookStaffs(e) {
			var staffIndex = e.currentTarget.dataset.staffindex;
			// 拼接导演和演员的数组，成为一个新数组
			var directorArray = this.directorArray;
			var actorArray = this.actorArray;
			var newStaffArray = [];
			newStaffArray = newStaffArray.concat(directorArray).concat(actorArray);
			var urls = [];
			for (var i = 0; i < newStaffArray.length; i++) {
				var tempPhoto = newStaffArray[i].photo;
				urls.push(tempPhoto);
			}
			uni.previewImage({
				current: urls[staffIndex],
				urls: urls
			});
		}
	},
	components: {
		trailerStars
	}
};
</script>

<style lang="less">
@import url('movie.less');
</style>
