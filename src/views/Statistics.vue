<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import {
  AccountStatus,
  ClientInfo,
  SocialNetworksSales,
  YearlySales,
  MonthlySales,
  DailySales,
} from "../components";

const accountsData = ref([]);
const ordersData = ref([]);

const clientsNumber = ref(0);
const activeAccounts = ref(0);
const todayOrders = ref(0);
const weeklyIncomes = ref(0);

const items = ref([
  { title: "Click Me" },
  { title: "Click Me" },
  { title: "Click Me" },
  { title: "Click Me 2" },
]);
const graphView = ref("today");

const years = ref([]);
fillYears();

const monthlySalesYear = ref(new Date().getFullYear());
const dailySalesDate = ref(new Date());

async function fillYears() {
  const data = (await axios.get("/statistics/sales/yearly")).data;
  for (let i = new Date().getFullYear(); i >= data[0].o_year; i--)
    years.value.push(i);
}

onMounted(async () => {
  const today = Date.now();
  accountsData.value = (
    await axios.get("/statistics/clients/status-accounts")
  ).data;
  // ordersData.value = (
  //   await axios.get(
  //     `/orders/date/${today.getFullYear()}-${today.getMonth()}-${today.getDay()}`,
  //   )
  // ).data;
  console.log(ordersData.value);

  clientsNumber.value = accountsData.value.reduce(
    (previous, current) => previous + current.c_clients,
    0,
  );
  activeAccounts.value = accountsData.value[0].c_clients;
});
</script>

<template>
  {{ ordersData }}
  <v-row cols="4">
    <v-col>
      <v-card>
        <template #title>
          <div style="border-left: 5px solid #1565c0" class="pl-5 py-2">
            <p class="text-h6 text-blue-grey-darken-1">Clientes</p>
            <span class="text-h4 text-blue-grey-darken-3">{{
              clientsNumber
            }}</span>
          </div>
        </template>
        <template #append>
          <v-icon
            icon="mdi-account-group"
            size="x-large"
            color="primary"
          ></v-icon>
        </template>
        <!--<v-card-text>+6.5% que la semana pasada</v-card-text>-->
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <template #title>
          <div style="border-left: 5px solid #1565c0" class="pl-5 py-2">
            <p class="text-h6 text-blue-grey-darken-1">Cuentas activas</p>
            <span class="text-h4 text-blue-grey-darken-3">{{
              activeAccounts
            }}</span>
          </div>
        </template>
        <template #append>
          <v-icon
            icon="mdi-account-multiple-check"
            size="x-large"
            color="primary"
          ></v-icon>
        </template>
        <!--<v-card-text>+6.5% que la semana pasada</v-card-text>-->
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <template #title>
          <div style="border-left: 5px solid #1565c0" class="pl-5 py-2">
            <p class="text-h6 text-blue-grey-darken-1">Ordenes de hoy</p>
            <span class="text-h4 text-blue-grey-darken-3">{{
              todayOrders
            }}</span>
          </div>
        </template>
        <template #append>
          <v-icon icon="mdi-food" size="x-large" color="primary"></v-icon>
        </template>
        <!--<v-card-text>+6.5% que la semana pasada</v-card-text>-->
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <template #title>
          <div style="border-left: 5px solid #1565c0" class="pl-5 py-2">
            <p class="text-h6 text-blue-grey-darken-1">Ingresos de la semana</p>
            <span class="text-h4 text-blue-grey-darken-3"
              >${{ weeklyIncomes }}</span
            >
          </div>
        </template>
        <template #append>
          <v-icon icon="mdi-cash" size="x-large" color="primary"></v-icon>
        </template>
        <!--<v-card-text>+6.5% que la semana pasada</v-card-text>-->
      </v-card>
    </v-col>
  </v-row>
  <!--
  <v-row>
    <v-col cols="9" class="mb-10">
      <v-card>
        <v-card-title>
          <v-toolbar class="bg-white">
            <v-toolbar-title class="text-h6"> Ventas </v-toolbar-title>
            <template #append>
              <v-btn icon="mdi-dots-horizontal">
                <v-menu activator="parent">
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in items"
                      :key="index"
                      :value="index"
                    >
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </template>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <DailySales v-if="graphView === 'weekly'" :date="dailySalesDate" />
          <MonthlySales
            v-else-if="graphView === 'monthly'"
            :year="monthlySalesYear"
          />
          <YearlySales v-else-if="graphView === 'yearly'" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
-->
  <v-row class="mt-10" no-gutters justify="space-around">
    <v-col cols="4">
      <AccountStatus />
    </v-col>
    <v-col cols="6">
      <ClientInfo id-client="5" />
      <SocialNetworksSales start-date="2021-01-01" end-date="2023-03-03" />
    </v-col>
  </v-row>
  <v-row justify="space-around">
    <v-col cols="6">
      <v-card>
        <v-card-item>
          <v-card-title class="text-center">Ventas anuales</v-card-title>
        </v-card-item>
        <v-card-text>
          <YearlySales />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card>
        <v-card-item>
          <v-card-title class="text-center"
            >Ventas mensuales - {{ monthlySalesYear }}</v-card-title
          >
        </v-card-item>

        <v-card-text>
          <MonthlySales :year="monthlySalesYear" />
        </v-card-text>

        <v-card-actions>
          <v-select
            v-model="monthlySalesYear"
            label="Año"
            :items="years"
          ></v-select>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="10">
      <v-card>
        <v-card-item>
          <v-card-title class="text-center">Ventas semanales</v-card-title>
        </v-card-item>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-container>
                <v-row justify="space-around">
                  <v-date-picker v-model="dailySalesDate"></v-date-picker>
                </v-row>
              </v-container>
            </v-col>
            <v-col cols="8">
              <DailySales :date="dailySalesDate" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
