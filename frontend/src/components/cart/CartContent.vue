<template>
    <v-container class="my-5">
        <v-card>
            <v-card-title class="text-center">Votre panier</v-card-title>
            <v-row>
                <v-col cols="12" md="8">
                    <v-data-table
                        :items="cartContent"
                        :headers="headers"
                        class="elevation-1"
                        fixed-header
                        :height="isMobile ? '400px' : ''"
                        hide-default-footer
                    >
                    <template v-slot:item.illustration="{item}">
                        <v-img :src="`/uploads/productsImages/${item.illustration}`" height="120" width="100"></v-img>
                    </template>
                    <template v-slot:item.quantity="{item}">
                        <v-btn icon="mdi-minus" class="square-btn me-2" @click="orderStore.deleteProductToCart(item, 1)"></v-btn>
                        {{ item.quantity }}
                        <v-btn icon="mdi-plus" class="square-btn ms-2" @click="orderStore.addProductToCart(item, 1)"></v-btn>
                    </template>
                    <template v-slot:item.total="{ item }">
                        {{ (parseFloat(item.prix)*item.quantity).toFixed(2) + ' €'}}
                    </template>
                    <template v-slot:item.actions="{item}">
                        <v-icon color="red" @click="orderStore.deleteProductToCart(item, item.quantity)">mdi-trash-can-outline</v-icon>
                    </template>
                    </v-data-table>
                </v-col>
                <v-col cols="12" md="4" class="bg-gray">

                </v-col>
            </v-row>
        </v-card>        
    </v-container>

</template>

<script setup>
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useOrderStore } from '../../stores/orderStore';

    const orderStore = useOrderStore();
    const {cartContent} = storeToRefs(orderStore);

    const headers = [
        {key: "illustration", title: ""},
        {key: "produit_nom", title: "Nom"},
        {key: "prix", title: "Prix"},
        {key: "quantity", title: "Quantité"},
        {key: "total", title: "Total"},
        {key: "actions", title: "", sortable: false}
    ]
</script>

<style scoped>

</style>