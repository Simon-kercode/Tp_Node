<template>
    <CartContent />
</template>

<script setup>
    import { ref, watch } from 'vue';
    import { useProductStore } from '../stores/productStore';
    import CartContent from '../components/cart/CartContent.vue';

    const productStore = useProductStore();
    const quantity = ref(1);


</script>

<style scoped>

</style>