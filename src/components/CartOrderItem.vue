<template>
  <div class="containerPretty">
    <div class="cartOrderItemHeard">
      <ul class="responsive-table" style="padding-left:0px">
        <li class="table-row">
          <div class="col col-2">{{ item.cartOrderId }}</div>
          <div class="col col-2">
            {{ item.created_at }}
          </div>
          <div class="col col-2">{{ item.cartStatus }}</div>
          <div class="col col-2">{{ item.cartPayName }}</div>
          <div class="col col-2">{{ item.cartTotal }}</div>
          <div class="col col-1">{{ handleOrderClass(item.orderclass) }}</div>
          <div class="col col-1">
            <button type="button" @click="itemSever1(item.cartOrderId)">
              更多
            </button>
          </div>
        </li>
      </ul>
      <div class="table-row" v-if="openDetail">
        <div class="itemDetail">
          <div class="cartMain cartOrderItemBody">
            <div class="col-9">
              <div class="cartTable">
                <teble class="tableCart">
                  <thead>
                    <tr>
                      <th>編號</th>
                      <th></th>
                      <th>商品名稱</th>
                      <th>單價</th>
                      <th>數量</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="detail in dataDetail" :key="detail.cartOrderId">
                      <td>{{}}</td>
                      <td>
                        <img :src="detail.product_oimg" alt="" />
                      </td>
                      <td>
                        <p>{{ detail.cartName }}</p>
                      </td>
                      <td>
                        {{ detail.cartBuyP }}
                        <small>/日</small>
                      </td>
                      <td>{{ detail.cartBuyQty }}</td>
                    </tr>
                  </tbody>
                </teble>
              </div>
            </div>
            <div class="col-3 cartOrderItemBox">
              <p style="color: '#0071BC'">
                起始時間：
                <!-- <small>{item.startTime}</small> -->
              </p>

              <p style="color: '#0071BC'" className="mt-n3">
                結束時間：
                <!-- <small>{item.endTime}</small> -->
              </p>
              <p style="color: '#0071BC'" className="mt-n3">
                <!-- 天數：<small>{item.gameDay}</small> -->
              </p>
              <button class="cancelButton">取消訂單</button>
            </div>
          </div>
          <div class="cartOrderDetail">
            <div class="item1">
              <ul>
                <li>收件人姓名</li>
                <li>收件人地址</li>
              </ul>
            </div>
            <div class="item2">
              <ul>
                <li>{{ item.nNN }}</li>
                <li>{{ item.nAA }}</li>
              </ul>
            </div>
            <div class="item1">
              <ul>
                <li>收件人手機</li>
                <li>運送方式</li>
              </ul>
            </div>
            <div class="item2">
              <ul>
                <li>{{ item.nCC }}</li>
                <li>{{ item.cartLogisticsName }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartOrderItem",
  data() {
    return {
      dataId: "",
      dataDetail: "",
      openDetail: false
    };
  },
  props: {
    data: Array,
    item: Object,
    dataOrderId: {
      type: Number
    }
  },
  methods: {
    //讀取資料庫訂單資料
    async itemSever1(item) {
      const res = await fetch(`http://localhost:4000/cartorder/item/${item}`);
      const data = await res.json();
      console.log(data);
      this.dataDetail = data;
      this.openDetail = !this.openDetail;
      return data;
    },
    handleOrderClass(value) {
      let str = "";
      switch (value) {
        case 1:
          str = "商品租借";
          break;
        case 2:
          str = "活動預約";
          break;
        case 3:
          str = "場地預約";
          break;
        default:
          break;
      }
      return str;
    }
  },
  async mounted() {
    // this.dataDetail = await this.itemSever1;
    // console.log("detail", this.dataDetail);
  },
  updated() {
    // this.dataDetail = this.itemSever1();
    // console.log("detail", this.dataDetail);
  }
};
</script>

<style></style>
