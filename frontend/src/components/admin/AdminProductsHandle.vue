<template>
    <v-container v-if="adminStore.itemsToDisplay === 'products'">
        <v-text-field 
            v-model="searchQuery"
            label="Rechercher un produit"
            prepend-inner-icon="mdi-magnify"
            class="mb-4"
        ></v-text-field>
    
        <v-data-table
            :items="products"
            :headers="headers"
            :search="searchQuery"
            class="elevation-1"
            fixed-header
            :height="isMobile ? '400px' : ''"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon color="blue" @click="editProduct(item)" class="me-5">mdi-pencil</v-icon>
            <v-icon color="red" @click="deleteProduct(item)">mdi-trash-can-outline</v-icon>
          </template>
        </v-data-table>
    </v-container>
</template>

<script setup>
    import { ref, computed, watch} from "vue";
    import { useAdminStore } from '../../stores/adminStore';
    import { useProductStore } from '../../stores/productStore';
    import { useStore } from "../../stores/store";
    import { useDisplay } from 'vuetify';

    const adminStore = useAdminStore();
    const productStore = useProductStore();

    const { mobile } = useDisplay();
    const isMobile = computed(() => mobile.value);

    const searchQuery = ref("");

    const products = computed(() => 
        productStore.__ListProducts.map(product =>({
            ...product,
            prix: product.prix + ' €',
            categories_noms: product.categories_noms.join(', ')
        }))
    );
    
    const headers = computed(() => mobile.value ? 
  [
    { key: 'produit_nom', title: 'Nom' },
    { key: 'prix', title: 'Prix' },
    { key: "actions", title: "", sortable: false }
  ] : 
  [
    { key: 'produit_nom', title: 'Nom' },
    { key: 'prix', title: 'Prix' },
    { key: 'categories_noms', title: 'Catégories' },
    { key: "actions", title: "", sortable: false }
  ]
);

function editProduct(product) {
    productStore.toggleEditProductModale(product);
}
async function deleteProduct(product) {
    store.setConfirmMsg({
    title: "Suppression d'un produit",
    text: "Ce produit sera supprimé définitivement. Êtes vous sûr ?",
    type: "error"
  });
  const confirmation = await this.store.getConfirmation();
  if (!confirmation) return;
  productStore.deleteProduct(product);
}

</script>

