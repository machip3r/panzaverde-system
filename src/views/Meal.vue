<script setup>
import { VDataTable } from "vuetify/labs/VDataTable";

import { AddClientDialogContent, AddRouteDialogContent, AddSubscriptionDialogContent, AddPlanDialogContent } from "../components";
</script>

<template>
  <h1>Comidas</h1>
  <v-btn @click="openAddClientDialog">Agregar Cliente</v-btn>
  <v-btn @click="openAddRouteDialog">Agregar Ruta</v-btn>
  <v-btn @click="openAddSubscriptionDialog">Agregar Suscripción</v-btn>
  <v-btn @click="openAddPlanDialog">Agregar Plan</v-btn>

  <v-card>
    <v-card-title>
      <v-text-field v-model="searchMeals" label="Buscar comidas" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headersMeals" :items="meals" :search="searchMeals"></v-data-table>
  </v-card>
  <v-card>
    <v-card-title>
      <v-text-field v-model="searchClients" label="Buscar clientes" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headersClients" :items="clients" :search="searchClients"></v-data-table>
  </v-card>
  <v-card>
    <v-data-table :headers="headersRoutes" :items="routes"></v-data-table>
  </v-card>
  <v-card>
    <v-card-title>
      <v-text-field v-model="searchSubscriptions" label="Buscar suscripciones" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headersSubscriptions" :items="subscriptions" :search="searchSubscriptions"></v-data-table>
  </v-card>
  <!-- <v-card>
    <v-card-title>
      <v-text-field v-model="searchPlans" label="Buscar planes" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headersPlans" :items="plans" :search="searchPlans"></v-data-table>
  </v-card> -->
  <!-- <v-card>
    <v-card-title>
      <v-text-field v-model="searchRoutes" label="Buscar rutas" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headersRoutes" :items="routes" :search="searchRoutes"></v-data-table>
  </v-card> -->

  <v-dialog transition="dialog-bottom-transition" width="400px" v-model="addClientDialog">
    <AddClientDialogContent :closeFunction="closeAddClientDialog" />
  </v-dialog>
  <v-dialog transition="dialog-bottom-transition" width="400px" v-model="addRouteDialog">
    <AddRouteDialogContent :closeFunction="closeAddRouteDialog" />
  </v-dialog>
  <v-dialog transition="dialog-bottom-transition" width="400px" v-model="addSubscriptionDialog">
    <AddSubscriptionDialogContent :closeFunction="closeAddSubscriptionDialog" />
  </v-dialog>
  <v-dialog transition="dialog-bottom-transition" width="400px" v-model="addPlanDialog">
    <AddPlanDialogContent :closeFunction="closeAddPlanDialog" />
  </v-dialog>
</template>

<script>
export default {
  name: "Meal",

  components: {
    AddClientDialogContent,
    AddRouteDialogContent,
    AddSubscriptionDialogContent,
    AddPlanDialogContent,
  },

  data: () => ({
    addClientDialog: false,
    addRouteDialog: false,
    addSubscriptionDialog: false,
    addPlanDialog: false,

    searchMeals: "",
    searchClients: "",
    searchSubscriptions: "",

    headersMeals: [
      {
        align: "start",
        key: "c_name",
        sortable: false,
        title: "Cliente",
      },
      { key: "c_phone", title: "Teléfono" },
      { key: "sn_name", title: "Red Social" },
      { key: "s_status", title: "Estado" },
      { key: "s_specification", title: "Especificaciones" },
      { key: "s_start_date", title: "Fecha Inicio" },
      { key: "s_final_date", title: "Fecha Final" },
      { key: "s_payment_date", title: "Fecha Pago" },
      { key: "s_payment_type", title: "Tipo de Pago" },

      { key: "lunesdesayunonormal", title: "LDN" },
      { key: "lunesdesayunoespecial", title: "LDE" },
      { key: "lunesdesayunoketo", title: "LDK" },
      { key: "lunescomidanormal", title: "LCN" },
      { key: "lunescomidaespecial", title: "LCE" },
      { key: "lunescomidaketo", title: "LCK" },
      { key: "lunescenanormal", title: "LCNN" },
      { key: "lunescenaespecial", title: "LCNE" },
      { key: "lunescenaketo", title: "LCNK" },
      { key: "martesdesayunonormal", title: "MDN" },
      { key: "martesdesayunoespecial", title: "MDE" },
      { key: "martesdesayunoketo", title: "MDK" },
      { key: "martescomidanormal", title: "MCN" },
      { key: "martescomidaespecial", title: "MCE" },
      { key: "martescomidaketo", title: "MCK" },
      { key: "martescenanormal", title: "MCNN" },
      { key: "martescenaespecial", title: "MCNE" },
      { key: "martescenaketo", title: "MCNK" },
      { key: "miercolesdesayunonormal", title: "MiDN" },
      { key: "miercolesdesayunoespecial", title: "MiDE" },
      { key: "miercolesdesayunoketo", title: "MiDK" },
      { key: "miercolescomidanormal", title: "MiCN" },
      { key: "miercolescomidaespecial", title: "MiCE" },
      { key: "miercolescomidaketo", title: "MiCK" },
      { key: "miercolescenanormal", title: "MiCNN" },
      { key: "miercolescenaespecial", title: "MiCNE" },
      { key: "miercolescenaketo", title: "MiCNK" },
      { key: "juevesdesayunonormal", title: "JDN" },
      { key: "juevesdesayunoespecial", title: "JDE" },
      { key: "juevesdesayunoketo", title: "JDK" },
      { key: "juevescomidanormal", title: "JCN" },
      { key: "juevescomidaespecial", title: "JCE" },
      { key: "juevescomidaketo", title: "JCK" },
      { key: "juevescenanormal", title: "JCNN" },
      { key: "juevescenaespecial", title: "JCNE" },
      { key: "juevescenaketo", title: "JCNK" },
      { key: "viernesdesayunonormal", title: "VDN" },
      { key: "viernesdesayunoespecial", title: "VDE" },
      { key: "viernesdesayunoketo", title: "VDK" },
      { key: "viernescomidanormal", title: "VCN" },
      { key: "viernescomidaespecial", title: "VCE" },
      { key: "viernescomidaketo", title: "VCK" },
      { key: "viernescenanormal", title: "VCNN" },
      { key: "viernescenaespecial", title: "VCNE" },
      { key: "viernescenaketo", title: "VCNK" },
    ],

    headersClients: [
      { key: "c_name", title: "Cliente", },
      { key: "c_phone", title: "Teléfono", },
      { key: "sn_name", title: "Red Social", },
    ],

    headersRoutes: [
      { key: "r_name", title: "Ruta", },
      { key: "r_color", title: "Color", },
    ],

    headersSubscriptions: [
      { key: "c_name", title: "Cliente", },
      { key: "s_status", title: "Estado" },
      { key: "s_specification", title: "Especificaciones" },
      { key: "s_start_date", title: "Fecha Inicio" },
      { key: "s_final_date", title: "Fecha Final" },
      { key: "s_payment_date", title: "Fecha Pago" },
      { key: "s_payment_type", title: "Tipo de Pago" },
    ],

    headersPlans: [],

    meals: [],
    clients: [],
    routes: [],
    subscriptions: [],
    plans: [],
  }),

  created() {
    this.getMeals();
    this.getClients();
    this.getRoutes();
    this.getSubscriptions();
  },

  methods: {
    removeAccents(str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    },

    openAddClientDialog() {
      this.addClientDialog = true;
    },

    closeAddClientDialog() {
      this.addClientDialog = false;
    },

    openAddRouteDialog() {
      this.addRouteDialog = true;
    },

    closeAddRouteDialog() {
      this.addRouteDialog = false;
    },

    openAddSubscriptionDialog() {
      this.addSubscriptionDialog = true;
    },

    closeAddSubscriptionDialog() {
      this.addSubscriptionDialog = false;
    },

    openAddPlanDialog() {
      this.addPlanDialog = true;
    },

    closeAddPlanDialog() {
      this.addPlanDialog = false;
    },

    async getMeals() {
      const apiDataMeals = await this.axios.get("meal/");
      let dataMeals = apiDataMeals.data;

      for (const meal of dataMeals) {
        const apiDataPlans = await this.axios.get("meal/plan/" + meal.id_subscription);
        for (const plan of apiDataPlans.data)
          meal[ this.removeAccents(plan.d_name.toLowerCase()) + plan.t_name.toLowerCase() + plan.mt_name.toLowerCase() ] = plan.p_quantity;
      }

      this.meals = dataMeals;
    },

    async getClients() {
      const apiData = await this.axios.get("meal/client/");

      this.clients = apiData.data;
    },

    async getRoutes() {
      const apiData = await this.axios.get("meal/route/");

      this.routes = apiData.data;
    },

    async getSubscriptions() {
      const apiData = await this.axios.get("meal/subscription/");

      this.subscriptions = apiData.data;
    },

    async getPlans() {
      const apiData = await this.axios.get("meal/plan/");

      this.plans = apiData.data;
    },
  },
};
</script>
