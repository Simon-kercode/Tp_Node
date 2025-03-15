<template>
    <v-container>
      <v-card class="product-detail" elevation="0">
        <v-row>
          <v-col cols="12" md="6">
            <v-img
              v-if="product.illustration"
              :src="`/uploads/productsImages/${product.illustration}`"
              height="400"
              cover
              class="rounded-lg"
            ></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <h1 class="text-h4 mb-4">{{ product.produit_nom }}</h1>
            <p class="text-body-1 mb-4">{{ product.description }}</p>
            <v-divider class="mb-4"></v-divider>
            <p class="text-h5 mb-4">Prix : {{ product.prix }} €</p>
            <v-btn color="primary" x-large block @click="addToCart">
              Ajouter au panier
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useDisplay } from 'vuetify'
  import { useProductStore } from '../stores/productStore'
  
  const { mobile } = useDisplay() // Détecte si on est sur mobile
  const isMobile = computed(() => mobile.value) // Variable réactive pour mobile
  
  const productStore = useProductStore();
  const { __ListProducts } = productStore;
  
  // Supposons que nous recevons l'ID du produit en tant que prop
  const props = defineProps({
    productId: {
      type: Number,
      required: true
    }
  })
  
  const product = computed(() => {
    return __ListProducts.find(p => p.id_produit === props.productId) || {}
  })
  
  function addToCart() {
    console.log(`Produit ajouté au panier : ${product.value.produit_nom}`)
    // Ajoutez ici la logique pour ajouter le produit au panier
  }
  </script>
  
  <style scoped>
  .product-detail {
    padding: 20px;
  }
  </style>
  