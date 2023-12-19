<script setup>
import {
  AddClientDialogContent,
  RemoveClientDialogContent,
} from "../components";
</script>

<template>
  <h1>Clientes</h1>
  <v-btn @click="openAddClientDialog">Agregar Cliente</v-btn>

  <v-card>
    <v-card-title>
      <v-text-field
        v-model="searchClients"
        label="Buscar clientes"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headersClients"
      :items="clients"
      :search="searchClients"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-row align="center" align-content="center">
          <v-col cols="3">
            <v-btn
              color="secondary"
              size="large"
              @click="openAddClientDialog(item)"
            >
              Editar
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn
              color="error"
              size="large"
              @click="openRemoveClientDialog(item)"
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
    v-model="addClientDialog"
  >
    <AddClientDialogContent
      :actualClient="this.actualClient"
      :closeFunction="closeAddClientDialog"
    />
  </v-dialog>

  <v-dialog
    transition="dialog-bottom-transition"
    width="400px"
    v-model="removeClientDialog"
  >
    <RemoveClientDialogContent
      :actualClient="this.actualClient"
      :closeFunction="closeRemoveClientDialog"
    />
  </v-dialog>
</template>

<script>
export default {
  name: "Client",

  components: {
    AddClientDialogContent,

    RemoveClientDialogContent,
  },

  data: () => ({
    addClientDialog: false,

    removeClientDialog: false,

    actualClient: {},

    searchClients: "",

    headersClients: [
      { key: "c_name", title: "Cliente" },
      { key: "c_phone", title: "Teléfono" },
      { key: "sn_name", title: "Red Social" },
      { key: "actions", title: "Acciones" },
    ],

    clients: [],
    routes: [],
  }),

  created() {
    this.getClients();
    this.getRoutes();
  },

  methods: {
    openAddClientDialog(actualClient) {
      this.actualClient = actualClient;
      this.addClientDialog = true;
    },

    closeAddClientDialog() {
      this.addClientDialog = false;
      this.actualClient = null;

      this.getClients();
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

    async getClients() {
      const apiData = await this.axios.get("meal/client/");

      this.clients = apiData.data;
    },

    async getRoutes() {
      const apiData = await this.axios.get("meal/route/");

      this.routes = apiData.data;
    },
  },
};
</script>
