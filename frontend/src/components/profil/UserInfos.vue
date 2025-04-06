<template>
<v-card variant="text" min-width="50%">
  <h1 class="text-h6 font-weight-bold">Bienvenue  {{ user.firstname }}</h1>
  
  <v-card-text>
    <v-list density="compact">
        <v-list-item>
            <v-row>
                <v-col cols="4"><strong>Nom :</strong> {{ user.name }}</v-col>
                <v-col cols="8"><strong>Prénom :</strong> {{ user.firstname }}</v-col>
            </v-row>
        </v-list-item>
        <v-divider class="my-3"></v-divider>
      <!-- Email -->
      <v-list-item>
        <v-row class="d-flex align-center">
          <v-col cols="4" class="font-weight-bold">Email :</v-col>
          <v-col cols="8">{{ user.email }}</v-col>
        </v-row>
      </v-list-item>
      <v-divider class="my-3"></v-divider>
      <!-- Password -->
      <v-list-item>
        <v-row class="d-flex align-center">
          <v-col cols="4" class="font-weight-bold">Mot de passe :</v-col>
          <v-col cols="8" md="3">********</v-col>
          <v-col cols="8" md="5" class="text-right">
            <v-btn min-width="120" class="custom-btn" variant="text" density="compact" @click="editPassword">Modifier</v-btn>
          </v-col>            
        </v-row>
      </v-list-item>
    </v-list>
  </v-card-text>
</v-card>
</template>

<script setup>
    import { ref } from 'vue';
    import { useAuthStore } from '../../stores/authStore';
    import { useUserStore } from '../../stores/userStore';

    const authStore = useAuthStore();
    const userStore = useUserStore();

    const user = ref(authStore.user);

    function editPassword() {
        userStore.toggleEditPasswordModale();
    }
</script>