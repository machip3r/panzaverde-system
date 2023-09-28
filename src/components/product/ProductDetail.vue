<script setup>
import { ref } from "vue";
import axios from "axios";

const props = defineProps(["product_id"]);
const product = ref([]);

async function getProduct(id) {
  product.value = (await axios.get(`/products/${id}`)).data[0];
  console.log(product.value);
}

console.log(props.product_id);
getProduct(props.product_id);
</script>

<template>
  <v-card>
    <v-card-title
      >{{ product.p_name }}
      <span class="font-weight-light"
        >(${{ product.p_price }})</span
      ></v-card-title
    >
    <v-card-subtitle></v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col>
          <p>
            <span class="font-weight-bold">Cantidad en inventario: </span>
            {{ product.p_stock }}
          </p>
        </v-col>
        <v-col>
          <p>
            <span class="font-weight-bold">Tipo de unidad: </span>
            {{ product.p_unit }}
          </p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
