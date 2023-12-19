<script setup>
import { ref, computed, watch } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import axios from "axios";

const props = defineProps({
  year: {
    type: [Number, String],
    default: new Date().getYear(),
  },
});

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
);

const loading = ref(true);
const key = ref(0);
const total = ref(0);
const year = computed(() => props.year);
const sales = ref({
  labels: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  datasets: [
    {
      label: "Total vendido:",
      borderColor: "#1E88E5",
      backgroundColor: "#E3F2FD",
      pointStyle: "circle",
      pointRadius: 6,
      pointHoverRadius: 8,
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

const getMonthlySales = async () => {
  total.value = 0;
  const data = (await axios.get(`/statistics/sales/monthly/${year.value}`))
    .data;

  for (const item of data) {
    total.value += parseFloat(item.o_total);
    sales.value.datasets[0].data[item.o_month - 1] = parseFloat(item.o_total);
  }

  loading.value = false;
  key.value++;

  total.value = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(total.value);
};

watch(year, () => {
  sales.value.datasets[0].data.fill(0);
  getMonthlySales();
});

getMonthlySales();
</script>

<template>
  <v-skeleton-loader v-if="loading" type="card"></v-skeleton-loader>
  <div v-else>
    <p class="text-center">Total anual: {{ total }}</p>
    <Line :key="key" :data="sales" :options="options" />
  </div>
</template>
