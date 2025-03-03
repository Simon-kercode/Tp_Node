<template>
      <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="w-75 mx-auto py-5">
        <div class="text-center">
            <img :src="logo" alt="Logo PawShop" width="90">        
        </div>
        <div class="w-75 mx-auto">
          <v-card-title>{{ title }}</v-card-title>  
        </div>
         
        <v-tabs class="w-75 mx-auto my-5" v-model="tab" align-tabs="center" grow>
            <v-tab value="login">M'identifier</v-tab>
            <v-tab value="register">Créer un compte</v-tab>
        </v-tabs>

        <v-window v-model="tab">
            <v-window-item value="login">
                <div >
                    <v-form @submit.prevent="login" class="w-75 mx-auto">
                        
                        <v-card-text>
                            <v-text-field
                                v-model="email"
                                label="Email"
                                :rules="[emailRule]"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="password"
                                label="Mot de passe"
                                type="password"
                                :rules="[passwordRule]"
                                required
                            ></v-text-field>      
                        </v-card-text>
                        <v-card-actions class="d-flex flex-column ">
                            <v-btn
                            text="M'identifier"
                            variant="flat"
                            color="#F69946"
                            width="100%"
                            rounded
                            type="submit"
                            class="mb-3 text-white"
                            ></v-btn>
                            <v-btn
                            text="Mot de passe oublié ?"
                            variant="tonal"
                            color="warning"
                            width="100%"
                            rounded
                            ></v-btn>
                        </v-card-actions>
                    </v-form>  
                </div>
            </v-window-item>

            <v-window-item value="register">
                <v-form @submit.prevent="register" class="w-75 mx-auto">
                    <v-card-text>
                        <v-text-field 
                            v-model="name" 
                            label="Nom"
                            :rules="[requiredRule('Un nom'), minRule(3)]"
                            required
                        ></v-text-field>
                        <v-text-field 
                            v-model="firstname" 
                            label="Prenom"
                            :rules="[requiredRule('Un prénom'), minRule(3)]"
                            required
                        ></v-text-field>
                        <v-text-field 
                            v-model="email" 
                            label="Email"
                            :rules="[emailRule]"
                            required
                        ></v-text-field>
                        <v-text-field 
                            v-model="password" 
                            label="Mot de passe" 
                            type="password"
                            :rules="[passwordRule]"
                            required
                        ></v-text-field>
                        <v-text-field 
                            v-model="confirmPassword" 
                            label="Confirmer le mot de passe" 
                            type="password"
                            :rules="[passwordRule]"
                            required
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions class="d-flex flex-column">
                        <v-btn 
                            text="S'inscrire" 
                            variant="flat" 
                            color="#F69946" 
                            width="100%" 
                            rounded 
                            type="submit"
                            class=" mb-3 text-white"
                        ></v-btn>
                    </v-card-actions>
                    <p id="texte-relou">En vous inscrivant, vous acceptez nos <a href="">Conditions d'utilisations</a>. Vous confirmez également avoir pris connaissance de notre <a href="">Déclaration relative à la protection des données</a></p>
                </v-form>  
            </v-window-item>
        </v-window>

    </v-card>
    </v-container>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import logo from '../assets/images/logo.png'
    import { emailRule, passwordRule, requiredRule, minRule } from '../utils/formRules';

    const tab = ref("login");
    const email = ref("");
    const password= ref("");
    const name = ref("");
    const firstname = ref("");
    const confirmPassword = ref("");

    const title = computed(() => tab.value === "login" ? "Je suis déjà client(e)" : "Nouveau client")

    function login() {
        console.log('Plop');
    }
    function register() {
        console.log('Ploup');
        
    }
</script>

<style scoped>
    #texte-relou {
        font-size: 0.7rem;
    }
</style>