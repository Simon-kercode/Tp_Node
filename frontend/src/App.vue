<template>
  <v-app v-if="store.allDataLoaded">
    <v-container>
      <Header v-if="!isAuthPage"/>
    </v-container>
    <v-main id="main">
      <router-view></router-view>
    </v-main>
      <Footer v-if="!isAuthPage && !isAdminPage"/>
      <Snackbar v-if="store.snackbarState"/>
      <EditUserModale v-if="userStore.editUserModaleState"/>
      <EditProductModale v-if="productStore.editProductModaleState"/>
      <EditOrderModale v-if="orderStore.editOrderModaleState" />
      <EditPasswordModale v-if="userStore.editPasswordModaleState" />
      <EditCategoryModale v-if="productStore.editCategoryModaleState" />
      <ConfirmDialog v-if="store.confirmState"/>
  </v-app>

</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from './stores/store';
import { useProductStore } from './stores/productStore';
import {useAuthStore} from './stores/authStore';
import { useUserStore } from './stores/userStore';
import { useOrderStore } from './stores/orderStore';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Snackbar from './components/Snackbar.vue';
import EditUserModale from './components/admin/EditUserModale.vue';
import EditProductModale from './components/admin/EditProductModale.vue';
import EditOrderModale from './components/admin/EditOrderModale.vue';
import EditPasswordModale from './components/profil/EditPasswordModale.vue';
import EditCategoryModale from './components/admin/EditCategoryModale.vue';
import ConfirmDialog from './components/ConfirmDialog.vue';

const route = useRoute();
const isAuthPage = computed(() => route.path === '/login');
const isAdminPage = computed(() => route.path === '/admin');
const store = useStore();
const productStore = useProductStore();
const authStore = useAuthStore();
const userStore = useUserStore();
const orderStore = useOrderStore();

// Quand le composant est monté, on charge tous les produits, les catégories et l'utilisateur connecté (si son token est toujours valide)
onMounted(async () => {
  await productStore.getListProducts();
  await productStore.getListCategories();
  await authStore.initializeAuth();
  await orderStore.loadCart();

  store.allDataLoaded = true;
})
</script>

<style scoped>

</style>
