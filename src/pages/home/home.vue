<template>
  <view class="home-container">
    <map
      id="map"
      :showLocation="true"
      :latitude="latitude"
      :longitude="longitude"
      class="map-content"
      scale="16"
    />
    <scroll-view id="handler" class="handler-content">
      <nut-tabs v-model="tabSelected" size="large" animated-time="0">
        <nut-tabpane title="拖车"> </nut-tabpane>
        <nut-tabpane title="搭电"> </nut-tabpane>
        <nut-tabpane title="换胎"> </nut-tabpane>
      </nut-tabs>

      <nut-form :model-value="orderForm.state" ref="orderRefForm">
        <nut-form-item label="故障地点" prop="name" required>
          <view class="form-cell" @tap="selectAddress('rescue')">
            <input
              class="form-input"
              v-model="orderForm.state.name"
              placeholder="请选择故障地点"
              type="text"
              disabled="true"
            />
            <nut-icon name="arrow-right" size="16" color="#666"></nut-icon>
          </view>
        </nut-form-item>
        <nut-form-item label="拖车终点" prop="name" required>
          <view class="form-cell" @tap="selectAddress('tail')">
            <input
              v-model="orderForm.state.name"
              placeholder="请选择拖车终点"
              class="form-input"
              type="text"
              disabled="true"
            />
            <nut-icon name="arrow-right" size="16" color="#666"></nut-icon>
          </view>
        </nut-form-item>
        <nut-form-item label="车牌号" prop="name" required>
          <view class="form-cell">
            <input
              v-model="orderForm.state.name"
              class="form-input"
              placeholder="请输入车牌号"
              type="text"
            />
          </view>
        </nut-form-item>
        <nut-form-item label="联系电话" prop="name" required>
          <view class="form-cell">
            <input
              v-model="orderForm.state.name"
              class="form-input"
              placeholder="请输入联系电话"
              type="text"
            />
          </view>
        </nut-form-item>
      </nut-form>
    </scroll-view>
    <view id="footer" class="footer-content">
      <view class="price-content">
        <view>
          <span class="label">预计: </span>
          <nut-price class="price" :price="0" size="large" :thousands="true" />
        </view>
        <nut-icon
          name="ask"
          size="18"
          color="rgba(255, 158, 13, 1)"
          @click="showFeeIllustration"
        ></nut-icon>
      </view>
      <view class="button-content">
        <nut-button
          block
          size="large"
          shape="square"
          type="primary"
          class="btn"
          @click="createOrder"
        >
          立即下单
        </nut-button>
      </view>
    </view>

    <cover-view class="fee-popup">
      <cover-view class="fee-content">
        <cover-view class="title">计价标准</cover-view>
        <cover-view class="title-desc">实际支付金额以收银台为准</cover-view>
        <cover-view class="fee-item">
          <cover-view class="fee-label"> 起步价格 </cover-view>
          <cover-view class="fee-desc"> ¥198.00(≤15km,超出8元/1km) </cover-view>
        </cover-view>
        <view class="fee-item">
          <view class="fee-label"> 预估里程 </view>
          <view class="fee-desc"> 12km </view>
        </view>
        <view class="fee-item">
          <view class="fee-label"> 超出里程 </view>
          <view class="fee-desc"> 0km </view>
        </view>
        <view class="fee-item">
          <view class="fee-label"><b>合计</b> </view>
          <view class="fee-desc"><b>¥198.00</b></view>
        </view>
        <nut-divider dashed></nut-divider>
        <view class="fee-table">
          <view class="table-row">
            <view class="row-label">服务区域</view>
            <view class="row-desc">全国范围(除港澳台)</view>
          </view>
          <view class="table-row">
            <view class="row-label">拖车</view>
            <view class="row-desc">
              <view style="display: block">
                起步价198元含15km,超出每公里加收8元;
              </view>
              <view style="display: block">
                订单完成后按实际拖车里程实收费用
              </view>
            </view>
          </view>
          <view class="table-row">
            <view class="row-label">搭电</view>
            <view class="row-desc">98元/1次</view>
          </view>
          <view class="table-row">
            <view class="row-label">换胎</view>
            <view class="row-desc">98元/1次</view>
          </view>
        </view>
        <view
          class="agreement-desc"
          hover-class="none"
          hover-stop-propagation="false"
          @tap="jumpAgreement"
        >
          点击<text class="link">《道路救援服务》</text>查看详细服务及费用说明
        </view>
        <nut-button
          type="primary"
          :block="true"
          @tap="feeIllustrationVisible = false"
          >知道了</nut-button
        >
      </cover-view>
    </cover-view>
  </view>
</template>

<script lang="ts" setup>
import Taro, { useReady } from "@tarojs/taro";
import { onMounted, reactive, ref } from "vue";
import * as auth from "../../utils/auth";
import { getStorage } from "../../utils/storage";

/**
 * @小程序声明周期onReady
 * @description 获取经纬度信息、计算地图高度
 */
const latitude = ref(39.54);
const longitude = ref(116.23);
const mapHeight = ref("300px");
const needPhone = ref(false);

useReady(() => {
  console.log("onShow", Taro.getEnv());
  // 获取当前位置
  Taro.getLocation({
    type: "gcj02",
  }).then((result) => {
    console.log("getLocation", result);
    longitude.value = result.longitude;
    latitude.value = result.latitude;
    console.log(longitude.value, latitude.value);
  });

  // 动态设置页面高度
  Taro.nextTick(() => {
    const query = Taro.createSelectorQuery();
    query
      .select("#footer")
      .boundingClientRect()
      .select("#handler")
      .boundingClientRect()
      .selectViewport()
      .boundingClientRect()
      .exec((res) => {
        console.log("selectViewport", res);
        mapHeight.value = res[2].height - res[0].height - res[1].height + "px";
      });
  });
});

onMounted(() => {
  needPhone.value = !getStorage("isLogin") as unknown as boolean;
  // 调整地图收口到当前位置
  const mapCtx = Taro.createMapContext("map");
  mapCtx.moveToLocation({
    success() {
      console.log("success");
    },
    fail() {
      console.log("fail");
    },
    complete() {
      console.log("complete");
    },
  });
  // 获取用户授权
  switch (Taro.getEnv()) {
    case "JD":
      auth
        .JDAuth()
        .then((res) => {
          console.log("JD", res);
          needPhone.value = res.phoneNeed as boolean;
          Taro.setStorage({ key: "isLogin", data: !res.phoneNeed });
        })
        .catch((err) => {
          console.log(err);
        });
      break;
    case "WEAPP":
      auth
        .weappAuth()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      break;

    default:
      break;
  }
});

const tabSelected = ref(0);
const orderRefForm = ref<any>(null);
const orderForm = {
  state: reactive({
    rescueAddress: "",
    name: "",
  }),
};

/**
 * @选择救援地址
 * @description 选择拖车终点(selectTail)和救援地点(selectRescue)
 */
const selectAddress = (addressType: String) => {
  console.log("chooseLocation");
  if (Taro.getEnv() === "ALIPAY") {
    console.log("MINI_TYPE");
    my.chooseLocation({
      success: (res) => {
        console.log(res);
        if (addressType === "rescue") {
        } else if (addressType === "tail") {
        }
      },
    });
  } else {
    Taro.chooseLocation({
      success: (res) => {
        console.log(res);
        if (addressType === "rescue") {
        } else if (addressType === "tail") {
        }
      },
      fail: (err) => {
        console.log(err);
      },
    });
  }
};
/**
 * @费用说明弹框
 */
const feeIllustrationVisible = ref(false);
const showFeeIllustration = () => {
  console.log("showFeeIllustration");
  feeIllustrationVisible.value = true;
};
const jumpAgreement = () => {
  Taro.navigateTo({
    url: "/pages/agreementCenter/agreementCenter",
  });
};
/**
 * @创建订单
 */

const createOrder = () => {
  if (needPhone.value) {
    Taro.navigateTo({
      url: "/pages/auth/auth",
    });
  } else {
    console.log("createOrder");
    Taro.navigateTo({
      url: "/pages/payCenter/payCenter",
    });
  }
};
</script>

<style lang="scss">
.home-container {
  position: relative;
  height: 100vh;
  .map-content {
    width: 100%;
    height: v-bind(mapHeight);
  }
  .handler-content {
    box-shadow: 0 -2px 3px -1px #eee;
    .form-cell {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .form-input {
        font-size: 14px;
      }
    }
  }
  .footer-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 4px;
    box-shadow: 0 -2px 3px -1px #eee;
    .price-content {
      display: flex;
      align-items: baseline;
      justify-content: space-around;
      width: 50%;
      .label {
        display: inline-block;
        font-size: 12px;
        color: #8c8c8c;
      }
      .price {
        display: inline-block;
        margin-left: 10px;
        font-size: 20px;
        letter-spacing: 1px;
        font-weight: bold;
      }
      .price-btn {
        height: 50px;
        width: 100%;
      }
    }
    .button-content {
      width: 50%;
      text-align: right;
      .btn {
        height: 100%;
        width: 100%;
      }
    }
  }
  .fee-popup {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .fee-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 15px 20px;
    background-color: #fff;
    text-align: center;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    .title-desc {
      font-size: 12px;
      margin-top: 5px;
      color: #8c8c8c;
    }
    .fee-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      padding: 2px 20px;
      .fee-label,
      .fee-desc {
        font-size: 12px;
        display: inline-block;
      }
    }
    .fee-table {
      font-size: 12px;
      border: 1px solid #eee;
      .table-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
        line-height: 30px;
        .row-label {
          flex-shrink: 0;
          width: 21%;
        }
        .row-desc {
          width: 79%;
          text-align: right;
          flex-shrink: 1;
          padding-right: 5px;
          border-left: 1px solid #eee;
        }
      }
      .table-row:last-child {
        border-bottom: none;
      }
    }
    .agreement-desc {
      font-size: 12px;
      color: #8c8c8c;
      margin: 15px 0px;
      .link {
        color: #fa2c19;
      }
    }
  }
  .form-cell:active {
    opacity: 0.7;
  }
  .nut-tabs__content {
    height: 0px;
  }
  .nut-cell {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .nut-form-item {
    display: flex;
    align-items: center;
  }
}
</style>
