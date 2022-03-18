import Taro from '@tarojs/taro'
import { login } from '../api/auth_jd'

interface SetPhoneData {
  accessToken: string
  isNew: boolean
  phone: string
  phoneNeed: boolean
  token: string
}

/**
 * @获取各个平台授权
 * @returns Promise<>
 */
// 微信小程序授权登录
export function weappAuth() {
  return new Promise((resolve, reject) => {
    Taro.login({
      success(res) {
        console.log(res.code)
        login({ authCode: res.code })
          .then((result) => {
            console.log(result)
            Taro.setStorage({
              key: 'token',
              data: result.token
            })
            resolve(result)
          })
          .catch((err) => {
            reject(err)
          })
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

// 支付宝小程序授权
export function alipayAuth() {
  return new Promise((resolve, reject) => {
    my.getAuthCode({
      scopes: ['auth_base'],
      success(res) {
        console.log(res.authCode)
        login({ authCode: res.authCode })
          .then((result) => {
            console.log(result)
            Taro.setStorage({
              key: 'token',
              data: result.token
            })
            resolve(result)
          })
          .catch((err) => {
            reject(err)
          })
      }
    })
  })
}

// 京东小程序授权登录流程
export function JDAuth(): Promise<Partial<SetPhoneData>> {
  return new Promise((resolve, reject) => {
    jd.getAuthCode({
      success(res) {
        console.log(res)
        login({ authCode: res.code })
          .then((result) => {
            Taro.setStorage({
              key: 'token',
              data: result.token
            })
            resolve(result)
          })
          .catch((err) => {
            reject(err)
          })
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
