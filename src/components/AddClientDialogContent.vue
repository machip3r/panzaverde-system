<script setup>
</script>

<template>
  <v-card>
    <v-toolbar color="primary" title="Agregar Cliente"></v-toolbar>
    <v-card-text>
      <v-form v-model="validClient">
        <v-container>
          <v-select label="Red Social" v-model="client.id_social_network" :items="socialNetworks" item-title="sn_name"
            item-value="id_social_network"></v-select>
          <v-text-field v-model="client.c_name" :rules="cNameRules" label="Cliente" required></v-text-field>
          <v-text-field v-model="client.c_address" :rules="cAddressRules" label="Dirección" required></v-text-field>
          <v-text-field v-model="client.c_phone" :rules="cPhoneRules" label="Teléfono" required></v-text-field>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn variant="text" @click="closeFunction()">Cerrar</v-btn>
      <v-btn variant="text" color="primary"
        @click="(typeof this.actualClient.raw === 'undefined') ? addClient() : editClient()">
        {{ (this.actualClient !== null && typeof this.actualClient.raw === 'undefined') ? "Agregar" : "Actualizar" }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AddClientDialogContent",

  props: {
    closeFunction: Function,
    actualClient: Object,
  },

  data: () => ({
    validClient: true,

    idSocialNetwork: null,
    cName: "",
    cPhone: "",

    cNameRules: [],
    cAddressRules: [],
    cPhoneRules: [],

    client: {
      id_client: 0,
      id_social_network: 0,
      c_name: "",
      c_address: "",
      c_phone: "",
    },

    socialNetworks: [],
  }),

  created() {
    this.getSocialNetworks();
    this.checkClient();
  },

  methods: {
    async getSocialNetworks() {
      const apiData = await this.axios.get("meal/socialNetwork/");

      this.socialNetworks = apiData.data;
    },

    async checkClient() {
      if (typeof this.actualClient.raw !== "undefined") {
        //this.client = await this.axios.get("meal/client/" + this.actualClient.raw.id_client);
        this.client = {
          id_client: this.actualClient.raw.id_client,
          id_social_network: this.actualClient.raw.id_social_network,
          c_name: this.actualClient.raw.c_name,
          c_address: this.actualClient.raw.c_address,
          c_phone: this.actualClient.raw.c_phone,
        };
      }
    },

    async addClient() {
      await this.axios.post("meal/client/addClient", this.client);

      this.client = {
        id_client: 0,
        id_social_network: 0,
        c_name: "",
        c_address: "",
        c_phone: "",
      };

      this.closeFunction();
    },

    async editClient() {
      await this.axios.put("meal/client/editClient", this.client);

      this.client = {
        id_client: 0,
        id_social_network: 0,
        c_name: "",
        c_address: "",
        c_phone: "",
      };

      this.closeFunction();
    },
  },
};
</script>
