<script setup>
import { AccountStatus, ClientInfo, SalesInfo } from "../components";
</script>

<template>
  <v-container>
    <v-row no-gutters justify="space-around">
      <v-col cols="5">
        <AccountStatus />
      </v-col>
      <v-col cols="6">
        <ClientInfo id-client="5" />
        <SalesInfo start-date="2021-01-01" end-date="2023-03-03" />
      </v-col>
    </v-row>
  </v-container>
</template>
