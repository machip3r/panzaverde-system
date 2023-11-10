<!-- TODO: Enable DatePicker on input -->
<!-- TODO: Toggle default selection on first element of item list -->
<!-- TODO: Maybe put everything inside a virtual scroll idk -->
<script setup>
import { ref } from "vue";

import axios from "axios";

import { VDatePicker } from "vuetify/labs/VDatePicker";
import { VMenu } from "vuetify/lib/components/index.mjs";
import { OrderDetail } from "@/components";

import { parseTimestamp } from "@/utils/order.utils";

// State variables
const orders = ref([]);
let selectedOrder = ref({});
let date = ref(undefined);
const menu = ref(true);

// Normal variables
const orderStatusDetail = {
  a: {
    color: "green",
    textColor: "white",
    text: "Activa",
    icon: "mdi-check",
  },
  o: {
    color: "orange",
    textColor: "white",
    text: "Pendiente",
    icon: "mdi-store-clock",
  },
  i: {
    color: "red",
    textColor: "white",
    text: "Inactiva",
    icon: "mdi-close",
  },
};

// General procedures
// API fetching
async function getOrders() {
  let response = await axios.get("orders/");
  response = response.data.orders;
  orders.value = [...response];

  if (orders.value.length > 0) getOrderDetails(orders.value[0].id_order);

  console.log("getOrders executed");
}

async function getOrderDetails(id) {
  Object.assign(
    selectedOrder.value,
    (await axios.get(`orders/id/${id}/detail`)).data
  );
}

getOrders();
</script>

<template>
  <v-row v-if="orders.length > 1">
    <v-col>
      <v-row>
        <v-col>
          <h2 class="mt-5">Historial de pedidos</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-menu>
            <template v-slot:activator="{}">
              <v-text-field
                v-model="date"
                label="Selecciona una fecha"
                prepend-icon="mdi-calendar"
                readonly
              >
              </v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable> </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-virtual-scroll :items="orders" height="65%" item-height="50px">
            <template v-slot:default="{ item }">
              <v-list-item @click="getOrderDetails(item.id_order)">
                <template v-slot:append>
                  <v-chip
                    class="ma-2"
                    :color="orderStatusDetail[item.o_status].color"
                    :text-color="orderStatusDetail[item.o_status].textColor"
                    :prepend-icon="orderStatusDetail[item.o_status].icon"
                  >
                    {{ orderStatusDetail[item.o_status].text }}
                  </v-chip>
                </template>
                <v-list-item-title>
                  {{ parseTimestamp(item.o_date) }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  Orden por {{ item.user }}
                </v-list-item-subtitle>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="6">
      <OrderDetail :order="selectedOrder"></OrderDetail>
    </v-col>
  </v-row>
  <v-row v-else>
    <h1>¡No hay registro de ordenes!</h1>
  </v-row>
</template>
