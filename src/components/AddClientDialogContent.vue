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
      <v-btn variant="text" @click="closeFunction()">Close</v-btn>
      <v-btn variant="text" color="primary" @click="addClient()">Agregar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AddClientDialogContent",

  props: {
    closeFunction: Function,
  },

  data: () => ({
    validClient: true,

    idSocialNetwork: null,
    idClient: null,
    cName: "",
    cPhone: "",

    cNameRules: [],
    cAddressRules: [],
    cPhoneRules: [],

    client: {
      id_social_network: 0,
      c_name: "",
      c_address: "",
      c_phone: "",
    },

    socialNetworks: [],
  }),

  created() {
    this.getSocialNetworks();
  },

  methods: {
    async getSocialNetworks() {
      const apiData = await this.axios.get("meal/socialNetwork/");

      this.socialNetworks = apiData.data;
    },

    async addClient() {
      await this.axios.post("meal/client/addClient", this.client);

      this.client = {
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
