<template>
    <v-container>
        <h2 class="text-h3 text-center mb-6">Notre Boutique</h2>
      <!-- Filtres -->
      <v-row class="mb-6">
        <v-col cols="12" md="6">
          <v-select
            v-model="selectedCategory"
            :items="categories"
            label="Catégorie"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="selectedAnimal"
            :items="animals"
            label="Animal"
            outlined
          ></v-select>
        </v-col>

      </v-row>
  
      <!-- Liste des produits -->
      <v-row>
        <v-col v-for="product in filteredProducts" :key="product.id" cols="12" sm="6" md="4" lg="3">
          <v-card>
            <v-img :src="product.image" height="200px" cover></v-img>
            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-text>
              <div>{{ product.description }}</div>
              <div class="mt-2 text-h6 font-weight-bold">{{ product.price }} €</div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" block @click="addToCart(product)">
                Ajouter au panier
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>

import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';

const router = useRouter();

const products = ref([
  { id: 1, name: "Croquettes Premium", description: "Pour chiens adultes", price: 29.99, image: "https://i.pinimg.com/736x/dc/ce/c6/dccec64215e05c2860e87ac69d02df34.jpg", category: "Nourriture", animal: "Chien" },
  { id: 2, name: "Jouet Interactif", description: "Pour chats joueurs", price: 12.99, image: "https://i.pinimg.com/736x/dc/ce/c6/dccec64215e05c2860e87ac69d02df34.jpg", category: "Jouets", animal: "Chat" },
  { id: 2, name: "Accessoires", description: "Pour chats joueurs", price: 12.99, image: "https://i.pinimg.com/736x/dc/ce/c6/dccec64215e05c2860e87ac69d02df34.jpg", category: "Accessoires", animal: "Chien" },
  { id: 2, name: "Jouet Interactif", description: "Pour chats joueurs", price: 12.99, image: "https://i.pinimg.com/736x/dc/ce/c6/dccec64215e05c2860e87ac69d02df34.jpg", category: "Jouets", animal: "Chat" },
  { id: 2, name: "Hygiène", description: "Pour chats joueurs", price: 12.99, image: "https://i.pinimg.com/736x/dc/ce/c6/dccec64215e05c2860e87ac69d02df34.jpg", category: "Hygiène", animal: "Chat" },
  { id: 2, name: "Hygiène TEST", description: "Pour chats joueurs", price: 12.99, image: "https://i.pinimg.com/736x/dc/ce/c6/dccec64215e05c2860e87ac69d02df34.jpg", category: "Hygiène", animal: "Chien" },
  // Ajout produits, remplacer bdd
]);

const categories = ref(["Tous", "Nourriture", "Jouets", "Accessoires", "Hygiène"]);
const animals = ref(["Tous", "Chien", "Chat"]);

const selectedCategory = ref("Tous");
const selectedAnimal = ref("Tous");
const searchQuery = ref("");

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const categoryMatch = selectedCategory.value === "Tous" || product.category === selectedCategory.value;
    const animalMatch = selectedAnimal.value === "Tous" || product.animal === selectedAnimal.value;
    const searchMatch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    return categoryMatch && animalMatch && searchMatch;
  });
});

function addToCart(product) {
  // ajout dans le panier, a faire
  console.log(`Ajout au panier : ${product.name}`);
}
  
  </script>
  