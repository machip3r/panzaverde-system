<script setup>
</script>

<template>
    <v-card>
        <v-toolbar color="error" title="Eliminar Cliente"></v-toolbar>
        <v-card-text>
            ¿Estás seguro?
            <br>
            Esta acción es irreversible
        </v-card-text>
        <v-card-actions class="justify-end">
            <v-btn variant="text" @click="closeFunction()">Cerrar</v-btn>
            <v-btn variant="text" color="error" @click="removeClient()">Eliminar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "RemoveClientDialogContent",

    props: {
        closeFunction: Function,
        actualClient: Object,
    },

    data: () => ({
        client: {
            id_client: 0,
        },
    }),

    created() {
        this.checkClient();
    },

    methods: {
        async checkClient() {
            if (typeof this.actualClient.raw !== "undefined") {
                //this.client = await this.axios.get("meal/client/" + this.actualClient.raw.id_client);
                this.client = {
                    id_client: this.actualClient.raw.id_client,
                };
            }
        },

        async removeClient() {
            await this.axios.delete("meal/client/removeClient/" + this.client.id_client);

            this.client = {
                id_client: 0,
            };

            this.closeFunction();
        },
    },
};
</script>
