<template>
    <v-container v-if="adminStore.itemsToDisplay === 'categories'">  
      <v-row>
        <v-col>
            <h1>Gestion des catégories</h1>
            <v-text-field 
                v-model="searchQuery"
                label="Rechercher une catégorie"
                prepend-inner-icon="mdi-magnify"
                class="mb-4"
            ></v-text-field>
            <v-btn 
              prepend-icon="mdi-plus" 
              class="mb-5 custom-btn" 
              color="#F69946" 
              variant="flat" 
              density="comfortable" 
              @click=addCategory
            >Ajouter une catégorie</v-btn>
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
import axios from 'axios'; 

const adminStore = useAdminStore();
const productStore = useProductStore();

const store = useStore();

const searchQuery = ref("");
const categories = ref(productStore.__ListCategories);

const headers = computed(() =>
      [
        { key: "nom", title: "Nom" },
        { key: "products_count", title: "Nombre de produits" },
        { key: "actions", title: "", sortable: false },
      ]
);


function editCategory(category) {
  productStore.isEditingCategory = true;
  productStore.toggleEditCategoryModale(category)
}
function addCategory() {
  productStore.isEditingCategory = false;
  productStore.toggleEditCategoryModale(null);
}
async function deleteCategory(category) {
  store.setConfirmMsg({
    title: "Suppression d'una catégorie",
    text: "Cette catégorie sera supprimée définitivement. Êtes vous sûr ?",
    type: "error"
  });
  const confirmation = await this.store.getConfirmation();
  if (!confirmation) return;
  productStore.deleteCategory(category);
}

</script>