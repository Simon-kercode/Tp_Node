<template>
    <v-container class="d-flex flex-column align-center">
        <UserInfos />
        <OrderHistory />
    </v-container>

</template>

<script setup>
    import { ref } from 'vue';
    import { useAuthStore } from '../stores/authStore';
    import { useUserStore } from '../stores/userStore';
    import UserInfos from '../components/profil/UserInfos.vue';
    import OrderHistory from '../components/profil/OrderHistory.vue';

    const authStore = useAuthStore();
    const userStore = useUserStore();

    const user = ref(authStore.user);
</script>