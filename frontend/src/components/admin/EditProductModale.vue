<template>
    <v-dialog v-model="editProductModaleState" max-width="800px">
        <v-card>
            <v-card-title>Edition produit</v-card-title>
            <v-card-text>
                <v-form @submit="prevent.updateProduct();" enctype="multipart/form-data">
                    <v-row>
                        <v-col cols="12" md="8">
                            <v-text-field
                                v-model="productModel.produit_nom"
                                label="Nom"
                                clearable
                            ></v-text-field>                            
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field
                                type="number"
                                v-model="productModel.prix"
                                label="Prix"
                                prefix="€"
                            ></v-text-field>                              
                        </v-col>
                    </v-row>
                    <v-textarea 
                        v-model="productModel.description"
                        label="Description"
                    ></v-textarea>
                </v-form>
                <v-select
                    v-model="productModel.id_categories"
                    label="Categories"
                    :items="categories"
                    item-title="nom"
                    item-value="id_categorie"
                    multiple
                    chips
                >
                </v-select>
                <div class="d-flex">
                    <v-file-input
                        v-model="newFile"
                        label="Illustration"
                        clearable
                        @change="handleFileChange"
                        @click:clear="clearFile"
                    ></v-file-input>
                    <v-img v-if="previewImage" :src="previewImage" height="100px"></v-img>                    
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="updateProduct" color="success" variant="flat">Sauvegarder</v-btn>
                <v-btn @click="close" color="error" variant="tonal">Annuler</v-btn>                    
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import {ref, computed, reactive} from 'vue';
    import { storeToRefs } from 'pinia';
    import { useProductStore } from '../../stores/productStore';

    const productStore = useProductStore();
    const {editProductModaleState} = storeToRefs(productStore);

    const product = reactive({
        categories_noms: [],
        description: "",
        id_categories: [],
        id_produit: null,
        illustration: "",
        prix: "",
        produit_nom: ""
    })
    // const product = ref({
    //     ...productStore.productToEdit, 
    //     prix: parseFloat(productStore.productToEdit.prix)
    // });

    const productModel = computed({
        get() {
            return !productStore.isEditingProduct? product : {...productStore.productToEdit, prix: parseFloat(productStore.productToEdit.prix)}
        },
        set(value) {
            productStore.isEditingProduct? productStore.productToEdit = value : Object.assign(product, value);
        }
    });
    const initialProduct = ref({
        ...productModel.value
    });
    const categories = ref(productStore.__ListCategories);

    const newFile = ref(null);
    const previewImage = ref(`/uploads/productsImages/${productModel.value.illustration}`);

    // Gère le changement de fichier dans l'input file d'illustration. Affiche le nom correct et la preview.
    function handleFileChange(event) {
        const file = event.target.files[0]; // Récupére le fichier sélectionné
        console.log(file)
        if (file) {
            newFile.value = file; // Stocke le fichier pour l'envoi
            previewImage.value = URL.createObjectURL(file); // Génére un aperçu temporaire
            productModel.value.illustration = file.name
        }
        console.log(initialProduct.value)
    }
    // Réinitialise l'illustration en cas de clear de l'input file
    function clearFile() {
        newFile.value = null,
        product.value.illustration = initialProduct.value.illustration
        previewImage.value = `/uploads/productsImages/${productModel.value.illustration}`
    }

    async function updateProduct() {
        const productData = new FormData();
        productData.append("id", productModel.value.id_produit);
        productData.append("nom", productModel.value.produit_nom);
        productData.append("prix", productModel.value.prix);
        productData.append("categories", JSON.stringify(productModel.value.id_categories));
        if (productModel.value.description) {
            productData.append("description", productModel.value.description);
        }
        if (productModel.value.illustration && newFile.value !== null) {
            productData.append("illustration", productModel.value.illustration)
            productData.append("file", newFile.value)
        }
        for (let pair of productData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }
        if (JSON.stringify(productModel.value) !== JSON.stringify(initialProduct.value)) {
            if (productStore.isEditingProduct) {
               await productStore.updateProduct(productData); 
            }
            else {
                await productStore.addProduct(productData);
            }
            close();
        }
    }

    function close() {
        productStore.editProductModaleState = false,
        productStore.isEditingProduct = false,
        productStore.productToEdit = null;
    }
</script>

<style scoped>

</style>