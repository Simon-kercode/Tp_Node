<template>
    <v-container v-if="adminStore.itemsToDisplay === 'users'">
        <v-text-field 
            v-model="searchQuery"
            label="Rechercher un utilisateur"
            prepend-inner-icon="mdi-magnify"
            class="mb-4"
        ></v-text-field>
  
        <v-data-table
            :items="filteredUsers"
            :headers="[
                { text: 'Nom', value: 'name' },
                { text: 'Prenom', value: 'firstname' },
                { text: 'Email', value: 'email' },
                { text: 'Role', value: 'role'}
            ]"
            :search="searchQuery"
        ></v-data-table>
    </v-container>
  </template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../../stores/userStore";
import { useAdminStore } from "../../stores/adminStore";

const adminStore = useAdminStore();
const userStore = useUserStore();
const rawUsers = ref([...userStore.__listUsers]);

const searchQuery = ref("");

const users = computed(() =>
  rawUsers.value.map(user => ({
    ...user,
    role: user.isAdmin === 0 ? 'Utilisateur' : 'Administrateur'
  }))
);

const headers = [
    {
      align: 'start',
      key: 'name',
      sortable: false,
      title: 'Dessert (100g serving)',
    },
    { key: 'calories', title: 'Calories' },
    { key: 'fat', title: 'Fat (g)' },
    { key: 'carbs', title: 'Carbs (g)' },
    { key: 'protein', title: 'Protein (g)' },
    { key: 'iron', title: 'Iron (%)' },
  ];

const filteredUsers = computed(() => {
  return users.value.filter(user =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.firstname.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>