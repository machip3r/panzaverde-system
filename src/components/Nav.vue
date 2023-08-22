<template>
  <!-- <nav v-show="authStore.user" class="navbar navbar-expand navbar-dark bg-dark"> -->
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="navbar-nav">
      <RouterLink to="/home" class="nav-item nav-link">Home</RouterLink>
      <RouterLink to="/meal" class="nav-item nav-link">Comidas</RouterLink>
      <RouterLink to="/inventory" class="nav-item nav-link">
        Inventario
      </RouterLink>
      <RouterLink to="/user" class="nav-item nav-link">Usuarios</RouterLink>
      <button class="btn btn-link nav-item nav-link">Logout</button>
      <!-- <button
        @click="authStore.logout()"
        class="btn btn-link nav-item nav-link"
      >
        Logout
      </button> -->
    </div>
  </nav>
</template>

<script setup>
/* import { useAuthStore } from "@/stores";

const authStore = useAuthStore(); */
</script>
