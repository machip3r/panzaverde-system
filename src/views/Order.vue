<script setup>
import { ref } from "vue";
import { OrderHistory } from "@/components";

const lastOrder = ref({});
const lastOrderDate = ref("00/00/00");

// Database access funcitions
function getLastOrderDate() {
  const monthName = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const date = new Date(),
    day = date.getDay(),
    month = date.getMonth(),
    year = date.getFullYear();

  lastOrderDate.value =
    (day < 10 ? "0" + day : day) + "/" + monthName[month] + "/" + year;
}

function getOrders() {
  // Hacer petición axios para el inventario.
  lastOrder.value = {
    orderDate: "11/Sep/2023",
    user: "Usuario",
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
  };
}

getOrders();
getLastOrderDate();
</script>

<template>
  <h1>Pedidos</h1>

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
      <OrderHistory></OrderHistory>
    </v-col>
  </v-row>
</template>
