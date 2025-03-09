<template>
    <h2 class="text-center mb-5">NOS CATEGORIES</h2>
    <v-row class="border border-lg fond-sombre mb-5 px-5">  

        <v-col 
        v-for="categorie in __ListCategories" 
        :key="categorie.id_categorie" 
        class="d-flex justify-center px-5"
        cols="6"
        sm="4"
        md="2"
        >
            <v-btn 
            text
            class="category-link text-white"
            variant="flat"
            color="#F69946"
            :width="isMobile ? '100%' : '150'"
            to="boutique"
            @click="productStore.setActiveFilter((categorie.nom).toLowerCase())"
            >
            {{ categorie.nom }}
            </v-btn>
        </v-col>

    </v-row> 
</template>

<script setup>
    import { computed } from 'vue';
    import { storeToRefs } from 'pinia'
    import { useProductStore } from '../stores/productStore'
    import { useDisplay } from 'vuetify'

    const productStore = useProductStore();
    const {__ListCategories} = storeToRefs(productStore);
    const { mobile } = useDisplay() // Détecte si on est sur mobile
    const isMobile = computed(() => mobile.value) // Variable réactive pour mobile

</script>