<template>
    <v-dialog v-model="editOrderModaleState" max-width="800px">
        <v-card>
            <v-card-title>Edition commande</v-card-title>
            <v-form ref="orderForm" @submit.prevent="updateOrder();">
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field
                            v-model="orderModel.date_commande"
                            label="Date de la commande"
                            readonly
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">  
                        <v-text-field
                            v-model="orderModel.total"
                            label="Total"
                            readonly
                        ></v-text-field>                           
                    </v-col>
                    <v-col cols="12" md="4">  
                        <v-text-field
                            v-model="orderModel.user_email"
                            label="Destinataire"
                            readonly
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-select
                            v-model="orderModel.statut"
                            label="Statut"
                            :items="orderStore.__ListStatus"
                            item-title="status"
                            item-value="status"
                            :rules="[requiredRule('Un statut')]"
                            required
                        >
                        </v-select>                           
                    </v-col>
                    <v-col cols="12" md="6" v-if="orderModel.statut === 'Payé'">
                        <v-text-field
                            v-model="orderModel.moyen_paiement"
                            label="Moyen de paiement"
                            readonly
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="mb-3">
                    <v-col cols="12">
                        <h4 class="text-h6 mb-2">Produits de la commande</h4>
                        <v-chip-group>
                            <v-chip v-for="product in orderModel.nom_produits" :key="product" color="primary">
                                {{ concatChip(product) }}
                            </v-chip>
                        </v-chip-group>
                    </v-col>
                </v-row>                
            </v-card-text>
            <v-card-actions class="ms-3">
                <v-btn color="success" variant="flat" type="submit">Sauvegarder</v-btn>
                <v-btn @click="close" color="error" variant="tonal">Annuler</v-btn>                    
            </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import {ref, computed} from 'vue';
    import { storeToRefs } from 'pinia';
    import { useOrderStore } from '../../stores/orderStore';
    import { requiredRule } from '../../utils/formRules';

    const orderStore = useOrderStore();
    const {editOrderModaleState} = storeToRefs(orderStore);

    const orderModel = ref({...orderStore.orderToEdit});
    const initialOrder = ref({id: orderModel.value.id_commande, statut: orderModel.value.statut});
    // const orderProducts = computed(() => 
    //     orderModel.value.nom_produits ? orderModel.value.nom_produits.split(', ') : []
    // );

    function concatChip(product) {
        if (product.quantite > 1) {
            return `${product.nom} x${product.quantite}`
        }
        return product.nom
    }

    async function updateOrder() {
        const orderData = {
            id: orderModel.value.id_commande,
            statut: orderModel.value.statut
        };

        if (JSON.stringify(orderData) !== JSON.stringify(initialOrder.value)) {
            await orderStore.updateOrder(orderData);
            close();
        }
    }
    function close() {
        orderStore.toggleEditOrderModale();
        orderStore.orderToEdit = null;
    }


</script>