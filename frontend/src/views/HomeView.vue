<template>
    <div>
      <BestSeller />
      <v-card class="pa-4 ma-2 custom-card"></v-card>
      <OurProducts />
    </div>
  </template>
  
<script setup>

import BestSeller from '../components/BestSeller.vue'
import OurProducts from '../components/OurProducts.vue';

</script>

<style scoped>
 .custom-card {
  box-shadow: none !important;
}
</style>