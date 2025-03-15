<template>
    <v-container v-if="adminStore.itemsToDisplay === 'categories'">  
      <v-row>
        <v-col>
            <v-card-title>Ajouter une catégorie</v-card-title>
            <v-text-field v-model="newCategory.nom" label="Nom de la catégorie" outlined></v-text-field>
            <v-btn color="primary" block @click="addCategory">Ajouter</v-btn>
        </v-col>
  
        <v-col cols="12" md="12">
          <v-data-table
            :headers="headers"
            :items="categories"
            :search="searchQuery"
            class="elevation-1"
          >
            <template v-slot:item.products_count="{ item }">
              <span>{{ item.products ? item.products.length : 0 }}</span>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon color="blue" @click="editCategory(item)" class="me-5">mdi-pencil</v-icon>
              <v-icon color="red" @click="deleteCategory(item)">mdi-trash-can-outline</v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script setup>
import { ref, computed } from "vue";
import { useAdminStore } from '../../stores/adminStore';
import { useProductStore } from '../../stores/productStore';
import { useStore } from "../../stores/store";
import { useDisplay } from 'vuetify';
import axios from 'axios'; 

const adminStore = useAdminStore();
const productStore = useProductStore();

const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);

const store = useStore();

const searchQuery = ref("");
const categories = ref([]);
const newCategory = ref({ nom: "" });

const headers = computed(() =>
  mobile.value
    ? [
        { key: "nom", title: "Nom" },
        { key: "actions", title: "", sortable: false },
      ]
    : [
        { key: "nom", title: "Nom" },
        { key: "products_count", title: "Nombre de produits" },
        { key: "actions", title: "", sortable: false },
      ]
);

// Récupération des catégories
fetchCategories();

async function fetchCategories() {
  try {
    const response = await axios.get("http://localhost:3000/categories", {
      withCredentials: true,
    });
    categories.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
  }
}

async function addCategory() {
  try {
    await axios.post("http://localhost:3000/categories", newCategory.value, {
      withCredentials: true,
    });
    newCategory.value = { nom: "" }; // Réinitialisation du champ
    await fetchCategories(); 
  } catch (error) {
    console.error("Erreur lors de l'ajout de la catégorie:", error);
  }
}

async function editCategory(category) {
  try {
    
  } catch (error) {
    console.error("Erreur lors de la modification de la catégorie:", error);
  }
}

async function deleteCategory(category) {
  store.setConfirmMsg({
    title: "Suppression d'une catégorie",
    text: `Êtes-vous sûr de vouloir supprimer la catégorie "${category.nom}" ?`,
    type: "error",
  });

  const confirmation = await store.getConfirmation();
  if (!confirmation) return;

  try {
    await axios.delete(`http://localhost:3000/categories/${category.id_categorie}`, {
      withCredentials: true,
    });
    await fetchCategories();
  } catch (error) {
    console.error("Erreur lors de la suppression de la catégorie:", error);
  }
}



</script>