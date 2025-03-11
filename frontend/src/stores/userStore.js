import {defineStore} from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore("user", {
    state: () => ({
        __listUsers: null
    }),
    actions: {
        async getAllUsers() {
            try {
                const response = await axios.get("http://localhost:3000/users", {
                    // Envoie les cookies avec la requête
                    withCredentials: true,
                });

                this.__listUsers = response.data
                console.log(this.__listUsers);
                
            } catch (error) {
                this.__listUsers = null;
                console.error("Erreur front récupération utilisateurs : ", error);
            }
        },
    }
})