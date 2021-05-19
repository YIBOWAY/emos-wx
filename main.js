import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

let baseUrl = "http://192.168.1.108:8080/emos-wx-api"


Vue.prototype.url={
	register: baseUrl + "/user/register",
	login: baseUrl + "/user/login",
	checkin: baseUrl + "/checkin/checkin",
	createFaceModel: baseUrl + "/checkin/createFaceModel",
	validCanCheckin: baseUrl + "/checkin/validCanCheckIn"
}

Vue.prototype.ajax = function(url,method,data,fun){
	uni.request({
		"url": url,
		"method": method,
		"header": {
			token : uni.getStorageSync("token")
		},
		"data": data,
		success: function(resp){//success回调函数，回调函数得到的应答为resp
			if(resp.statusCode == 401){
				uni.redirectTo({
					url:"/pages/login/login.vue"
				})
			}
			else if(resp.statusCode == 200 && resp.data.code == 200){//得到回调函数的应答，查看应答中包含的token令牌，后台生成的JWT
				let data = resp.data
				if(data.hasOwnProperty("token")){
					console.log(resp.data)
					let token = data.token
					uni.setStorageSync("token",token)
				}
				fun(resp)
			}
			else{
				uni.showToast({
					icon:"none",
					title:resp.data
				})
			}
		}
	})
		
}
