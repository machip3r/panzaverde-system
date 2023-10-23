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
            <v-btn variant="text" @click="closeFunction()">Cerrar</v-btn>
            <v-btn variant="text" color="primary"
                @click="(typeof this.actualSubscription.raw === 'undefined') ? addSubscription() : editSubscription()">
                {{ (this.actualSubscription !== null && typeof this.actualSubscription.raw === 'undefined') ? "Agregar" :
                    "Actualizar" }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "AddSubscriptionDialogContent",

    props: {
        closeFunction: Function,
        actualSubscription: Object,
    },

    data: () => ({
        validSubscription: true,

        subscription: {
            id_subscription: 0,
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
        this.checkSubscription();
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

        async checkSubscription() {
            if (typeof this.actualSubscription.raw !== "undefined") {
                let startDateItems = this.actualSubscription.raw.s_start_date.split("/"), finalDateItems = this.actualSubscription.raw.s_final_date.split("/"), paymentDateItems = this.actualSubscription.raw.s_payment_date.split("/"), startDate = startDateItems[ 2 ] + "-" + startDateItems[ 1 ] + "-" + startDateItems[ 0 ], finalDate = finalDateItems[ 2 ] + "-" + finalDateItems[ 1 ] + "-" + finalDateItems[ 0 ], paymentDate = paymentDateItems[ 2 ] + "-" + paymentDateItems[ 1 ] + "-" + paymentDateItems[ 0 ];

                this.subscription = {
                    id_subscription: this.actualSubscription.raw.id_subscription,
                    id_client: this.actualSubscription.raw.id_client,
                    id_route: this.actualSubscription.raw.id_route,
                    s_specification: this.actualSubscription.raw.s_specification,
                    s_start_date: startDate,
                    s_final_date: finalDate,
                    s_payment_date: paymentDate,
                    s_payment_type: this.actualSubscription.raw.s_payment_type,
                    s_total: this.actualSubscription.raw.s_total,
                };
            }
        },

        async getAllSubscriptionsByClient(idClient) {
            const apiData = await this.axios.get("meal/subscription/" + idClient);

            this.subscriptions = apiData.data;
        },

        async addSubscription() {
            await this.axios.post("meal/subscription/addSubscription", this.subscription);

            this.subscription = {
                id_subscription: 0,
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

        async editSubscription() {
            await this.axios.put("meal/subscription/editSubscription", this.subscription);

            this.subscription = {
                id_subscription: 0,
                id_client: 0,
                id_route: 0,
                s_specification: "",
                s_start_date: "",
                s_final_date: "",
                s_payment_date: "",
                s_payment_type: "",
                s_total: "",
            };

            this.closeFunction();
        },
    },
};
</script>
