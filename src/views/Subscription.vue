<script setup>
import {
  AddSubscriptionDialogContent,
  RemoveSubscriptionDialogContent,
} from "../components";
</script>

<template>
  <h1>Suscripciones</h1>
  <v-btn @click="openAddSubscriptionDialog">Agregar Suscripción</v-btn>

  <v-card>
    <v-card-title>
      <v-text-field
        v-model="searchSubscriptions"
        label="Buscar suscripciones"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headersSubscriptions"
      :items="subscriptions"
      :search="searchSubscriptions"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-row align="center" align-content="center">
          <v-col cols="3">
            <v-btn
              color="secondary"
              size="large"
              @click="openAddSubscriptionDialog(item)"
            >
              Editar
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn
              color="error"
              size="large"
              @click="openRemoveSubscriptionDialog(item)"
            >
              Eliminar
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-card>

  <v-dialog
    transition="dialog-bottom-transition"
    width="400px"
    v-model="addSubscriptionDialog"
  >
    <AddSubscriptionDialogContent
      :actualSubscription="this.actualSubscription"
      :closeFunction="closeAddSubscriptionDialog"
    />
  </v-dialog>

  <v-dialog
    transition="dialog-bottom-transition"
    width="400px"
    v-model="removeSubscriptionDialog"
  >
    <RemoveSubscriptionDialogContent
      :actualSubscription="this.actualSubscription"
      :closeFunction="closeRemoveSubscriptionDialog"
    />
  </v-dialog>
</template>

<script>
export default {
  name: "Subscription",

  components: {
    AddSubscriptionDialogContent,

    RemoveSubscriptionDialogContent,
  },

  data: () => ({
    addSubscriptionDialog: false,

    removeSubscriptionDialog: false,

    actualSubscription: {},

    searchSubscriptions: "",

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

    subscriptions: [],
  }),

  created() {
    this.getSubscriptions();
  },

  methods: {
    openAddSubscriptionDialog(actualSubscription) {
      this.actualSubscription = actualSubscription;
      this.addSubscriptionDialog = true;
    },

    closeAddSubscriptionDialog() {
      this.addSubscriptionDialog = false;
      this.actualSubscription = null;

      this.getSubscriptions();
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

    async getSubscriptions() {
      const apiData = await this.axios.get("meal/subscription/");

      this.subscriptions = apiData.data;
    },
  },
};
</script>
