<script setup>
import { ref } from "vue";

import { getScrollHeight, fieldRules } from "@/utils/order.utils";

const headers = ref([
  {
    title: "Producto",
    key: "p_name",
    prefix: "$",
    postfix: "",
  },
  {
    title: "Precio",
    key: "p_price",
    prefix: "1",
    postfix: "22",
  },
  {
    title: "Cantidad en Inventario",
    key: "p_stock",
    prefix: "1",
    postfix: "22",
  },
]);
const inventory = ref({
  total_pages: 1,
  page: 1,
  products: [
    {
      p_name: "prod1",
      p_price: 123,
      p_stock: 2,
    },
    {
      p_name: "prod1",
      p_price: 123,
      p_stock: 2,
    },
    {
      p_name: "prod1",
      p_price: 123,
      p_stock: 2,
    },
    {
      p_name: "prod1",
      p_price: 123,
      p_stock: 2,
    },
    {
      p_name: "prod1",
      p_price: 123,
      p_stock: 2,
    },
  ],
});

const itemsPerPage = ref(0);
</script>

<template>
  <v-container fluid>
    <!-- Table Header -->
    <v-row>
      <v-col v-for="(item, i) in headers" :key="i">
        <b class="text-grey-darken-1">{{ item.title }}</b>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <hr class="my-0" />
      </v-col>
    </v-row>

    <!-- Table body -->
    <v-row v-if="inventory">
      <v-virtual-scroll
        :items="inventory.products"
        :max-height="getScrollHeight(52)"
        item-height="56px"
      >
        <template v-slot:default="{ item }">
          <v-list-item @click="console.log('abierto')">
            <v-row align="center" justify="center">
              <v-col v-for="(test, i) in headers" :key="i">
                {{ test.prefix }}{{ item[test.key] }}{{ test.postfix }}
              </v-col>
            </v-row>
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-row>

    <v-row v-else align-content="center" justify="center">
      <v-col cols="12" class="text-center justify-center">
        <h1 class="mt-10 mb-5">¡No hay productos registrados!</h1>
        <v-btn class="mb-10 mt-5" color="green">Agregar un producto</v-btn>
      </v-col>
    </v-row>
  </v-container>

  <!-- Pager -->
  <v-row align="center" justify="center">
    <v-col class="px-10 d-flex align-center justify-center">
      <p>Elementos por página:</p>
      <v-text-field
        single-line
        flat
        shrink
        class="mx-10 my-5 shink"
        density="compact"
        variant="outlined"
        placeholder="Elementos por página"
        bg-color="grey-lighten-3"
        type="number"
        :rules="[fieldRules.required, fieldRules.boundCheck]"
        v-model="itemsPerPage"
        @keyup.enter="
          fieldRules.boundCheck(itemsPerPage) === true
            ? getProducts(itemsPerPage, 0)
            : (itemsPerPage = 1)
        "
      ></v-text-field>

      <div class="d-flex">
        <p>Página</p>
        <p class="mx-2">
          <b>{{ inventory.page + 1 }}</b>
        </p>
        <p>de</p>
        <p class="mx-2">
          <b>{{ inventory.total_pages }}</b>
        </p>
      </div>

      <div class="ml-5">
        <v-btn
          class="mx-2"
          :disabled="inventory.page < 1"
          flat
          size="small"
          icon
          @click="getProducts(itemsPerPage, 0)"
        >
          <v-icon>mdi-skip-previous</v-icon>
          <v-tooltip activator="parent" location="top">Página 1</v-tooltip>
        </v-btn>
        <v-btn
          class="mx-2"
          :disabled="inventory.page < 1"
          flat
          size="small"
          icon
          @click="getProducts(itemsPerPage, inventory.page - 1)"
        >
          <v-icon>mdi-chevron-left</v-icon>
          <v-tooltip activator="parent" location="top">
            Página {{ inventory.page }}
          </v-tooltip>
        </v-btn>
        <v-btn
          class="mx-2"
          :disabled="inventory.page >= inventory.total_pages - 1"
          flat
          size="small"
          icon
          @click="getProducts(itemsPerPage, inventory.page + 1)"
        >
          <v-icon>mdi-chevron-right</v-icon>
          <v-tooltip activator="parent" location="top">
            Página {{ inventory.page + 2 }}
          </v-tooltip>
        </v-btn>
        <v-btn
          class="mx-2"
          :disabled="inventory.page === inventory.total_pages - 1"
          flat
          size="small"
          icon
          @click="getProducts(itemsPerPage, inventory.total_pages - 1)"
        >
          <v-icon>mdi-skip-next</v-icon>
          <v-tooltip activator="parent" location="top">
            Avanzar a página {{ inventory.total_pages }}
          </v-tooltip>
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>
