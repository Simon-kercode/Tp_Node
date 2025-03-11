<template>
  <v-container class="mb-5">
      <h2 class="text-center mb-5">AUTRES PRODUITS LES PLUS VENDUS</h2>
      <v-row justify="center">
        <v-col cols="12" md="3" v-for="product in products" :key="product.id_produit">
          <v-card class="custom-card ma-3">
            <v-img
              v-if="product.illustration"
              :src="`/uploads/productsImages/${product.illustration}`"
              height="200"
              width="100%"
              cover
            >
            </v-img>
            <v-card-title>{{ product.produit_nom }}</v-card-title>
            <v-card-text class="truncate-text">
              {{product.description}}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>    
  </v-container>

  </template>
  
  <script setup>

  import { ref, computed, watch } from 'vue'
  import { useDisplay } from 'vuetify'
  import { useProductStore } from '../stores/productStore'
  import brosse from "../assets/images/brosse-nettoyante.jpg"

  const { mobile } = useDisplay() // Détecte si on est sur mobile
  const isMobile = computed(() => mobile.value) // Variable réactive pour mobile
  const productStore = useProductStore();
  const {__ListProducts} = productStore;
  
  const products = ref([...__ListProducts.filter(product => product.id_produit !== 1)]);

  </script>
  
  
  <style scoped>
  .custom-card {
  border: none !important;
  box-shadow: none !important;
}

.truncate-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

   /* Ajout de la propriété standard pour compatibilité future */
  line-clamp: 3; 
  box-orient: vertical;

  height: 60px;
}
  </style>
  