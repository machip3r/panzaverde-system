<script setup>
import { AddRouteDialogContent, RemoveRouteDialogContent } from "../components";
</script>

<template>
  <h1>Rutas</h1>
  <v-btn @click="openAddRouteDialog">Agregar Ruta</v-btn>

  <v-card>
    <v-data-table :headers="headersRoutes" :items="routes">
      <template v-slot:[`item.actions`]="{ item }">
        <v-row align="center" align-content="center">
          <v-col cols="3">
            <v-btn
              color="error"
              size="large"
              @click="openRemoveRouteDialog(item)"
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
    v-model="addRouteDialog"
  >
    <AddRouteDialogContent
      :actualRoute="this.actualRoute"
      :closeFunction="closeAddRouteDialog"
    />
  </v-dialog>

  <v-dialog
    transition="dialog-bottom-transition"
    width="400px"
    v-model="removeRouteDialog"
  >
    <RemoveRouteDialogContent
      :actualRoute="this.actualRoute"
      :closeFunction="closeRemoveRouteDialog"
    />
  </v-dialog>
</template>

<script>
export default {
  name: "Meal",

  components: {
    AddRouteDialogContent,

    RemoveRouteDialogContent,
  },

  data: () => ({
    addRouteDialog: false,

    removeRouteDialog: false,

    actualRoute: {},

    headersRoutes: [
      { key: "r_name", title: "Ruta" },
      { key: "r_color", title: "Color" },
      { key: "actions", title: "Acciones" },
    ],

    routes: [],
  }),

  created() {
    this.getRoutes();
  },

  methods: {
    openAddRouteDialog() {
      this.addRouteDialog = true;
    },

    closeAddRouteDialog() {
      this.addRouteDialog = false;
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

    async getRoutes() {
      const apiData = await this.axios.get("meal/route/");

      this.routes = apiData.data;
    },
  },
};
</script>
