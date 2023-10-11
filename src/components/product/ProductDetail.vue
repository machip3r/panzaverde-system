<!-- TODO: Solucionar ese pedo de que no se descargan bien los datos, ni se -->
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// State variables
const props = defineProps(["product"]);
const product = ref({});

// Normal variables

// General procedures
async function getProduct(id) {
  product.value = (await axios.get(`/products/${id}`)).data[0];
  console.log(product.value);
}

console.log("Hola");
onMounted(() => {
  console.log("ProductDetail montado");
  setTimeout(() => {
    console.log("holap");
    getProduct(props.product.id_product);
  }, 1000);
});
</script>

<template>
  <v-card>
    <v-card-title>
      {{ product.p_name }}
      <span class="font-weight-light"> (${{ product.p_price }}) </span>
    </v-card-title>
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
