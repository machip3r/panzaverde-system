<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const props = defineProps({
  startDate: String,
  endDate: String,
});

const startDate = ref(props.startDate);
const endDate = ref(props.endDate);

const loaded = ref(false);
const socialNetworks = ref({});

onMounted(getSalesInfo);

async function getSalesInfo() {
  const data = (
    await axios.get(
      `/statistics/sales/socialNetwork/${startDate.value}/${endDate.value}`,
    )
  ).data;

  socialNetworks.value = data;
  loaded.value = true;
}
</script>

<template>
  <v-card v-if="loaded">
    <v-card-item>
      <v-card-title>Ventas por red social</v-card-title>
    </v-card-item>

    <v-card-text>
      <p v-for="item in socialNetworks" :key="item.sn_name">
        {{ item.sn_name }}: ${{ item.s_total }}
      </p>
    </v-card-text>
  </v-card>
</template>
