<script setup>
import { ref } from "vue";

import { SingleOrder } from "@/components";

const orders = ref([]);
let lastOrder = ref({});

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
  console.log(`Last order ${lastOrder.value}`);
}

getOrders();
</script>

<template>
  <v-row>
    <v-col cols="6">
      <h2 class="mt-5">Historial de pedidos</h2>
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
    <v-col cols="6">
      <SingleOrder :order="lastOrder"></SingleOrder>
    </v-col>
  </v-row>
</template>
