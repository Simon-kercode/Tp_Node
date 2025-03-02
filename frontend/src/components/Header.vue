<template>
    <v-app-bar>
      <!-- Logo et Titre -->
      <template v-slot:prepend>
        <v-app-bar-nav-icon v-if="isMobile" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-img :src="logo" contain height="50" width="50"></v-img>
      </template>

      <v-app-bar-title>PawShop</v-app-bar-title>
      <!-- Liens desktop -->
        <v-btn v-if="!isMobile" variant="text" to="/">Accueil</v-btn>
        <v-btn v-if="!isMobile" variant="text" to="/boutique">Boutique</v-btn>
        <v-btn v-if="!isMobile" variant="text" to="/contact">Contact</v-btn>
      <template v-slot:append>
        <v-btn>
            <v-icon size="32">mdi-account</v-icon>
        </v-btn>
        <v-btn>
            <v-icon size="32">mdi-cart</v-icon>
        </v-btn>
      </template>
    </v-app-bar>
  
    <!-- Menu Burger -->
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item to="/" @click=toggleDrawer>Accueil</v-list-item>
        <v-list-item to="/boutique" @click=toggleDrawer>Boutique</v-list-item>
        <v-list-item to="/contact" @click=toggleDrawer>Contact</v-list-item>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useDisplay } from 'vuetify'
  import logo from '../assets/images/logo.png';
  
  const { mobile } = useDisplay() // Détecte si on est sur mobile
  const isMobile = computed(() => mobile.value) // Variable réactive pour mobile
  const drawer = ref(false) // Gère l'ouverture du menu mobile

  function toggleDrawer() {
    drawer.value = !drawer.value
  }
  </script>

<style scoped>

</style>