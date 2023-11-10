<script setup>
import { ref } from "vue";

import axios from "axios";

let inventory = ref([]);
const tableHeaders = [
  {
    title: "Producto",
    align: "start",
    key: "p_name",
  },
  {
    title: "Precio",
    align: "start",
    sortable: true,
    key: "p_price",
  },
  {
    title: "Cant. en Inventario",
    align: "start",
    sortable: true,
    key: "p_stock",
  },
];

async function getProducts() {
  inventory.value = (await axios.get("products/")).data;

  console.log(inventory.value);
}

function disableButtons() {
  return (
    inventory.value.page <= 1 ||
    inventory.value.page >= inventory.value.max_pages
  );
}

getProducts();
</script>

<template>
  <h2 class="mt-5">Inventario</h2>

  <v-text-field
    class="mx-10 my-5"
    density="compact"
    variant="solo"
    placeholder="Search templates"
    prepend-inner-icon="mdi-filter"
    bg-color="grey-lighten-3"
    single-line
    hide-details
    flat
    rounded
  ></v-text-field>

  <v-row>
    <v-col>
      <h2>Todos los productos</h2>
    </v-col>
  </v-row>
  <v-row>
    <v-col><b class="text-grey-darken-1">Producto </b></v-col>
    <v-col><b class="text-grey-darken-1">Precio </b></v-col>
    <v-col><b class="text-grey-darken-1">Cantidad en Stock</b></v-col>
  </v-row>
  <v-row>
    <v-col>
      <hr class="my-0" />
    </v-col>
  </v-row>

  <v-row>
    <v-virtual-scroll
      :items="inventory.products"
      height="100%"
      item-height="50px"
    >
      <template v-slot:default="{ item }">
        <v-list-item @click="console.log(item)">
          <v-row>
            <v-col>{{ item.p_name }}</v-col>
            <v-col>${{ parseFloat(item.p_price).toFixed(2) }}</v-col>
            <v-col align-self="center">{{ item.p_stock }}</v-col>
          </v-row>
        </v-list-item>
      </template>
    </v-virtual-scroll>
  </v-row>

  <v-row>
    <hr />
  </v-row>

  <v-row align="center" justify="center">
    <v-col class="d-flex align-center justify-end">
      <p>Elementos por página:</p>
      <v-text-field
        single-line
        hide-details
        flat
        shrink
        class="mx-10 my-5 shink"
        density="compact"
        variant="solo"
        placeholder="Elementos por página"
        bg-color="grey-lighten-3"
        v-model="inventory.records"
      ></v-text-field>
      Página: <b>{{ inventory.page }}</b> de <b>{{ inventory.max_pages }}</b>
      <v-btn
        :disabled="inventory.page === 1"
        flat
        size="small"
        icon="mdi-skip-previous"
      ></v-btn>
      <v-btn
        :disabled="inventory.page <= 1"
        flat
        size="small"
        icon="mdi-chevron-left"
      ></v-btn>
      <v-btn
        :disabled="inventory.page >= inventory.max_pages"
        flat
        size="small"
        icon="mdi-chevron-right"
      ></v-btn>
      <v-btn
        :disabled="inventory.page === inventory.max_pages"
        flat
        size="small"
        icon="mdi-skip-next"
      ></v-btn>
    </v-col>
  </v-row>
</template>
