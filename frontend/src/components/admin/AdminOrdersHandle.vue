<template>
    <v-container v-if="adminStore.itemsToDisplay === 'orders'">
        <h1>Gestion des commandes</h1>
        <v-text-field 
            v-model="searchQuery"
            label="Rechercher une commande"
            prepend-inner-icon="mdi-magnify"
            class="mb-4"
        ></v-text-field>
        <v-data-table
            :items="orders"
            :headers="headers"
            :search="searchQuery"
            class="elevation-1"
            fixed-header
            :height="isMobile ? '400px' : ''"
        >
            <template v-slot:item.statut="{ item }">
                <v-chip :color="orderStore.getStatutColor(item.statut)" dark>
                {{ item.statut }}
                </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon color="blue" @click="editOrder(item)" class="me-5">mdi-pencil</v-icon>
                <v-icon color="red" @click="deleteOrder(item)">mdi-trash-can-outline</v-icon>
            </template>
        </v-data-table>
    </v-container>
</template>

<script setup>
    import { ref, computed, watchEffect} from "vue";
    import { useAdminStore } from '../../stores/adminStore';
    import { useOrderStore } from "../../stores/orderStore";
    import { useStore } from "../../stores/store";
    import { useDisplay } from 'vuetify';

    const adminStore = useAdminStore();
    const orderStore = useOrderStore();
    const store = useStore();

    const { mobile } = useDisplay();
    const isMobile = computed(() => mobile.value);

    const searchQuery = ref("");

    // On utilise watchEffect pour récupérer les données du store dès qu'elles sont disponibles
    const orders = ref([]);
    watchEffect(() => {
        orders.value = orderStore.__ListOrders.map(commande => ({
            ...commande,
            date_commande: new Date(commande.date_commande).toLocaleDateString("fr-FR"),
            total: commande.total + ' €',
            nom_produits: commande.nom_produits.join(', ')            
        }));
    })

    const headers = computed(() => mobile.value ? 
        [
            { key: 'date_commande', title: 'Date' },
            { key: 'total', title: 'Total' },
            { key: "actions", title: "", sortable: false }
        ] : 
        [
            { key: 'date_commande', title: 'Date' },
            { key: 'total', title: 'Total' },
            { key: 'statut', title: 'Statut'},
            { key: 'user_email', title: 'Destinataire' },
            { key: "actions", title: "", sortable: false }
        ]
    );

    function editOrder(order) {
        orderStore.isEditingOrder = true;
        orderStore.toggleEditOrderModale(order);
    }

    async function deleteOrder(order) {
        store.setConfirmMsg({
            title: "Suppression d'une commande",
            text: "Cette commande sera supprimée définitivement. Êtes vous sûr ?",
            type: "error"
        });
        const confirmation = await this.store.getConfirmation();
        if (!confirmation) return;
        orderStore.deleteOrder(order);
    }
</script>