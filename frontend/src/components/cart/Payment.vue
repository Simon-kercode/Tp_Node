<template>
    <v-col cols="12" lg="12">
        
        <v-card variant="text" class="border pa-5">
            <v-row>
                <v-col cols="12" md="4" order="1" order-md="2">
                    <PriceResume :isValidate="true" @total="updateTotal"/>
                </v-col>
                <v-col cols="12" md="8" order="2" order-md="1">
                    <v-card-title class="text-h5 text-center">Paiement</v-card-title>
                    <v-form ref="paymentForm" @submit.prevent="saveOrder">
                        <v-container class="w-100 mx-auto" style="max-width: 500px;">
                        <v-img :src="moyenPaiements" height="35" width="200" class="ml-auto"></v-img>   
                        <v-card-text>
                                <v-row class="d-flex align-center">
                                    <v-col cols="12" sm="4">
                                        <v-label class="font-weight-bold text-black">Numéro de la carte</v-label>
                                    </v-col>
                                    <v-col cols="12" sm="8">
                                        <v-text-field
                                            v-model="cardNumber"
                                            :rules="[requiredRule]"
                                            variant="outlined"
                                            density="comfortable"
                                            hide-details = "auto"
                                            class="w-100"
                                            required
                                            @input="formatCardNumber"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row class="d-flex align-center">
                                    <v-col cols="12" sm="4">
                                        <v-label class="font-weight-bold text-black">Titulaire de la carte</v-label>
                                    </v-col>
                                    <v-col cols="12" sm="8">
                                        <v-text-field
                                            v-model="holder"
                                            :rules="[requiredRule]"
                                            variant="outlined"
                                            density="comfortable"
                                            hide-details="auto"
                                            class="w-100"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row class="d-flex align-center">
                                    <v-col cols="12" sm="4">
                                        <v-label class="font-weight-bold text-black">Date d'expiration</v-label>
                                    </v-col>
                                    <v-col cols="12" sm="8">
                                        <v-text-field
                                            v-model="expiration"
                                            placeholder="MM / YY"
                                            :rules="[expirationRule, requiredRule]"
                                            variant="outlined"
                                            hide-details="auto"
                                            class="w-100 w-sm-50"
                                            required
                                            @input="formatExpiration"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row class="d-flex align-center">
                                    <v-col cols="12" sm="4">
                                        <v-label class="font-weight-bold text-black">Code de sécurité</v-label>
                                    </v-col>
                                    <v-col cols="12" sm="8">
                                        <v-text-field
                                            v-model="securityCode"
                                            :rules="[requiredRule]"
                                            variant="outlined"
                                            type="number"
                                            density="comfortable"
                                            hide-details="auto"
                                            class="w-100 w-sm-50"
                                            required
                                            @input="formatSecurityCode"
                                        ></v-text-field>
                                        <small class="text-caption text-medium-emphasis">
                                            <v-icon>mdi-alert-circle-outline</v-icon> 
                                            Code à 3 chiffres figurant à l'arrière de votre carte
                                        </small>
                                    </v-col>
                                </v-row>
                            
                        </v-card-text>
                        <v-card-actions class="d-flex flex-column flex-sm-row">
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-btn width="100%" variant="tonal" to="/panier">Retour</v-btn>   
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-btn width="100%" class="custom-btn" type="submit">Confirmer le paiement</v-btn>    
                                </v-col>                  
                            </v-row>
                        </v-card-actions>
                        </v-container>
                    </v-form>            
                </v-col>    
            </v-row>
        </v-card>
    </v-col>
</template>

<script setup>

    import { ref } from 'vue';
    import moyenPaiements from '../../assets/images/moyenPaiements.png';
    import PriceResume from './PriceResume.vue';
    import { requiredRule } from '../../utils/formRules';
    import { useOrderStore } from '../../stores/orderStore';
    import { useAuthStore } from '../../stores/authStore';
    import { useRouter } from 'vue-router';

    const orderStore = useOrderStore();
    const authStore = useAuthStore();
    const paymentForm = ref(null);

    const cardNumber = ref(null);
    const holder = ref(null);
    const expiration = ref(null);
    const securityCode = ref(null);

    const total = ref(0);

    const router = useRouter();

    const formatCardNumber = () => {
         // Supprime tout sauf les chiffres et limite à 16 chiffres
        let value = cardNumber.value.replace(/\D/g, "").slice(0, 16);
        if (value.length) {
            // Ajoute un espace après 4 chiffres
            value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
        }
        cardNumber.value = value;
    };
    
    const formatExpiration = () => {
        let value = expiration.value.replace(/\D/g, ""); // Supprime tout sauf les chiffres
        if (value.length > 2) {
            value = value.slice(0, 2) + " / " + value.slice(2, 4);
        }
        expiration.value = value;
    };

    const formatSecurityCode = () => {
        securityCode.value = securityCode.value.replace(/\D/g, "").slice(0, 3);
    }

    const expirationRule = () => {
        let currentYear = new Date().getFullYear()  % 100;
        
        if (expiration.value) {
            let value = expiration.value.split(" / ")
            if (value && (Number(value[0]) < 1 || Number(value[0]) > 12 || Number(value[1]) < currentYear || Number(value[1]) > currentYear+20)) {
                
                return "Veuillez entrer une date d'expiration valide."
            }
            else {
                return true
            }
        }
        return true
    }

    const updateTotal = (value) => {
        total.value = value;
    }

    async function saveOrder() {
        const { valid } = await paymentForm.value?.validate();
        if (!valid) return;

        const newOrder = {
            statut: "Payé",
            total: total.value,
            date_commande: new Date(),
            moyen_paiement: "CB",
            id_user: authStore.user?.id,
            produits: orderStore.cartContent.map(produit => {
                return {
                    id_produit: produit.id_produit,
                    quantite: produit.quantity
                }
            })
        }
        console.log("commande validée front : ", newOrder)
        const creation = await orderStore.createOrder(newOrder);

        if (creation) {
            orderStore.cartContent = [];
            orderStore.quantityInCart = 0;
            orderStore.saveCart();
            window.setTimeout(() => {
               router.push({name: 'Home'}) 
            }, 2000)
            
        }
    }

</script>