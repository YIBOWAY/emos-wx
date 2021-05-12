<template>
	<view>
		<image src="../../static/logo-2.png" class="logo" mode="widthFix"></image>
		<view class="register-container">
			<input type="text" placeholder="输入你的邀请码" class="register-code" v-model="registerCode" maxlength="6" />
			<view class="register-desc">管理员创建员工账号后，你可以从你的个人邮箱获得注册邀请码</view>
			<button class="register-btn" open-type="getUserInfo" @tap="register()">注册</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				registerCode:""
			}
		},
		methods: {
			
			//保存Vue对象
			register:function(){
				let that = this;
				//首先验证邀请码
				if(that.registerCode == null || that.registerCode.length == 0){
					uni.showToast({
						icon:"none",
						title:"邀请码不能为空"
					})
					return
				}
				else if(/^[0-9]{6}$/.test(that.registerCode) == false){
					uni.showToast({
						icon:"none",
						title:"邀请码必须是6位数字"
					})
					return
				}
				//获取微信用户信息
				uni.login({
					provider:"weixin",
					success:function(resp){
						console.log(resp.code)
						let code = resp.code;
						//获取用户信息，获取临时授权码，再由后台使用Appid、密钥、临时授权码提交给微信平台换取openId
						uni.getUserProfile({//需真机调试
							desc:"获取用户信息",
							success:function(resp){
								let nickName = resp.userInfo.nickName;
								let avatarUrl = resp.userInfo.avatarUrl;
								console.log(nickName);
								// console.log(avatarUrl);
								let data = {
									code:code,
									nickname:nickName,
									photo:avatarUrl,
									registerCode:that.registerCode
								};
								that.ajax(that.url.register,"POST",data,function(resp){
									let permission = resp.data.permission
									uni.setStorageSync("permission",permission)
									console.log(permission)
									//跳转到index界面
									uni.switchTab({
										url:"../index/index"
									})
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("register.less");
</style>
