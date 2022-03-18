import { createApp } from 'vue'
import {
  Button,
  Toast,
  Tabs,
  TabPane,
  Tabbar,
  TabbarItem,
  Input,
  Cell,
  CellGroup,
  Form,
  FormItem,
  Picker,
  Popup,
  OverLay,
  Layout,
  Row,
  Col,
  Grid,
  GridItem,
  Price,
  Avatar,
  Table,
  Divider,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Icon
} from '@nutui/nutui-taro'

import './app.scss'
import Taro from '@tarojs/taro'

const App = createApp({
  onLaunch(options: any) {
    console.log('launch 参数', options, Taro.getEnv())
  },
  onShow(options: any) {
    console.log('show 参数', options)
  }
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(Button)
  .use(Toast)
  .use(Tabs)
  .use(TabPane)
  .use(Tabbar)
  .use(Input)
  .use(Cell)
  .use(CellGroup)
  .use(TabbarItem)
  .use(Form)
  .use(FormItem)
  .use(Picker)
  .use(Popup)
  .use(OverLay)
  .use(Icon)
  .use(Layout)
  .use(Row)
  .use(Col)
  .use(Grid)
  .use(Price)
  .use(GridItem)
  .use(Avatar)
  .use(Table)
  .use(Radio)
  .use(RadioGroup)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Divider)

export default App
