<template>
  <div class="containerPretty">
    <div class="container">
      <div class="cartOrderTitle">
        <h5>
          查詢訂單
        </h5>
        <select name="" id="">
          <option value="">訂單狀態</option>
          <option value="已完成">已完成</option>
          <option value="待出貨">待出貨</option>
          <option value="已取消">已取消</option>
          <option value="已預訂">已預定</option>
          <option value="線下訂單已完成">線下訂單完成</option>
        </select>
        <select name="" id="">
          <option value="">分類</option>
          <option value="1">商品租借</option>
          <option value="3">場地預約</option>
        </select>
      </div>
      <ul class="responsive-table" style="padding-left:0px">
        <li class="table-header">
          <div className="col col-2">訂單編號</div>
          <div className="col col-2">訂單日期</div>
          <div className="col col-2">訂單狀態</div>
          <div className="col col-2">付款方式</div>
          <div className="col col-2">付款金額</div>
          <div className="col col-1">分類</div>
          <div className="col col-1">更多</div>
        </li>
      </ul>
      <CartOrderItem
        v-for="item in data.rows"
        :key="item.cartOrderId"
        :data="data"
        :item="item"
        :dataOrderId="dataOrderId"
        @item-sever="itemSever"
      />
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <button type="button" class="page-link" @click="pageChange++">
              Previous
            </button>
          </li>
          <!-- <li class="page-item" v-for="page in data.totalPages" :key="page"> -->
          <li
            :class="pageChange == page ? 'active' : ''"
            v-for="page in newPage"
            :key="page"
          >
            <button type="button" class="page-link " @click="onClickPage(page)">
              {{ page }}
            </button>
          </li>
          <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
  </div>
  <!-- <div class="mt-3">
    <h6>Goto last button number</h6>
    <b-pagination
      v-model="pageChange"
      :total-rows="data.totalPages"
      :per-page="pageRange"
      last-number
    ></b-pagination>
  </div> -->
  <router-link to="/">Go Back</router-link>
</template>
<script>
import CartOrderItem from "../components/CartOrderItem.vue";
export default {
  name: "CartOrder",
  data() {
    return {
      data: "",
      dataItem: "",
      dataOrderId: "1627459278465",
      pageChange: 1,
      pageRange: 3,
      newPage: []
    };
  },
  components: {
    CartOrderItem
  },
  methods: {
    //取得訂單資料
    async cartOrder() {
      const res = await fetch(
        `/api/cartorder/api/?page=${this.pageChange}&orderClass=1`
      );
      const data = await res.json();
      console.log("123", data);
      return data;
    },
    //取得單項商品細節
    async itemSever() {
      const res = await fetch(`/api/cartorder/item/${this.dataOrderId}`);
      const data = await res.json();
      console.log("445", data);
      console.log(this.dataOrderId);
      return data;
    },
    //設定頁數
    setTotalPage() {
      for (let number = 1; number <= this.data.totalPages; number++) {
        this.totalPage.push();
      }
    },
    //點擊頁數
    async onClickPage(item) {
      this.pageChange = await item;
      console.log(this.pageChange);
      this.data = await this.cartOrder();
      console.log("更新後", this.data);
      this.pageChange = this.creatNewPage(this.data.page);
    },
    //修改分頁長度
    range(start, end) {
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
    },
    createPages(pageChange) {
      var start =
        pageChange - this.pageRange <= 0 ? 0 : pageChange - this.pageRange;
      var end = pageChange + this.pageRange;
      return this.range(start, end);
    },
    async creatNewPage(item) {
      let pages = [];
      for (let i = item - 2; i <= item + 2; i++) {
        pages.push(i);
      }
      console.log("1123", pages);
      if (pages[0] < 1) {
        pages = [1, 2, 3, 4, 5];
      }
      if (pages[4] > this.data.totalPages) {
        pages = [1, 2, 3, 4, 5];
      }
      this.newPage = await pages;
      return pages;
    }
  },
  async mounted() {
    //將訂單資料設定到data
    this.data = await this.cartOrder();
    //將單項商品細節設定到dataItem
    this.dataItem = await this.itemSever();
    console.log(this.data.totalPages);
    // this.createPages(this.pageChange);
    // console.log(this.pageChange);
    this.newPage = await this.creatNewPage(this.data.page);
    // this.creatNewPage(this.data.page);
  },
  async updated() {
    // this.pageChange = await this.creatNewPage();
    // this.newPage = await this.creatNewPage(this.data.page);
    // this.newPage = await this.creatNewPage();
  }
};
</script>

<style></style>
