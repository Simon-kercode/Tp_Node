<template>
    <v-navigation-drawer
    color="#F69946"
    class="position-fixed"
    permanent
    expand-on-hover
    rail
    fixed
    >
        <v-list
        nav
        density="compact"
        class="pa-0"
        open-strategy="single"

        >
        <template v-for="(item, i) in sidebarMenu"
            :key="i"
        >
            <v-list-item
            :prepend-icon="item.icon"
            :title="item.text"
            :value="item"
            @click="handleItemClick(item.display)"
            class="ma-2"
            >
            </v-list-item>
        </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>

    import { useAdminStore } from '../../stores/adminStore';
    const adminStore = useAdminStore();

    const sidebarMenu = [
        {
            icon: "mdi-paw-outline",
            text: "Gérer les produits",
            display: "products",            
        },
        {
            icon: "mdi-shape-outline",
            text: "Gérer les catégories",
            display: "categories"
        },
        {
            icon: "mdi-account-cash-outline",
            text: "Gérer les commandes",
            display: "orders"
        },
        {
            icon: "mdi-account-group-outline",
            text: "Gérer les utilisateurs",
            display: "users"
        },
    ]

    function handleItemClick(items) {
        adminStore.setItemsToDisplay(items)
    }
</script>