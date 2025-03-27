import {defineStore} from 'pinia';
import { toRaw } from 'vue';
import axios from 'axios';
import { useStore } from './store';

export const useUserStore = defineStore("user", {
    state: () => ({
        __listUsers: null,
        editUserModaleState: false,
        userToEdit: null,

        editPasswordModaleState: false,
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
   
        toggleEditUserModale(user) {
            this.userToEdit = user
            this.editUserModaleState = !this.editUserModaleState;
        },
        async updateUser(user) {
            try{
                const store = useStore();
                const csrfToken = await store.getCsrfToken();
                console.log(user)
                const response = await axios.put(`http://localhost:3000/users/${user.id}`, 
                    user,
                {
                    withCredentials: true,
                    headers: {'X-CSRF-Token': csrfToken}
                });
                console.log(response.data.user);
                if (response.data.user) {
                    this.updateUserInList(response.data.user[0]);
                    return true
                }
            } catch(error) {
                console.error("Erreur lors de la mise à jour utilisateur : ", error);
                return false
            }
        },
        async updatePassword(data) {
            try {
                const store = useStore();
                const csrfToken = await store.getCsrfToken();

                const response = await axios.put(`http://localhost:3000/users/${data.id}`, 
                    data,
                {
                    withCredentials: true,
                    headers: {'X-CSRF-Token': csrfToken}
                });
                if (response.data.user) {
                    return true;
                }
            } catch (error) {
                console.error("Erreur lors de la mise à jour du mot de passe :", error);
                return false
            }
        },
        async deleteUser(user) {
            try {
                const store = useStore();
                const csrfToken = await store.getCsrfToken();
                const response = await axios.delete(`http://localhost:3000/users/${user.id}`, {
                    withCredentials: true,
                    headers: {'X-CSRF-Token': csrfToken}
                });
                this.deleteUserInList(user)

            } catch (error) {
                console.error("Erreur lors de la suppression de l'utilisateur : ", error);
            }
        },
        // Met à jour la liste des utilisateurs dans le store (pour éviter de recharger toute la liste des users)
        updateUserInList(updatedUser) {
            const index = this.__listUsers.findIndex(user => user.id === updatedUser.id);
            
            // Si l'utilisateur existe, on met à jour la liste
            if (index !== -1) {
                this.__listUsers[index] = updatedUser;
            }
        },
        deleteUserInList(deletedUser) {
            const index = this.__listUsers.findIndex(user => user.id === deletedUser.id);

            if (index !== -1) {
                this.__listUsers.splice(index, 1);
            }
        },
        toggleEditPasswordModale() {
            this.editPasswordModaleState = !this.editPasswordModaleState;
        }
    }
})