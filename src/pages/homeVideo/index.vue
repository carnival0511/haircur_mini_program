<template>
  <view style="height: 100%;">
    <!-- src="https://img.zhuhua119.cn/mall4cloud/mp-qq/homeVideo.mp4" -->
    <video id="myVideo"
           src="https://xsj-video.699pic.com/03/9d/55.mp4"
           loop
           muted
           :controls="false"
           :show-play-btn="false"
           show-center-play-btn="false"
           enable-progress-gesture="false"
           object-fit="cover"
           autoplay
           :show-fullscreen-btn="false"
           direction="0"></video>
    <cover-view class="cover_text">
      <button open-type="getPhoneNumber"
              @getphonenumber="quickLogin"
              class="login_btn">我是顾客</button>
      <button @tap="onSubmitLogin"
              class="login_btn">我是商家</button>
      <cover-view class="tips_box">
        <cover-view class="tips_info_blue">
          本小程序仅供顾客和商家使用
        </cover-view>
        <cover-view class="tips_info_blue tips_info_white ">若您是顾客，请直接点击我是顾客按钮进行快捷登录
        </cover-view>
      </cover-view>
    </cover-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
const token = ref(uni.getStorageSync("token"));

// 顾客快捷登录
const quickLogin = (e: { detail: { errMsg: string; code: string } }) => {
  // if (e.detail.errMsg === "getPhoneNumber:ok") {
  //   // 这里需要将加密数据发送到你的后端解密
  //   let params = {
  //     url: "/mall4cloud_auth/ua/wx/getuserphonenumber",
  //     method: "GET",
  //     header: {
  //       "Content-Type": "application/json",
  //     },
  //     data: {
  //       code: e.detail.code,
  //       appid: "wx0cf946077925de71",
  //       secret: "6dc1ac039dffc20efe35a819b3d4af80",
  //     },
  //   };
  //   console.log(params, "params");
  //   uni.setStorageSync('token', '77652231')
  //   uni.navigateTo({
  //     url: "/pages/index/index",
  //   })
  // } else {
  //   // 用户拒绝授权
  //   uni.showToast({
  //     title: "用户拒绝授权",
  //     icon: "none",
  //   });
  // }
  uni.setStorageSync("token", "77652231");
   uni.setStorageSync('userInfo', {
      name: '15072672013',
      userType: '1',
      tenants: '1'
    })
  uni.navigateTo({
    url: "/pages/index/index",
  });
};

// 商家跳转登录界面
const onSubmitLogin = () => {
  uni.navigateTo({
    url: "/pages/login/index",
  });
};

</script>

<style lang="scss" scoped>
/* 增强样式禁止滑动 */
page {
  width: 100%;
  height: 100%;
  min-height: 100%;
  overflow: hidden !important;
  touch-action: none !important;
  /* 禁用所有触摸操作 */
}

/* 防止视频元素导致滑动 */
#myVideo {
  width: 750rpx;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  pointer-events: none;
  /* 禁止视频元素接收触摸事件 */
}

.cover-view {
  width: 750rpx;
  position: absolute;
  top: 400rpx;
  left: 0;
  opacity: 0.7;
}

.cover_text {
  width: 100%;
  position: absolute;
  top: 83%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  column-gap: 20rpx;
}

.tips_box {
  margin-top: 24rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20%;
  background-color: #fefce8;
  column-gap: 16rpx;
  border-radius: 16rpx;
  width: 80%;
  padding: 12rpx;
  opacity: 0.7;
}

.tips_info_blue {
  text-align: center;
  width: 100%;
  color: #27b3ef;
  margin-bottom: 12rpx;
}

.tips_info_white {
  white-space: normal;
  font-size: 12px;
  color: #838383;
  line-height: 18px;
}

cover-image {
  width: 300rpx;
  margin: 0 auto;
  display: block;
}

.login_btn {
  margin-top: 50rpx;
  width: 400rpx;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 28rpx;
  background-color: rgba(255, 255, 255, 0.5);
  color: #555;
}
</style>
