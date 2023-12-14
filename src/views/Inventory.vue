<script setup>
import { ref } from "vue";

import axios from "axios";

import { ProductDetail } from "@/components";

import { getScrollHeight, fieldRules } from "@/utils/order.utils";

const productDetailDialog = ref(false);
const createProductDialog = ref(false);
const productDetailId = ref({ id_product: 1 });

const showAlert = ref(false);
const alertInfo = ref({
  color: "warning",
  icon: "$info",
  title: "Placeholder title",
  text: "Placeholder text",
});

let inventory = ref([]);
let itemsPerPage = ref(10);

function openProductDetail(id) {
  productDetailId.value = { id_product: id };
  productDetailDialog.value = true;
}

function showAlertTimeout(color, icon, title, text) {
  alertInfo.value = {
    color: color,
    icon: icon,
    title: title,
    text: text,
  };
  showAlert.value = true;

  setTimeout(() => {
    showAlert.value = false;
  }, 2000);
}

async function getProducts(elementsPerPage, page) {
  inventory.value = (
    await axios.get(`products/${elementsPerPage}/${page}`)
  ).data;

  console.log(inventory);

  itemsPerPage.value = inventory.value.total_products;
}

function updateProduct(obj) {
  axios
    .put(`/products/`, obj[0])
    .then((res) => {
      // Mostrar alerta de modificación
      productDetailDialog.value = false;

      getProducts(itemsPerPage.value, inventory.value.page);
      showAlertTimeout(
        "success",
        "$success",
        "Producto actualizado",
        "El producto se ha actualizado correctamente"
      );
    })
    .catch((err) => {
      // Mostrar alerta de error
      console.log(
        "Error al actualizar: ",
        err.response.data.message.sqlMessage
      );
    });
}

function createProduct(obj) {
  axios
    .post(`/products/`, obj[0])
    .then((res) => {
      createProductDialog.value = false;

      getProducts(itemsPerPage.value, inventory.value.page);
      showAlertTimeout(
        "success",
        "$success",
        "Producto añadido",
        "El producto se ha creado correctamente"
      );
    })
    .catch((err) => {
      const msg = err.response.data.message.sqlMessage;
      // Mostrar alerta de error
      console.log("Error al crear producto: ", msg);
      showAlertTimeout(
        "error",
        "$error",
        "Error al crear producto",
        `Ha habido un error al crear el producto: ${msg}`
      );
    });
}

getProducts(itemsPerPage.value, 0);

console.log(inventory);
</script>

<template>
  <v-slide-y-transition>
    <v-alert
      :model-value="showAlert"
      :color="alertInfo.color"
      :icon="alertInfo.icon"
      :title="alertInfo.title"
      :text="alertInfo.text"
      transition="slide-y-transition"
      density="compact"
    >
    </v-alert>
  </v-slide-y-transition>

  <v-dialog v-model="createProductDialog" min-width="600px" max-width="30%">
    <ProductDetail
      mode="create"
      :text="{
        title: 'Añadir un nuevo producto',
        confirm: 'Añadir',
        cancel: 'Cancelar',
      }"
      @onCancel="createProductDialog = false"
      @onAccept="createProduct"
    ></ProductDetail>
  </v-dialog>

  <v-dialog v-model="productDetailDialog" min-width="600px" max-width="30%">
    <ProductDetail
      :product="productDetailId"
      mode="update"
      :text="{
        title: 'Modificar un producto',
        confirm: 'Confirmar',
        cancel: 'Cancelar',
      }"
      @onCancel="productDetailDialog = false"
      @onAccept="updateProduct"
    ></ProductDetail>
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
      <v-btn @click="createProductDialog = true" icon>
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
        :max-height="getScrollHeight(52)"
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

<style scoped>
.v-alert {
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
}
</style>
