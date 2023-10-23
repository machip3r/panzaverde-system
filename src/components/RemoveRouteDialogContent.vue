<script setup>
</script>

<template>
    <v-card>
        <v-toolbar color="error" title="Eliminar Ruta"></v-toolbar>
        <v-card-text>
            ¿Estás seguro?
            <br>
            Esta acción es irreversible
        </v-card-text>
        <v-card-actions class="justify-end">
            <v-btn variant="text" @click="closeFunction()">Cerrar</v-btn>
            <v-btn variant="text" color="error" @click="removeRoute()">Eliminar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "RemoveRouteDialogContent",

    props: {
        closeFunction: Function,
        actualRoute: Object,
    },

    data: () => ({
        route: {
            id_route: 0,
        },
    }),

    created() {
        this.checkRoute();
    },

    methods: {
        async checkRoute() {
            if (typeof this.actualRoute.raw !== "undefined")
                this.route = {
                    id_route: this.actualRoute.raw.id_route,
                };
        },

        async removeRoute() {
            await this.axios.delete("meal/route/removeRoute/" + this.route.id_route);

            this.route = {
                id_route: 0,
            };

            this.closeFunction();
        },
    },
};
</script>
