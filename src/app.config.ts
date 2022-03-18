export default defineAppConfig({
  pages: [
    'pages/home/home',
    'pages/index/index',
    'pages/auth/auth',
    'pages/payCenter/payCenter',
    'pages/orderCenter/orderCenter',
    'pages/agreementCenter/agreementCenter',
    'pages/serviceAgreement/serviceAgreement',
    'pages/privacyAgreement/privacyAgreement'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示' // 高速公路行驶持续后台定位
    }
  },
  tabBar: {
    selectedColor: '#fa2c19',
    list: [
      {
        text: '首页',
        pagePath: 'pages/home/home',
        iconPath: './assets/images/home.png',
        selectedIconPath: './assets/images/home-active.png'
      },
      {
        text: '我的',
        pagePath: 'pages/index/index',
        iconPath: './assets/images/user.png',
        selectedIconPath: './assets/images/user-active.png'
      }
    ]
  }
})
