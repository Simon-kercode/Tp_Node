<template>

</template>

<script setup>
    import { ref, watch } from 'vue';
    import { useProductStore } from '../stores/productStore';

    const productStore = useProductStore();
    const quantity = ref(1);


</script>

<style scoped>

</style>