<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const props = defineProps({
  idClient: Number,
})

const loaded = ref(false);
const client = ref({});
const c_status = ref("Activa");

onMounted(getUserInfo);

async function getUserInfo() {
  const data = (await axios.get(`/meal/client`)).data

  for (let item of data)
    if (item.id_client == props.idClient)
      client.value = item;

  if (client.value.c_status === "i") c_status.value = "Inactiva";
  else if (client.value.c_status === "a") c_status.value = "Activa";
  else if (client.value.c_status === "o") c_status.value = "Pendiente";

  loaded.value = true;
}
</script>

<template>
  <v-card v-if="loaded" width="400">
    <v-card-item>
      <v-card-title>Información del cliente {{idClient}}</v-card-title>
      <v-card-subtitle>{{client.c_name}}</v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <p>Dirección: {{client.c_address}}</p>
      <p>Teléfono: {{client.c_address}}</p>
      <p>Estado de la cuenta: {{c_status}}</p>
      <p>Red Social: {{client.sn_name}}</p>
    </v-card-text>
  </v-card>
</template>
