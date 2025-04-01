<template>
  <v-container v-if="product">
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="4">
        <v-img 
          :src="`/uploads/productsImages/${product.illustration}`" 
          height="400" 
          cover
          class="rounded-lg"
        ></v-img>
      </v-col>
      
      <v-col cols="12" md="5">
        <h1 class="text-h4 mb-4">{{ product.produit_nom }}</h1>
        <p class="text-body-1 mb-4">{{ product.description }}</p>
        <v-divider class="mb-4"></v-divider>
        <p class="text-h5 mb-4">Prix : {{ product.prix }} €</p>
        <v-row>
          <v-col cols="4" sm="4" class="d-flex">
            <v-btn 
              icon="mdi-minus"
              @click="decrement"
              class="square-btn"
            ></v-btn>

            <v-text-field
              class="mx-1 text-center"
              min-width="50"
              max-width="100"
              type="number"
              v-model="quantity"
              density="compact"
              min="1"
            ></v-text-field>

            <v-btn 
              icon="mdi-plus"
              @click="increment"
              class="square-btn"
            ></v-btn>
          </v-col>
          <v-col cols="12" sm="8">
            <v-btn class="custom-btn" x-large block @click="addToCart(product, quantity)">
              Ajouter au panier
            </v-btn>          
          </v-col>          
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <v-container v-else>
    <v-alert v-if="error" type="error">
      Produit non trouvé
    </v-alert>
    <v-progress-circular v-else indeterminate></v-progress-circular>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '../stores/productStore';
import { useOrderStore } from '../stores/orderStore';

const route = useRoute();
const productStore = useProductStore();
const orderStore = useOrderStore();
const product = ref(null);
const error = ref(false);
const quantity = ref(1);

// Empêche les valeurs négatives ou nulles entrées à la main
watch(quantity, (val) => {
  if (val < 1) quantity.value = 1; 
});

onMounted(() => {
  // Convertir l'ID en nombre
  const productId = parseInt(route.params.id);
  
  // Chercher dans les produits déjà chargés
  const foundProduct = productStore.__ListProducts.find(
    p => p.id_produit === productId
  );

  if (foundProduct) {
    product.value = foundProduct;
  } else {
    error.value = true;
    console.error(`Produit avec l'ID ${productId} non trouvé dans le store`);
  }
});

function increment() {
  quantity.value++;
}
function decrement() {
  if (quantity.value <= 1 ) return;
  quantity.value--
}

function addToCart(product, number) {
  orderStore.addProductToCart(product, number);
}
</script>

<style scoped>

</style>
