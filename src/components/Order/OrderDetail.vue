<!-- TODO: Create single product detail component dialog -->
<script setup>
import { ref, onMounted } from "vue";
import { useOrderStore } from "@/store/order.clipboard";
import axios from "axios";

import { VDataTable } from "vuetify/labs/VDataTable";
import { ProductDetail } from "@/components";

// State variables
const props = defineProps(["order"]);
const openDialog = ref(false);
const productDetail = ref({});

// Normal variables
const order = useOrderStore();

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
  order.showOrder();
  order.copyOrder({ hola: "mundo" });
  order.showOrder();
}

// General procedures
function getTotal() {
  return props.order.products.reduce(
    (accum, currVal) => accum + currVal.precio,
    0
  );
}

function parseTimestamp(timestamp) {
  if (timestamp === undefined) return;

  timestamp = timestamp.substring(0, 10).split("-");
  return timestamp[2] + "/" + timestamp[1] + "/" + timestamp[0];
}

async function openProductDetail(_, data) {
  productDetail.value = data.item.raw;
  openDialog.value = true;
}
</script>

<template>
  <v-dialog v-model="openDialog" min-width="450px" max-width="30%">
    <v-row>
      <v-col>
        <ProductDetail :product="productDetail"></ProductDetail>
      </v-col>
    </v-row>
  </v-dialog>
  <v-row justify="center">
    <v-col>
      <h2 class="mt-5">
        Último pedido ({{ parseTimestamp(props.order.o_date) }})
      </h2>
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
    :items="props.order.products"
    :items-per-page="5"
    :hover="true"
    @click:row="openProductDetail"
  ></v-data-table>
</template>
