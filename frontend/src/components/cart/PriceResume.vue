<template>
    <v-col cols="12" :lg="isValidate ? 12 : 4">
        <v-card class="fond-clair me-2 mb-2">
            <v-card-title>Montant de votre commande</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-list>
                    <v-list-item>
                        <strong>SOUS TOTAL :</strong> {{ subTotal }} €
                    </v-list-item>
                    <v-list-item>
                        <strong>TVA (20%) :</strong> {{ tva }} €
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                        <strong>TOTAL :</strong> {{ total }} €
                    </v-list-item>
                </v-list>
            </v-card-text>
            <v-card-actions class="w-100" v-if="!isValidate">
                <v-btn @click="redirectToPaiement" class="custom-btn w-100">Passer au paiement</v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script setup>
    import { computed, onMounted, defineProps } from 'vue';
    import { useOrderStore } from '../../stores/orderStore';
    import { useAuthStore } from '../../stores/authStore';
    import { useStore } from '../../stores/store';
    import { useRouter } from 'vue-router';

    const store = useStore();
    const authStore = useAuthStore();
    const router = useRouter();
    const props = defineProps({
        isValidate: Boolean
    });
    const emits = defineEmits(["total"])
    
    const orderStore = useOrderStore();

    const subTotal = computed(() => {
        return Number(orderStore.cartContent
            .reduce((sum, item) => sum + item.prix * item.quantity, 0)
            .toFixed(2)
        );
    });

    const tva = computed(() => Number((subTotal.value * 0.2).toFixed(2)));

    const total = computed(() => Number((subTotal.value + tva.value).toFixed(2)));
    
    onMounted(() => {
        emits("total", total.value);
    })

    async function redirectToPaiement() {
        if (!authStore.user) {
            store.sendSnackBar({
                color: "error",
                text: "Pour passer commande, merci de vous connecter ou de vous créer un compte."
            })
            router.push({name: 'Login'})
        }
        else {
            router.push({name: "commande"});
        }
    }
</script>