<template>
  <v-layout>
    <Nav />
    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<style lang="css">
@import "./assets/main.css";
</style>

<script setup>
import { Nav } from "@/components";
</script>
