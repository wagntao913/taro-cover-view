<template>
  <view class="auth-container">
    <view class="logo">
      <image
        src="../../assets/images/logo.png"
        mode="aspectFit"
        lazy-load="false"
        class="img"
      >
      </image>
      <view class="title">智驾救援</view>
    </view>
    <nut-button
      block
      type="primary"
      icon="JD"
      @getphonenumber="getMobileNumber"
      open-type="getPhoneNumber"
    >
      授权登录
    </nut-button>
  </view>
</template>
<script lang="ts" setup>
  import Taro, { useReady } from '@tarojs/taro'
  import { setPhoneNumber } from '../../api/auth_jd'
  import { ref } from 'vue'
  import * as auth from '../../utils/auth'
  const accessToken = ref('')
  useReady(() => {
    const env = Taro.getEnv()
    switch (env) {
      case 'JD':
        auth
          .JDAuth()
          .then((res) => {
            console.log('JD', res)
            accessToken.value = res.accessToken as string
          })
          .catch((err) => {
            console.log(err)
          })
        break
      case 'WEAPP':
        auth
          .weappAuth()
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
        break

      default:
        break
    }
  })

  const getMobileNumber = (e) => {
    console.log('getPhoneNumber结果如下：', e)
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      setPhoneNumber({
        accessToken: accessToken.value,
        force: true
      }).then((res) => {
        console.log(res)
        Taro.setStorage({ key: 'phone', data: res.phone })
        Taro.setStorage({ key: 'isLogin', data: !res.phoneNeed })
        Taro.navigateBack()
      })
    }
  }
</script>
<style lang="scss">
  .auth-container {
    padding: 30px 20px 0;
    height: 100vh;
    overflow: hidden;
    text-align: center;

    .logo {
      text-align: center;
      margin-top: 20%;
      margin-bottom: 50%;
      .img {
        width: 80px;
        height: 80px;
      }
      .title {
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
</style>
