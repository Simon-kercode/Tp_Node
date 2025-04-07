<template>
    <v-footer class="bg-footer d-flex flex-column">
        <v-container class="d-flex align-center justify-space-between">
            <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-card class="card-footer text-white" variant="text">
                        <div class="d-flex align-center">
                            <img :src="logo" alt="Logo PawShop" width="80px" height="80px">
                            <v-card-title>PawShop</v-card-title>
                        </div>
                        <div class="d-flex align-center">
                          <v-icon icon="mdi-phone" size="48" class="me-1 detail-item"></v-icon>
                          <v-card-text class="d-flex flex-column">
                            <span class="font-weight-bold">02 03 04 05 06</span>
                            <span>Une question ?<br> Appelez nous 7j/7</span>
                          </v-card-text>
                        </div>
                        <v-card-actions>
                            <v-btn
                                v-for="network in networks" :key="network"
                                :icon="network"
                                variant="text"
                            ></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <!-- TODO: catégories -->
                     <v-card class="card-footer text-white" variant="text">
                        <v-card-title>Plan du site</v-card-title>
                        <v-card-text>
                            <v-list class="card-footer w-md-75" density="compact">        
                                <v-list-item to="/" active-color="white" active-class="custom-activ">Accueil</v-list-item>
                                <v-list-item to="/boutique" active-color="white">Boutique</v-list-item>
                                <v-list-item to="/contact" active-color="white">Contact</v-list-item>
                                <v-list-item>Mentions légales</v-list-item>
                                <v-list-item>Politique de confidentialité</v-list-item>
                            </v-list>                                
                        </v-card-text>
                     </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="card-footer" variant="text">
                        <v-card-title>Heures d'ouvertures :</v-card-title>
                        <v-card-text class="text-start w-75">
                            <div class="d-flex">
                                <span class="me-4">Lun - Ven :</span>
                                <span class="font-weight-bold">8h - 18h</span>
                            </div>
                            <div class="d-flex">
                                <span class="me-4">Sam - Dim :</span>
                                <span class="font-weight-bold">9h - 16h</span>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <div class="text-white text-subtitle-2">
         Copyright &copy; {{ new Date().getFullYear() }} - <strong>PawShop</strong>
        </div>
    </v-footer>
</template>

<script setup>
    import { computed } from 'vue';
    import logo from '../assets/images/logo.png';
    import { useDisplay } from 'vuetify'
    
    const { mobile } = useDisplay() // Détecte si on est sur mobile
    const isMobile = computed(() => mobile.value) // Variable réactive pour mobile

    const networks= [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
    ];
</script>

<style scoped>
    .bg-footer{
        background-color: #3A3330;
        max-height: auto;
    }
    .card-footer {
        background-color: #3A3330;
        color: white;
    }
</style>