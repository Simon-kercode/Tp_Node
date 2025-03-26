<template>
    <v-container>
        <UserInfos />        
    </v-container>

</template>

<script setup>
    import { ref } from 'vue';
    import { useAuthStore } from '../stores/authStore';
    import { useUserStore } from '../stores/userStore';
    import UserInfos from '../components/profil/UserInfos.vue';

    const authStore = useAuthStore();
    const userStore = useUserStore();

    const user = ref(authStore.user);
</script>