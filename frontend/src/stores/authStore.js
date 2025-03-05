import {defineStore} from 'pinia';
import axios from 'axios';
// import { useRouter } from 'vue-router';

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
    }),

    actions: {
        async login(email, password) {
            console.log("Données envoyées au backend :", { mail: email, pwd: password });
            // const router = useRouter();
            try {
                const response = await axios.post(
                    "http://localhost:3000/auth/login",
                    { mail: email, pwd: password },
                    // Envoie les cookies avec la requête
                    { withCredentials: true }
                );

                console.log(response.data.message);
                // Récupere l'utilisateur après connexion
                await this.getUser(); 

                // if (this.user !== null) {
                //     route.path = "Home";
                // }
            } catch (error) {
                console.error("Erreur de connexion :", error.response?.data?.message);
            }
        },

        async getUser() {
            try {
                const response = await axios.get("http://localhost:3000/auth/profil", {
                    // Envoie les cookies avec la requête
                    withCredentials: true,
                });

                this.user = response.data.user;
                console.log(this.user);
                
            } catch (error) {
                this.user = null;
                console.error("Utilisateur non authentifié");
            }
        },
    async logout() {
            try {
                await axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true });
                this.user = null;
            } catch (error) {
                console.error("Erreur de déconnexion :", error);
            }
        }
    
    }
});