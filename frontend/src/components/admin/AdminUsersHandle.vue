<template>
    <v-container v-if="adminStore.itemsToDisplay === 'users'">
        <v-text-field 
            v-model="searchQuery"
            label="Rechercher un utilisateur"
            prepend-inner-icon="mdi-magnify"
            class="mb-4"
        ></v-text-field>
  
        <v-data-table
            :items="users"
            :headers="headers"
            :search="searchQuery"
            class="elevation-1"
            fixed-header
            :height="isMobile ? '400px' : ''"
        >
        <template v-slot:item.actions="{ item }">
          <v-icon color="red" @click="editUser(item)">mdi-pencil</v-icon>
        </template>
      </v-data-table>
    </v-container>
  </template>

<script setup>
import { ref, computed} from "vue";
import { useUserStore } from "../../stores/userStore";
import { useAdminStore } from "../../stores/adminStore";
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay() // Détecte si on est sur mobile
const isMobile = computed(() => mobile.value)

const adminStore = useAdminStore();
const userStore = useUserStore();

const searchQuery = ref("");

const users = computed(() =>
  userStore.__listUsers.map(user => ({
    ...user,
    role: user.isAdmin === 0 ? 'Utilisateur' : 'Administrateur'
  }))
);

const headers = computed(() => mobile.value ? 
  [
    { key: 'name', title: 'Nom' },
    { key: 'firstname', title: 'Prénom' },
    { key: "actions", title: "", sortable: false }
  ] : 
  [
    { key: 'name', title: 'Nom' },
    { key: 'firstname', title: 'Prénom' },
    { key: 'email', title: 'Email' },
    { key: 'role', title: 'Role' },
    { key: "actions", title: "", sortable: false }
  ]
);
</script>
