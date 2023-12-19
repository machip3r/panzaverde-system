<script setup>
import { ref, onMounted } from "vue";
import { Chart as ChartJS, ArcElement, Tooltip, Title, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Title, Legend);
const loaded = ref(false);
const apiData = [];

const chartData = ref({
  labels: ["Cuentas activas", "Cuentas inactivas", "Cuentas pendientes"],
  datasets: [
    {
      data: [40, 20, 12],
      backgroundColor: ["green", "red", "orange"],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
});

onMounted(async () => {
  apiData.value = (await axios.get("/statistics/clients/status-accounts")).data;
  chartData.value.datasets[0].data = apiData.value.map(
    (item) => item.c_clients,
  );
  loaded.value = true;
});
</script>

<template>
  <v-card v-if="loaded">
    <v-card-title class="text-center">Estado de las cuentas</v-card-title>
    <v-card-text>
      <Pie
        v-if="loaded"
        id="status-accounts"
        :options="chartOptions"
        :data="chartData"
      />
    </v-card-text>
  </v-card>
</template>
