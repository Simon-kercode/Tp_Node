<template> 
    <v-card class="fond-clair elevation-0" color="#FCF9F4">
      <v-row no-gutters class="d-flex justify-center">
        <v-col cols="12" md="4" class="pa-5 w-50">
          <v-img
            v-if="bestSeller.illustration"
           :src="`/uploads/productsImages/${bestSeller.illustration}`"
            aspect-ratio="1"
            max-height="300"
          ></v-img>
        </v-col>
        <v-col cols="12" md="4" class="align-self-center " :style="{ width: !isMobile ? '100%' : '70%'}">
          <v-card-title class="pb-5">LE PRODUIT BEST-SELLER</v-card-title>
          <v-card-title class="pb-5">{{ bestSeller.produit_nom }}</v-card-title>
          <v-card-text class="pt-5" >
            {{ bestSeller.description }}
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>

  </template>
  
<script setup>

import { ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDisplay } from 'vuetify'
import { useProductStore } from '../stores/productStore'
import brosse from "../assets/images/brosse-nettoyante.jpg"

const productStore = useProductStore();
const {__ListProducts} = productStore;
const { mobile } = useDisplay() // Détecte si on est sur mobile
const isMobile = computed(() => mobile.value) // Variable réactive pour mobile

const bestSeller = ref({});

watch(() => __ListProducts, (newList) => {
  if (newList.length > 0) {
    bestSeller.value = newList.find(product => product.id_produit === 1);
  }
}, { immediate: true });

</script>

<style scoped>
.product-card {
  background-color: #ffdada; /* Couleur de fond grise */
  box-shadow: none !important;
}
</style>