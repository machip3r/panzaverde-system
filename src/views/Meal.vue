<script setup>
import { VDataTable } from "vuetify/labs/VDataTable";

import { AddClientDialogContent, AddRouteDialogContent, AddSubscriptionDialogContent, AddPlanDialogContent, RemoveClientDialogContent, RemoveRouteDialogContent, RemoveSubscriptionDialogContent } from "../components";
</script>

<template>
  <h1>Comidas</h1>
  <!-- <v-btn @click="openAddClientDialog">Agregar Cliente</v-btn>
  <v-btn @click="openAddRouteDialog">Agregar Ruta</v-btn>
  <v-btn @click="openAddSubscriptionDialog">Agregar Suscripción</v-btn>
  <v-btn @click="openAddPlanDialog">Agregar Plan</v-btn> -->

  <v-card>
    <v-card-title>
      <v-text-field v-model="searchMeals" label="Buscar comidas" single-line hide-details></v-text-field>
    </v-card-title>
    <!-- <v-data-table :headers="headersMeals" :items="meals" :search="searchMeals" v-model:expanded="expanded"> -->
    <v-data-table class="table-meal" :headers="headersMeals" :items="meals" :search="searchMeals">
      <!-- <template v-slot:header="{ props: { headersMeals } }">
        <thead>
          <tr>
            <th v-for="h in headers" :class="h.class">
              <span>{{ h.title }}</span>
            </th>
          </tr>
        </thead>
      </template> -->
      <template v-slot:item="{ props }">
        <tr>
          <td v-for="field in Object.keys(props.item.columns)">
            {{ props.item.columns[field] }}
          </td>
          <!-- <td>
            <v-btn icon @click="expand(!isExpanded)">
              <v-icon>{{ isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </td> -->
        </tr>
        <tr>
          <!-- <v-data-table :headers="headersMealsPlanQuantity" :items="meals" :search="searchMeals"></v-data-table> -->
          <td :colspan="headersMeals.length">
            <table class="table-plan">
              <tr class="day">
                <td colspan="9">Lunes</td>
                <td colspan="9">Martes</td>
                <td colspan="9">Miércoles</td>
                <td colspan="9">Jueves</td>
                <td colspan="9">Viernes</td>
              </tr>
              <tr class="time">
                <td colspan="3">Normal</td>
                <td colspan="3">Keto</td>
                <td colspan="3">Especial</td>
                <td colspan="3">Normal</td>
                <td colspan="3">Keto</td>
                <td colspan="3">Especial</td>
                <td colspan="3">Normal</td>
                <td colspan="3">Keto</td>
                <td colspan="3">Especial</td>
                <td colspan="3">Normal</td>
                <td colspan="3">Keto</td>
                <td colspan="3">Especial</td>
                <td colspan="3">Normal</td>
                <td colspan="3">Keto</td>
                <td colspan="3">Especial</td>
              </tr>
              <tr>
                <td v-for="(header) of headersMealsPlanQuantity">
                  <table class="table-quantity" v-if="getDayMeal(header.key, props.item.raw['id_subscription']) !== ''">
                    <tr class="type">
                      <td>
                        {{ ((header.title[header.title.length - 3] + header.title[header.title.length - 2]) !== "CN") ?
                          header.title[header.title.length - 2] :
                          header.title[header.title.length - 3] + header.title[header.title.length - 2] }}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {{ getDayMeal(header.key, props.item.raw['id_subscription']) }}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </template>
    </v-data-table>

    <!-- <template v-slot:item="{ props, expand, isExpanded }">
        <tr>
          <td class="d-block d-sm-table-cell" v-for="field in Object.keys(props.item.raw)">
            {{ field }}
          </td>
          <td>
            <v-btn icon @click="expand(!isExpanded)">
              <v-icon>{{ isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </td>
        </tr>
      </template> -->
    <!-- <template v-slot:expanded-item="{ headers, item }">
        <tr v-for="(item, index) in meals" :key="index" :colspan="headers.length">
          <td v-for="(i, index) in Object.values(item)">{{ i }}</td>
        </tr>
      </template> -->

    <!-- <template v-slot:expanded-row="props">
        <thead>
          <tr>
            <td v-for="(header) of Object.keys(props.item.columns)">{{ header }}</td>
          </tr>
        </thead>
        <tr>
          <td v-for="(attr) in props.item.raw">{{ props.item.raw[attr] }}</td>
        </tr> -->
    <!-- <tr>
          <td>{{ props.item.raw.lunesdesayunonormal }}</td>
          <td>{{ props.item.raw.lunesdesayunoespecial }}</td>
          <td>{{ props.item.raw.lunesdesayunoketo }}</td>
          <td>{{ props.item.raw.lunescomidanormal }}</td>
          <td>{{ props.item.raw.lunescomidaespecial }}</td>
          <td>{{ props.item.raw.lunescomidaketo }}</td>
          <td>{{ props.item.raw.lunescenanormal }}</td>
          <td>{{ props.item.raw.lunescenaespecial }}</td>
          <td>{{ props.item.raw.lunescenaketo }}</td>
          <td>{{ props.item.raw.martesdesayunonormal }}</td>
          <td>{{ props.item.raw.martesdesayunoespecial }}</td>
          <td>{{ props.item.raw.martesdesayunoketo }}</td>
          <td>{{ props.item.raw.martescomidanormal }}</td>
          <td>{{ props.item.raw.martescomidaespecial }}</td>
          <td>{{ props.item.raw.martescomidaketo }}</td>
          <td>{{ props.item.raw.martescenanormal }}</td>
          <td>{{ props.item.raw.martescenaespecial }}</td>
          <td>{{ props.item.raw.martescenaketo }}</td>
          <td>{{ props.item.raw.miercolesdesayunonormal }}</td>
          <td>{{ props.item.raw.miercolesdesayunoespecial }}</td>
          <td>{{ props.item.raw.miercolesdesayunoketo }}</td>
          <td>{{ props.item.raw.miercolescomidanormal }}</td>
          <td>{{ props.item.raw.miercolescomidaespecial }}</td>
          <td>{{ props.item.raw.miercolescomidaketo }}</td>
          <td>{{ props.item.raw.miercolescenanormal }}</td>
          <td>{{ props.item.raw.miercolescenaespecial }}</td>
          <td>{{ props.item.raw.miercolescenaketo }}</td>
          <td>{{ props.item.raw.juevesdesayunonormal }}</td>
          <td>{{ props.item.raw.juevesdesayunoespecial }}</td>
          <td>{{ props.item.raw.juevesdesayunoketo }}</td>
          <td>{{ props.item.raw.juevescomidanormal }}</td>
          <td>{{ props.item.raw.juevescomidaespecial }}</td>
          <td>{{ props.item.raw.juevescomidaketo }}</td>
          <td>{{ props.item.raw.juevescenanormal }}</td>
          <td>{{ props.item.raw.juevescenaespecial }}</td>
          <td>{{ props.item.raw.juevescenaketo }}</td>
          <td>{{ props.item.raw.viernesdesayunonormal }}</td>
          <td>{{ props.item.raw.viernesdesayunoespecial }}</td>
          <td>{{ props.item.raw.viernesdesayunoketo }}</td>
          <td>{{ props.item.raw.viernescomidanormal }}</td>
          <td>{{ props.item.raw.viernescomidaespecial }}</td>
          <td>{{ props.item.raw.viernescomidaketo }}</td>
          <td>{{ props.item.raw.viernescenanormal }}</td>
          <td>{{ props.item.raw.viernescenaespecial }}</td>
          <td>{{ props.item.raw.viernescenaketo }}</td>
        </tr>
      </template> -->
  </v-card>
  <!-- <v-card>
    <v-card-title>
      <v-text-field v-model="searchClients" label="Buscar clientes" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headersClients" :items="clients" :search="searchClients">
      <template v-slot:[`item.actions`]="{ item }">
        <v-row align="center" align-content="center">
          <v-col cols="3">
            <v-btn color="secondary" size="large" @click="openAddClientDialog(item)">
              Editar
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn color="error" size="large" @click="openRemoveClientDialog(item)">
              Eliminar
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-card>
  <v-card>
    <v-data-table :headers="headersRoutes" :items="routes">
      <template v-slot:[`item.actions`]="{ item }">
        <v-row align="center" align-content="center">
          <v-col cols="3">
            <v-btn color="error" size="large" @click="openRemoveRouteDialog(item)">
              Eliminar
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-card>
  <v-card>
    <v-card-title>
      <v-text-field v-model="searchSubscriptions" label="Buscar suscripciones" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headersSubscriptions" :items="subscriptions" :search="searchSubscriptions">
      <template v-slot:[`item.actions`]="{ item }">
        <v-row align="center" align-content="center">
          <v-col cols="3">
            <v-btn color="secondary" size="large" @click="openAddSubscriptionDialog(item)">
              Editar
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn color="error" size="large" @click="openRemoveSubscriptionDialog(item)">
              Eliminar
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-card> -->
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
    <AddClientDialogContent :actualClient="this.actualClient" :closeFunction="closeAddClientDialog" />
  </v-dialog>
  <v-dialog transition="dialog-bottom-transition" width="400px" v-model="addRouteDialog">
    <AddRouteDialogContent :actualRoute="this.actualRoute" :closeFunction="closeAddRouteDialog" />
  </v-dialog>
  <v-dialog transition="dialog-bottom-transition" width="400px" v-model="addSubscriptionDialog">
    <AddSubscriptionDialogContent :actualSubscription="this.actualSubscription"
      :closeFunction="closeAddSubscriptionDialog" />
  </v-dialog>
  <v-dialog transition="dialog-bottom-transition" width="400px" v-model="addPlanDialog">
    <AddPlanDialogContent :closeFunction="closeAddPlanDialog" />
  </v-dialog>

  <v-dialog transition="dialog-bottom-transition" width="400px" v-model="removeClientDialog">
    <RemoveClientDialogContent :actualClient="this.actualClient" :closeFunction="closeRemoveClientDialog" />
  </v-dialog>
  <v-dialog transition="dialog-bottom-transition" width="400px" v-model="removeRouteDialog">
    <RemoveRouteDialogContent :actualRoute="this.actualRoute" :closeFunction="closeRemoveRouteDialog" />
  </v-dialog>
  <v-dialog transition="dialog-bottom-transition" width="400px" v-model="removeSubscriptionDialog">
    <RemoveSubscriptionDialogContent :actualSubscription="this.actualSubscription"
      :closeFunction="closeRemoveSubscriptionDialog" />
  </v-dialog>
  <!-- <v-dialog transition="dialog-bottom-transition" width="400px" v-model="removePlanDialog">
    <RemovePlanDialogContent :closeFunction="closeRemovePlanDialog" />
  </v-dialog> -->
</template>

<script>
export default {
  name: "Meal",

  components: {
    AddClientDialogContent,
    AddRouteDialogContent,
    AddSubscriptionDialogContent,
    AddPlanDialogContent,

    RemoveClientDialogContent,
    RemoveRouteDialogContent,
    RemoveSubscriptionDialogContent,
  },

  data: () => ({
    addClientDialog: false,
    addRouteDialog: false,
    addSubscriptionDialog: false,
    addPlanDialog: false,

    expanded: [],
    isExpanded: false,

    removeClientDialog: false,
    removeRouteDialog: false,
    removeSubscriptionDialog: false,
    /* removePlanDialog: false, */

    actualClient: {},
    actualRoute: {},
    actualSubscription: {},

    searchMeals: "",
    searchClients: "",
    searchSubscriptions: "",

    headersMeals: [
      { key: "c_name", title: "Cliente" },
      { key: "c_phone", title: "Teléfono" },
      { key: "sn_name", title: "Red Social" },
      { key: "s_status", title: "Estado" },
      { key: "s_specification", title: "Especificaciones" },
      { key: "s_start_date", title: "Fecha Inicio" },
      { key: "s_final_date", title: "Fecha Final" },
      { key: "s_payment_date", title: "Fecha Pago" },
      { key: "s_payment_type", title: "Tipo de Pago" },
      { key: "actions", title: "Acciones" },

      /* headers meals plan quantity */
    ],

    headersMealsPlanQuantity: [
      { key: "lunesdesayunonormal", title: "LDN" },
      { key: "lunescomidanormal", title: "LCN" },
      { key: "lunescenanormal", title: "LCNN" },
      { key: "lunesdesayunoespecial", title: "LDE" },
      { key: "lunescomidaespecial", title: "LCE" },
      { key: "lunescenaespecial", title: "LCNE" },
      { key: "lunescomidaketo", title: "LCK" },
      { key: "lunesdesayunoketo", title: "LDK" },
      { key: "lunescenaketo", title: "LCNK" },
      { key: "martesdesayunonormal", title: "MDN" },
      { key: "martescomidanormal", title: "MCN" },
      { key: "martescenanormal", title: "MCNN" },
      { key: "martesdesayunoespecial", title: "MDE" },
      { key: "martescomidaespecial", title: "MCE" },
      { key: "martescenaespecial", title: "MCNE" },
      { key: "martesdesayunoketo", title: "MDK" },
      { key: "martescomidaketo", title: "MCK" },
      { key: "martescenaketo", title: "MCNK" },
      { key: "miercolesdesayunonormal", title: "MiDN" },
      { key: "miercolescomidanormal", title: "MiCN" },
      { key: "miercolescenanormal", title: "MiCNN" },
      { key: "miercolesdesayunoespecial", title: "MiDE" },
      { key: "miercolescomidaespecial", title: "MiCE" },
      { key: "miercolescenaespecial", title: "MiCNE" },
      { key: "miercolesdesayunoketo", title: "MiDK" },
      { key: "miercolescomidaketo", title: "MiCK" },
      { key: "miercolescenaketo", title: "MiCNK" },
      { key: "juevesdesayunonormal", title: "JDN" },
      { key: "juevescomidanormal", title: "JCN" },
      { key: "juevescenanormal", title: "JCNN" },
      { key: "juevesdesayunoespecial", title: "JDE" },
      { key: "juevescomidaespecial", title: "JCE" },
      { key: "juevescenaespecial", title: "JCNE" },
      { key: "juevesdesayunoketo", title: "JDK" },
      { key: "juevescomidaketo", title: "JCK" },
      { key: "juevescenaketo", title: "JCNK" },
      { key: "viernesdesayunonormal", title: "VDN" },
      { key: "viernescomidanormal", title: "VCN" },
      { key: "viernescenanormal", title: "VCNN" },
      { key: "viernesdesayunoespecial", title: "VDE" },
      { key: "viernescomidaespecial", title: "VCE" },
      { key: "viernescenaespecial", title: "VCNE" },
      { key: "viernesdesayunoketo", title: "VDK" },
      { key: "viernescomidaketo", title: "VCK" },
      { key: "viernescenaketo", title: "VCNK" },
    ],

    headersClients: [
      { key: "c_name", title: "Cliente" },
      { key: "c_phone", title: "Teléfono" },
      { key: "sn_name", title: "Red Social" },
      { key: "actions", title: "Acciones" },
    ],

    headersRoutes: [
      { key: "r_name", title: "Ruta" },
      { key: "r_color", title: "Color" },
      { key: "actions", title: "Acciones" },
    ],

    headersSubscriptions: [
      { key: "c_name", title: "Cliente" },
      { key: "r_name", title: "Ruta" },
      { key: "s_status", title: "Estado" },
      { key: "s_specification", title: "Especificaciones" },
      { key: "s_start_date", title: "Fecha Inicio" },
      { key: "s_final_date", title: "Fecha Final" },
      { key: "s_payment_date", title: "Fecha Pago" },
      { key: "s_payment_type", title: "Tipo de Pago" },
      { key: "actions", title: "Acciones" },
    ],

    /* headersPlans: [], */

    meals: [],
    plans: [],
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
    /* setItem(item) {
      console.log(item);
    }, */

    removeAccents(str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    },

    openAddClientDialog(actualClient) {
      this.actualClient = actualClient;
      this.addClientDialog = true;
    },

    closeAddClientDialog() {
      this.addClientDialog = false;
      this.actualClient = null;

      this.getClients();
    },

    openAddRouteDialog() {
      this.addRouteDialog = true;
    },

    closeAddRouteDialog() {
      this.addRouteDialog = false;
    },

    openAddSubscriptionDialog(actualSubscription) {
      this.actualSubscription = actualSubscription;
      this.addSubscriptionDialog = true;
    },

    closeAddSubscriptionDialog() {
      this.addSubscriptionDialog = false;
      this.actualSubscription = null;

      this.getSubscriptions();
    },

    openAddPlanDialog(actualPlan) {
      this.addPlanDialog = true;
    },

    closeAddPlanDialog() {
      this.addPlanDialog = false;
    },

    openRemoveClientDialog(actualClient) {
      this.actualClient = actualClient;
      this.removeClientDialog = true;
    },

    closeRemoveClientDialog() {
      this.actualClient = null;
      this.removeClientDialog = false;

      this.getClients();
    },

    openRemoveRouteDialog(actualRoute) {
      this.actualRoute = actualRoute;
      this.removeRouteDialog = true;
    },

    closeRemoveRouteDialog() {
      this.actualRoute = null;
      this.removeRouteDialog = false;

      this.getRoutes();
    },

    openRemoveSubscriptionDialog(actualSubscription) {
      this.actualSubscription = actualSubscription;
      this.removeSubscriptionDialog = true;
    },

    closeRemoveSubscriptionDialog() {
      this.actualSubscription = null;
      this.removeSubscriptionDialog = false;

      this.getSubscriptions();
    },

    async getMeals() {
      const apiDataMeals = await this.axios.get("meal/");
      let dataMeals = apiDataMeals.data;
      let plans = [];

      for (const meal of dataMeals) {
        const apiDataPlans = await this.axios.get("meal/plan/" + meal.id_subscription);
        let dictionaryPlan = {};

        for (const plan of apiDataPlans.data) {
          dictionaryPlan[ "id_subscription" ] = plan.id_subscription;
          dictionaryPlan[ this.removeAccents(plan.d_name.toLowerCase()) + plan.t_name.toLowerCase() + plan.mt_name.toLowerCase() ] = plan.p_quantity;
        }

        plans.push(dictionaryPlan);
      }

      this.meals = dataMeals;
      this.plans = plans;
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

    getDayMeal(key, id_subscription) {
      const plan = this.plans.filter((p) => p.id_subscription === id_subscription);

      return (typeof plan[ 0 ][ key ] !== "undefined") ? plan[ 0 ][ key ] : "";
    }
  },
};
</script>
