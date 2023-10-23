<script setup>
</script>

<template>
    <v-card>
        <v-toolbar color="error" title="Eliminar Suscripción"></v-toolbar>
        <v-card-text>
            ¿Estás seguro?
            <br>
            Esta acción es irreversible
        </v-card-text>
        <v-card-actions class="justify-end">
            <v-btn variant="text" @click="closeFunction()">Cerrar</v-btn>
            <v-btn variant="text" color="error" @click="removeSubscription()">Eliminar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "RemoveSubscriptionDialogContent",

    props: {
        closeFunction: Function,
        actualSubscription: Object,
    },

    data: () => ({
        subscription: {
            id_subscription: 0,
        },
    }),

    created() {
        this.checkSubscription();
    },

    methods: {
        async checkSubscription() {
            if (typeof this.actualSubscription.raw !== "undefined")
                this.subscription = {
                    id_subscription: this.actualSubscription.raw.id_subscription,
                };
        },

        async removeSubscription() {
            await this.axios.delete("meal/subscription/removeSubscription/" + this.subscription.id_subscription);

            this.subscription = {
                id_subscription: 0,
            };

            this.closeFunction();
        },
    },
};
</script>
