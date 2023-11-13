<script setup>
import { ref } from "vue";
import axios from "axios";

import { fieldRules, deepEquals, deepCopy } from "@/utils/order.utils";

// State variables
const props = defineProps({
  product: Object,
  readonly: Boolean,
  create: Boolean,
  text: Object,
  mode: String,
});

const emit = defineEmits(["onCancel", "onAccept"]);

const product = ref({});
const editable = ref({});
const confirmDialog = ref(false);
const disableAccept = ref(true);
const edit = ref(true);

// General procedures
async function getProduct(id) {
  product.value = (await axios.get(`/products/id/${id}`)).data;

  deepCopy(product.value, editable.value);
}

function atInputUpdate() {
  const someEmptyField =
    editable.value.p_name === undefined ||
    editable.value.p_price === undefined ||
    editable.value.p_stock === undefined ||
    editable.value.p_unit === undefined ||
    editable.value.p_name === "" ||
    editable.value.p_price < 1 ||
    editable.value.p_stock < 1 ||
    editable.value.p_unit === "";

  disableAccept.value =
    deepEquals(product.value, editable.value) ||
    someEmptyField ||
    editable.value.p_name.length > 80 ||
    editable.value.p_unit.length > 10;
}

function atInputCreate() {
  const someEmptyField =
    editable.value.p_name === undefined ||
    editable.value.p_price === undefined ||
    editable.value.p_stock === undefined ||
    editable.value.p_unit === undefined ||
    editable.value.p_name === "" ||
    editable.value.p_price < 1 ||
    editable.value.p_stock < 1 ||
    editable.value.p_unit === "";

  console.log("SomeEmtpyField: ", someEmptyField);

  disableAccept.value =
    someEmptyField ||
    editable.value.p_name.length > 80 ||
    editable.value.p_unit.length > 10;
}

switch (props.mode) {
  case "update":
  case "read":
    getProduct(props.product.id_product);
    break;

  case "create":
  default:
    break;
}
</script>

<template>
  <v-dialog
    v-model="confirmDialog"
    min-width="10%"
    max-width="600px"
    max-height="500px"
  >
    <v-card>
      <v-card-item>
        <v-card-title class="text-h5">Confirmar cambios</v-card-title>
        <v-card-subtitle>
          Los cambios realizados se muestran a continuación
        </v-card-subtitle>
      </v-card-item>
      <v-card-item>
        <v-row>
          <v-col cols="3">
            <p>Campo:</p>
          </v-col>
          <v-col>
            <p>De:</p>
          </v-col>
          <v-col>
            <p>A:</p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
            <p>
              <b>Nombre:</b>
            </p>
          </v-col>
          <v-col>
            <p>
              {{ product.p_name }}
            </p>
          </v-col>
          <v-col>
            <p>
              <b>
                {{ editable.p_name }}
              </b>
              <span
                v-if="product.p_name === editable.p_name"
                class="text-caption font-weight-light"
              >
                (sin cambios)
              </span>
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
            <p>
              <b>Precio:</b>
            </p>
          </v-col>
          <v-col>
            <p>${{ parseFloat(product.p_price).toFixed(2) }}</p>
          </v-col>
          <v-col>
            <p>
              <b> ${{ parseFloat(editable.p_price).toFixed(2) }} </b>
              <span
                v-if="product.p_price === editable.p_price"
                class="text-caption font-weight-light"
              >
                (sin cambios)
              </span>
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
            <p>
              <b>En Inventario:</b>
            </p>
          </v-col>
          <v-col>
            <p>
              {{ product.p_stock }}
            </p>
          </v-col>
          <v-col>
            <p>
              <b>
                {{ editable.p_stock }}
              </b>
              <span
                v-if="product.p_stock === editable.p_stock"
                class="text-caption font-weight-light"
              >
                (sin cambios)
              </span>
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
            <p>
              <b>Unidad:</b>
            </p>
          </v-col>
          <v-col>
            <p>
              {{ product.p_unit }}
            </p>
          </v-col>
          <v-col>
            <p>
              <b>
                {{ editable.p_unit }}
              </b>
              <span
                v-if="product.p_unit === editable.p_unit"
                class="text-caption font-weight-light"
              >
                (sin cambios)
              </span>
            </p>
          </v-col>
        </v-row>
      </v-card-item>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="confirmDialog = false">Cancelar</v-btn>
        <v-btn @click="emit('onAccept', [editable])">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-card v-if="mode === 'create'">
    <v-card-title>
      <v-row align="center">
        <v-col>{{ text.title }}</v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="mt-5">
      <v-row>
        <v-col>
          <v-text-field
            label="Nombre del producto"
            v-model="editable.p_name"
            type="text"
            @input="atInputCreate"
            :rules="[fieldRules.required, fieldRules.lengthCheckName]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="Precio"
            v-model.number="editable.p_price"
            type="number"
            @input="atInputCreate"
            :rules="[fieldRules.required, fieldRules.boundCheck]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Cantidad"
            v-model.number="editable.p_stock"
            type="number"
            @input="atInputCreate"
            :rules="[fieldRules.required, fieldRules.boundCheck]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Unidad"
            v-model="editable.p_unit"
            type="text"
            @input="atInputCreate"
            :rules="[fieldRules.required, fieldRules.lengthCheckUnit]"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="emit('onCancel')">{{ text.cancel }}</v-btn>
      <v-btn :disabled="disableAccept" @click="confirmDialog = true">
        {{ text.confirm }}
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-card v-else-if="mode === 'update'">
    <v-card-title>
      <v-row align="center">
        <v-col>{{ text.title }}</v-col>
        <v-spacer></v-spacer>
        <v-col class="align-end">
          <v-switch
            color="success"
            hide-details
            inset
            label="Editar"
            v-model="edit"
          ></v-switch>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="mt-5">
      <v-row>
        <v-col>
          <v-text-field
            label="Nombre del producto"
            v-model="editable.p_name"
            type="text"
            @input="atInputUpdate"
            :rules="[fieldRules.required, fieldRules.lengthCheckName]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="Precio"
            v-model.number="editable.p_price"
            type="number"
            @input="atInputUpdate"
            :rules="[fieldRules.required, fieldRules.boundCheck]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Cantidad"
            v-model.number="editable.p_stock"
            type="number"
            @input="atInputUpdate"
            :rules="[fieldRules.required, fieldRules.boundCheck]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Unidad"
            v-model="editable.p_unit"
            type="text"
            @input="atInputUpdate"
            :rules="[fieldRules.required, fieldRules.lengthCheckUnit]"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="emit('onCancel')">{{ text.cancel }}</v-btn>
      <v-btn :disabled="disableAccept" @click="confirmDialog = true">
        {{ text.confirm }}
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-card v-else-if="mode === 'read'">
    <v-card-title>
      <v-row align="center" justify="center">
        <v-col>
          {{ product.p_name }}
          <span class="font-weight-light"> (${{ product.p_price }}) </span>
        </v-col>
      </v-row>
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
