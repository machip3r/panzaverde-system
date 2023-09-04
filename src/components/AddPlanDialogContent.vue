<script setup>
</script>

<template>
    <v-card>
        <v-toolbar color="primary" title="Agregar Plan"></v-toolbar>
        <v-card-text>
            <v-form v-model="validPlan">
                <v-container>
                    <v-select label="Plan" v-model="defaultPlan" :items="defaultPlans"></v-select>
                    <v-select label="Cliente" v-model="id_client" :items="clients" item-title="c_name"
                        item-value="id_client"></v-select>
                    <v-select label="Subscripción" v-model="id_subscription" :items="subscriptions"
                        item-title="s_start_date" item-value="id_subscription"></v-select>
                    <v-btn class="mt-2" size="large" @click="addDefaultPlan()" v-if="defaultPlan != ''">
                        Aceptar
                    </v-btn>
                    <v-row class="mt-2">
                        <v-col cols="12" md="12">
                            <v-card class="mx-auto">
                                <v-card-title class="text-h6 font-weight-regular justify-space-between">
                                    <span>Días</span>
                                </v-card-title>

                                <v-window v-model="step">
                                    <v-window-item :value="1">
                                        <v-card-text>
                                            <v-row>
                                                <v-checkbox label="Lunes" v-model="mondayCheck" value="Lunes"></v-checkbox>
                                            </v-row>
                                            <v-row>
                                                <v-checkbox label="Martes" v-model="tuesdayCheck"
                                                    value="Martes"></v-checkbox>
                                            </v-row>
                                            <v-row>
                                                <v-checkbox label="Miercoles" v-model="wednesdayCheck"
                                                    value="Miercoles"></v-checkbox>
                                            </v-row>
                                            <v-row>
                                                <v-checkbox label="Jueves" v-model="thursdayCheck"
                                                    value="Jueves"></v-checkbox>
                                            </v-row>
                                            <v-row>
                                                <v-checkbox label="Viernes" v-model="fridayCheck"
                                                    value="Viernes"></v-checkbox>
                                            </v-row>
                                        </v-card-text>
                                    </v-window-item>

                                    <v-window-item :value="2" v-if="mondayCheck">
                                        <v-card-text>
                                            Lunes
                                            <v-checkbox label="Desayuno" v-model="mondayBreakfastCheck"
                                                value="Desayuno"></v-checkbox>
                                            <v-row>
                                                <v-checkbox label="Normal" v-model="mondayBreakfastNormalCheck"
                                                    value="Normal" v-if="mondayBreakfastCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.LDN" type="number" label="Cantidad"
                                                    v-if="mondayBreakfastCheck && mondayBreakfastNormalCheck">
                                                </v-text-field>
                                                <v-checkbox label="Keto" v-model="mondayBreakfastKetoCheck" value="Keto"
                                                    v-if="mondayBreakfastCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.LDK" type="number" label="Cantidad"
                                                    v-if="mondayBreakfastCheck && mondayBreakfastKetoCheck">
                                                </v-text-field>
                                                <v-checkbox label="Especial" v-model="mondayBreakfastSpecialCheck"
                                                    value="Especial" v-if="mondayBreakfastCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.LDE" type="number" label="Cantidad"
                                                    v-if="mondayBreakfastCheck && mondayBreakfastSpecialCheck">
                                                </v-text-field>
                                            </v-row>

                                            <v-checkbox label="Comida" v-model="mondayMealCheck"
                                                value="Comida"></v-checkbox>
                                            <v-row>
                                                <v-checkbox label="Normal" v-model="mondayMealNormalCheck" value="Normal"
                                                    v-if="mondayMealCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.LCN" type="number" label="Cantidad"
                                                    v-if="mondayMealCheck && mondayMealNormalCheck">
                                                </v-text-field>
                                                <v-checkbox label="Keto" v-model="mondayMealKetoCheck" value="Keto"
                                                    v-if="mondayMealCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.LCK" type="number" label="Cantidad"
                                                    v-if="mondayMealCheck && mondayMealKetoCheck">
                                                </v-text-field>
                                                <v-checkbox label="Especial" v-model="mondayMealSpecialCheck"
                                                    value="Especial" v-if="mondayMealCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.LCE" type="number" label="Cantidad"
                                                    v-if="mondayMealCheck && mondayMealSpecialCheck">
                                                </v-text-field>
                                            </v-row>

                                            <v-checkbox label="Cena" v-model="mondayDinnerCheck" value="Cena"></v-checkbox>
                                            <v-row>
                                                <v-checkbox label="Normal" v-model="mondayDinnerNormalCheck" value="Normal"
                                                    v-if="mondayDinnerCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.LCNN" type="number" label="Cantidad"
                                                    v-if="mondayDinnerCheck && mondayDinnerNormalCheck">
                                                </v-text-field>
                                                <v-checkbox label="Keto" v-model="mondayDinnerKetoCheck" value="Keto"
                                                    v-if="mondayDinnerCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.LCNK" type="number" label="Cantidad"
                                                    v-if="mondayDinnerCheck && mondayDinnerKetoCheck">
                                                </v-text-field>
                                                <v-checkbox label="Especial" v-model="mondayDinnerSpecialCheck"
                                                    value="Especial" v-if="mondayDinnerCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.LCNE" type="number" label="Cantidad"
                                                    v-if="mondayDinnerCheck && mondayDinnerSpecialCheck">
                                                </v-text-field>
                                            </v-row>
                                        </v-card-text>
                                    </v-window-item>

                                    <v-window-item :value="3" v-if="tuesdayCheck">
                                        <v-card-text>
                                            Martes
                                            <v-checkbox label="Desayuno" v-model="tuesdayBreakfastCheck"
                                                value="Desayuno"></v-checkbox>
                                            <v-row>
                                                <v-checkbox label="Normal" v-model="tuesdayBreakfastNormalCheck"
                                                    value="Normal" v-if="tuesdayBreakfastCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.MDN" type="number" label="Cantidad"
                                                    v-if="tuesdayBreakfastCheck && tuesdayBreakfastNormalCheck">
                                                </v-text-field>
                                                <v-checkbox label="Keto" v-model="tuesdayBreakfastKetoCheck" value="Keto"
                                                    v-if="tuesdayBreakfastCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.MDK" type="number" label="Cantidad"
                                                    v-if="tuesdayBreakfastCheck && tuesdayBreakfastKetoCheck">
                                                </v-text-field>
                                                <v-checkbox label="Especial" v-model="tuesdayBreakfastSpecialCheck"
                                                    value="Especial" v-if="tuesdayBreakfastCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.MDE" type="number" label="Cantidad"
                                                    v-if="tuesdayBreakfastCheck && tuesdayBreakfastSpecialCheck">
                                                </v-text-field>
                                            </v-row>

                                            <v-checkbox label="Comida" v-model="tuesdayMealCheck"
                                                value="Comida"></v-checkbox>
                                            <v-row>
                                                <v-checkbox label="Normal" v-model="tuesdayMealNormalCheck" value="Normal"
                                                    v-if="tuesdayMealCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.MCN" type="number" label="Cantidad"
                                                    v-if="tuesdayMealCheck && tuesdayMealNormalCheck">
                                                </v-text-field>
                                                <v-checkbox label="Keto" v-model="tuesdayMealKetoCheck" value="Keto"
                                                    v-if="tuesdayMealCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.MCK" type="number" label="Cantidad"
                                                    v-if="tuesdayMealCheck && tuesdayMealKetoCheck">
                                                </v-text-field>
                                                <v-checkbox label="Especial" v-model="tuesdayMealSpecialCheck"
                                                    value="Especial" v-if="tuesdayMealCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.MCE" type="number" label="Cantidad"
                                                    v-if="tuesdayMealCheck && tuesdayMealSpecialCheck">
                                                </v-text-field>
                                            </v-row>

                                            <v-checkbox label="Cena" v-model="tuesdayDinnerCheck" value="Cena"></v-checkbox>
                                            <v-row>
                                                <v-checkbox label="Normal" v-model="tuesdayDinnerNormalCheck" value="Normal"
                                                    v-if="tuesdayDinnerCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.MCNN" type="number" label="Cantidad"
                                                    v-if="tuesdayDinnerCheck && tuesdayDinnerNormalCheck">
                                                </v-text-field>
                                                <v-checkbox label="Keto" v-model="tuesdayDinnerKetoCheck" value="Keto"
                                                    v-if="tuesdayDinnerCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.MCNK" type="number" label="Cantidad"
                                                    v-if="tuesdayDinnerCheck && tuesdayDinnerKetoCheck">
                                                </v-text-field>
                                                <v-checkbox label="Especial" v-model="tuesdayDinnerSpecialCheck"
                                                    value="Especial" v-if="tuesdayDinnerCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.MCNE" type="number" label="Cantidad"
                                                    v-if="tuesdayDinnerCheck && tuesdayDinnerSpecialCheck">
                                                </v-text-field>
                                            </v-row>
                                        </v-card-text>
                                    </v-window-item>

                                    <v-window-item :value="4" v-if="wednesdayCheck">
                                        <v-card-text>
                                            Miércoles
                                            <v-checkbox label="Desayuno" v-model="wednesdayBreakfastCheck"
                                                value="Desayuno"></v-checkbox>
                                            <v-row>
                                                <v-checkbox label="Normal" v-model="wednesdayBreakfastNormalCheck"
                                                    value="Normal" v-if="wednesdayBreakfastCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.MiDN" type="number" label="Cantidad"
                                                    v-if="wednesdayBreakfastCheck && wednesdayBreakfastNormalCheck">
                                                </v-text-field>
                                                <v-checkbox label="Keto" v-model="wednesdayBreakfastKetoCheck" value="Keto"
                                                    v-if="wednesdayBreakfastCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.MiDK" type="number" label="Cantidad"
                                                    v-if="wednesdayBreakfastCheck && wednesdayBreakfastKetoCheck">
                                                </v-text-field>
                                                <v-checkbox label="Especial" v-model="wednesdayBreakfastSpecialCheck"
                                                    value="Especial" v-if="wednesdayBreakfastCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.MiDE" type="number" label="Cantidad"
                                                    v-if="wednesdayBreakfastCheck && wednesdayBreakfastSpecialCheck">
                                                </v-text-field>
                                            </v-row>

                                            <v-checkbox label="Comida" v-model="wednesdayMealCheck"
                                                value="Comida"></v-checkbox>
                                            <v-row>
                                                <v-checkbox label="Normal" v-model="wednesdayMealNormalCheck" value="Normal"
                                                    v-if="wednesdayMealCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.MiCN" type="number" label="Cantidad"
                                                    v-if="wednesdayMealCheck && wednesdayMealNormalCheck">
                                                </v-text-field>
                                                <v-checkbox label="Keto" v-model="wednesdayMealKetoCheck" value="Keto"
                                                    v-if="wednesdayMealCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.MiCK" type="number" label="Cantidad"
                                                    v-if="wednesdayMealCheck && wednesdayMealKetoCheck">
                                                </v-text-field>
                                                <v-checkbox label="Especial" v-model="wednesdayMealSpecialCheck"
                                                    value="Especial" v-if="wednesdayMealCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.MiCE" type="number" label="Cantidad"
                                                    v-if="wednesdayMealCheck && wednesdayMealSpecialCheck">
                                                </v-text-field>
                                            </v-row>

                                            <v-checkbox label="Cena" v-model="wednesdayDinnerCheck"
                                                value="Cena"></v-checkbox>
                                            <v-row>
                                                <v-checkbox label="Normal" v-model="wednesdayDinnerNormalCheck"
                                                    value="Normal" v-if="wednesdayDinnerCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.MiCNN" type="number" label="Cantidad"
                                                    v-if="wednesdayDinnerCheck && wednesdayDinnerNormalCheck">
                                                </v-text-field>
                                                <v-checkbox label="Keto" v-model="wednesdayDinnerKetoCheck" value="Keto"
                                                    v-if="wednesdayDinnerCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.MiCNK" type="number" label="Cantidad"
                                                    v-if="wednesdayDinnerCheck && wednesdayDinnerKetoCheck">
                                                </v-text-field>
                                                <v-checkbox label="Especial" v-model="wednesdayDinnerSpecialCheck"
                                                    value="Especial" v-if="wednesdayDinnerCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.MiCNE" type="number" label="Cantidad"
                                                    v-if="wednesdayDinnerCheck && wednesdayDinnerSpecialCheck">
                                                </v-text-field>
                                            </v-row>
                                        </v-card-text>
                                    </v-window-item>

                                    <v-window-item :value="5" v-if="thursdayCheck">
                                        <v-card-text>
                                            Jueves
                                            <v-checkbox label="Desayuno" v-model="thursdayBreakfastCheck"
                                                value="Desayuno"></v-checkbox>
                                            <v-row>
                                                <v-checkbox label="Normal" v-model="thursdayBreakfastNormalCheck"
                                                    value="Normal" v-if="thursdayBreakfastCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.JDN" type="number" label="Cantidad"
                                                    v-if="thursdayBreakfastCheck && thursdayBreakfastNormalCheck">
                                                </v-text-field>
                                                <v-checkbox label="Keto" v-model="thursdayBreakfastKetoCheck" value="Keto"
                                                    v-if="thursdayBreakfastCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.JDK" type="number" label="Cantidad"
                                                    v-if="thursdayBreakfastCheck && thursdayBreakfastKetoCheck">
                                                </v-text-field>
                                                <v-checkbox label="Especial" v-model="thursdayBreakfastSpecialCheck"
                                                    value="Especial" v-if="thursdayBreakfastCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.JDE" type="number" label="Cantidad"
                                                    v-if="thursdayBreakfastCheck && thursdayBreakfastSpecialCheck">
                                                </v-text-field>
                                            </v-row>

                                            <v-checkbox label="Comida" v-model="thursdayMealCheck"
                                                value="Comida"></v-checkbox>
                                            <v-row>
                                                <v-checkbox label="Normal" v-model="thursdayMealNormalCheck" value="Normal"
                                                    v-if="thursdayMealCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.JCN" type="number" label="Cantidad"
                                                    v-if="thursdayMealCheck && thursdayMealNormalCheck">
                                                </v-text-field>
                                                <v-checkbox label="Keto" v-model="thursdayMealKetoCheck" value="Keto"
                                                    v-if="thursdayMealCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.JCK" type="number" label="Cantidad"
                                                    v-if="thursdayMealCheck && thursdayMealKetoCheck">
                                                </v-text-field>
                                                <v-checkbox label="Especial" v-model="thursdayMealSpecialCheck"
                                                    value="Especial" v-if="thursdayMealCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.JCE" type="number" label="Cantidad"
                                                    v-if="thursdayMealCheck && thursdayMealSpecialCheck">
                                                </v-text-field>
                                            </v-row>

                                            <v-checkbox label="Cena" v-model="thursdayDinnerCheck"
                                                value="Cena"></v-checkbox>
                                            <v-row>
                                                <v-checkbox label="Normal" v-model="thursdayDinnerNormalCheck"
                                                    value="Normal" v-if="thursdayDinnerCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.JCNN" type="number" label="Cantidad"
                                                    v-if="thursdayDinnerCheck && thursdayDinnerNormalCheck">
                                                </v-text-field>
                                                <v-checkbox label="Keto" v-model="thursdayDinnerKetoCheck" value="Keto"
                                                    v-if="thursdayDinnerCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.JCNK" type="number" label="Cantidad"
                                                    v-if="thursdayDinnerCheck && thursdayDinnerKetoCheck">
                                                </v-text-field>
                                                <v-checkbox label="Especial" v-model="thursdayDinnerSpecialCheck"
                                                    value="Especial" v-if="thursdayDinnerCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.JCNE" type="number" label="Cantidad"
                                                    v-if="thursdayDinnerCheck && thursdayDinnerSpecialCheck">
                                                </v-text-field>
                                            </v-row>
                                        </v-card-text>
                                    </v-window-item>

                                    <v-window-item :value="6" v-if="fridayCheck">
                                        <v-card-text>
                                            Viernes
                                            <v-checkbox label="Desayuno" v-model="fridayBreakfastCheck"
                                                value="Desayuno"></v-checkbox>
                                            <v-row>
                                                <v-checkbox label="Normal" v-model="fridayBreakfastNormalCheck"
                                                    value="Normal" v-if="fridayBreakfastCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.VDN" type="number" label="Cantidad"
                                                    v-if="fridayBreakfastCheck && fridayBreakfastNormalCheck">
                                                </v-text-field>
                                                <v-checkbox label="Keto" v-model="fridayBreakfastKetoCheck" value="Keto"
                                                    v-if="fridayBreakfastCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.VDK" type="number" label="Cantidad"
                                                    v-if="fridayBreakfastCheck && fridayBreakfastKetoCheck">
                                                </v-text-field>
                                                <v-checkbox label="Especial" v-model="fridayBreakfastSpecialCheck"
                                                    value="Especial" v-if="fridayBreakfastCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.VDE" type="number" label="Cantidad"
                                                    v-if="fridayBreakfastCheck && fridayBreakfastSpecialCheck">
                                                </v-text-field>
                                            </v-row>

                                            <v-checkbox label="Comida" v-model="fridayMealCheck"
                                                value="Comida"></v-checkbox>
                                            <v-row>
                                                <v-checkbox label="Normal" v-model="fridayMealNormalCheck" value="Normal"
                                                    v-if="fridayMealCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.VCN" type="number" label="Cantidad"
                                                    v-if="fridayMealCheck && fridayMealNormalCheck">
                                                </v-text-field>
                                                <v-checkbox label="Keto" v-model="fridayMealKetoCheck" value="Keto"
                                                    v-if="fridayMealCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.VCK" type="number" label="Cantidad"
                                                    v-if="fridayMealCheck && fridayMealKetoCheck">
                                                </v-text-field>
                                                <v-checkbox label="Especial" v-model="fridayMealSpecialCheck"
                                                    value="Especial" v-if="fridayMealCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.VCE" type="number" label="Cantidad"
                                                    v-if="fridayMealCheck && fridayMealSpecialCheck">
                                                </v-text-field>
                                            </v-row>

                                            <v-checkbox label="Cena" v-model="fridayDinnerCheck" value="Cena"></v-checkbox>
                                            <v-row>
                                                <v-checkbox label="Normal" v-model="fridayDinnerNormalCheck" value="Normal"
                                                    v-if="fridayDinnerCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.VCNN" type="number" label="Cantidad"
                                                    v-if="fridayDinnerCheck && fridayDinnerNormalCheck">
                                                </v-text-field>
                                                <v-checkbox label="Keto" v-model="fridayDinnerKetoCheck" value="Keto"
                                                    v-if="fridayDinnerCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.VCNK" type="number" label="Cantidad"
                                                    v-if="fridayDinnerCheck && fridayDinnerKetoCheck">
                                                </v-text-field>
                                                <v-checkbox label="Especial" v-model="fridayDinnerSpecialCheck"
                                                    value="Especial" v-if="fridayDinnerCheck"></v-checkbox>
                                                <v-text-field v-model="this.planToAdd.VCNE" type="number" label="Cantidad"
                                                    v-if="fridayDinnerCheck && fridayDinnerSpecialCheck">
                                                </v-text-field>
                                            </v-row>
                                        </v-card-text>
                                    </v-window-item>
                                </v-window>
                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-btn v-if="step > 1" variant="text" @click="goBackPlan()">
                                        Atras
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        v-if="step < 6 && (mondayCheck || tuesdayCheck || wednesdayCheck || thursdayCheck || fridayCheck) && step != activeDays[activeDays.length - 1]"
                                        color="primary" variant="flat" @click="goNextPlan()">
                                        Siguiente
                                    </v-btn>
                                    <v-btn v-if="step == activeDays[activeDays.length - 1]" color="primary" variant="flat"
                                        @click="executePlanQueries()">
                                        Aceptar
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
            <v-btn variant="text" @click="closeFunction()">Cerrar</v-btn>
            <v-btn variant="text" color="primary" @click="addPlan()">Agregar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "AddPlanDialogContent",

    props: {
        closeFunction: Function,
    },

    data: () => ({
        validPlan: true,

        id_client: 0,
        id_subscription: 0,

        defaultPlan: "",

        step: 1,
        activeDays: [],
        planToAdd: {
            LDN: 0,
            LDK: 0,
            LDE: 0,
            LCN: 0,
            LCK: 0,
            LCE: 0,
            LCNN: 0,
            LCNK: 0,
            LCNE: 0,
            MDN: 0,
            MDK: 0,
            MDE: 0,
            MCN: 0,
            MCK: 0,
            MCE: 0,
            MCNN: 0,
            MCNK: 0,
            MCNE: 0,
            MiDN: 0,
            MiDK: 0,
            MiDE: 0,
            MiCN: 0,
            MiCK: 0,
            MiCE: 0,
            MiCNN: 0,
            MiCNK: 0,
            MiCNE: 0,
            JDN: 0,
            JDK: 0,
            JDE: 0,
            JCN: 0,
            JCK: 0,
            JCE: 0,
            JCNN: 0,
            JCNK: 0,
            JCNE: 0,
            VDN: 0,
            VDK: 0,
            VDE: 0,
            VCN: 0,
            VCK: 0,
            VCE: 0,
            VCNN: 0,
            VCNK: 0,
            VCNE: 0,
        },

        mondayCheck: false,
        tuesdayCheck: false,
        wednesdayCheck: false,
        thursdayCheck: false,
        fridayCheck: false,

        mondayBreakfastCheck: false,
        mondayBreakfastNormalCheck: false,
        mondayBreakfastKetoCheck: false,
        mondayBreakfastSpecialCheck: false,
        mondayMealCheck: false,
        mondayMealNormalCheck: false,
        mondayMealKetoCheck: false,
        mondayMealSpecialCheck: false,
        mondayDinnerCheck: false,
        mondayDinnerNormalCheck: false,
        mondayDinnerKetoCheck: false,
        mondayDinnerSpecialCheck: false,
        mondayBreakfastCheck: false,
        mondayBreakfastNormalCheck: false,
        mondayBreakfastKetoCheck: false,
        mondayBreakfastSpecialCheck: false,
        mondayMealCheck: false,
        mondayMealNormalCheck: false,
        mondayMealKetoCheck: false,
        mondayMealSpecialCheck: false,
        mondayDinnerCheck: false,
        mondayDinnerNormalCheck: false,
        mondayDinnerKetoCheck: false,
        mondayDinnerSpecialCheck: false,
        tuesdayBreakfastCheck: false,
        tuesdayBreakfastNormalCheck: false,
        tuesdayBreakfastKetoCheck: false,
        tuesdayBreakfastSpecialCheck: false,
        tuesdayMealCheck: false,
        tuesdayMealNormalCheck: false,
        tuesdayMealKetoCheck: false,
        tuesdayMealSpecialCheck: false,
        tuesdayDinnerCheck: false,
        tuesdayDinnerNormalCheck: false,
        tuesdayDinnerKetoCheck: false,
        tuesdayDinnerSpecialCheck: false,
        wednesdayBreakfastCheck: false,
        wednesdayBreakfastNormalCheck: false,
        wednesdayBreakfastKetoCheck: false,
        wednesdayBreakfastSpecialCheck: false,
        wednesdayMealCheck: false,
        wednesdayMealNormalCheck: false,
        wednesdayMealKetoCheck: false,
        wednesdayMealSpecialCheck: false,
        wednesdayDinnerCheck: false,
        wednesdayDinnerNormalCheck: false,
        wednesdayDinnerKetoCheck: false,
        wednesdayDinnerSpecialCheck: false,
        thursdayBreakfastCheck: false,
        thursdayBreakfastNormalCheck: false,
        thursdayBreakfastKetoCheck: false,
        thursdayBreakfastSpecialCheck: false,
        thursdayMealCheck: false,
        thursdayMealNormalCheck: false,
        thursdayMealKetoCheck: false,
        thursdayMealSpecialCheck: false,
        thursdayDinnerCheck: false,
        thursdayDinnerNormalCheck: false,
        thursdayDinnerKetoCheck: false,
        thursdayDinnerSpecialCheck: false,
        fridayBreakfastCheck: false,
        fridayBreakfastNormalCheck: false,
        fridayBreakfastKetoCheck: false,
        fridayBreakfastSpecialCheck: false,
        fridayMealCheck: false,
        fridayMealNormalCheck: false,
        fridayMealKetoCheck: false,
        fridayMealSpecialCheck: false,
        fridayDinnerCheck: false,
        fridayDinnerNormalCheck: false,
        fridayDinnerKetoCheck: false,
        fridayDinnerSpecialCheck: false,

        clients: [],
        subscriptions: [],
        defaultPlans: [ "PV" ],
    }),

    created() {
        this.getClients();
    },

    watch: {
        id_client: function (newIDClient) {
            this.getAllSubscriptionsByClient(newIDClient);
        },
    },

    methods: {
        async getClients() {
            const apiData = await this.axios.get("meal/client/");

            this.clients = apiData.data;
        },

        async getAllSubscriptionsByClient() {
            const apiData = await this.axios.get("meal/subscription/" + this.id_client);

            this.subscriptions = apiData.data;
        },

        async goBackPlan() {
            if (this.step == 2) this.step--;
            else
                this.step = this.activeDays[ this.activeDays.indexOf(this.step) - 1 ];
        },

        async goNextPlan() {
            if (this.step == 1) {
                if (this.mondayCheck)
                    this.activeDays.push(2);
                if (this.tuesdayCheck)
                    this.activeDays.push(3);
                if (this.wednesdayCheck)
                    this.activeDays.push(4);
                if (this.thursdayCheck)
                    this.activeDays.push(5);
                if (this.fridayCheck)
                    this.activeDays.push(6);

                this.step = this.activeDays[ 0 ];
            } else {
                /* switch (this.step) {
                    case 2:
                        if (this.LDN != 0) this.planToAdd[ "LDN" ] = this.LDN;
                        if (this.LDK != 0) this.planToAdd[ "LDK" ] = this.LDK;
                        if (this.LDE != 0) this.planToAdd[ "LDE" ] = this.LDE;
                        if (this.LCN != 0) this.planToAdd[ "LCN" ] = this.LCN;
                        if (this.LCK != 0) this.planToAdd[ "LCK" ] = this.LCK;
                        if (this.LCE != 0) this.planToAdd[ "LCE" ] = this.LCE;
                        if (this.LCNN != 0) this.planToAdd[ "LCNN" ] = this.LCNN;
                        if (this.LCNK != 0) this.planToAdd[ "LCNK" ] = this.LCNK;
                        if (this.LCNE != 0) this.planToAdd[ "LCNE" ] = this.LCNE;
                        break;
                    case 3:
                        if (this.MDN != 0) this.planToAdd[ "MDN" ] = this.MDN;
                        if (this.MDK != 0) this.planToAdd[ "MDK" ] = this.MDK;
                        if (this.MDE != 0) this.planToAdd[ "MDE" ] = this.MDE;
                        if (this.MCN != 0) this.planToAdd[ "MCN" ] = this.MCN;
                        if (this.MCK != 0) this.planToAdd[ "MCK" ] = this.MCK;
                        if (this.MCE != 0) this.planToAdd[ "MCE" ] = this.MCE;
                        if (this.MCNN != 0) this.planToAdd[ "MCNN" ] = this.MCNN;
                        if (this.MCNK != 0) this.planToAdd[ "MCNK" ] = this.MCNK;
                        if (this.MCNE != 0) this.planToAdd[ "MCNE" ] = this.MCNE;
                        break;
                    case 4:
                        if (this.MiDN != 0) this.planToAdd[ "MiDN" ] = this.MiDN;
                        if (this.MiDK != 0) this.planToAdd[ "MiDK" ] = this.MiDK;
                        if (this.MiDE != 0) this.planToAdd[ "MiDE" ] = this.MiDE;
                        if (this.MiCN != 0) this.planToAdd[ "MiCN" ] = this.MiCN;
                        if (this.MiCK != 0) this.planToAdd[ "MiCK" ] = this.MiCK;
                        if (this.MiCE != 0) this.planToAdd[ "MiCE" ] = this.MiCE;
                        if (this.MiCNN != 0) this.planToAdd[ "MiCNN" ] = this.MiCNN;
                        if (this.MiCNK != 0) this.planToAdd[ "MiCNK" ] = this.MiCNK;
                        if (this.MiCNE != 0) this.planToAdd[ "MiCNE" ] = this.MiCNE;
                        break;
                    case 5:
                        if (this.JDN != 0) this.planToAdd[ "JDN" ] = this.JDN;
                        if (this.JDK != 0) this.planToAdd[ "JDK" ] = this.JDK;
                        if (this.JDE != 0) this.planToAdd[ "JDE" ] = this.JDE;
                        if (this.JCN != 0) this.planToAdd[ "JCN" ] = this.JCN;
                        if (this.JCK != 0) this.planToAdd[ "JCK" ] = this.JCK;
                        if (this.JCE != 0) this.planToAdd[ "JCE" ] = this.JCE;
                        if (this.JCNN != 0) this.planToAdd[ "JCNN" ] = this.JCNN;
                        if (this.JCNK != 0) this.planToAdd[ "JCNK" ] = this.JCNK;
                        if (this.JCNE != 0) this.planToAdd[ "JCNE" ] = this.JCNE;
                        break;
                    case 6:
                        if (this.VDN > 0) this.planToAdd[ "VDN" ] = this.VDN;
                        if (this.VDK > 0) this.planToAdd[ "VDK" ] = this.VDK;
                        if (this.VDE > 0) this.planToAdd[ "VDE" ] = this.VDE;
                        if (this.VCN > 0) this.planToAdd[ "VCN" ] = this.VCN;
                        if (this.VCK > 0) this.planToAdd[ "VCK" ] = this.VCK;
                        if (this.VCE > 0) this.planToAdd[ "VCE" ] = this.VCE;
                        if (this.VCNN > 0) this.planToAdd[ "VCNN" ] = this.VCNN;
                        if (this.VCNK > 0) this.planToAdd[ "VCNK" ] = this.VCNK;
                        if (this.VCNE > 0) this.planToAdd[ "VCNE" ] = this.VCNE;
                        break;
                } */

                this.step = this.activeDays[ this.activeDays.indexOf(this.step) + 1 ];
            }
        },

        async executePlanQueries() {
            /* switch (this.step) {
                case 2:
                    if (this.LDN > 0) this.planToAdd[ "LDN" ] = this.LDN;
                    if (this.LDK > 0) this.planToAdd[ "LDK" ] = this.LDK;
                    if (this.LDE > 0) this.planToAdd[ "LDE" ] = this.LDE;
                    if (this.LCN > 0) this.planToAdd[ "LCN" ] = this.LCN;
                    if (this.LCK > 0) this.planToAdd[ "LCK" ] = this.LCK;
                    if (this.LCE > 0) this.planToAdd[ "LCE" ] = this.LCE;
                    if (this.LCNN > 0) this.planToAdd[ "LCNN" ] = this.LCNN;
                    if (this.LCNK > 0) this.planToAdd[ "LCNK" ] = this.LCNK;
                    if (this.LCNE > 0) this.planToAdd[ "LCNE" ] = this.LCNE;
                    break;
                case 3:
                    if (this.MDN > 0) this.planToAdd[ "MDN" ] = this.MDN;
                    if (this.MDK > 0) this.planToAdd[ "MDK" ] = this.MDK;
                    if (this.MDE > 0) this.planToAdd[ "MDE" ] = this.MDE;
                    if (this.MCN > 0) this.planToAdd[ "MCN" ] = this.MCN;
                    if (this.MCK > 0) this.planToAdd[ "MCK" ] = this.MCK;
                    if (this.MCE > 0) this.planToAdd[ "MCE" ] = this.MCE;
                    if (this.MCNN > 0) this.planToAdd[ "MCNN" ] = this.MCNN;
                    if (this.MCNK > 0) this.planToAdd[ "MCNK" ] = this.MCNK;
                    if (this.MCNE > 0) this.planToAdd[ "MCNE" ] = this.MCNE;
                    break;
                case 4:
                    if (this.MiDN > 0) this.planToAdd[ "MiDN" ] = this.MiDN;
                    if (this.MiDK > 0) this.planToAdd[ "MiDK" ] = this.MiDK;
                    if (this.MiDE > 0) this.planToAdd[ "MiDE" ] = this.MiDE;
                    if (this.MiCN > 0) this.planToAdd[ "MiCN" ] = this.MiCN;
                    if (this.MiCK > 0) this.planToAdd[ "MiCK" ] = this.MiCK;
                    if (this.MiCE > 0) this.planToAdd[ "MiCE" ] = this.MiCE;
                    if (this.MiCNN > 0) this.planToAdd[ "MiCNN" ] = this.MiCNN;
                    if (this.MiCNK > 0) this.planToAdd[ "MiCNK" ] = this.MiCNK;
                    if (this.MiCNE > 0) this.planToAdd[ "MiCNE" ] = this.MiCNE;
                    break;
                case 5:
                    if (this.JDN > 0) this.planToAdd[ "JDN" ] = this.JDN;
                    if (this.JDK > 0) this.planToAdd[ "JDK" ] = this.JDK;
                    if (this.JDE > 0) this.planToAdd[ "JDE" ] = this.JDE;
                    if (this.JCN > 0) this.planToAdd[ "JCN" ] = this.JCN;
                    if (this.JCK > 0) this.planToAdd[ "JCK" ] = this.JCK;
                    if (this.JCE > 0) this.planToAdd[ "JCE" ] = this.JCE;
                    if (this.JCNN > 0) this.planToAdd[ "JCNN" ] = this.JCNN;
                    if (this.JCNK > 0) this.planToAdd[ "JCNK" ] = this.JCNK;
                    if (this.JCNE > 0) this.planToAdd[ "JCNE" ] = this.JCNE;
                    break;
                case 6:
                    if (this.VDN > 0) this.planToAdd[ "VDN" ] = this.VDN;
                    if (this.VDK > 0) this.planToAdd[ "VDK" ] = this.VDK;
                    if (this.VDE > 0) this.planToAdd[ "VDE" ] = this.VDE;
                    if (this.VCN > 0) this.planToAdd[ "VCN" ] = this.VCN;
                    if (this.VCK > 0) this.planToAdd[ "VCK" ] = this.VCK;
                    if (this.VCE > 0) this.planToAdd[ "VCE" ] = this.VCE;
                    if (this.VCNN > 0) this.planToAdd[ "VCNN" ] = this.VCNN;
                    if (this.VCNK > 0) this.planToAdd[ "VCNK" ] = this.VCNK;
                    if (this.VCNE > 0) this.planToAdd[ "VCNE" ] = this.VCNE;
                    break;
            } */

            for (const plan in this.planToAdd) {
                if (this.planToAdd[ plan ] > 0) {
                    const data = {
                        id_subscription: this.id_subscription,
                        p_quantity: parseInt(this.planToAdd[ plan ])
                    };

                    await this.axios.post("meal/plan/addPlan" + plan, data);
                }
            }

            this.closeFunction();
        },

        async addDefaultPlan() {
            const data = {
                id_subscription: this.id_subscription, p_quantity: 1,
            };

            switch (this.defaultPlan) {
                case "PV":
                    await this.axios.post("meal/plan/addPlanLDN", data);
                    await this.axios.post("meal/plan/addPlanLCN", data);
                    await this.axios.post("meal/plan/addPlanMDN", data);
                    await this.axios.post("meal/plan/addPlanMCN", data);
                    await this.axios.post("meal/plan/addPlanMiDN", data);
                    await this.axios.post("meal/plan/addPlanMiCN", data);
                    await this.axios.post("meal/plan/addPlanJDN", data);
                    await this.axios.post("meal/plan/addPlanJCN", data);
                    await this.axios.post("meal/plan/addPlanVDN", data);
                    await this.axios.post("meal/plan/addPlanVCN", data);
                    break;
            }

            this.closeFunction();
        },
    },

    /* computed: {
  currentTitle() {
    switch (this.step) {
      case 1:
        return "Días";
      case 2:
        return "Create a password";
      default:
        return "Account created";
    }
  },
}, */
};
</script>
