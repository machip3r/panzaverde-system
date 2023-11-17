<script setup>
import { AccountStatus, ClientInfo, SubscriptionsInfo } from "../components";
</script>

<template>
  <AccountStatus style="max-height: 400px" />
  <ClientInfo id-client=5 />
  <SubscriptionsInfo start-date="2023-01-01" end-date="2023-11-16" />
</template>
