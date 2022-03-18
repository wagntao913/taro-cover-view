<template>
  <view class="service-container">
    <view class="list-item" @click="jumpPrivacy">
      <view class="sort-content">
        <text class="sort-num">1</text>
      </view>
      <view class="title">
        《用户隐私保护声明》
      </view>
    </view>
    <view class="list-item" @click="jumpService">
      <view class="sort-content">
        <text class="sort-num">2</text>
      </view>
      <view class="title">
        《智驾救援服务协议》
      </view>
    </view>
  </view>
</template>
<script setup>
  import Taro from '@tarojs/taro'
  const jumpPrivacy = () => {
    Taro.navigateTo({
      url: '/pages/privacyAgreement/privacyAgreement'
    })
  }
  const jumpService = () => {
    Taro.navigateTo({
      url: '/pages/serviceAgreement/serviceAgreement'
    })
  }
</script>
<style lang="scss">
  .service-container {
    padding: 15px;
    .list-item {
      display: flex;
      align-items: center;
      height: 40px;
      margin-bottom: 20px;
      border-radius: 5px;
      border: 1px solid #eee;
      box-shadow: 2px 4px 4px 2px rgba(156, 156, 156, 0.1);
      .title {
        font-size: 14px;
        font-weight: bold;
        line-height: 40px;
        margin-left: 15%;
      }
      .sort-content {
        position: relative;
        width: 0;
        height: 0;
        border-top: 40px solid #fa2c19;
        border-right: 40px solid transparent;
        .sort-num {
          font-size: 14px;
          position: absolute;
          display: block;
          top: -35px;
          padding-left: 10px;
          font-weight: bold;
          color: #fff;
        }
      }
    }
    .list-item:active {
      opacity: 0.8;
    }
  }
</style>
