<template>
    <div>
      <Categories />
      <BestSeller />
      <v-card class="pa-4 ma-2 custom-card"></v-card>
      <OurProducts />
    </div>
  </template>
  
<script setup>

import Categories from '../components//home/Categories.vue';
import BestSeller from '../components/home/BestSeller.vue'
import OurProducts from '../components/home/OurProducts.vue';

</script>

<style scoped>
 .custom-card {
  box-shadow: none !important;
}
</style>