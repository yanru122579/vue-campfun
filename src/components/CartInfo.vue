<template>
  <span>
    <div class="container" v-if="orderData.orderItem.length == 0">
      <div class="cartPiceDetil">
        <div class="cartPiceDetilItem1">
          <p>品項:</p>
          <p>總計金額:</p>
        </div>
        <div class="cartPiceDetilItem2">
          <p>共 {{ sumQty }}項</p>
          <p>NT $ {{ sumTotal }}元</p>
        </div>
      </div>
      <h5>2.收貨人資料</h5>
      <div class="cartMain">
        <form class="cartInfoMenber" @submit.prevent="addCartToSever">
          <br />
          <label>收件人姓名:</label>
          <input type="text" v-model="nNN" placeholder="請輸入姓名" required />
          <label>收件人手機:</label>
          <input
            type="text"
            v-model="nCC"
            placeholder="請輸入手機"
            pattern="09\d{2}-?\d{3}-?\d{3}"
            maxlength="10"
            required
          />
          <label>收件人信箱:</label>
          <input type="email" v-model="nEE" placeholder="請輸入信箱" required />
          <label>收件人地址:</label>
          <div>
            <select name="" id="" v-model="city">
              <option value="-1">選擇縣市</option>
              <option
                v-for="(item, index) in countries"
                :key="index"
                :value="index"
                >{{ item }}</option
              >
            </select>
            <select name="" id="" v-model="area">
              <option value="-1">選擇區域</option>
              <option
                v-for="(item, i) in townshipsData[city]"
                :key="i"
                :value="i"
                >{{ item }}</option
              >
            </select>
            <p v-if="city > -1 && area > -1">
              郵遞區號：{{ postcodes[city][area] }}
            </p>
            <p v-else>郵遞區號</p>
          </div>
          <br />
          <input type="text" placeholder="請輸入地址" v-model="nAA" required />
          <br />
          <label for="">發票資訊</label>
          <br />
          <select name="" id="">
            <option value="-1">捐贈發票</option>
          </select>
          <br />
          <label for="">選擇付款方式:</label>
          <br />
          <select name="" id="">
            <option value="-1">請選擇付款方式</option>
          </select>
          <div class="cartPiceBtn cartInfoBtn">
            <button type="button" @click="$emit('myclick')">
              上一頁
            </button>
            <button type="submit">
              確認結帳
            </button>
          </div>
        </form>
      </div>
    </div>
    <CartDetail
      v-if="orderData.orderItem.length >= 1"
      :order-data="orderData"
    />
  </span>
</template>
<script>
import CartDetail from "../components/CartDetail.vue";
//地址的資料
import { countries, townships, postcodes } from "../json/townships";
export default {
  name: "CartInfo",
  props: {
    product: Array,
    nextGo: Boolean,
    nextGoChange: Function,
    sumQty: String,
    sumTotal: String
    // nextGo: {
    //   type: Boolean,
    //   default: true
    // }
  },

  components: {
    CartDetail
  },
  data() {
    return {
      nNN: "",
      nAA: "",
      nEE: "",
      nCC: "",
      orderData: { orderItem: [], orderInfo: "" },
      townshipsData: "",
      countries: "",
      postcodes: "",
      city: "-1",
      area: "-1"
    };
  },
  methods: {
    //將商品與客戶資料寫入資料庫
    async addCartToSever() {
      const orderid = +new Date();
      let data = {
        orderItem: []
      };
      //商品為多項 使用陣列方式寫入資料庫
      for (let item of this.product) {
        const tempObj = {
          product_id: item.product_id,
          cartName: item.product_name,
          cartBuyQty: item.quantity,
          cartBuyP: item.product_price,
          cartOrderId: orderid,
          product_oimg: item.product_oimg
        };
        data.orderItem.push(tempObj);
      }
      //收件人資料 使用物件寫入資料庫
      data.orderInfo = {
        nNN: this.nNN,
        countries: this.city,
        townships: this.area,
        nAA: this.nAA,
        nCC: this.nCC,
        nEE: this.nEE,
        cartPayId: 1,
        cartLogisticsId: 1,
        mid: 127,
        cartTotal: this.sumTotal,
        cartDescription: 1,
        cartStatus: "待出貨",
        cartOrderId: orderid,
        orderclass: 1,
        created_at: new Date(),
        startTime: 1,
        endTime: 1,
        gameDay: 1,
        newMember: 1
      };
      console.log("一開始收到的資料", data);
      const url = "http://localhost:4000/cartorder/add";
      const request = new Request(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
      });
      console.log("JSON字串", JSON.stringify(data));
      const response = await fetch(request);
      const dataRes = await response.json();
      console.log("伺服器回傳的json資料", dataRes);
      this.orderData = data;
      this.nNN = "";
      this.nAA = "";
      this.nCC = "";
      this.nEE = "";
      console.log("info", this.orderData);
      console.log("123", this.nextGo);
    }
  },
  created() {
    this.townshipsData = townships;
    this.countries = countries;
    this.postcodes = postcodes;
    console.log(this.townshipsData);
    console.log(this.countries);
    console.log(this.postcodes);
  },

  mounted() {
    // console.log(this.city);
  }
};
</script>
