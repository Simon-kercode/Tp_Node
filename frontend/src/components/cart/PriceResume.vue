<template>
    <v-col cols="12" :lg="isValidate ? 12 : 4">
        <v-card class="fond-clair me-2 mb-2">
            <v-card-title>Montant de votre commande</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-list>
                    <v-list-item>
                        <strong>SOUS TOTAL :</strong> {{ subTotal }} €
                    </v-list-item>
                    <v-list-item>
                        <strong>TVA (20%) :</strong> {{ tva }} €
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                        <strong>TOTAL :</strong> {{ total }} €
                    </v-list-item>
                </v-list>
            </v-card-text>
            <v-card-actions class="w-100" v-if="!isValidate">
                <v-btn to="/commande" class="custom-btn w-100">Passer au paiement</v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script setup>
    import { computed, onMounted, defineProps } from 'vue';
    import { useOrderStore } from '../../stores/orderStore';

    const props = defineProps({
        isValidate: Boolean
    });
    const emits = defineEmits(["total"])
    
    const orderStore = useOrderStore();

    const subTotal = computed(() => {
        return Number(orderStore.cartContent
            .reduce((sum, item) => sum + item.prix * item.quantity, 0)
            .toFixed(2)
        );
    });

    const tva = computed(() => Number((subTotal.value * 0.2).toFixed(2)));

    const total = computed(() => Number((subTotal.value + tva.value).toFixed(2)));
    
    onMounted(() => {
        emits("total", total.value);
    })
</script>