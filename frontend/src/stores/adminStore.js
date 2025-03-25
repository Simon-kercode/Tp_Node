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
                    this.itemsToDisplay = items;
                    break;
                case 'products':
                case 'categories':
                    this.itemsToDisplay = items
                    console.log(this.itemsToDisplay)
                    break;
                
                default:
                    const defaultOrderStore = useOrderStore();
                    await defaultOrderStore.getAllOrdersWithProducts();
                    this.itemsToDisplay = 'orders'
            }
        }
    }
})