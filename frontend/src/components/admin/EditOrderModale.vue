<template>
    <v-dialog v-model="editOrderModaleState" max-width="800px">
        <v-card>
            <v-card-title>Edition produit</v-card-title>
            <v-form ref="orderForm" @submit.prevent="updateOrder();">
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="8">                        
                    </v-col>
                    <v-col cols="12" md="4">                             
                    </v-col>
                </v-row>
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
    import {ref, reactive, watch} from 'vue';
    import { storeToRefs } from 'pinia';
    import { useOrderStore } from '../../stores/orderStore';
    import { requiredRule } from '../../utils/formRules';

    const orderStore = useOrderStore();
    const {editOrderModaleState} = storeToRefs(orderStore);

    const orderModel = ref(orderStore.orderToEdit);
    const initialOrder = ref({id: orderModel.value.id_commande, statut: orderModel.value.statut});

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