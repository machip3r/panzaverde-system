<template>
  <!-- <nav v-show="authStore.user" class="navbar navbar-expand navbar-dark bg-dark"> -->
  <!-- <b-nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="navbar-nav">
      <b-nav-item>
        <RouterLink to="/home" class="nav-item nav-link">Home</RouterLink>
      </b-nav-item>
      <b-nav-item>
        <RouterLink to="/meal" class="nav-item nav-link">Comidas</RouterLink>
      </b-nav-item>
      <b-nav-item>
        <RouterLink to="/inventory" class="nav-item nav-link">
          Inventario
        </RouterLink>
      </b-nav-item>
      <b-nav-item>
        <RouterLink to="/user" class="nav-item nav-link">Usuarios</RouterLink>
      </b-nav-item>
    </div>
  </b-nav> -->
  <nav>
    <v-navigation-drawer floating permanent app>
      <v-list density="compact" nav>
        <v-list-item to="/home" title="Home" value="home"></v-list-item>
        <v-list-item to="/meal" title="Comidas" value="meal"></v-list-item>
        <v-list-item to="/inventory" title="Inventario" value="inventory"></v-list-item>
        <!-- <v-list-item to="/user" title="Usuarios" value="user"></v-list-item> -->
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script setup>
/* import { useAuthStore } from "@/stores";

const authStore = useAuthStore(); */
</script>
