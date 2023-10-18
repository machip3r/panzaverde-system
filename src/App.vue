<script setup>
import { ref } from "vue";

import axios from "axios";

import { Nav } from "@/components";

import { parseTimestamp, getTotal } from "./utils/order.utils";
import { useOrderStore } from "./store/order.clipboard";

const clipboard = useOrderStore();

let dialog = ref(true);
let confirmOrder = ref(false);
let confirmDeletion = ref(false);
let confirmDeletionOrder = ref(false);
let computedTotal = ref(false);
let deleteId = ref(-1);
let p_name = ref("");

function openClipboardDialog() {
  dialog.value = true;
}

function openConfirmDialog(i) {
  confirmDeletion.value = true;
  deleteId.value = i;
  p_name.value = clipboard.order.products[i].p_name;
}

function deleteProduct(i) {
  clipboard.deleteProduct(i);
  confirmDeletion.value = false;
  deleteId.value = -1;
}

function deleteOrder() {
  clipboard.deleteOrder();
  confirmDeletionOrder.value = false;
}

function decrementProduct(i) {
  if (!clipboard.decrementProduct(i)) openConfirmDialog(i);
}

function openOrderSummary() {
  confirmOrder.value = true;

  computedTotal.value = getTotal(clipboard.order.products);
}

async function addOrder() {
  const preparedProducts = clipboard.prepareInsertion();
  await axios.post("orders/", preparedProducts);

  reset();

  clipboard.deleteOrder();
}

function reset() {
  dialog.value = false;
  confirmOrder.value = false;
  confirmDeletion.value = false;
  confirmDeletionOrder.value = false;
  computedTotal.value = false;
  deleteId.value = -1;
  p_name.value = "";
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
      @click="openClipboardDialog"
    ></v-btn>

    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Portapapeles de pedidos</v-toolbar-title>
          <v-btn v-if="!clipboard.empty()" icon dark @click="openOrderSummary">
            <v-icon>mdi-check</v-icon>
            <v-tooltip activator="parent" location="bottom">
              Confirmar la orden
            </v-tooltip>
          </v-btn>
          <v-btn
            v-if="!clipboard.empty()"
            icon
            dark
            @click="confirmDeletionOrder = true"
          >
            <v-icon>mdi-delete</v-icon>
            <v-tooltip activator="parent" location="bottom">
              Borrar portapapeles
            </v-tooltip>
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
                        <v-btn @click="decrementProduct(i)">
                          <v-icon>mdi-minus</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col>
                        <v-text-field
                          type="number"
                          placeholder="Cant."
                          :value="product.op_quantity"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col>
                        <v-btn @click="clipboard.incrementProduct(i)">
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
          ¿Seguro que desea eliminar "<i>{{ p_name }}</i
          >" de la orden?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="confirmDeletion = false">Cancelar</v-btn>
          <v-btn @click="deleteProduct(deleteId)">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="confirmDeletionOrder" persistent width="auto">
      <v-card>
        <v-card-title class="text-h5">Vaciar portapapeles</v-card-title>
        <v-card-text>
          ¿Seguro que desea eliminar la orden del portapapeles?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="confirmDeletionOrder = false">Cancelar</v-btn>
          <v-btn @click="deleteOrder()">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="confirmOrder"
      persistent
      min-width="10%"
      max-width="600px"
      max-height="500px"
    >
      <v-card>
        <v-card-item>
          <v-card-title class="text-h5">Confirmar pedido</v-card-title>
          <v-card-subtitle> Resumen del pedido: </v-card-subtitle>
        </v-card-item>
        <v-card-item>
          <v-virtual-scroll
            :items="clipboard.order.products"
            height="200px"
            max-height="500px"
          >
            <template v-slot:default="{ item }">
              <v-list-item
                :title="item.p_name"
                :subtitle="`Cantidad: ${item.op_quantity}`"
              >
                <template v-slot:append>
                  Precio: ${{ parseFloat(item.p_price).toFixed(2) }}
                </template>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </v-card-item>
        <v-card-text> Total: ${{ computedTotal.toFixed(2) }} </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="confirmOrder = false">Cancelar</v-btn>
          <v-btn @click="addOrder()">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
