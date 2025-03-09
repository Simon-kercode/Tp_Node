<template>
  <v-container class="mb-5">
      <h2 class="text-center mb-5">AUTRES PRODUITS LES PLUS VENDUS</h2>
      <v-row justify="center" class="products">
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

  // watch(() => __ListProducts, (newList) => {
  //   if (newList.length > 0) {
  //     products.value = newList.find(product => product.id_produit === 1);
  //     console.log(bestSeller.value);
  //     console.log(bestSeller.value.illustration);
  //   }
  // }, { immediate: true });
  </script>
  
  
  <style scoped>
  .custom-card {
  border: none !important;
  box-shadow: none !important;
  background-color: #ffdada;
}

.products{
  background-color: #ffdada;
}

.truncate-text {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

   /* Ajout de la propriété standard pour compatibilité future */
  line-clamp: 5; 
  box-orient: vertical;

  height: 100px;
}
  </style>
  