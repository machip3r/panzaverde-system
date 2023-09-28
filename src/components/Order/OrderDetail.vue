<!-- TODO: Create single product detail component dialog -->
<script setup>
import { ref } from "vue";
import axios from "axios";

import { VDataTable } from "vuetify/labs/VDataTable";
import { ProductDetail } from "@/components";
import { BIconCloudFog } from "bootstrap-vue";

// State variables
const props = defineProps(["order"]);
const orderProducts = ref([]);
const openDialog = ref(false);
const productDetail = ref({});

// Normal variables
// TODO: Update this so it can have the actual order data
const headers = [
  {
    title: "Dessert (100g serving)",
    align: "start",
    sortable: false,
    key: "name",
  },
  { title: "Calories", key: "calories" },
  { title: "Fat (g)", key: "fat" },
  { title: "Carbs (g)", key: "carbs" },
  { title: "Protein (g)", key: "protein" },
  { title: "Iron (%)", key: "iron" },
];

const desserts = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: 1,
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: 1,
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: 7,
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: 8,
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: 16,
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: 0,
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: 2,
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: 45,
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: 22,
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: 6,
  },
];

// Button actions
function copyOrder() {
  console.log("Copy");
}

// General procedures
function getTotal() {
  return props.order.products.reduce(
    (accum, currVal) => accum + currVal.precio,
    0
  );
}

// API fetching
async function getProducts(id) {
  orderProducts.value = (await axios.get("products/")).data;
}

async function openProductDetail(id) {
  productDetail.value = (await axios.get(`products/${id}`)).data;
}

getProducts();
</script>

<template>
  <v-dialog v-model="openDialog" min-width="450px" max-width="30%">
    <v-row>
      <v-col>
        <ProductDetail product_id="1"></ProductDetail>
      </v-col>
    </v-row>
  </v-dialog>
  <v-row align="center" justify="center">
    <v-col>
      <h2 class="mt-5">Último pedido ({{ order.orderDate }})</h2>
      <p>{{ order.user }}</p>
    </v-col>
    <v-col class="text-right">
      <v-btn @click="copyOrder" density="compact" size="x-large" icon>
        <v-icon>mdi-content-copy</v-icon>
        <v-tooltip activator="parent" location="left">Copiar pedido</v-tooltip>
      </v-btn>
    </v-col>
  </v-row>

  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    :hover="false"
    @click:row="cosole.log()"
  ></v-data-table>
</template>
