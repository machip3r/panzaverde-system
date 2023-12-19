<script setup>
import { ref, computed, watch } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import axios from "axios";

const props = defineProps({
  date: {
    type: Date,
    default: new Date(),
  },
});

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

const loading = ref(true);
const key = ref(0);
const total = ref(0);
const date = computed(() => {
  const tmpDate = new Date(props.date);
  return tmpDate.toISOString().substr(0, 10);
});
const sales = ref({
  labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
  datasets: [
    {
      label: "Total diario",
      backgroundColor: "#f87979",
      data: [0, 0, 0, 0, 0],
    },
  ],
});

const options = ref({
  responsive: true,
});

const getDailySales = async () => {
  total.value = 0;
  const data = (await axios.get(`/statistics/sales/daily/${date.value}`)).data;

  for (const item of data) {
    total.value += parseFloat(item.o_total);
    sales.value.datasets[0].data[item.id_day - 1] = parseFloat(item.o_total);
  }

  loading.value = false;
  key.value++;

  total.value = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(total.value);
};

watch(date, () => {
  sales.value.datasets[0].data.fill(0);
  getDailySales();
});

getDailySales();
</script>

<template>
  <v-skeleton-loader v-if="loading" type="card"></v-skeleton-loader>
  <div v-else>
    <p class="text-center">Total semanal: {{ total }}</p>
    <Bar :key="key" :data="sales" :options="options" />
  </div>
</template>
