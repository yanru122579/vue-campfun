<template>
  <div>
    <!-- <div class="CartDetailText">
      <h4>已完成訂單</h4>
      <h4>感謝您的購買</h4>
    </div> -->
    <!-- <div class="cartMain container">
      <div class=" cartItemDay d-flex">
        <p class="cart-date-h1">
          <strong>
            起始時間：
          </strong>
        </p>
        <p>
          <strong>
            結束時間:
          </strong>
        </p>
        <p>
          <strong>天數：</strong>
        </p>
      </div>
      <div class="cartTable">
        <table className="tableCart">
          <thead>
            <tr>
              <th></th>
              <th>商品名稱</th>
              <th>價格</th>
              <th>數量</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orderData.orderItem" :key="item.orderData">
              <td>
                <img :src="item.product_oimg" alt="" />
              </td>
              <td>{{ item.cartName }}</td>
              <td>{{ item.cartBuyP * item.cartBuyQty }}</td>
              <td>{{ item.cartBuyQty }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> -->
    <div class="cartPiceDetil container">
      <div class="cartPiceDetilItem1">
        <p>總共消費金額：</p>
      </div>
      <div class="cartPiceDetilItem2">
        <p>NT {{ orderData.orderInfo.cartTotal }}</p>
      </div>
    </div>
    <h5 class="container">訂單明細：</h5>
    <div class="container CartDetail">
      <div class="CartDetail item1">
        <ul>
          <li>訂單編號</li>
          <li>訂單日期</li>
          <li>訂單狀態</li>
          <li>運送方式</li>
          <li>付款方式</li>
        </ul>
      </div>
      <div class="CartDetail item2">
        <ul>
          <li>{{ orderData.orderInfo.cartOrderId }}</li>
          <li>
            {{ moment(orderData.orderInfo.created_at).format("YYYY-MM-DD") }}
          </li>
          <li>{{ orderData.orderInfo.cartStatus }}</li>
          <li>
            {{ orderData.orderInfo.cartLogisticsId == 1 ? "自取" : "宅配" }}
          </li>
          <li>
            {{ orderData.orderInfo.cartPayId == 1 ? "信用卡結帳" : "貨到付款" }}
          </li>
        </ul>
      </div>
      <div class="CartDetail item3">
        <ul>
          <li>收件人姓名</li>
          <li>收件人手機</li>
          <li>收件人信箱</li>
          <li>收件人地址</li>
          <li>付款狀態</li>
        </ul>
      </div>
      <div class="CartDetail item4">
        <ul>
          <li>{{ orderData.orderInfo.nNN }}</li>
          <li>{{ orderData.orderInfo.nCC }}</li>
          <li>{{ orderData.orderInfo.nEE }}</li>
          <li>{{ orderData.orderInfo.nAA }}</li>
          <li>{{ orderData.orderInfo.cartPayId == 1 ? "已結清" : "" }}</li>
        </ul>
      </div>
    </div>
    <div class="container">
      <div class="cartPiceBtn">
        <button>回到商品頁面</button>
        <a href="/cartorder" @click="sessionClear()">到訂單頁面</a>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
// let moment = require("moment");
export default {
  name: "CartDetail",
  props: {
    orderData: Object
  },
  mounted() {
    console.log("test", this.orderData);
  },
  methods: {
    //使用時間格式
    moment() {
      return moment();
    },
    //結帳後清除session
    async sessionClear() {
      const url = `http://localhost:4000/cart/clear`;
      const request = new Request(url, {
        method: "GET",
        credentials: "include",
        headers: new Headers({
          Accept: "application/json"
        })
      });
      const response = await fetch(request);
      const data = await response.json();
      return data;
    }
  }
};
</script>

<style></style>
