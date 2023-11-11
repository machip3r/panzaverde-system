<script setup>
import { ref } from "vue";
import axios from "axios";

import { fieldRules, deepEquals, deepCopy } from "@/utils/order.utils";

// State variables
const props = defineProps({
  product: Object,
  readonly: Boolean,
  text: Object,
});
const product = ref({});
const editable = ref({});
const disableConfirm = ref(true);

// General procedures
async function getProduct(id) {
  product.value = (await axios.get(`/products/id/${id}`)).data;

  if (props.readonly) {
    deepCopy(product.value, editable.value);
  }
}

function atInput() {
  disableConfirm.value = deepEquals(product.value, editable.value);
}

getProduct(props.product.id_product);
</script>

<template>
  <v-card v-if="readonly">
    <v-card-title>{{ text.title }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field
            label="Nombre del editable."
            v-model="editable.p_name"
            type="text"
            @input="atInput"
            :rules="[fieldRules.required]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Precio"
            v-model.number="editable.p_price"
            type="number"
            @input="atInput"
            :rules="[fieldRules.required, fieldRules.boundCheck]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row> </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="Cantidad"
            v-model.number="editable.p_stock"
            type="number"
            @input="atInput"
            :rules="[fieldRules.required, fieldRules.boundCheck]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Unidad"
            v-model="editable.p_unit"
            type="text"
            @input="atInput"
            :rules="[fieldRules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="confirmDeletionOrder = false">{{ text.cancel }}</v-btn>
      <v-btn :disabled="disableConfirm" @click="deleteOrder()">{{
        text.confirm
      }}</v-btn>
    </v-card-actions>
  </v-card>

  <v-card v-else>
    <v-card-title>
      {{ product.p_name }}
      <span class="font-weight-light"> (${{ product.p_price }}) </span>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <p>
            <span class="font-weight-bold">Cantidad en inventario: </span>
            {{ product.p_stock }}
          </p>
        </v-col>
        <v-col>
          <p>
            <span class="font-weight-bold">Tipo de unidad: </span>
            {{ product.p_unit }}
          </p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
