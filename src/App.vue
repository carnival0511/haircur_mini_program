<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  uni.getSystemInfo({
    success: (result) => {
      let statusBarHeight = result.statusBarHeight + "px";

      const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      let menuWidth = menuButtonInfo.width + "px";
      let menuHeight = menuButtonInfo.height + "px";
      let menuBorderRadius = menuButtonInfo.height / 2 + "px";
      let menuRight = result.screenWidth - menuButtonInfo.right + "px";
      let menuTop = menuButtonInfo.top + "px";
      let contentTop = result?.statusBarHeight || 0 + 44 + "px";

      let menuInfo = {
        statusBarHeight: statusBarHeight,
        menuWidth: menuWidth,
        menuHeight: menuHeight,
        menuBorderRadius: menuBorderRadius,
        menuRight: menuRight,
        menuTop: menuTop,
        contentTop: contentTop,
      };
      uni.setStorageSync("menuInfo", menuInfo);
    },
    fail: (error) => {
      console.log(error);
    },
  });
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss" scoped>
.shadow-box {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  background-color: white;
  padding: 24rpx;
  margin: 24rpx;
  border-radius: 16rpx;
}
</style>
