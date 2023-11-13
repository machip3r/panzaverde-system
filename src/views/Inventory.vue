<script setup>
import { ref } from "vue";

import axios from "axios";

import { ProductDetail } from "@/components";

import { getScrollHeight, fieldRules } from "@/utils/order.utils";

const productDetailDialog = ref(false);
const productDetailId = ref({ id_product: 1 });

let inventory = ref([]);
let itemsPerPage = ref(10);

async function getProducts(elementsPerPage, page) {
  inventory.value = (
    await axios.get(`products/${elementsPerPage}/${page}`)
  ).data;

  itemsPerPage.value = inventory.value.n_products;
}

function openProductDetail(id) {
  productDetailId.value = { id_product: id };
  productDetailDialog.value = true;
}

getProducts(itemsPerPage.value, 0);

function onUpdate(obj) {
  console.log(obj[0]);
  const result = axios
    .put(`/products/`, obj[0])
    .then((res) => {
      // Mostrar alerta de modificación
      productDetailDialog.value = false;

      getProducts(itemsPerPage.value, 0);
    })
    .catch((err) => {
      // Mostrar alerta de error
      console.log(
        "Error al actualizar: ",
        err.response.data.message.sqlMessage
      );
    });
}
</script>

<template>
  <v-dialog v-model="productDetailDialog" min-width="600px" max-width="30%">
    <v-row>
      <v-col>
        <ProductDetail
          :product="productDetailId"
          :readonly="false"
          :text="{
            title: 'Modificar producto',
            confirm: 'Aplicar cambios',
            cancel: 'Cancelar',
          }"
          @onCancel="productDetailDialog = false"
          @onAccept="onUpdate"
        ></ProductDetail>
      </v-col>
    </v-row>
  </v-dialog>

  <v-row>
    <v-col>
      <h2 class="mt-5">Inventario</h2>
    </v-col>
  </v-row>

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
    <v-spacer></v-spacer>
    <v-col>
      <v-btn icon>
        <v-icon>mdi-plus</v-icon>
        <v-tooltip activator="parent" location="top">Nuevo producto</v-tooltip>
      </v-btn>
    </v-col>
  </v-row>

  <v-container fluid>
    <v-row>
      <v-col><b class="text-grey-darken-1">Producto </b></v-col>
      <v-col><b class="text-grey-darken-1">Precio </b></v-col>
      <v-col><b class="text-grey-darken-1">Cantidad en Inventario</b></v-col>
    </v-row>
    <v-row>
      <v-col>
        <hr class="my-0" />
      </v-col>
    </v-row>

    <v-row v-if="inventory">
      <v-virtual-scroll
        :items="inventory.products"
        :max-height="getScrollHeight(60)"
        item-height="56px"
      >
        <template v-slot:default="{ item }">
          <v-list-item @click="openProductDetail(item.id_product)">
            <v-row align="center" justify="center">
              <v-col>{{ item.p_name }}</v-col>
              <v-col>${{ parseFloat(item.p_price).toFixed(2) }}</v-col>
              <v-col align-self="center">
                {{ item.p_stock }} {{ item.p_unit }}
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

  <v-row>
    <hr />
  </v-row>

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
          <b>{{ inventory.n_pages }}</b>
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
          :disabled="inventory.page >= inventory.n_pages - 1"
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
          :disabled="inventory.page === inventory.n_pages - 1"
          flat
          size="small"
          icon
          @click="getProducts(itemsPerPage, inventory.n_pages - 1)"
        >
          <v-icon>mdi-skip-next</v-icon>
          <v-tooltip activator="parent" location="top">
            Avanzar a página {{ inventory.n_pages }}
          </v-tooltip>
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>
