<script setup>
import { ref } from "vue";

import axios from "axios";

import { getScrollHeight } from "@/utils/order.utils";

let inventory = ref([]);

async function getProducts(page, elementsPerPage) {
  inventory.value = (await axios.get(`products/${elementsPerPage}`)).data;

  console.log(inventory.value);
}

getProducts(0, 50);

console.log();
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
      :max-height="getScrollHeight(60)"
      item-height="50px"
    >
      <template v-slot:default="{ item }">
        <v-list-item @click="console.log(item)">
          <v-row>
            <v-col>{{ item.p_name }}</v-col>
            <v-col>${{ parseFloat(item.p_price).toFixed(2) }}</v-col>
            <v-col align-self="center"
              >{{ item.p_stock }} {{ item.p_unit }}</v-col
            >
          </v-row>
        </v-list-item>
      </template>
    </v-virtual-scroll>
  </v-row>

  <v-row>
    <hr />
  </v-row>

  <v-row align="center" justify="center">
    <v-col class="px-10 d-flex align-center justify-end">
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

      <div class="d-flex">
        <p>Página</p>
        <p class="mx-2">
          <b>{{ inventory.page }}</b>
        </p>
        <p>de</p>
        <p class="mx-2">
          <b>{{ inventory.max_pages }}</b>
        </p>
      </div>

      <div class="ml-5">
        <v-btn
          class="mx-2"
          :disabled="inventory.page === 1"
          flat
          size="small"
          icon
        >
          <v-icon>mdi-skip-previous</v-icon>
          <v-tooltip activator="parent" location="top">Página 1</v-tooltip>
        </v-btn>
        <v-btn
          class="mx-2"
          :disabled="inventory.page <= 1"
          flat
          size="small"
          icon
        >
          <v-icon>mdi-chevron-left</v-icon>
          <v-tooltip activator="parent" location="top">
            Página {{ inventory.page - 1 }}
          </v-tooltip>
        </v-btn>
        <v-btn
          class="mx-2"
          :disabled="inventory.page >= inventory.max_pages"
          flat
          size="small"
          icon
        >
          <v-icon>mdi-chevron-right</v-icon>
          <v-tooltip activator="parent" location="top">
            Página {{ inventory.page + 1 }}
          </v-tooltip>
        </v-btn>
        <v-btn
          class="mx-2"
          :disabled="inventory.page === inventory.max_pages"
          flat
          size="small"
          icon
        >
          <v-icon>mdi-skip-next</v-icon>
          <v-tooltip activator="parent" location="top">
            Avanzar a página {{ inventory.max_pages }}
          </v-tooltip>
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>
