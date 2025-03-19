import {defineStore} from 'pinia';
import { useStore } from './store';
import { useProductStore } from './productStore';
import { useUserStore } from './userStore';
import { useOrderStore } from './orderStore';
import axios from 'axios';

export const useAdminStore = defineStore("admin", {
    state: () => ({
        itemsToDisplay: null,
    }),
    actions: {
        async setItemsToDisplay(items) {
            switch(items) {
                case 'users':
                    const userStore = useUserStore();
                    await userStore.getAllUsers();
                    this.itemsToDisplay = items
                    console.log(this.itemsToDisplay);
                    break;
                case 'orders':
                    const orderStore = useOrderStore();
                    await orderStore.getAllOrdersWithProducts();
                case 'products':
                case 'categories':
                    this.itemsToDisplay = items
                    console.log(this.itemsToDisplay)
                    break;
                
                default:
                    this.itemsToDisplay = null
            }
          
            // else {
            //     this.itemsToDisplay = null
            //     console.log(this.itemsToDisplay);
                
            // }
        }
    }
})