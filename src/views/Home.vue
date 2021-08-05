<template>
  <CartTitle />
  <div
    class="container
  "
  >
    <h5>點擊加入購物車(暫時用)</h5>
    <ul class="d-flex" style="padding-left:0">
      <li :key="item" v-for="item in arrId">
        <button @click="addCart(item)">{{ item }}</button>
      </li>
    </ul>
  </div>
  <CartItem
    :product="product"
    @delect-Product="delectProduct"
    @update-Product="updateProduct"
  />
</template>

<script>
import CartTitle from "../components/CartTitle.vue";
import CartItem from "../components/CartItem.vue";
export default {
  name: "Home",
  components: {
    CartTitle,
    CartItem
  },
  data() {
    return {
      product: [],
      //   order: [],
      arrId: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  },

  methods: {
    //取得加到購物車的資料
    async addProduct() {
      const url = "http://localhost:4000/cart";
      const request = new Request(url, {
        method: "GET",
        credentials: "include",
        headers: new Headers({
          Accept: "application/json"
        })
      });
      const res = await fetch(request);
      const data = await res.json();
      console.log("cart", data);
      return data;
    },
    //刪除單筆商品
    async delectProduct(sid) {
      const url = `http://localhost:4000/cart/remove/${sid}`;
      const request = new Request(url, {
        method: "GET",
        credentials: "include",
        headers: new Headers({
          Accept: "application/json"
        })
      });
      const res = await fetch(request);
      const data = await res.json();
      this.product = data.cart;
      return data;
    },
    //加到購物車
    async addCart(sid) {
      const url = `http://localhost:4000/cart/add?sid=${sid}&quantity=1`;
      const request = new Request(url, {
        method: "GET",
        credentials: "include",
        headers: new Headers({
          Accept: "application/json"
        })
      });
      const response = await fetch(request);
      const data = await response.json();
      this.product = data.cart;
      return data;
    },
    //變更商品數量
    async updateProduct(sid, quantity, add = true) {
      quantity = add === true ? +quantity + 1 : +quantity - 1;
      if (quantity == 0) {
        return;
      }
      const url = `http://localhost:4000/cart/update?sid=${sid}&quantity=${quantity}`;
      const request = new Request(url, {
        method: "GET",
        credentials: "include",
        headers: new Headers({
          Accept: "application/json"
        })
      });
      const response = await fetch(request);
      const data = await response.json();
      this.product = data.cart;
      return;
    }
    //取得訂單資料
    // async cartOrder() {
    //   const res = await fetch("http://localhost:4000/cartorder/api");
    //   const data = await res.json();
    //   return data;
    // }
  },

  async mounted() {
    this.product = await this.addProduct();
  }
};
</script>
<style scoped>
li {
  list-style-type: none;
}
</style>
