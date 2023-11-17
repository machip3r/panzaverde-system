<script setup>
import { ref, watchEffect, inject, onMounted } from "vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
ChartJS.register(ArcElement, Tooltip, Legend);

import axios from "axios";

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
    title: {
      display: true,
      text: "Cantidad de cuentas por estado",
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
  <Pie
    v-if="loaded"
    id="status-accounts"
    :options="chartOptions"
    :data="chartData"
  />
</template>
