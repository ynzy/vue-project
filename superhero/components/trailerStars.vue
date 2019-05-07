<template name="trailerStars">
	<!-- 定义组件名称 -->
	<view>
		<view class="movie-score-warpper">
			<image
				v-for="(yellow, index) in yelloScore" :key="index"
				src="../static/icos/star-yellow.png" class="start-ico"></image>
			<image
				v-for="(gray, itemindex) in grayScore" :key="itemindex"
				src="../static/icos/star-gray.png" class="start-ico"></image>
			<view class="movie-score" v-if="showNum == 1">
				{{innerScore}}
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'trailerStars', //定义组件名称
	//定义组件内部使用的属性
	props: {
		//自定义一个变量，用于接受父组件（首页或者其他页面）传入的参数值
		myval: {
			type: String //定义这个参数的类型
		},
		innerScore: 0, // 定义外部传入的分数
		showNum: 0 // 是否需要显示具体的分数  1：显示  0：不显示
	},
	data() {
		return {
			yelloScore: 0, //黄色星星
			grayScore: 5 //灰色星星
		};
	},
	created() {
		var tempScore = 0; 
		//判断传入的值是否为空
		if(this.innerScore != null && this.innerScore != undefined && this.innerScore != ''){
			tempScore = this.innerScore;
		}
		//计算星星的数量,并绑定到data数据中
		var yelloScore = parseInt(tempScore / 2);
		var grayScore = 5 - yelloScore;
		this.yelloScore = yelloScore;
		this.grayScore = grayScore;
	}
};
</script>

<style lang="less">
.movie-score-warpper {
	display: flex;
	.start-ico {
		width: 20upx;
		height: 20upx;
		margin-top: 6upx;
	}
	.movie-score {
		font-size: 12px;
		color: grey;
		margin-left: 8upx;
	}
}
</style>
