<template>
    <v-dialog v-model="editPasswordModaleState" max-width="400">
        <v-card>
            <v-card-title>Edition du mot de passe</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="savePassword">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="actualPassword"
                                label="Mot de pass actuel"
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
                                :rules="[requiredRule, passwordRule]"
                                required
                            ></v-text-field>
                        </v-col>             
                        <v-col cols="12">
                            <v-text-field
                                v-model="confirmNewPassword"
                                label="Mot de pass actuel"
                                type="password"
                                density="compact"
                                :rules="[requiredRule, passwordRule]"
                                required
                            ></v-text-field>
                        </v-col>             
                    </v-row>                    
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" variant="flat" type="submit">Sauvegarder</v-btn>
                <v-btn @click="close" color="error" variant="tonal">Annuler</v-btn>   
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useUserStore } from '../../stores/userStore';
    import { requiredRule, passwordRule } from '../../utils/formRules';
    
    const userStore = useUserStore();
    const {editPasswordModaleState} = storeToRefs(userStore);

    const actualPassword = ref(null);
    const newPassword = ref(null);
    const confirmNewPassword = ref(null);

    function savePassword() {
        const updated = userStore.update
    }
    
    function close() {
        userStore.toggleEditPasswordModale();
    }
</script>