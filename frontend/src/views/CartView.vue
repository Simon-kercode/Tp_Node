<template>
    <v-container class="my-5">
        <v-card variant="text">
            <v-card-title class="text-center text-h4">Votre panier</v-card-title>
            <v-card-text>
                <v-row v-if="orderStore.quantityInCart > 0">
                    <CartContent />
                    <PriceResume />                  
                </v-row>
                <div v-else class="text-center mt-5">Votre panier est vide.</div>                
            </v-card-text>
        </v-card>    
    </v-container>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import { useOrderStore } from '../stores/orderStore';
    import CartContent from '../components/cart/CartContent.vue';
    import PriceResume from '../components/cart/PriceResume.vue';

    const orderStore = useOrderStore();

</script>

<style scoped>

</style>