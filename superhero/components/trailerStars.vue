<template name="trailerStars"> <!-- 定义组件名称 -->
	<view>
		这是一个组件
		<view class="">
			<input type="text" :value="myval" />
		</view>
	</view>
</template>

<script>
	export default {
		name: "trailerStars", //定义组件名称
		//定义组件内部使用的属性
		props: {
			//自定义一个变量，用于接受父组件（首页或者其他页面）传入的参数值
			myval: {
				type: String  //定义这个参数的类型
			},
			innerScore: 0,		// 定义外部传入的分数
			showNum: 0			// 是否需要显示具体的分数  1：显示  0：不显示
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
	.movie-score-wapper {
		display: flex;
		flex-direction: row;
	}
	.star-ico {
		width: 20upx;
		height: 20upx;
		margin-top: 6upx;
	}
	.movie-score {
		font-size: 12px;
		color: grey;
		margin-left: 8upx;
	}
</style>
