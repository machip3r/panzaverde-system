<script setup>
import { ref } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
);

const loading = ref(true);
const key = ref(0);
const total = ref(0);

const sales = ref({
  labels: [],
  datasets: [
    {
      data: [],
      label: "Total anual",
      borderColor: "#1E88E5",
      backgroundColor: "#E3F2FD",
      pointStyle: "circle",
      pointRadius: 6,
      pointHoverRadius: 8,
    },
  ],
});

const options = ref({
  responsive: true,

  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
  },
});

const getDailySales = async () => {
  total.value = 0;
  const data = (await axios.get("/statistics/sales/yearly")).data;

  for (let year = data[0].o_year; year <= new Date().getFullYear(); year++) {
    sales.value.labels.push(year);
  }

  let idx = 0;
  for (const year of sales.value.labels) {
    if (year == data[idx].o_year) {
      total.value += parseFloat(data[idx].o_total);
      sales.value.datasets[0].data.push(parseFloat(data[idx].o_total));
      idx++;
    } else {
      sales.value.datasets[0].data.push(0);
    }
  }

  loading.value = false;
  key.value++;

  total.value = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(total.value);
};

getDailySales();
</script>

<template>
  <v-skeleton-loader v-if="loading" type="card"></v-skeleton-loader>
  <div v-else>
    <p class="text-center">Ventas totales: {{ total }}</p>
    <Line :key="key" :data="sales" :options="options" />
  </div>
</template>
