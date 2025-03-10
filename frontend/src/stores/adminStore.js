import {defineStore} from 'pinia';
import { useStore } from './store';
import { useProductStore } from './productStore';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

export const useAdminStore = defineStore("admin", {
    state: () => ({
        itemsToDisplay: null,
    }),
    actions: {
        setItemsToDisplay(items) {
            this.itemsToDisplay = items
        }
    }
})