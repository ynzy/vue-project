<template>
	<view class="body">
		<form @submit="formSubmit">
			<view class="face-wapper"><image src="../../static/icos/default-face.png" class="face"></image></view>

			<view class="info-wapper">
				<label class="words-lbl">账号</label>
				<input name="username" type="text" value="" class="input" placeholder="请输入用户名" placeholder-class="graywords" />
			</view>

			<view class="info-wapper" style="margin-top: 40upx;">
				<label class="words-lbl">密码</label>
				<input name="password" type="text" value="" password="true" class="input" placeholder="请输入密码" placeholder-class="graywords" />
			</view>

			<button type="primary" form-type="submit" style="margin-top: 60upx;width: 90%;">注册/登录</button>
		</form>

		<!-- 第三方登录H5不支持，所以隐藏掉 -->
		<!-- #ifndef H5 -->
		<view class="third-wapper">
			<view class="third-line">
				<view class="single-line"><view class="line"></view></view>

				<view class="third-words">第三方账号登录</view>

				<view class="single-line"><view class="line"></view></view>
			</view>

			<view class="third-icos-wapper">
				<!-- 5+app 用qq/微信/微博 登录 小程序用微信小程序登录 h5不支持 -->
				<!-- #ifdef APP-PLUS -->
				<image src="../../static/icos/weixin.png" data-logintype="weixin" @click="appOAuthLogin" class="third-ico"></image>
				<image src="../../static/icos/QQ.png" data-logintype="qq" @click="appOAuthLogin" class="third-ico" style="margin-left: 80upx;"></image>
				<image src="../../static/icos/weibo.png" data-logintype="sinaweibo" @click="appOAuthLogin" class="third-ico" style="margin-left: 80upx;"></image>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="getUserInfo" @getuserinfo="wxLogin" class="third-btn-ico"></button>
				<!-- #endif -->
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		appOAuthLogin(e) {
			var me = this;
			// 获取用户的登录类型
			var logintype = e.currentTarget.dataset.logintype;

			// 授权登录
			uni.login({
				provider: logintype,
				success(loginRes) {
					// 授权登录成功以后，获取用户的信息
					uni.getUserInfo({
						provider: logintype,
						success(info) {
							// console.log(JSON.stringify(info));

							var userInfo = info.userInfo;
							var face = '';
							var nickname = '';
							var openIdOrUid = '';
							if (logintype == 'weixin') {
								face = userInfo.avatarUrl;
								nickname = userInfo.nickName;
								openIdOrUid = userInfo.openId;
							} else if (logintype == 'qq') {
								openIdOrUid = userInfo.openId;
								nickname = userInfo.nickname;
								face = userInfo.figureurl_qq_2;
							} else if (logintype == 'sinaweibo') {
								openIdOrUid = userInfo.id;
								nickname = userInfo.nickname;
								face = userInfo.avatar_large;
							}

							// 调用开发者后台，执行一键注册或登录
							uni.request({
								url: me.serverUrl + '/appUnionLogin/' + logintype + '?qq=466481615',
								data: {
									openIdOrUid: openIdOrUid,
									nickname: nickname,
									face: face
								},
								method: 'POST',
								success(result) {
									if (result.data.status == 200) {
										var userInfo = result.data.data;
										// 保存用户信息到全局的缓存中
										uni.setStorageSync('globalUser', userInfo);
										// 切换页面跳转，使用tab切换的api
										uni.switchTab({
											url: '../me/me'
										});
									} else if (userResult.data.status == 500) {
										uni.showModal({
											title: '提示',
											content: userResult.data.message,
											success: function(res) {
												if (res.confirm) {
													// console.log('用户点击确定');
												} else if (res.cancel) {
													// console.log('用户点击取消');
												}
											}
										});
									}
								}
							});
						}
					});
				}
			});
		},
		// 实现在微信小程序端的微信登录
		wxLogin(e) {
			var me = this;
			console.log(e);
			// 通过微信开发能力，获得微信用户的基本信息
			var userInfo = e.detail.userInfo;

			// 实现微信登录
			uni.login({
				provider: 'weixin',
				success(loginResult) {
					// console.log(loginResult);
					// 获得微信登录的code：授权码
					var code = loginResult.code;
					// 设置登录到哪个对于的微信小程序，大家可以根据自己的后端去实现业务参数
					// [0:NEXT超英预告][1:超英预告][2:NEXT学院电影预告]
					var loginToWhichMP = 1;
					uni.request({
						url: me.serverUrl + '/mpWXLogin/' + code + '?qq=466481615',
						header: {
							'content-type': 'application/json;charset=utf-8'
						},
						data: {
							avatarUrl: userInfo.avatarUrl,
							nickName: userInfo.nickName,
							whichMP: loginToWhichMP
						},
						method: 'POST',
						success(userResult) {
							console.log(userResult);
							if (userResult.data.status == 200) {
								var userInfo = userResult.data.data;
								// 保存用户信息到全局的缓存中
								uni.setStorageSync('globalUser', userInfo);
								// 切换页面跳转，使用tab切换的api
								uni.switchTab({
									url: '../me/me'
								});
							} else if (userResult.data.status == 500) {
								uni.showModal({
									title: '提示',
									content: userResult.data.message,
									success: function(res) {
										if (res.confirm) {
											// console.log('用户点击确定');
										} else if (res.cancel) {
											// console.log('用户点击取消');
										}
									}
								});
							}
						}
					});
				}
			});
		},
		formSubmit(e) {
			var me = this;
			var username = e.detail.value.username;
			var password = e.detail.value.password;
			// console.log(username)
			// console.log(password)

			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			uni.showNavigationBarLoading();

			var serverUrl = this.serverUrl;
			// 猜你喜欢
			uni.request({
				url: serverUrl + '/user/registOrLogin?qq=466481615',
				method: 'POST',
				header: {
					'content-type': 'application/json;charset=utf-8'
				},
				data: {
					username: username,
					password: password
				},
				success: res => {
					console.log(res.data);
					// 获取真实数据之前，务必判断状态是否为200
					if (res.data.status == 200) {
						var userInfo = res.data.data;
						// console.log(userInfo)
						//保存用户信息到全局的缓存中
						uni.setStorageSync('globalUser', userInfo);
						//tabBar页面跳转
						uni.switchTab({
							url: '../me/me'
						});
					} else if (res.data.status == 500) {
						// uni.showToast({
						// 	title: res.data.msg,
						// 	duration: 2000,
						// 	image: "../../static/icos/error.png"
						// })
						uni.showModal({
							title: '提示',
							content: res.data.msg,
							success: function(res) {
								if (res.confirm) {
									// console.log('用户点击确定');
								} else if (res.cancel) {
									// console.log('用户点击取消');
								}
							}
						});
					}
				},
				complete: () => {
					uni.hideNavigationBarLoading();
					uni.hideLoading();
				}
			});
		}
	}
};
</script>

<style lang="less">
@import url('registLogin.less');
</style>
