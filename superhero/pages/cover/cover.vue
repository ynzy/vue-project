<template>
	<view class="black"><image :src="cover" mode="widthFix" @longpress="operator"></image></view>
</template>

<script>
export default {
	data() {
		return {
			cover: ''
		};
	},
	onLoad(params) {
		this.cover = params.cover;
	},
	methods: {
		operator() {
			var me = this;
			uni.showActionSheet({
				itemList: ['保存图片到本地'],
				success: function(res) {
					// console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
					if (res.tapIndex == 0) {
						uni.showLoading({
							title: '图片保存中'
						});
						uni.downloadFile({
							url: me.cover, //仅为示例，并非真实的资源
							success: res => {
								if (res.statusCode === 200) {
									var tempFilePath = res.tempFilePath;
									// console.log(tempFilePath);
									uni.saveImageToPhotosAlbum({
										filePath: tempFilePath,
										success: function() {
											uni.showToast({
												title: '保存成功',
												mask: false,
												duration: 1500
											});
										},
										complete() {
											uni.hideLoading();
										}
									});

									
								}
							}
						});
					}
				},
				fail: function(res) {
					console.log(res.errMsg);
				}
			});
		}
	}
};
</script>

<style lang="less">
.black {
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background: #000;
}
</style>
