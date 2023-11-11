<!-- TODO: Create single product detail component dialog -->
<script setup>
import { ref, onMounted } from "vue";
import { useOrderStore } from "@/store/order.clipboard";

import { VDataTable } from "vuetify/labs/VDataTable";
import { ProductDetail } from "@/components";

import { parseTimestamp } from "@/utils/order.utils";

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
    key: "op_quantity",
  },
];

// Button actions
function copyOrder() {
  order.copyOrder(props.order);
}

async function openProductDetail(_, data) {
  productDetail.value = data.item;
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
