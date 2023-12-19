<script setup>
import { AddPlanDialogContent } from "../components";
</script>

<template>
  <h1>Planes</h1>
  <v-btn @click="openAddPlanDialog">Agregar Plan</v-btn>

  <v-card>
    <v-card-title>
      <v-text-field
        v-model="searchPlans"
        label="Buscar planes"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headersPlans"
      :items="plans"
      :search="searchPlans"
    ></v-data-table>
  </v-card>

  <v-dialog
    transition="dialog-bottom-transition"
    width="400px"
    v-model="addPlanDialog"
  >
    <AddPlanDialogContent :closeFunction="closeAddPlanDialog" />
  </v-dialog>

  <!-- <v-dialog transition="dialog-bottom-transition" width="400px" v-model="removePlanDialog">
    <RemovePlanDialogContent :closeFunction="closeRemovePlanDialog" />
  </v-dialog> -->
</template>

<script>
export default {
  name: "Plan",

  components: {
    AddPlanDialogContent,
  },

  data: () => ({
    addPlanDialog: false,

    actualPlan: {},

    searchPlans: "",

    headersPlans: [{ key: "", title: "" }],

    plans: [],
  }),

  created() {
    this.getPlans();
  },

  methods: {
    openAddPlanDialog(actualPlan) {
      this.addPlanDialog = true;
    },

    closeAddPlanDialog() {
      this.addPlanDialog = false;
    },

    async getPlans() {
      const apiData = await this.axios.get("meal/plan/");

      this.plans = apiData.data;
    },
  },
};
</script>
