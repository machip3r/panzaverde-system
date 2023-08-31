<script setup>
 import { ref } from 'vue'
 const inventory = ref([])
 function getInventory() {
     // Hacer petición axios para el inventario.
     inventory.value.push(
         {
             producto: 'Frozen Yogurt',
             precio: 200,
             stock: '5 KG',
             opciones: 'Nada papi',
         }
     )
 }

 getInventory()

</script>

<template>
    <h2 class="mt-5">Inventario</h2>

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

    <v-table
        class="mx-5"
        fixed-header
        dense
    >
        <thead>
            <tr>
                <th class="text-center">Producto</th>
                <th class="text-center">Precio</th>
                <th class="text-center">Stock</th>
                <th class="text-center">Opciones</th>
            </tr>
        </thead>
        <tbody class="text-center">
            <tr
                v-for="item in inventory"
                :key="item.producto"
            >
                <td>{{ item.producto }}</td>
                <td>{{ item.precio }}</td>
                <td>{{ item.stock }}</td>
                <td>{{ item.opciones }}</td>
            </tr>
        </tbody>
    </v-table>

</template>
