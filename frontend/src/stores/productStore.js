import {defineStore} from 'pinia';
import { useStore } from './store';
import axios from 'axios';
import EditProductModale from '../components/admin/EditProductModale.vue';

export const useProductStore = defineStore("product", {
    state: () => ({
        __ListCategories: [],
        __ListProducts: [],

        selectedCategorie: null,
        activFilter: null,

        editProductModaleState: false,
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