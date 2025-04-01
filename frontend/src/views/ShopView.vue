<template>
  <v-container>
    <h2 class="text-h3 text-center mb-6">Notre Boutique</h2>
    <!-- Filtres -->
    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <v-select v-model="selectedCategory" :items="categories" label="Filtrer par catégorie" item-title="nom" outlined
          multiple clearable></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-select v-model="selectedAnimal" :items="animals" label="Filtrer par animal" item-title="nom" outlined
          multiple clearable></v-select>
      </v-col>

    </v-row>

    <!-- Liste des produits -->
    <v-row>
      <v-col v-for="product in filteredProducts" :key="product.id_produit" cols="12" sm="6" md="4" lg="3">
        <!-- Utilisation de router-link pour rendre la carte cliquable -->
        <router-link :to="{ name: 'ProductDetail', params: { id: product.id_produit } }" class="text-decoration-none">
          <v-card class="h-100">
            <v-img :src="`/uploads/productsImages/${product.illustration}`" height="200px" cover></v-img>
            <v-card-title>{{ product.produit_nom }}</v-card-title>
            <v-card-text>
              <div class="truncate-text">{{ product.description }}</div>
              <div class="mt-2 text-h6 font-weight-bold">{{ product.prix }} €</div>
            </v-card-text>
          </v-card>
        </router-link>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
import { useProductStore } from '../stores/productStore';
import { ref, computed, watch } from 'vue';

const productStore = useProductStore();
const { __ListProducts, __ListCategories } = productStore;

const products = ref([...__ListProducts]);

// Gestion des catégories et animaux
const categories = ref([...__ListCategories.filter(category => category.nom !== "Chien" && category.nom !== "Chat")]);
const animals = ref([...__ListCategories.filter(category => category.nom == "Chien" || category.nom == "Chat")]);

const selectedCategory = ref(
  productStore.activFilter && categories.value.some(category => category.nom === productStore.activFilter)
    ? [productStore.activFilter]
    : []
);
const selectedAnimal = ref(
  productStore.activFilter && animals.value.some(animal => animal.nom === productStore.activFilter)
    ? [productStore.activFilter]
    : []
);

watch(() => __ListProducts, (newProducts) => {
  products.value = newProducts;
}, { immediate: true });

const filteredProducts = computed(() => {
  // Récupere les filtres sélectionnés et let met en minuscules
  const lowercasedCategories = selectedCategory.value.map(category => category.toLowerCase());
  const lowercasedAnimals = selectedAnimal.value.map(animal => animal.toLowerCase());

  // Filtrage des produits
  let filteredProducts = __ListProducts.filter(product => {
    // Filtre par catégorie
    const categoryMatch = lowercasedCategories.length === 0 || product.categories_noms.some(category => lowercasedCategories.includes(category.toLowerCase()));

    // Filtre par animal
    const animalMatch = lowercasedAnimals.length === 0 || product.categories_noms.some(category => lowercasedAnimals.includes(category.toLowerCase()));

    return categoryMatch && animalMatch;
  });
  return filteredProducts.length ? filteredProducts : [...__ListProducts];
});

function addToCart(product) {
  // ajout dans le panier, a faire
  console.log(`Ajout au panier : ${product.name}`);
}

</script>

<style scoped>
.truncate-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

   /* Ajout de la propriété standard pour compatibilité future */
  line-clamp: 3; 
  box-orient: vertical;

  height: 60px;
}
</style>