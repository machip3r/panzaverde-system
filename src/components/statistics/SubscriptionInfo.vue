<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const props = defineProps({
  startDate: String,
  endDate: String,
})

const startDate = ref(props.startDate);
const endDate = ref(props.endDate);

const loaded = ref(false);
const socialNetworks = ref({});

onMounted(getSalesInfo);

async function getSalesInfo() {
  const data = (await axios.get(`/statistics/sales/socialNetwork/${startDate}/${endDate}`)).data

  socialNetworks.value = data;
  loaded.value = true;
}
</script>

<template>
  <v-card v-if="loaded" width="400">
    <v-card-item>
      <v-card-title>Ventas por red social</v-card-title>
    </v-card-item>

    <v-card-text>
      <p v-for="item in socialNetworks">
      {{item.sn_name}}: ${{item.s_total}}
      </p>
    </v-card-text>
  </v-card>
</template>
