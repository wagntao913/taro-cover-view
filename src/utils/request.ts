import Taro from '@tarojs/taro'
import { getStorage } from './storage'

const CODE_SUCCESS = 20000
const CODE_AUTH_EXPIRED = 30000
const BASE_URL = 'https://rescue-bms-test.yesway.cn/jdapi'

interface RequestOptions {
  url: string
  method: 'POST' | 'GET' | 'PUT'
  data?: any
  header?: RequestHeader
  loading?: boolean
  title?: string
  mask?: boolean
}

interface RequestHeader {
  'content-type': string
  token?: string
}

export default async function request(options: RequestOptions): Promise<any> {
  const { url, data, method, loading, title = '加载中', mask } = options
  if (loading) {
    Taro.showLoading({ title: title, mask: mask })
  }
  const token = await getStorage('token')
  const header = token ? { token: token } : {}
  method === 'POST'
    ? (header['content-type'] = 'application/json;charset=utf-8')
    : ''
  return Taro.request({
    url: BASE_URL + url,
    method,
    data,
    header
  })
    .then(async (res) => {
      const { data, statusCode } = res
      console.log(data, statusCode)
      if (data.code === CODE_SUCCESS) {
        return Promise.resolve(data.data)
      } else if (data.code === CODE_AUTH_EXPIRED) {
        return Promise.resolve(data)
      }
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}
