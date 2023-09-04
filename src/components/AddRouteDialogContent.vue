<script setup>
</script>

<template>
    <v-card>
        <v-toolbar color="primary" title="Agregar Ruta"></v-toolbar>
        <v-card-text>
            <v-form v-model="validRoute">
                <v-container>
                    <v-text-field v-model="route.r_name" :rules="rNameRules" label="Nombre Ruta" required></v-text-field>
                    <v-text-field v-model="route.r_color" :rules="rColorRules" label="Color" required></v-text-field>
                </v-container>
            </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
            <v-btn variant="text" @click="closeFunction()">Cerrar</v-btn>
            <v-btn variant="text" color="primary" @click="addRoute()">Agregar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "AddRouteDialogContent",

    props: {
        closeFunction: Function,
    },

    data: () => ({
        validRoute: true,

        rNameRules: [],
        rColorRules: [],

        route: {
            r_name: "",
            r_color: "",
        },
    }),

    created() {
    },

    methods: {
        async addRoute() {
            await this.axios.post("meal/route/addRoute", this.route);

            this.route = {
                r_name: "",
                r_color: "",
            };

            this.closeFunction();
        },
    },
};
</script>
