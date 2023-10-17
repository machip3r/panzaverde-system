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
  orders.value = [...(await axios.get("orders/")).data];

  console.log("[OrderHistory - orders.value]: ", orders.value);
  getOrderDetails(orders.value[0].id_order);
  console.log("[OrderHistory selectedOrder.value]: ", orders.value);
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
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <h2 class="mt-5">Historial de pedidos</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-menu>
            <template v-slot:activator="{ props }">
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
          <v-list density="compact">
            <v-list-item
              v-for="(order, i) in orders"
              :key="i"
              :value="order"
              @click="getOrderDetails(order.id_order)"
              color="primary"
            >
              <template v-slot:append>
                <v-chip
                  class="ma-2"
                  :color="orderStatusDetail[order.o_status].color"
                  :text-color="orderStatusDetail[order.o_status].textColor"
                  :prepend-icon="orderStatusDetail[order.o_status].icon"
                >
                  {{ orderStatusDetail[order.o_status].text }}
                </v-chip>
              </template>
              <v-list-item-title>
                {{ parseTimestamp(order.o_date) }}
              </v-list-item-title>
              <v-list-item-subtitle>
                Orden por {{ order.user }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="6">
      <OrderDetail :order="selectedOrder"></OrderDetail>
    </v-col>
  </v-row>
</template>
