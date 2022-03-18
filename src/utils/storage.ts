import Taro from '@tarojs/taro'

export function getStorage(key) {
  return Taro.getStorage({ key })
    .then((res) => res.data)
    .catch(() => '')
}

