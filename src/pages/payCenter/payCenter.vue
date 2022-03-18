<template>
  <view class="pay-center-container">
    <view class="pay-center-header">
      <view class="header-title"> 正在为您派单 </view>
      <view class="header-desc">
        不要着急~，我们快速调度离您最近的救援师傅！请您及时完成支付哦!
      </view>
    </view>
    <view class="pay-center-content">
      <view class="content-title">待支付金额</view>
      <nut-price :price="198.0" size="large" :thousands="true"></nut-price>
      <view class="content-item">
        <text class="content-label"> 起步价格： </text>
        <text class="content-desc"> ¥198.00(≤15km,超出8元/1km) </text>
      </view>
      <view class="content-item">
        <text class="content-label"> 预估里程： </text>
        <text class="content-desc"> 25km </text>
      </view>
      <view class="content-item">
        <text class="content-label"> 超出里程： </text>
        <text class="content-desc"> 10km</text>
      </view>
      <view class="content-item">
        <text class="content-label"> 超出费用： </text>
        <text class="content-desc"> ¥98.00</text>
      </view>
      <view class="content-item">
        <text class="content-label"> 总计： </text>
        <text class="content-desc"> ¥198.00 </text>
      </view>
    </view>
    <view class="agreement-content">
      <nut-checkbox v-model="readAgreement">
        阅读并同意
        <text class="link" @tap="jumpAgreement">《道路救援服务协议》</text>
      </nut-checkbox>
    </view>
    <nut-button
      class="btn"
      type="primary"
      :block="true"
      :disabled="!readAgreement"
      @tap="feeIllustrationVisible = false"
    >
      去支付
    </nut-button>
  </view>
</template>
<script setup>
  import { ref } from 'vue'
  import Taro from '@tarojs/taro'

  const readAgreement = ref(false)
  const jumpAgreement = (e) => {
    console.log('jump')
    e.stopPropagation()
    Taro.navigateTo({
      url: '/pages/serviceAgreement/serviceAgreement'
    })
  }
</script>
<style lang="scss">
  .pay-center-container {
    padding: 10px 15px;
    .pay-center-header {
      .header-title {
        font-size: 16px;
        font-weight: bold;
      }
      .header-desc {
        font-size: 14px;
        color: #8c8c8c;
        margin-top: 10px;
      }
    }
    .pay-center-content {
      text-align: center;
      background-color: #fff;
      border: 1px solid #eee;
      box-shadow: 2px 2px 3px 2px #eee;
      border-radius: 5px;
      margin: 20px 0;
      padding: 10px;
      .content-title {
        font-size: 14px;
        line-height: 25px;
      }
      .content-item {
        display: flex;
        align-items: center;
        margin-top: 10px;
        padding: 2px 20px;
        .content-label,
        .content-desc {
          font-size: 12px;
          display: inline-block;
        }
        .content-label {
          width: 25%;
        }
      }
    }
    .agreement-content {
      margin-left: 20px;
      text-align: center;
      .nut-checkbox__label {
        margin-left: 5px;
      }
      .link {
        color: #fa2c19;
      }
    }
    .btn {
      margin-top: 100px;
    }
  }
</style>
