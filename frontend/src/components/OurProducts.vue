<template>
      <h2 class="text-center mb-5">DÉCOUVREZ NOS PRODUITS</h2>
      <v-row justify="center" class="products">
        <v-col cols="12" md="3" v-for="n in 8" :key="n">
          <v-card class="custom-card">
            <v-img
              :src="brosse"
              height="200px"
            >
            </v-img>
            <v-card-text>
              Lorem ipsum dolor sit amet consectetur adipiscing elit, ridiculus tristique ligula in
              sociosqu tempor euismod, suscipit pretium ultrices donec rhoncus nisl.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  </template>
  
  <script setup>

  import { ref, computed } from 'vue'
  import { useDisplay } from 'vuetify'
  import brosse from "../assets/images/brosse-nettoyante.jpg"
  const { mobile } = useDisplay() // Détecte si on est sur mobile
  const isMobile = computed(() => mobile.value) // Variable réactive pour mobile
  
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
 
  </style>
  