<template>
    <v-dialog v-model="editProductModaleState" max-width="800px">
        <v-card>
            <v-card-title>Edition produit</v-card-title>
            <v-form ref="productForm" @submit.prevent="updateProduct();" enctype="multipart/form-data">
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="8">
                        <v-text-field
                            v-model="productModel.produit_nom"
                            label="Nom"
                            :rules="[requiredRule('Un nom')]"
                            clearable
                            required
                        ></v-text-field>                            
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field
                            type="number"
                            v-model="productModel.prix"
                            label="Prix"
                            prefix="€"
                            :rules="[requiredRule('Un prix')]"
                            required
                        ></v-text-field>                              
                    </v-col>
                </v-row>
                <v-textarea 
                    v-model="productModel.description"
                    label="Description"
                ></v-textarea>
                <v-select
                    v-model="productModel.id_categories"
                    label="Categories"
                    :items="categories"
                    item-title="nom"
                    item-value="id_categorie"
                    :rules="[requiredRule('Au moins une catégorie')]"
                    multiple
                    chips
                    required
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
            <v-card-actions class="ms-3">
                <v-btn color="success" variant="flat" type="submit">Sauvegarder</v-btn>
                <v-btn @click="close" color="error" variant="tonal">Annuler</v-btn>                    
            </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import {ref, reactive, watch} from 'vue';
    import { storeToRefs } from 'pinia';
    import { useProductStore } from '../../stores/productStore';
    import { requiredRule } from '../../utils/formRules';

    const productStore = useProductStore();
    const {editProductModaleState} = storeToRefs(productStore);
    const productForm = ref(null);

    const productModel = reactive({
        produit_nom: "",
        prix: "",
        description: "",
        id_categories: [],
        illustration: "",
        id_produit: null
    });

    watch(
        () => productStore.productToEdit,
        (newVal) => {
            if (productStore.isEditingProduct && newVal) {
                Object.assign(productModel, {
                    id_produit: newVal.id_produit,
                    produit_nom: newVal.produit_nom || "",
                    prix: parseFloat(newVal.prix) || "",
                    description: newVal.description || "",
                    id_categories: newVal.id_categories || [],
                    illustration: newVal.illustration || "",
                });
            }
        },
        { deep: true, immediate: true }
    );   

    const initialProduct = ref({
        ...productModel
    });

    const categories = ref(productStore.__ListCategories);

    const newFile = ref(null);
    const previewImage = ref(`/uploads/productsImages/${productModel.illustration}`);

    // Gère le changement de fichier dans l'input file d'illustration. Affiche le nom correct et la preview.
    function handleFileChange(event) {
        const file = event.target.files[0]; // Récupére le fichier sélectionné
        console.log(file)
        if (file) {
            newFile.value = file; // Stocke le fichier pour l'envoi
            previewImage.value = URL.createObjectURL(file); // Génére un aperçu temporaire
            productModel.illustration = file.name
        }
        console.log(initialProduct.value)
    }
    // Réinitialise l'illustration en cas de clear de l'input file
    function clearFile() {
        newFile.value = null,
        productModel.illustration = initialProduct.value.illustration
        previewImage.value = `/uploads/productsImages/${productModel.illustration}`
    }

    async function updateProduct() {
        const {valid} = await productForm.value?.validate()
        if (!valid) return;
        const productData = new FormData();
        productData.append("id", productModel.id_produit);
        productData.append("nom", productModel.produit_nom);
        productData.append("prix", productModel.prix);
        productData.append("categories", JSON.stringify(productModel.id_categories));
        if (productModel.description) {
            productData.append("description", productModel.description);
        }
        if (productModel.illustration && newFile.value !== null) {
            productData.append("illustration", productModel.illustration)
            productData.append("file", newFile.value)
        }
        // Vérifie si des changements on été fait avant d'envoyer la requête vers le back
        if (JSON.stringify(productModel) !== JSON.stringify(initialProduct.value)) {
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