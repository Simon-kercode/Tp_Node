<template>
    <Sidebar />
    <AdminUsersHandle />
    <AdminCategoriesHandle/>
    <AdminProductsHandle />
    <AdminOrdersHandle />
</template>

<script setup>
    import Sidebar from '../components/admin/Sidebar.vue';
    import AdminUsersHandle from '../components/admin/AdminUsersHandle.vue';
    import AdminProductsHandle from '../components/admin/AdminProductsHandle.vue';
    import AdminOrdersHandle from '../components/admin/AdminOrdersHandle.vue';
    import { onMounted } from 'vue';
    import { useAdminStore } from '../stores/adminStore';
    import AdminCategoriesHandle from '../components/admin/AdminCategoriesHandle.vue';

    const adminStore = useAdminStore();

    onMounted(() => {
        adminStore.setItemsToDisplay('orders');
    })
</script>

<style scoped>
    
</style>