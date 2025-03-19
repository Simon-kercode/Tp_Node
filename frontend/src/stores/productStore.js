import {defineStore} from 'pinia';
import { useStore } from './store';
import axios from 'axios';

export const useProductStore = defineStore("product", {
    state: () => ({
        __ListCategories: [],
        __ListProducts: [],

        selectedCategorie: null,
        activFilter: null,

        editProductModaleState: false,
        isEditingProduct: false,
        productToEdit: null

    }),
    actions: {
        async getListProducts() {
            try {
                const response = await axios.get(
                    "http://localhost:3000/produits/categories",
                    { 
                        withCredentials: true,
                    }
                );
                this.setListProducts(response.data);
            }
            catch(error) {
                console.error(error)
            }
        },
        setListProducts(products) {
            this.__ListProducts = products;
            console.log("Produits : ", this.__ListProducts);
            
        },
        async updateProduct(product) {
            const store = useStore();
            try{
                console.log("product envoyé au controlleur : ", product)
                const csrfToken = await store.getCsrfToken();
                // Récupère l'id par "get" car product est un formData
                const response = await axios.put(`http://localhost:3000/produits/${product.get("id")}`, 
                    product,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRF-Token": csrfToken,
                        "Content-Type": "multipart/form-data"
                    }
                });
                console.log(response.data.produit);
                if (response.status === 200 && response.data.produit) {
                    this.updateProductInList(response.data.produit);
                    store.sendSnackBar({
                        color: "success",
                        text: "Produit mis à jour avec succès !"
                    })
                }
            } catch(error) {
                console.error("Erreur lors de la mise à jour du produit : ", error.message);
                store.sendSnackBar({
                    color: "error",
                    text: "Erreur lors de la mise à jour du produit !"
                })
            }
        },

        async addProduct(product) {
            const store = useStore();
            try {
                const csrfToken = await store.getCsrfToken();
                const response = await axios.post("http://localhost:3000/produits",
                    product,
                    {
                        withCredentials: true,
                        headers: {
                            "X-CSRF-Token": csrfToken
                        }
                    });
                console.log(response.data.produit);
                if (response.status === 201 && response.data.produit) {
                    this.addProductInList(response.data.produit)
                    store.sendSnackBar({
                        color: "success",
                        text: "Produit créé avec succès !"
                    });
                }
            } catch (error) {
                console.error("Erreur lors de la création du produit : ", error)
                store.sendSnackBar({
                    color: "error",
                    text: "Erreur lors de la création du produit !"
                });
            }
        },
        async deleteProduct(product) {
            const store = useStore();
            try {
                console.log(product)
                const csrfToken = await store.getCsrfToken();
                const response = await axios.delete(`http://localhost:3000/produits/${product.id_produit}`,
                    {
                        withCredentials: true,
                        headers: {
                            "X-CSRF-Token": csrfToken
                        }
                    });
                    console.log(response);
                    if (response.status === 200) {
                        store.sendSnackBar({
                            color: "success",
                            text: "Produit supprimé avec succès !"
                        });
                        this.deleteProductInList(product)
                    }
                    
            } catch (error) {
                console.error("Erreur lors de la suppression du produit : ", error)
                store.sendSnackBar({
                    color: "error",
                    text: "Erreur lors de la suppression du produit !"
                });
            }
        },
        // Met à jour la liste des utilisateurs dans le store (pour éviter de recharger toute la liste des users)
        updateProductInList(updatedProduct) {
            const index = this.__ListProducts.findIndex(product => product.id_produit === updatedProduct.id_produit);
            console.log(index);
            // Si le produit existe, on met à jour la liste
            if (index !== -1) {
                this.__ListProducts[index] = updatedProduct;
                console.log(this.__ListProducts)
            }
        },
        addProductInList(newProduct) {
            this.__ListProducts.push(newProduct);
        },
        deleteProductInList(deletedProduct) {
            const index = this.__ListProducts.findIndex(product => product.id_produit === deletedProduct.id_produit);
            
            if (index !== -1) {
                this.__ListProducts.splice(index, 1);
            }
        },

        async getListCategories() {
            try {
                const response = await axios.get(
                    "http://localhost:3000/categories",
                    { 
                        withCredentials: true,
                     }
                );
                console.log(response);
                this.setListCategories(response.data);
            }
            catch(error) {
                console.error(error)
            }
        },

        // Retourne la liste des catégories avec la première lettre du nom en majuscule
        setListCategories(categories) {
            const capitalizeCategories = categories.map((category) => {
                return {
                    id_categorie: category.id_categorie,
                    nom: category.nom.charAt(0).toUpperCase() + category.nom.slice(1)
                }
            });
            this.__ListCategories = capitalizeCategories;
            console.log("Catégories : ", this.__ListCategories);
            
        },
        setSelectedCategorie(categorie) {
            this.selectedCategorie = categorie;
        },

        setActiveFilter(filter) {
            this.activFilter = filter;
            console.log(this.activFilter);
            
        },
        toggleEditProductModale(product) {
            this.productToEdit = product;
            this.editProductModaleState = !this.editProductModaleState;
        }
    },
});