import {defineStore} from 'pinia';
import { useStore } from './store';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
    }),

    actions: {
        async login(email, password) {
            console.log("Données envoyées au backend :", { mail: email, pwd: password });

            try {
                const store = useStore();
                const csrfToken = await store.getCsrfToken();
                const response = await axios.post(
                    "http://localhost:3000/auth/login",
                    { 
                        mail: email, 
                        pwd: password 
                    },
                    { 
                        withCredentials: true,
                        headers: {'X-CSRF-Token': csrfToken}
                     }
                );

                console.log("response message : ", response.data.message);
                if (response.status === 200) {
                    // Récupere l'utilisateur après connexion
                    await this.getUser();
                    return true                  
                }
            } catch (error) {
                if (error.response?.status === 401) {
                    const store = useStore();
                    store.sendSnackBar({
                        color: "error",
                        text: error.response.data.message
                    });
                    return false;
                }
                console.error("Erreur de connexion :", error.response?.data?.message);
                throw new Error(error);
            }
        },
        async register(name, firstname, email, password) {
            try {
                const store = useStore();
                const csrfToken = await store.getCsrfToken();
                const response = await axios.post(
                    "http://localhost:3000/users",
                    {
                        nom: name,
                        prenom: firstname,
                        mail: email,
                        pwd: password,
                    },
                    {
                        withCredentials: true,
                        headers: {'X-CSRF-Token': csrfToken}
                    }
                    
                );
                if (response.status === 201) {
                    const store = useStore();
                    store.sendSnackBar({
                        color:"success",
                        text: response.data.message
                    });
                }
                console.log(response);
                if (response.status === 201) return true;
            } catch(error) {
                console.error("Erreur lors de la création utilisateur :", error.response?.data?.message);
                return false
            }
        },

        async getUser() {
            try {
                const response = await axios.get("http://localhost:3000/auth/profil", {
                    // Envoie les cookies avec la requête
                    withCredentials: true,
                });

                this.user = response.data.user;
                
                console.log("User connecté : ", this.user);
                return true
                
            } catch (error) {
                this.user = null;
                return false
            }
        },
    async logout(router) {
            try {
                const store = useStore();
                const csrfToken = await store.getCsrfToken();
                await axios.post("http://localhost:3000/auth/logout", {}, {
                     withCredentials: true, 
                     headers: {'X-CSRF-Token': csrfToken} 
                    });
                this.user = null;
                
                // redirection vers l'accueil
                router.push('/')
            } catch (error) {
                console.error("Erreur lors de la déconnexion :", error.response?.data?.message);
            }
        },
    async initializeAuth() {
        await this.getUser();
    },
    
    },
});