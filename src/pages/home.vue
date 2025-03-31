<template>
  <v-container class="py-5 pa-24 con">
    <v-app-bar app  grey-darken-3>
      <v-toolbar-title style="color: #ff9f22;"  class="naruto">Oniichan Merch</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/home" >
        Home
      </v-btn>
      <v-btn text to="/cart">
        Cart
      </v-btn>
    </v-app-bar>
    <h1 class="text-h5 font-weight-bold mb-4 text-center">Welcome To Oniichan Merch </h1>
    <div style="display: flex; justify-content: center; align-items: center;margin-bottom: 40px;">
      <v-img
            src="@/assets/images/gif.gif"
            alt="Product Image"
            height="200px"
            class="rounded-t "
          ></v-img>
          <div>
            <p style="font-size: 100px; text-align: start;" class="naruto">Oniichan Merch</p>
            <p style="font-size: 20px; text-align: center;color: #ff9f22;">The best place to find your favorite anime merch</p>

          </div>
          
      
    </div>
    <v-row>
      <!-- Show loading spinner while fetching products -->
      <v-col cols="12" v-if="loading">
        <div class="loader-container">
          <!-- From Uiverse.io by SelfMadeSystem -->
          <div class="loader">
            <div class="ph1">
              <div class="record"></div>
              <div class="record-text">REC</div>
            </div>
            <div class="ph2">
              <div class="laptop-b"></div>
              <svg
                class="laptop-t"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 42 30"
              >
                <path
                  d="M21 1H5C2.78 1 1 2.78 1 5V25a4 4 90 004 4H37a4 4 90 004-4V5c0-2.22-1.8-4-4-4H21"
                  pathLength="100"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                ></path>
              </svg>
            </div>
            <div class="icon"></div>
          </div>
        </div>
      </v-col>

      <!-- Display products once loaded -->
      <v-col
        v-for="product in items"
        :key="product.id"
        cols="12"
        sm="6"
        md="6"
        lg="3"
        v-else
      >
        <v-card class="product-card" elevation="3">
          <v-img
            src="@/assets/images/funko.png"
            alt="Product Image"
            height="200px"
            class="rounded-t mt-6"
          ></v-img>
          <v-card-text>
            <h3 class="text-h6 font-weight-bold">{{ product.name }}</h3>
            <p class="text-subtitle-1 text-grey-darken-1 font-weight-bold">
              ${{ product.price }}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="grey-darken-3"
              @click="addToCart(product.id)"
              class="custom-btn"
              block
            >
              Add to Cart
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Show pagination only if there are products -->
      <v-col cols="12" v-if="items.length > 0">
        <v-pagination
          v-model="page"
          :length="totalPages"
          :total-visible="5"
        ></v-pagination>
      </v-col>

      <!-- Show pagination only if there are products -->
      <!-- <v-col cols="12">
        <div class="card">
          <button type="button" class="dismiss">×</button>
          <div class="header">
            <div class="image">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                <g
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  id="SVGRepo_tracerCarrier"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="1.5"
                    stroke="#000000"
                    d="M20 7L9.00004 18L3.99994 13"
                  ></path>
                </g>
              </svg>
            </div>
            <div class="content">
              <span class="title">Order validated</span>
              <p class="message">
                Thank you for your purchase. you package will be delivered
                within 2 days of your purchase
              </p>
            </div>
            <div class="actions">
              <button type="button" class="history">History</button>
              <button type="button" class="track">Track my package</button>
            </div>
          </div>
        </div>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import products from "@/api/product/product";
import { ref } from "vue";
import carts from "@/api/product/carts.js"; // Import the cart API

export default {
  name: "Home",
  setup() {
    const page = ref(1); // Current page number
    return {
      page,
    };
  },
  data() {
    return {
      items: [],
      loading: true,
      totalPages: 0, // Total number of pages
    };
  },
  watch: {
    page() {
      this.fetch(); // Fetch products when the page changes
    },
  },
  async created() {
    await this.fetch(); // Fetch products when the component is created
  },
  methods: {
    async fetch() {
      this.loading = true; // Set loading to true before fetching
      try {
        const response = await products.getProducts(this.page);
        const data = response.data;
        this.items = data.data;
        this.totalPages = data.last_page; // Update total pages
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        this.loading = false; // Reset loading state
      }
    },

    async addToCart(productId) {
      await carts.addToCart(productId).then(() => {
        alert("Product added to cart successfully!");
      });
    },
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
.custom-btn {
  background-color: #ff9f22;
  color: white;
  font-weight: bold;
}

</style>
