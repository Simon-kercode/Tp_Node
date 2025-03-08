<template>
    <h2 class="text-center mb-5">NOS CATEGORIES</h2>
    <v-card class="product-card">
      <v-row no-gutters class="d-flex justify-center">
        <v-col cols="12" md="4" class="pa-5 w-50">
          <v-img
           :src="brosse"
            aspect-ratio="1"
            max-height="300"
          ></v-img>
        </v-col>
        <v-col cols="12" md="4" class="align-self-center " :style="{ width: !isMobile ? '100%' : '70%'}">
          <v-card-title class="pb-5">LE PRODUIT BEST-SELLER</v-card-title>
          <v-card-text class="pt-5" >
            Lorem ipsum dolor sit amet consectetur adipiscing elit, ridiculus tristique ligula in
            sociosqu tempor euismod, suscipit pretium ultrices donec rhoncus nisl.
            Lorem ipsum dolor sit amet consectetur adipiscing elit, ridiculus
            tristique ligula in sociosqu tempor euismod, suscipit pretium ultrices donec rhoncus nisl.
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>

  </template>
  
  <style scoped>
  .product-card {
    background-color: #ffdada; /* Couleur de fond grise */
    box-shadow: none !important;
  }
  </style>
  
<script setup>

import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import brosse from "../assets/images/brosse-nettoyante.jpg"
const { mobile } = useDisplay() // Détecte si on est sur mobile
const isMobile = computed(() => mobile.value) // Variable réactive pour mobile

</script>

