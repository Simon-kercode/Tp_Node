<template>
  <v-container v-if="adminStore.itemsToDisplay === 'users'">
      <h1>Gestion des utilisateurs</h1>
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
          <v-icon color="blue" @click="editUser(item)" class="me-5">mdi-pencil</v-icon>
          <v-icon color="red" @click="deleteUser(item)">mdi-trash-can-outline</v-icon>
        </template>
      </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, computed, watch} from "vue";
import { useStore } from "../../stores/store";
import { useUserStore } from "../../stores/userStore";
import { useAdminStore } from "../../stores/adminStore";
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value)

const store = useStore();
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

function editUser(user) {
  userStore.toggleEditUserModale(user);
}

async function deleteUser(user) {
  store.setConfirmMsg({
    title: "Suppression d'un utilisateur",
    text: "Cet utilisateur sera supprimé définitivement. Êtes vous sûr ?",
    type: "error"
  });
  const confirmation = await this.store.getConfirmation();
  if (!confirmation) return;
  userStore.deleteUser(user);
}
</script>
