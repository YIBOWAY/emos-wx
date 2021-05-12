<template>
	<view>
		<image src="../../static/logo-1.png" class="logo" mode="widthFix"></image>
		<view class="logo-title">员工考勤签到系统</view>
		<view class="logo-subtitle">Ver2021.1</view>
		<button class="login-btn" open-type="getUserInfo" @tap="login()">登录系统</button>
		<view class="register-container">
			没有账号？
			<text class="register" @tap="toRegister()">立即注册</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toRegister:function(){
				uni.navigateTo({
					url:"../register/register"
				})
			},
			login:function(){
				let that = this
				uni.login({//获取微信临时授权码
					provider:"weixin",
					success:function(resp){//回调函数，返回授权码
						let code = resp.code
						that.ajax(that.url.login,"POST",{"code":code},function(resp){//注意第三个参数data的格式
							let permission = resp.data.permission
							uni.setStorageSync("permission",permission)
						})
						console.log("success")
						// 跳转到登录页面
						uni.switchTab({
							url:"../index/index"
						})
					},
					fail:function(e){//获取临时授权码失败
						console.log(e)
						uni.showToast({
							icon:"none",
							title:"执行异常"
						})
						
					}
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("login.less");

</style>
