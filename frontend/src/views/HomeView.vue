<template>
    <div>
      <BestSeller />
      <v-card class="pa-4 ma-2 custom-card"></v-card>
      <OurProducts />
    </div>
  </template>
  
<script>

import BestSeller from '../components/BestSeller.vue'
import OurProducts from '../components/OurProducts.vue';
  
  export default {
    name: 'Home',
    components: {
        BestSeller,
        OurProducts
    }
  }

</script>

<style scoped>
 .custom-card {
  box-shadow: none !important;
}
</style>