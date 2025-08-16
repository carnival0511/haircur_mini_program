<template>
  <view>
    <view class="my_tab_title"
          :style="{ paddingTop: statusBarHeight }">
    </view>
    <view :style="{ marginTop: contentTop }">
      <view class="header-part">
        <image class="header_logo"
               src="https://statics.moonshot.cn/kimi-web-seo/assets/kimi-logo-CegIMkbU.png"></image>
        <view class="header-title">Welcome to Lingdong Barber Shop</view>
      </view>
      <view class="page-container">
        <view v-if="appointMsg.userAppointmentNum"
              class="book-info">
          <view>当前正在理发号码：
            <text class="current-haircut">{{ appointMsg.currentHaircutNum }}号</text>
          </view>
          <view>当前等待理发的人数：
            <text class="wait-person">{{ appointMsg.waitPersonNum }}人</text>
          </view>
          <view class="book-btn">{{appointMsg.userAppointmentNum}}号</view>
          <view>预计等待时间：
            <text class="wait-time">{{ appointMsg.waitTime }}分钟</text>
          </view>
          <view class="btn-group">
            <uv-button color="#909399"
                       :customStyle="{ borderradius: '20rpx'}"
                       @click="cancelAppoint">取消预约</uv-button>
            <uv-button icon="reload"
                       :customStyle="{ borderradius: '20rpx'}"
                       @click="refreshAppoint">刷新</uv-button>
          </view>
        </view>
        <view class="book-btn"
              @click="callNumber('叫号成功')"
              v-else>叫号</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import { onShow } from "@dcloudio/uni-app";
import utils from "@/utils/index.js";

const token = ref(uni.getStorageSync("token"));

const Data = reactive({
  statusBarHeight: uni.getStorageSync("menuInfo").statusBarHeight,
  contentTop: uni.getStorageSync("menuInfo").contentTop,
  appointMsg: {},
});

const { statusBarHeight, contentTop, appointMsg } = toRefs(Data);

// 预约叫号
const callNumber = utils.debounce(
  async (msg: string) => {
    // 调用叫号接口
    uni.showToast({
      title: msg,
      icon: "none",
      duration: 500,
      mask: true,
    });
    setTimeout(() => {
      Data.appointMsg = {
        userAppointmentNum: "3", // 用户预约的号码，如果没有，证明当前用户刚登陆，但是没有叫号
        currentHaircutNum: "1", // 当前理发师理发的人的号码
        waitPersonNum: "2", // 当前等待理发的人数
        waitTime: "20", // 等待理发的大概时间
      };
    }, 1000);
  },
  1000,
  {
    leading: true,
    trailing: false,
  }
);

// 取消预约
const cancelAppoint = () => {
  uni.showModal({
    title: "提示",
    content: "确定要取消预约吗？",
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: "取消预约成功",
          icon: "none",
          duration: 500,
          mask: true,
        });
        Data.appointMsg = {};
      }
    },
  });
};

// 刷新预约信息
const refreshAppoint = () => {
  callNumber("刷新成功");
};

onShow(() => {
  console.log(token.value, "token");
  if (!token.value) {
    uni.navigateTo({
      url: "/pages/homeVideo/index",
    });
  } else {
    if (uni.getStorageSync("userInfo").userType == "1") {
      // 用户身份，展示叫号页面
    } else {
      // 商家身份
      uni.navigateTo({
        url: "/pages/order/index",
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.root {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
// 顶部部分
.header-part {
  display: flex;
  height: 80rpx;
  align-items: center;
  padding: 0 20rpx;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom: 1rpx solid #f5f5f5;
}

.header_logo {
  width: 60rpx;
  height: 60rpx;
  margin-right: 48rpx;
}

// 顶部标题栏
.header-title {
  font-weight: bold;
  color: #333333;
  text-align: center;
  font-family: oblique;
  font-style: italic;
  font-size: 28rpx;
  font-weight: 600;
  letter-spacing: 1rpx;

  /* 呼吸动画 */
  animation: breathe 2.2s ease-in-out infinite alternate;
}

@keyframes breathe {
  0% {
    color: #2979ff; /* 起始蓝 */
    text-shadow: 0 0 0 rgba(41, 121, 255, 0);
    opacity: 0.75;
  }
  100% {
    color: #00bcd4; /* 终点青 */
    text-shadow: 0 0 24rpx rgba(0, 188, 212, 0.8);
    opacity: 1;
  }
}

.page-container {
  height: calc(100vh - 180rpx);
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 20rpx;
  box-sizing: border-box;
}

.book-btn {
  width: 200rpx;
  height: 200rpx;
  border-radius: 200rpx;
  background-color: #d75c36;
  color: #fff;
  font-size: 36rpx;
  text-align: center;
  line-height: 200rpx;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  transition: all 0.3s ease-in-out;
  animation: beat 6s ease-in-out infinite;
}

@keyframes beat {
  0% {
    transform: scale(1);
  }
  15% {
    transform: scale(1.3);
  } /* 膨胀峰值 */
  30% {
    transform: scale(1);
  }
  45% {
    transform: scale(1.2);
  } /* 二次小峰值（更自然） */
  60% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}

.book-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
  color: #333333;
  text-align: center;
  line-height: 60rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
  row-gap: 32rpx;
}
.current-haircut,
.wait-person,
.wait-time {
  color: #d75c36;
  font-weight: 600;
  font-size: 36rpx;
  letter-spacing: 1rpx;
}
.book-btn:active {
  transform: scale(0.9);
}

.btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36rpx;
  color: #fff;
  font-weight: 600;
  letter-spacing: 1rpx;
  transition: all 0.3s ease-in-out;
  column-gap: 24rpx;
}
</style>
