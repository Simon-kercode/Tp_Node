<template>
    <v-container>
        <h1>Résumé de votre commande</h1>
        <v-btn to="/panier" class="custom-btn mb-3" density="comfortable" prepend-icon="mdi-arrow-left">Retourner au panier</v-btn>
        <div class="d-flex flex-column align-center">
            <CartContent :isValidate="true"/>   
            <Payment />
        </div>
    </v-container>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { useOrderStore } from '../stores/orderStore';
    import CartContent from '../components/cart/CartContent.vue';
    import Payment from '../components/Payment.vue';


    const orderStore = useOrderStore();

</script>