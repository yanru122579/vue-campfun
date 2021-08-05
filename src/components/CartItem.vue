<template>
  <div class="cartMain container">
    <div class=" cartItemDay d-flex">
      <p class="cart-date-hl">
        <strong>預定起始日</strong>
      </p>
      <p class="cart-date-hl">
        <strong>預定歸還日</strong>
      </p>
      <p class="cart-date-hl2"><strong>租借天數</strong></p>
    </div>
    <div class="cartTable">
      <table class="tableCart" v-if="product.length >= 1">
        <thead>
          <tr>
            <th></th>
            <th>商品</th>
            <th>數量</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="" :key="item.product_id" v-for="item in product">
          <tr>
            <td>
              <img :src="item.product_oimg" alt="" />
            </td>
            <td style="width:'400px'">商品名稱{{ item.product_name }}</td>
            <td>
              <button
                v-if="!nextGo"
                @click="
                  $emit('update-Product', item.product_id, item.quantity, false)
                "
              >
                -
              </button>
              {{ item.quantity }}
              <button
                v-if="!nextGo"
                @click="
                  $emit('update-Product', item.product_id, item.quantity, true)
                "
              >
                +
              </button>
            </td>
            <td>{{ item.product_price * item.quantity }}<small>/1日</small></td>
            <td>
              <button @click="$emit('delect-Product', item.product_id)">
                <i class="fas fa-trash-alt" v-if="!nextGo"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="container">
        <h3
          class="d-flex mt-5 justify-content-center mb-5"
          style="color:'#145041"
        >
          <!-- <img src="../../public/images.profile.png" alt="" /> -->
          目前購物車內尚無東西
        </h3>
      </div>
    </div>
  </div>
  <div class="container" v-if="!nextGo">
    <div class="cartPiceDetil">
      <div class="cartPiceDetilItem3">
        <p>
          選擇折價券
          <br />
          <select name="newMember" id="newMember" style="width:'150px'">
            <option value="0">請選擇折價券</option>
          </select>
        </p>
        <p>
          選擇運送方式
          <br />
          <select
            name="cartLogistics"
            id=""
            style="'width:'150px"
            v-model="cartLogistics"
          >
            <option value="-1">請選擇運送方式</option>
            <option value="1">宅配1件/100</option>
            <option value="2">自取</option>
          </select>
        </p>
      </div>
      <div class="cartPiceDetilItem1">
        <p>訂購數量</p>
        <p>小計</p>
        <p v-if="cartLogistics == 1">運費1件/$100</p>
        <h4>總計金額&emsp;</h4>
      </div>
      <div class="cartPiceDetilItem2">
        <p>共{{ sumQty }}項</p>
        <p>NT ${{ sumTotal }}</p>
        <p v-if="cartLogistics == 1">{{ sumQty * 100 }}</p>
        <h3>NT ${{ sumTotal - (cartLogistics == 1 ? +sumQty * 100 : "") }}</h3>
      </div>
    </div>
    <div class="cartPiceBtn">
      <button>繼續選購</button> <button @click="nextGoChange">下一步</button>
    </div>
  </div>
  <CartInfo
    v-if="nextGo"
    :product="product"
    :nextGo="nextGo"
    @nextGoChange="nextGoChange"
    @myclick="this.nextGo = true"
    :sumTotal="sumTotal"
    :sumQty="sumQty"
  />
</template>
<script>
// import { onUpdated } from "@vue/runtime-core";
import CartInfo from "../components/CartInfo.vue";
export default {
  name: "CartItem",
  props: {
    product: Array
  },
  components: {
    CartInfo
  },
  data() {
    return {
      nextGo: false,
      sumTotal: "",
      sumQty: "",
      cartLogistics: "-1"
    };
  },
  methods: {
    //計算金額
    calcTotal() {
      let total = 0;
      for (let i = 0; i < this.product.length; i++) {
        total += this.product[i].product_price * this.product[i].quantity;
      }
      return total;
    },
    //計算數量
    calcQty() {
      let total = 0;
      for (let i = 0; i < this.product.length; i++) {
        total += parseInt(this.product[i].quantity);
      }
      return total;
    },
    //切換下一頁狀態
    nextGoChange(item) {
      if (this.product.length >= 1) this.nextGo = item;
    }
  },
  updated() {
    //金額改面時刷新頁面
    this.sumTotal = this.calcTotal();
    this.sumQty = this.calcQty();
    // console.log(this.sumTotal);
  }
};
</script>
