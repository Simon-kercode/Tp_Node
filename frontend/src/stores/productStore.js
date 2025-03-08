import {defineStore} from 'pinia';
import { useStore } from './store';
import axios from 'axios';

export const useProductStore = defineStore("product", {
    state: () => ({
        __ListCategories: [],
        __ListProducts: [],

    }),
    actions: {
        async getListProducts() {
            try {
                const response = await axios.get(
                    "http://localhost:3000/produits",
                    { 
                        withCredentials: true,
                     }
                );
                console.log(response);
                this.setListProducts(response.data);
                console.log(this.__ListProducts);
                
            }
            catch(error) {
                console.error(error)
            }
        },
        setListProducts(products) {
            this.__ListProducts = products;
        }        
    },
});