<template>
    <v-dialog v-model="editCategoryModaleState" max-width="300px">
        <v-card>
            <v-card-title>Edition catégorie</v-card-title>
            <v-form ref="categoryForm" @submit.prevent="updateCategory()">
                <v-card-text>
                    <v-text-field
                        v-model="categoryModel.nom"
                        label="Nom"
                        :rules="[requiredRule('Un nom')]"
                        clearable
                        required
                    ></v-text-field>
                </v-card-text>
                <v-card-actions class="me-3">
                    <v-btn color="success" variant="flat" type="submit">Sauvegarder</v-btn>
                    <v-btn @click="close" color="error" variant="tonal">Annuler</v-btn>   
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>

</template>

<script setup>
    import { ref, reactive, watch } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useProductStore } from '../../stores/productStore';
    import { requiredRule } from '../../utils/formRules';

    const productStore = useProductStore();
    const {editCategoryModaleState} = storeToRefs(productStore);
    const categoryForm = ref(null);

    const categoryModel = reactive({
        id_categorie: null,
        nom: "",
    });

    watch(() => productStore.categoryToEdit, (newVal) => {
        if(productStore.isEditingCategory && newVal) {
            Object.assign(categoryModel, {
                id_categorie: newVal.id_categorie,
                nom: newVal.nom
            });
            }
        },
        { deep: true, immediate: true }
    );

    const initialCategory = ref({
        ...categoryModel
    });

    async function updateCategory() {
        const {valid} = await categoryForm.value?.validate()
        if (!valid) return;

        if (JSON.stringify(categoryModel) !== JSON.stringify(initialCategory.value)) {
            if (productStore.isEditingCategory) {
                await productStore.updateCategory(categoryModel);
            } 
            else {
                await productStore.addCategory(categoryModel);
            }
            close();
        }
    }
    function close() {
        productStore.editCategoryModaleState = false,
        productStore.isEditingCategory = false,
        productStore.categoryToEdit = null;
    }
</script>