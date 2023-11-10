<script setup>
import { ref } from "vue";

const props = defineProps(["product"]);
</script>

<template>
  <v-card class="mx-auto fill-height" width="350px" variant="outlined">
    <v-card-item>
      <v-row>
        <v-col>
          <h2>{{ props.product.p_name }}</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
        <v-col></v-col>
        <v-col></v-col>
      </v-row>
    </v-card-item>
  </v-card>
</template>
