<script setup>
import { ref } from "vue";
import { useOrderStore } from "./store/order.clipboard";

import { Nav } from "@/components";

import { parseTimestamp } from "./utils/order.utils";

let dialog = ref(true);
let confirmDeletion = ref(false);
let deleteId = ref(-1);
let alert = ref({
  show: false,
  closable: true,
  icon: "mdi-alert",
  type: "warning",
  title: "title",
  text: "text",
});
const clipboard = useOrderStore();

function showAlert(closable, icon, type, title, text) {
  alert.value["show"] = true;
  alert.value["closable"] = closable;
  alert.value["icon"] = icon;
  alert.value["type"] = type;
  alert.value["title"] = title;
  alert.value["text"] = text;
}

function openDialog() {
  dialog.value = true;

  showAlert(
    true,
    "mdi-check",
    "success",
    "Copiar al portapapeles",
    "El pedido se ha copiado correctamente"
  );
}

function openConfirmDialog(i) {
  confirmDeletion.value = true;
  deleteId.value = i;
}

function confirmDeletionDialog(i) {
  console.log("i: ", i);
  console.log("Product: ", clipboard.order.products[i]);
  clipboard.deleteProduct(i);
  confirmDeletion.value = false;
}
</script>

<template>
  <v-layout>
    <Nav />
    <v-main>
      <router-view />
    </v-main>
    <v-badge v-if="!clipboard.empty()" dot>
      <v-btn
        icon="mdi-clipboard-text-outline"
        size="large"
        @click="dialog = true"
      >
      </v-btn>
    </v-badge>

    <v-btn
      v-else
      icon="mdi-clipboard-text-outline"
      size="large"
      @click="openDialog"
    ></v-btn>

    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Portapapeles de pedidos</v-toolbar-title>
          <v-btn icon dark @click="clipboard.deleteOrder">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-item v-if="!clipboard.empty()">
          <div>
            <h1>
              Copia de pedido #{{ clipboard.order.id_order }} del
              {{ parseTimestamp(clipboard.order.o_date) }}
            </h1>

            <v-row>
              <v-col v-for="(product, i) in clipboard.order.products" :key="i">
                <v-card
                  class="mx-auto fill-height"
                  width="350px"
                  variant="outlined"
                >
                  <v-card-item>
                    <v-row>
                      <v-col>
                        <h2>{{ product.p_name }}</h2>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col>
                        <v-btn icon @click="openConfirmDialog(i)">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <p>
                          Precio: ${{ parseFloat(product.p_price).toFixed(2) }}
                        </p>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <p>Cantidad:</p>
                      </v-col>
                    </v-row>
                    <v-row align-content="end">
                      <v-col>
                        <v-btn>
                          <v-icon>mdi-minus</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col>
                        <v-text-field
                          type="number"
                          :value="product.op_quantity"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col>
                        <v-btn>
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-card-item>

        <v-card-text v-else>
          <h1>¡El portapapeles está vacío!</h1>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="confirmDeletion" persistent width="auto">
      <v-card>
        <v-card-title class="text-h5">Eliminar producto</v-card-title>
        <v-card-text>
          ¿Seguro que desea eliminar AQUI MERO"<i>{{
            clipboard.order.products[deleteId].p_name
          }}</i
          >" de la orden?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="confirmDeletion = false">Cancelar</v-btn>
          <v-btn @click="confirmDeletionDialog(deleteId)">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-alert
      v-if="alert.show"
      :icon="alert.icon"
      :type="alert.type"
      :title="alert.title"
      :text="alert.text"
    >
    </v-alert>
  </v-layout>
</template>

<style lang="css">
/* @import "./assets/main.css"; */
input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
