<template>
  <!-- 根容器：fixed、全屏 -->
  <view class="root">
    <view class="my_tab_title"
          :style="{ paddingTop: statusBarHeight }">
      <view class="header">
        <view class="header-dot"></view>
        <text class="header-title">订单列表</text>
      </view>
    </view>
    <view class="wrapper" :style="{ marginTop: contentTop }">
      <!-- 内容区 -->
      <view class="content">
        <scroll-view class="scroll-area"
                     scroll-y
                     show-scrollbar
                     refresher-background="#fff"
                     :scroll-top="scrollTop"
                     :refresher-enabled="refresherEnabled"
                     :refresher-triggered="triggered"
                     @refresherpulling="onPulling"
                     @refresherrefresh="onRefresh"
                     @scrolltolower="onReachBottom"
                     @scroll="roll">
          <view v-for="(orderItem, orderIndex) in orderListData"
                :key="orderIndex"
                :data-value="orderItem"
                @tap="checkStatus(orderItem)">
            <view class="order-card">
              <view class="order-header">顾客名称：{{ orderItem.userName }}</view>
              <view>预约时间：{{ orderItem.appointmentTime }}</view>
              <view class="flex_sty">
                订单状态：
                <view :class="statusClass[orderItem.orderStatus]">{{ statusName[orderItem.orderStatus] }}</view>
              </view>
              <view :class="orderTypeClass[orderItem.orderType]">{{ orderTypeObj[orderItem.orderType] }}</view>
            </view>
          </view>

          <uni-load-more v-if="orderListData.length > 0"
                         color="#007AFF"
                         :status="searchStatus"
                         :content-text="contentText" />
        </scroll-view>
      </view>

      <!-- 回到顶部按钮 -->
      <view class="back-top"
            @tap="goTop">
        <image src="../../static/backtotop.png"
               class="back-icon" />
      </view>
    </view>
  </view>
</template>
<script setup>
import {
  reactive,
  toRefs,
  nextTick,
  computed
} from 'vue'
import {
  onShow,
  onLoad
} from '@dcloudio/uni-app'

const statusClass = {
  '0': 'order-place',
  '1': 'order-getting-hair',
  '2': 'finished',
  '3': 'order-invalid'
}

const statusName = {
  '0': '已预约',
  '1': '理发中',
  '2': '已完成',
  '3': '已作废',
}

const orderTypeObj = {
  '0': '20元单',
  '1': '25元单',
  '2': '30元单'
}

const orderTypeClass = {
  '0': 'order_20',
  '1': 'order_25',
  '2': 'order_30'
}

const Data = reactive({
  statusBarHeight: uni.getStorageSync('menuInfo').statusBarHeight,
  contentTop: uni.getStorageSync('menuInfo').contentTop,
  pageQuery: {
    pageSize: 20,
    pageNum: 1
  },
  orderListData: [
    {
      id: '20250101001',
      appointmentTime: '2025-01-01 11:00:00',
      userName: '150726272013',
      orderType: '1',
      orderStatus: '2'
    },
    {
      id: '20250101002',
      appointmentTime: '2025-01-01 12:00:00',
      userName: '18852862960',
      orderType: '2',
      orderStatus: '1'
    },
    {
      id: '20250101003',
      appointmentTime: '2025-01-01 13:00:00',
      userName: '15012333365',
      orderType: '0',
      orderStatus: '0'
    },
    {
      id: '20250101004',
      appointmentTime: '2025-01-01 13:00:00',
      userName: '1885236669',
      orderType: '1',
      orderStatus: '3'
    },
    {
      id: '20250101001',
      appointmentTime: '2025-01-01 11:00:00',
      userName: '150726272013',
      orderType: '1',
      orderStatus: '2'
    },
    {
      id: '20250101002',
      appointmentTime: '2025-01-01 12:00:00',
      userName: '18852862960',
      orderType: '2',
      orderStatus: '1'
    },
    {
      id: '20250101003',
      appointmentTime: '2025-01-01 13:00:00',
      userName: '15012333365',
      orderType: '0',
      orderStatus: '0'
    },
    {
      id: '20250101004',
      appointmentTime: '2025-01-01 13:00:00',
      userName: '1885236669',
      orderType: '1',
      orderStatus: '3'
    },
    {
      id: '20250101001',
      appointmentTime: '2025-01-01 11:00:00',
      userName: '150726272013',
      orderType: '1',
      orderStatus: '2'
    },
    {
      id: '20250101002',
      appointmentTime: '2025-01-01 12:00:00',
      userName: '18852862960',
      orderType: '2',
      orderStatus: '1'
    },
    {
      id: '20250101003',
      appointmentTime: '2025-01-01 13:00:00',
      userName: '15012333365',
      orderType: '0',
      orderStatus: '0'
    },
    {
      id: '20250101004',
      appointmentTime: '2025-01-01 13:00:00',
      userName: '1885236669',
      orderType: '1',
      orderStatus: '3'
    }
  ],
  searchStatus: 'more',
  contentText: {
    contentdown: '上拉加载更多~',
    contentrefresh: '加载中',
    contentnomore: '暂无更多~'
  },
  // 开启自定义刷新
  refresherEnabled: false,
  // 设置当前下拉刷新的状态
  triggered: false,
  scrollTop: 0,
  old: {
    scrollTop: 0
  },
})
const {
  statusBarHeight,
  contentTop,
  orderListData,
  pageQuery,
  searchStatus,
  refresherEnabled,
  triggered,
  scrollTop,
  old,
} = toRefs(Data)

// 获取订单列表数据
const getOrderListData = () => {

}

// 自定义下拉刷新空间被下拉
const onPulling = e => {
  if (e.detail.deltaY < 0) return //防止上滑页面也触发下拉
  Data.triggered = true
}

//自定义下拉刷新被触发
const onRefresh = () => {
  Data.searchStatus = 'loading'
  Data.pageQuery.pageNum = 1
  Data.orderListData = []
  getOrderListData()
  Data.triggered = 'restore'
  setTimeout(() => {
    Data.triggered = false
  }, 1000)
}

// 上拉加载
const onReachBottom = async () => {
  if (Data.searchStatus == 'noMore') {
    return
  }
  Data.pageQuery.pageNum++
  await getOrderListData()
}

// 获取滚动距离
const roll = res => {
  Data.old.scrollTop = res.detail.scrollTop
  if (res.target.scrollTop >= 20) {
    Data.refresherEnabled = false
  } else {
    Data.refresherEnabled = true
  }
}

// 回到顶部
const goTop = e => {
  // 解决view层不同步的问题
  Data.scrollTop = Data.old.scrollTop
  nextTick(function () {
    Data.scrollTop = 0
  })
  uni.showToast({
    icon: 'none',
    title: '已回到顶部'
  })
}

// 切换订单状态：已预约->理发中->已完成
const checkStatus = item => {
  if (item.orderStatus == '0') {
    // 已预约->理发中
    uni.showModal({
      title: "提示",
      content: "确定将顾客状态修改成理发中吗？",
      success: (res) => {
        if (res.confirm) {
          uni.showToast({
            title: "修改成功",
            icon: "none",
            duration: 500,
            mask: true,
          });
          item.orderStatus = '1'
        }
      },
    });
  } else if (item.orderStatus == '1') {
    // 理发中->已完成
    uni.showModal({
      title: "提示",
      content: "确定将顾客状态修改成已完成吗？",
      success: (res) => {
        if (res.confirm) {
          uni.showToast({
            title: "修改成功",
            icon: "none",
            duration: 500,
            mask: true,
          });
          item.orderStatus = '2'
        }
      },
    });
  }
}

</script>
<style lang="scss" scoped>
.root {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 主背景 */
.wrapper {
  background-color: #efefef;
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* 顶部标题栏 */
.header {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 24rpx;
}

.header-dot {
  width: 8rpx;
  height: 32rpx;
  background-color: #2979ff;
  margin-right: 12rpx;
  border-radius: 8rpx;
}

.header-title {
  font-weight: 600;
  font-size: 32rpx;
}

/* 内容区 */
.content {
  flex: 1;
  overflow: hidden;
}

.scroll-area {
  flex: 1;
  overflow-y: scroll;
  height: calc(100vh - 200rpx);
  margin-bottom: 24rpx;
}

.order-card {
  display: flex;
  flex-direction: column;
  row-gap: 12rpx;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  padding: 24rpx;
  margin: 24rpx;
  background-color: #fff;
  border-radius: 16rpx;
  position: relative;
}

.order-header {
  font-size: 32rpx;
  font-weight: 600;
}

// 已经下单
.order-place {
  background-color: #e6a23c;
}

// 理发中
.order-getting-hair {
  background-color: #409eff;
}

// 已完成
.finished {
  background-color: #67c23a;
}
// 已完成
.order-invalid {
  background-color: #909399;
}

.order-place,
.order-getting-hair,
.finished,
.order-invalid {
  color: #fff;
  padding: 4rpx 16rpx;
  border-radius: 8rpx;
}

.order_20 {
  background-color: #67c23a;
}
.order_25 {
  background-color: #409eff;
}
.order_30 {
  background-color: #f56c6c;
}

.order_20,
.order_25,
.order_30 {
  color: #fff;
  position: absolute;
  top: 24rpx;
  right: 24rpx;
  transform: rotate(20deg);
  border-radius: 20px;
  padding: 12rpx;
}

/* 回到顶部按钮 */
.back-top {
  position: fixed;
  bottom: 40rpx;
  right: 40rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  border: 1rpx solid #d1d5db;
  background-color: #ffffff;
  box-shadow: 0rpx 38rpx 76rpx rgba(0, 0, 0, 0.3),
    0rpx 30rpx 24rpx rgba(0, 0, 0, 0.22);
}

.back-icon {
  width: 54rpx;
  height: 54rpx;
}

.back-text {
  font-size: 20rpx;
}

.flex_sty {
  display: flex;
}
</style>