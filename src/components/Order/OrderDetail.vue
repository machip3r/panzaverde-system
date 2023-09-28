<!-- TODO: Create single product detail component dialog -->
<script setup>
import { ref } from "vue";
import axios from "axios";

import { VDataTable } from "vuetify/labs/VDataTable";
import { ProductDetail } from "@/components";

// State variables
const props = defineProps(["order"]);
const orderProducts = ref([]);
const openDialog = ref(false);
const productDetail = ref({});

// Normal variables
// TODO: Update this so it can have the actual order data
const headers = [
  {
    title: "Producto",
    align: "start",
    sortable: false,
    key: "p_name",
  },
  {
    title: "Precio",
    align: "start",
    sortable: false,
    key: "p_price",
  },
  {
    title: "Cantidad",
    align: "start",
    sortable: false,
    key: "p_stock",
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

async function openProductDetail(e, data) {
  productDetail.value = data.item.raw;
  openDialog.value = true;
}

getProducts();
</script>

<template>
  <v-dialog v-model="openDialog" min-width="450px" max-width="30%">
    <v-row>
      <v-col>
        <ProductDetail :product="productDetail"></ProductDetail>
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
    :items="orderProducts"
    :items-per-page="5"
    :hover="true"
    @click:row="openProductDetail"
  ></v-data-table>
</template>
