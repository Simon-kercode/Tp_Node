<template>
  <v-app>
    <v-container>
      <Header v-if="!isAuthPage"/>
    </v-container>
    <v-main id="main">
      <router-view></router-view>
    </v-main>
      <Footer v-if="!isAuthPage"/>
      <Snackbar v-if="store.snackbarState"/>
  </v-app>

</template>

<script setup>
import {ref, computed} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from './stores/store';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Snackbar from './components/Snackbar.vue';

const route = useRoute();
const isAuthPage = computed(() => route.path === '/login');
const store = useStore()

</script>

<style scoped>

</style>
