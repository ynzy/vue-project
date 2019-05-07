<template name="titleBar">
	<view class="page-block super-hot">
		<view class="hot-title-warpper">
			<image :src="icon" class="hot-ico"></image>
			<view class="hot-title">{{title}}</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'titleBar',
	props: {
		title: '',
		icon: ''
	},
	data() {
		return {};
	}
};
</script>

<style lang="less">
.super-hot {
	margin-top: 12upx;
	padding: 12upx;
	.hot-title-warpper {
		display: flex;
		flex-direction: row;
		.hot-ico {
			width: 30upx;
			height: 30upx;
			margin-top: 15upx;
		}
		.hot-title {
			font-size: 20px;
			margin-left: 20upx;
			font-weight: 500;
		}
	}
}
</style>
