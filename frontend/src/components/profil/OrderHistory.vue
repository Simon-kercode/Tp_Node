<template>
    <v-row class="w-100 mt-5">
        <v-col cols="12"><h3>Historique de vos commandes</h3></v-col>
        
        <v-col v-for="order in orders" :key="order.id_commande" cols="12" sm="6" lg="4">
            <v-card>
                <v-row>
                    <v-col cols="12" sm="8">
                        <v-card-title>Commande n°{{ order.id_commande }}</v-card-title>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-card-actions>
                            <v-btn
                                density="compact"
                                class="custom-btn rounded-1"
                                icon="mdi-reload"
                                @click="rebuy(order)"
                            ></v-btn>
                        </v-card-actions>                         
                    </v-col>
                </v-row>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="8">{{ new Date(order.date_commande).toLocaleDateString("fr-FR") }}</v-col>
                        <v-col cols="12" sm="4">{{ order.total }} €</v-col>                        
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-chip-group column>
                                <v-chip v-for="product in order.nom_produits" :key="product" color="primary">
                                    {{ concatChip(product) }}
                                </v-chip>
                            </v-chip-group>
                        </v-col>                        
                    </v-row>
                </v-card-text>

            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useOrderStore } from '../../stores/orderStore';
    
    const orderStore = useOrderStore();
    const orders = ref([]);

    onMounted(async () => {
        orders.value = await orderStore.loadUserOrders();
        console.log(orders.value)
    });

    function concatChip(product) {
        if (product.quantite > 1) {
            return `${product.nom} x${product.quantite}`
        }
        return product.nom
    }
    function rebuy(order) {
        order.id_produits.forEach(produit => {
            orderStore.addProductToCart(product, order.nom_produits)
        })
    }
</script>