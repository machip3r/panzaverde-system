<template>
  <v-layout-item
    class="text-end pointer-events-none"
    model-value
    position="bottom"
    size="88"
  >
    <div class="ma-4">
      <v-btn
        v-show="true"
        class="mt-auto pointer-events-initial"
        elevation="8"
        :icon="props.icon"
        size="large"
        @click="onClick"
      />
    </div>
  </v-layout-item>
</template>

<script setup>
import { ref } from "vue";

const model = ref(false);
const props = defineProps(["icon"]);

function onClick() {}
</script>

<style scoped>
.pointer-events-none {
  pointer-events: none;
}

.pointer-events-initial {
  pointer-events: initial;
}
</style>
