<template>
  <!-- 最外层容器 -->
  <view class="login-wrapper">
    <!-- 背景图 -->
    <image class="bg-image"
           src="https://images.pexels.com/photos/331989/pexels-photo-331989.jpeg?auto=compress&cs=tinysrgb&w=600"
           mode="aspectFill" />
    <!-- 登录卡片 -->
    <view class="login-card">
      <view class="title">欢迎来到灵动理发屋</view>

      <!-- 表单 -->
      <uv-form ref="loginForm"
               :rules="loginFormRules"
               labelPosition="left"
               :model="loginFormData">
        <uv-form-item label="用户名"
                      borderBottom
                      required
                      labelWidth="80"
                      :customStyle="{ margin: '24rpx' }"
                      prop="name">
          <uv-input v-model="loginFormData.name"
                    placeholder="请输入用户名"
                    border="none" />
        </uv-form-item>

        <uv-form-item label="密码"
                      borderBottom
                      required
                      labelWidth="80"
                      :customStyle="{ margin: '24rpx' }"
                      prop="password">
          <uv-input v-model="loginFormData.password"
                    placeholder="请输入密码"
                    type="password"
                    border="none" />
        </uv-form-item>

        <uv-button type="error"
                   shape="circle"
                   text="登录"
                   class="login-btn"
                   @click="submit"></uv-button>
      </uv-form>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, toRefs } from 'vue'

const loginForm = ref()
const Data = reactive({
  loginFormData: {
    name: '',
    password: '',
    userType: '',
    tenants: ''
  }
})

const {
  loginFormData
} = toRefs(Data)

const loginFormRules = {
  name: {
    required: true,
    type: 'string',
    message: '请输入用户名',
    trigger: ['blur']
  },
  password: {
    required: true,
    type: 'string',
    message: '请输入密码',
    trigger: ['blur']
  }
}

// 登录
const submit = () => {
  loginForm.value.validate().then(() => {
    uni.showLoading({
      title: '登录中',
      duration: 1000
    })
    // 调用登录接口
    uni.setStorageSync('token', '337845818')
    uni.setStorageSync('userInfo', {
      name: 'admin',
      userType: '2',
      tenants: '1'
    })
    uni.navigateTo({ url: '/pages/order/index' })
  })
}

</script>

<style lang="scss" scoped>
/* 最外层容器 */
.login-wrapper {
  min-height: 100vh; /* min-h-screen */
  background-color: #f9fafb; /* bg-gray-50 */
  display: flex;
  flex-direction: column; /* flex-col */
  align-items: center; /* items-center */
  justify-content: center; /* justify-center */
  padding: 32rpx; /* p-8 → 32rpx */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

/* 背景图 */
.bg-image {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

/* 登录卡片 */
.login-card {
  background-color: #ffffff;
  border-radius: 8rpx;
  // box-shadow: 0 4rpx 6rpx rgba(0, 0, 0, 0.1);
  padding: 32rpx;
  min-width: 0;
  z-index: 50;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

/* 标题 */
.title {
  margin-bottom: 48rpx; /* mb-12 → 48rpx */
  text-align: center;
  font-size: 40rpx; /* text-xl → 40rpx */
  font-weight: 700; /* font-bold */
  color: #1f2937; /* text-gray-800 */
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  background-color: #2563eb; /* bg-blue-600 */
  color: #ffffff;
  font-weight: 500;
  padding: 16rpx 32rpx; /* py-2 px-4 → 16rpx 32rpx */
  border-radius: 8rpx;
  border: none;
  outline: none;
  transition: background-color 0.15s;
}
.login-btn:active {
  background-color: #1d4ed8; /* hover:bg-blue-700 的等效 */
}
</style>