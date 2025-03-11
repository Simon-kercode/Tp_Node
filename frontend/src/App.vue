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
  </v-app>

</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from './stores/store';
import { useProductStore } from './stores/productStore';
import {useAuthStore} from './stores/authStore';
import { useUserStore } from './stores/userStore';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Snackbar from './components/Snackbar.vue';

const route = useRoute();
const isAuthPage = computed(() => route.path === '/login');
const isAdminPage = computed(() => route.path === '/admin');
const store = useStore();
const productStore = useProductStore();
const authStore = useAuthStore();
const userStore = useUserStore();

onMounted(async () => {
  await productStore.getListProducts();
  await productStore.getListCategories();
  await authStore.initializeAuth();
  await userStore.getAllUsers();
  store.allDataLoaded = true;
})
</script>

<style scoped>

</style>
