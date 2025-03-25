<template>
    <v-container class="my-5">
        <v-card>
            <v-card-title class="text-center">Votre panier</v-card-title>
            <v-row>
                <CartContent />
                <PriceResume />                  
            </v-row>
        </v-card>    
    </v-container>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import { useProductStore } from '../stores/productStore';
    import CartContent from '../components/cart/CartContent.vue';
    import PriceResume from '../components/cart/PriceResume.vue';

    const productStore = useProductStore();
    const quantity = ref(1);


</script>

<style scoped>

</style>