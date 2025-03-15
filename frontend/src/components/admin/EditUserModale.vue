<template>
    <v-dialog v-model="editUserModaleState" max-width="300px">
        <v-card>
            <v-card-title>Edition utilisateur</v-card-title>
            <v-card-text>
                <div>{{ `${user.name} ${user.firstname}` }}</div>
                <div class="my-5">{{ user.email }}</div>
                <v-select   v-model="user.isAdmin"
                :items="[
                    { title: 'Administrateur', value: 1 },
                    { title: 'Utilisateur', value: 0 }
                ]"
                item-title="title"
                item-value="value"
                label="Rôle"
                ></v-select>
                <v-card-actions>
                    <v-btn @click="updateUser" color="success" variant="flat">Sauvegarder</v-btn>
                    <v-btn @click="close" color="error" variant="tonal">Annuler</v-btn>                    
                </v-card-actions>

            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import {ref, computed} from 'vue';
    import { storeToRefs } from 'pinia';
    import { useUserStore } from '../../stores/userStore';

    const userStore = useUserStore();
    const {editUserModaleState} = storeToRefs(userStore);
    const user = ref(userStore.userToEdit);
    const initialUser = ref({ id: user.value.id, isAdmin: user.value.isAdmin });


    async function updateUser() {
        const userData = {
            id: user.value.id,
            isAdmin: user.value.isAdmin
        };

        if (JSON.stringify(userData) !== JSON.stringify(initialUser.value)) {
            await userStore.updateUser(userData);
            close();
        }
    }
    function close() {
        userStore.editUserModaleState = false,
        userStore.userToEdit = null;
    }
</script>

<style scoped>

</style>