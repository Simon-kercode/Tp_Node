<template>
    <v-dialog v-model="editPasswordModaleState" max-width="400">
        <v-card>
            <v-card-title>Edition du mot de passe</v-card-title>
            <v-form @submit.prevent="savePassword">
                <v-card-text>                    
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="actualPassword"
                                label="Mot de passe actuel"
                                type="password"
                                density="compact"
                                :rules="[requiredRule, passwordRule]"
                                required
                            ></v-text-field>
                        </v-col>             
                        <v-col cols="12">
                            <v-text-field
                                v-model="newPassword"
                                label="Nouveau mot de passe"
                                type="password"
                                density="compact"
                                :rules="[requiredRule, passwordRule, passwordCheck]"
                                :error-messages="registerError"
                                required
                            ></v-text-field>
                        </v-col>             
                        <v-col cols="12">
                            <v-text-field
                                v-model="confirmNewPassword"
                                label="Confirmer le nouveau mot de passe"
                                type="password"
                                density="compact"
                                :rules="[requiredRule, passwordRule, passwordCheck]"
                                :error-messages="registerError"
                                required
                            ></v-text-field>
                        </v-col>             
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" variant="flat" type="submit">Sauvegarder</v-btn>
                    <v-btn @click="close" color="error" variant="tonal">Annuler</v-btn>   
                </v-card-actions>                                        
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useUserStore } from '../../stores/userStore';
    import { useAuthStore } from '../../stores/authStore';
    import { useStore } from '../../stores/store';
    import { requiredRule, passwordRule } from '../../utils/formRules';
    
    const userStore = useUserStore();
    const {editPasswordModaleState} = storeToRefs(userStore);

    const authStore = useAuthStore();
    const store = useStore();

    const actualPassword = ref(null);
    const newPassword = ref(null);
    const confirmNewPassword = ref(null);

    const registerError = ref("");

    function passwordCheck() {
        registerError.value = newPassword.value !== confirmNewPassword.value ? "Les mots de passe doivent être identiques" : ""
        return true
    }

    async function savePassword() {
        if (newPassword.value !== confirmNewPassword.value) return;

        const updated = await userStore.updatePassword({id: authStore.user.id, pwd: newPassword.value, oldPassword: actualPassword.value});
        if (updated) {
            userStore.toggleEditPasswordModale();
            store.sendSnackBar({
                color: "success",
                text: "Votre mot de passe a été mis à jour."
            })
        }
        else {
            store.sendSnackBar({
                color: "error",
                text: "Erreur lors de la mise à jour du mot de passe."
            })
        }
    }
    
    function close() {
        userStore.toggleEditPasswordModale();
    }
</script>