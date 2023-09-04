<script setup>
</script>

<template>
    <v-card>
        <v-toolbar color="primary" title="Agregar Suscripción"></v-toolbar>
        <v-card-text>
            <v-form v-model="validSubscription">
                <v-container>
                    <v-select label="Cliente" v-model="subscription.id_client" :items="clients" item-title="c_name"
                        item-value="id_client"></v-select>
                    <v-select label="Ruta" v-model="subscription.id_route" :items="routes" item-title="r_name"
                        item-value="id_route"></v-select>
                    <v-text-field v-model="subscription.s_specification" :rules="sSpecificationRules"
                        label="Especificaciones"></v-text-field>
                    <v-text-field v-model="subscription.s_start_date" :rules="sStartDateRules" type="date"
                        label="Fecha Inicio" required></v-text-field>
                    <v-text-field v-model="subscription.s_final_date" :rules="sFinalDateRules" type="date"
                        label="Fecha Final" required></v-text-field>
                    <v-text-field v-model="subscription.s_payment_date" :rules="sPaymentDateRules" type="date"
                        label="Fecha de Pago" required></v-text-field>
                    <v-text-field v-model="subscription.s_payment_type" :rules="sPaymentTypeRules"
                        label="Tipo de Pago"></v-text-field>
                    <v-text-field v-model="subscription.s_total" :rules="sTotalRules" label="Total"></v-text-field>
                </v-container>
            </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
            <v-btn variant="text" @click="closeFunction()">Close</v-btn>
            <v-btn variant="text" color="primary" @click="addSubscription()">Agregar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "AddSubscriptionDialogContent",

    props: {
        closeFunction: Function,
    },

    data: () => ({
        validSubscription: true,

        subscription: {
            id_client: 0,
            id_route: 0,
            s_specification: "",
            s_start_date: "",
            s_final_date: "",
            s_payment_date: "",
            s_payment_type: "",
            s_total: "",
        },

        sSpecificationRules: [],
        sStartDateRules: [],
        sFinalDateRules: [],
        sPaymentDateRules: [],
        sPaymentTypeRules: [],

        clients: [],
        routes: [],
    }),

    created() {
        this.getRoutes();
        this.getClients();
    },

    watch: {
        id_client: function (newIDClient) {
            this.getAllSubscriptionsByClient(newIDClient);
        },
    },

    methods: {
        async getRoutes() {
            const apiData = await this.axios.get("meal/route/");

            this.routes = apiData.data;
        },

        async getClients() {
            const apiData = await this.axios.get("meal/client/");

            this.clients = apiData.data;
        },

        async getAllSubscriptionsByClient(idClient) {
            const apiData = await this.axios.get("meal/subscription/" + idClient);

            this.subscriptions = apiData.data;
        },

        async addSubscription() {
            await this.axios.post("meal/subscription/addSubscription", this.subscription);

            this.subscription = {
                id_client: 0,
                id_route: 0,
                s_specification: "",
                s_start_date: "",
                s_final_date: "",
                s_payment_date: "",
                s_payment_type: "",
                s_total: "",
            };

            this.getAllSubscriptionsByClient(this.subscription.id_client);

            this.closeFunction();
        },
    },
};
</script>
