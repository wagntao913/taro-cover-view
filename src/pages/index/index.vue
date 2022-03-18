<template>
  <view class="index-container">
    <view
      class="index-header"
      hover-class="none"
      hover-stop-propagation="false"
    >
      <view class="logo">
        <image
          class="img"
          src="../../assets/images/logo.png"
          mode="aspectFit"
          lazy-load="false"
        >
        </image>
      </view>
      <view class="phone"> 152 **** 8463</view>
    </view>
    <view
      class="menu-content"
      hover-class="none"
      hover-stop-propagation="false"
    >
      <nut-cell-group>
        <nut-cell
          class="menu-item"
          icon="order"
          title="我的订单"
          @click="jumpOrderCenter"
          is-link
        ></nut-cell>
        <nut-cell
          class="menu-item"
          icon="service"
          title="客服热线"
          @click="takePhone"
          is-link
        ></nut-cell>
        <nut-cell
          class="menu-item"
          icon="comment"
          title="条款政策"
          @click="jumpService"
          is-link
        >
        </nut-cell>
      </nut-cell-group>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'Index'
  }
</script>

<script setup>
  import { reactive } from 'vue'
  import Taro from '@tarojs/taro'
  import { getStorage } from '../../utils/storage'
  const isLogin = getStorage('isLogin')
  const takePhone = () => {
    Taro.makePhoneCall({
      phoneNumber: '400-606-0781'
    })
  }

  const jumpOrderCenter = () => {
    if (isLogin) {
      Taro.navigateTo({
        url: '/pages/orderCenter/orderCenter'
      })
    } else {
      Taro.navigateTo({
        url: '/pages/auth/auth'
      })
    }
  }

  const jumpService = () => {
    Taro.navigateTo({
      url: '/pages/agreementCenter/agreementCenter'
    })
  }
</script>

<style lang="scss">
  .index-container {
    .index-header {
      position: relative;
      height: 140px;
      background: linear-gradient(90deg, #fa2c19 0%, #fa6419 100%);
      .logo {
        position: absolute;
        left: 30px;
        bottom: -30%;
        padding: 6px;
        background-color: #fff;
        border-radius: 999px;
        .img {
          width: 70px;
          height: 70px;
        }
      }
      .phone {
        position: absolute;
        bottom: 2%;
        left: 120px;
        color: #fff;
        font-size: 16px;
        // font-weight: bold;
      }
    }
    .menu-content {
      margin-top: 40px;
      .menu-item {
        height: 50px;
      }
    }
  }
</style>
