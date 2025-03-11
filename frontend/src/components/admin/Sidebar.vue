<template>
    <v-navigation-drawer
    color="#F69946"
    class="position-fixed"
    permanent
    expand-on-hover
    rail
    fixed
    v-if="!isMobile"
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
    <v-speed-dial v-else
        location="right center"
        transition="scale-transition"
    >
        <template v-slot:activator="{ props: activatorProps }">
            <v-fab
            v-bind="activatorProps"
            size="50"
            icon="mdi-format-list-bulleted-type"
            color="#F69946"
            class="ms-5"
            ></v-fab>
        </template>
        <v-btn v-for="(item, i) in sidebarMenu" :key="i" :icon="item.icon" @click="handleItemClick(item.display)" color="#F69946"></v-btn>
    </v-speed-dial>
</template>

<script setup>

    import { computed } from 'vue';
    import { useAdminStore } from '../../stores/adminStore';
    import { useDisplay } from 'vuetify';

    const { mobile } = useDisplay() // Détecte si on est sur mobile
    const isMobile = computed(() => mobile.value)

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

    async function handleItemClick(items) {
        await adminStore.setItemsToDisplay(items)
    }
</script>