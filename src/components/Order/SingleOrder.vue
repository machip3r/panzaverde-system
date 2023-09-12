<script setup>
const props = defineProps(["order"]);
console.log("sida", props.order);

// Button actions
function copyOrder() {
  console.log("Copy");
}

// General procedures
function getTotal() {
  return props.order.products.reduce(
    (accum, currVal) => accum + currVal.precio,
    0
  );
}
</script>

<template>
  <v-row align="center" justify="center">
    <v-col>
      <h2 class="mt-5">Último pedido ({{ order.orderDate }})</h2>
      <p>{{ order.user }}</p>
    </v-col>
    <v-col class="text-right">
      <!-- Find a better way to show tooltips -->
      <v-btn @click="copyOrder" density="compact" size="x-large" icon>
        <v-icon>mdi-content-copy</v-icon>
        <v-tooltip activator="parent" location="left">Copiar pedido</v-tooltip>
      </v-btn>
    </v-col>
  </v-row>

  <v-table class="mx-5" fixed-header dense>
    <thead>
      <tr>
        <th class="text-center"><b>Producto</b></th>
        <th class="text-center"><b>Cantidad</b></th>
        <th class="text-center"><b>Precio</b></th>
      </tr>
    </thead>
    <tbody class="text-center">
      <tr v-for="item in order.products" :key="item.producto">
        <td>{{ item.producto }}</td>
        <td>{{ item.cantidad }} kg</td>
        <td>{{ item.precio.toFixed(2) }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3">
          <h3 class="text-end">Total: ${{ getTotal().toFixed(2) }}</h3>
        </td>
      </tr>
    </tfoot>
  </v-table>
</template>
