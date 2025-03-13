<template>
    <v-dialog v-model="editProductModaleState" max-width="800px">
        <v-card>
            <v-card-title>Edition produit</v-card-title>
            <v-card-text>
                <v-form @submit="prevent.updateProduct();">
                    <v-row>
                        <v-col cols="12" md="8">
                            <v-text-field
                                v-model="product.produit_nom"
                                label="Nom"
                            ></v-text-field>                            
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field
                                type="number"
                                v-model="product.prix"
                                label="Prix"
                                prefix="€"
                            ></v-text-field>                              
                        </v-col>
                    </v-row>
                    <v-textarea 
                        v-model="product.description"
                        label="Description"
                    ></v-textarea>
                </v-form>
                <v-select
                    v-model="product.id_categories"
                    label="Categories"
                    :items="categories"
                    item-title="nom"
                    item-value="id_categorie"
                    multiple
                    chips
                >
                </v-select>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="updateProduct" color="success" variant="flat">Sauvegarder</v-btn>
                <v-btn @click="close" color="error" variant="tonal">Annuler</v-btn>                    
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import {ref, computed, watch} from 'vue';
    import { storeToRefs } from 'pinia';
    import { useProductStore } from '../../stores/productStore';

    const productStore = useProductStore();
    const {editProductModaleState} = storeToRefs(productStore);
    const product = ref({
        ...productStore.productToEdit, 
        prix: parseFloat(productStore.productToEdit.prix)
    });

    const initialProduct = ref({...product});

    const categories = ref(productStore.__ListCategories);

    async function updateProduct() {
        const productData = {
            id: product.value.id_produit,
            nom: product.value.produit_nom,
            prix: product.value.prix,
            description: product.value.description,
        };

        if (JSON.stringify(userData) !== JSON.stringify(initialUser.value)) {
            await userStore.updateUser(userData);
            close();
        }
    }
    function close() {
        productStore.editProductModaleState = false,
        productStore.productToEdit = null;
    }
</script>

<style scoped>

</style>