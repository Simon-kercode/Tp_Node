import {defineStore} from 'pinia';
import { useStore } from './store';
import { useProductStore } from './productStore';
import { useUserStore } from './userStore';
import { useRouter } from 'vue-router';
import axios from 'axios';

export const useAdminStore = defineStore("admin", {
    state: () => ({
        itemsToDisplay: null,
    }),
    actions: {
        async setItemsToDisplay(items) {
          
            if (items === 'users') {
                const userStore = useUserStore();
                await userStore.getAllUsers();
                console.log(userStore.__listUsers)
                this.itemsToDisplay = items
                console.log(this.itemsToDisplay);
                
            }            
            else {
                this.itemsToDisplay = null
                console.log(this.itemsToDisplay);
                
            }
        }
    }
})