<script setup>
import { ref } from "vue";

import axios from "axios";

import { VDatePicker } from "vuetify/labs/VDatePicker";
import { OrderDetail } from "@/components";

const orders = ref([]);
let lastOrder = ref({});

let date = ref(
  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10)
);

console.log(`Date: ${date.value}`);
const menu = ref(true);

function selectedOrder(order) {
  lastOrder.value = order;
}

function getOrders() {
  orders.value = [
    {
      orderDate: "11/Sep/2023",
      user: "Usuario 1",
      products: [
        {
          producto: "Almendra",
          cantidad: 1,
          precio: 20,
        },
        {
          producto: "Nuez",
          cantidad: 3,
          precio: 90,
        },
      ],
    },
    {
      orderDate: "11/Sep/2023",
      user: "Usuario 2",
      products: [
        {
          producto: "Almendra",
          cantidad: 1,
          precio: 20,
        },
        {
          producto: "Nuez",
          cantidad: 3,
          precio: 90,
        },
      ],
    },
    {
      orderDate: "11/Sep/2023",
      user: "Usuario 3",
      products: [
        {
          producto: "Almendra",
          cantidad: 1,
          precio: 20,
        },
        {
          producto: "Nuez",
          cantidad: 3,
          precio: 90,
        },
      ],
    },
    {
      orderDate: "11/Sep/2023",
      user: "Usuario 4",
      products: [
        {
          producto: "Almendra",
          cantidad: 1,
          precio: 20,
        },
        {
          producto: "Nuez",
          cantidad: 3,
          precio: 90,
        },
      ],
    },
    {
      orderDate: "11/Sep/2023",
      user: "Usuario 5",
      products: [
        {
          producto: "Almendra",
          cantidad: 1,
          precio: 20,
        },
        {
          producto: "Nuez",
          cantidad: 3,
          precio: 90,
        },
      ],
    },
    {
      orderDate: "11/Sep/2023",
      user: "Usuario 6",
      products: [
        {
          producto: "Almendra",
          cantidad: 1,
          precio: 20,
        },
        {
          producto: "Nuez",
          cantidad: 3,
          precio: 90,
        },
      ],
    },
    {
      orderDate: "11/Sep/2023",
      user: "Usuario 7",
      products: [
        {
          producto: "Almendra",
          cantidad: 1,
          precio: 20,
        },
        {
          producto: "Nuez",
          cantidad: 3,
          precio: 90,
        },
      ],
    },
    {
      orderDate: "11/Sep/2023",
      user: "Usuario 8",
      products: [
        {
          producto: "Almendra",
          cantidad: 1,
          precio: 20,
        },
        {
          producto: "Nuez",
          cantidad: 3,
          precio: 90,
        },
      ],
    },
    {
      orderDate: "11/Sep/2023",
      user: "Usuario 9",
      products: [
        {
          producto: "Almendra",
          cantidad: 1,
          precio: 20,
        },
        {
          producto: "Nuez",
          cantidad: 3,
          precio: 90,
        },
      ],
    },
    {
      orderDate: "11/Sep/2023",
      user: "Usuario 10",
      products: [
        {
          producto: "Almendra",
          cantidad: 1,
          precio: 20,
        },
        {
          producto: "Nuez",
          cantidad: 3,
          precio: 90,
        },
      ],
    },
  ];

  lastOrder.value = orders.value[0];
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
          <!-- <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Selecciona una fecha"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn txt color="primary" @click="menu = false">Cancelar</v-btn>
              <v-btn txt color="primary" @click="$refs.menu.save(date)"
                >Aceptar</v-btn
              >
            </v-date-picker>
          </v-menu> -->
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-list density="compact">
            <v-list-item
              v-for="(order, i) in orders"
              :key="i"
              :value="order"
              @click="selectedOrder(order)"
              color="primary"
            >
              <template>
                <v-icon>mdi-test</v-icon>
              </template>
              <v-list-item-title>{{ order.orderDate }}</v-list-item-title>
              <v-list-item-subtitle
                >Orden por {{ order.user }}</v-list-item-subtitle
              >
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="6">
      <OrderDetail :order="lastOrder"></OrderDetail>
    </v-col>
  </v-row>
</template>
