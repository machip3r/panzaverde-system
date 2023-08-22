<script setup>
import { VDataTable } from "vuetify/labs/VDataTable";
</script>

<template>
  <h1>Usuarios</h1>
  <v-form v-model="validUser">
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="uName"
            :rules="uNameRules"
            label="Usuario"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            v-model="uPassword"
            :rules="uPasswordRules"
            label="Contraseña"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            v-model="uType"
            :rules="uTypeRules"
            label="Tipo"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-btn class="mt-2" size="large">Agregar</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="searchUsers"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headersUsers"
      :items="users"
      :search="searchUsers"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    /* FORMS */
    validUser: false,
    uName: "",
    uPassword: "",
    uType: "",

    /* TABLES */
    searchUsers: "",
    headersUsers: [
      {
        align: "start",
        key: "uName",
        sortable: false,
        title: "Usuario",
      },
      { key: "uType", title: "Tipo" },
    ],
    users: [
      {
        uName: "a",
        uType: "a",
      },
      {
        uName: "b",
        uType: "b",
      },
    ],
  }),
};
</script>
