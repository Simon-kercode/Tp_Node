<template>
    <v-container>
        <h1>Résumé de votre commande</h1>
        <v-btn to="/panier" class="custom-btn mb-3" density="comfortable" prepend-icon="mdi-arrow-left">Retourner au panier</v-btn>
        <v-row class="d-flex flex-column align-center">
            <!-- <div class="d-flex flex-column flex-md-row"> -->
               <CartContent :isValidate="true"/>   
               <!-- <PriceResume /> -->
            <!-- </div> -->

            <Payment />
        </v-row>
    </v-container>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { useOrderStore } from '../stores/orderStore';
    import CartContent from '../components/cart/CartContent.vue';
    import PriceResume from '../components/cart/PriceResume.vue';
    import Payment from '../components/cart/Payment.vue';


    const orderStore = useOrderStore();

</script>