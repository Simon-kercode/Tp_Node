<template>
  <v-app>
    <v-container>
      <Header v-if="!isAuthPage"/>
    </v-container>
    <v-main id="main">
      <router-view></router-view>
    </v-main>
      <Footer v-if="!isAuthPage"/>
  </v-app>

</template>

<script setup>
import {ref, computed} from 'vue';
import { useRoute } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

const route = useRoute();
const isAuthPage = computed(() => route.path === '/login');

</script>

<style scoped>

</style>
