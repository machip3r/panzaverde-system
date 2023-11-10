<script setup>
import { OrderHistory } from "@/components";
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
