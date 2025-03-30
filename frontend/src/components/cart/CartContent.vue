<template>
    <v-col cols="12" lg="8">
        <v-data-table
            v-if="!isMobile"
            :items="cartContent"
            :headers="headers"
            class="elevation-1"
            fixed-header
            hide-default-footer
        >
            <template v-slot:item.illustration="{ item }">
                <v-img :src="`/uploads/productsImages/${item.illustration}`" height="120" width="100" contain></v-img>
            </template>
            <template v-slot:item.quantity="{ item }" v-if="!isValidate">
                <v-btn icon="mdi-minus" class="square-btn me-2" @click="orderStore.deleteProductToCart(item, 1)"></v-btn>
                {{ item.quantity }}
                <v-btn icon="mdi-plus" class="square-btn ms-2" @click="orderStore.addProductToCart(item, 1)"></v-btn>
            </template>
            <template v-slot:item.quantity="{item}" v-else>{{ item.quantity }}</template>
            <template v-slot:item.total="{ item }">
                {{ (parseFloat(item.prix) * item.quantity).toFixed(2) + ' €' }}
            </template>
            <template v-slot:item.actions="{ item }" v-if="!isValidate">
                <v-icon color="red" @click="orderStore.deleteProductToCart(item, item.quantity)">mdi-trash-can-outline</v-icon>
            </template>
        </v-data-table>

        <!-- Mode Mobile : Liste au lieu de tableau -->
        <v-list v-else class="elevation-1">
            <v-list-item v-for="item in cartContent" :key="item.id_produit">
                <v-row>
                    <v-col cols="6" sm="3">
                        <v-img :src="`/uploads/productsImages/${item.illustration}`" height="80" width="80" contain></v-img>
                    </v-col>
                    <v-col cols="6" sm="3">
                        <strong>{{ item.produit_nom }}</strong>
                        <div>{{ item.prix }} €</div>
                        <div>Total : {{ (parseFloat(item.prix) * item.quantity).toFixed(2) }} €</div>
                    </v-col>
                    <v-col v-if="!isValidate" cols="12" sm="4" class="text-center text-sm-right">
                        <v-btn icon="mdi-minus" size="small" class="square-btn me-1" @click="orderStore.deleteProductToCart(item, 1)"></v-btn>
                        {{ item.quantity }}
                        <v-btn icon="mdi-plus" size="small" class="square-btn ms-1" @click="orderStore.addProductToCart(item, 1)"></v-btn>
                        <v-btn icon="mdi-trash-can-outline" color="red" variant="text" @click="orderStore.deleteProductToCart(item, item.quantity)"></v-btn>
                    </v-col>
                    <v-col cols="12" sm="4" class="text-center text-sm-right" v-else>{{ item.quantity }}</v-col>
                </v-row>
                <v-divider></v-divider>
            </v-list-item>
        </v-list>
    </v-col>
</template>

<script setup>
    import { computed, defineProps } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useOrderStore } from '../../stores/orderStore';
    import { useDisplay } from 'vuetify';

    const props = defineProps({
        isValidate: Boolean
    })

    const orderStore = useOrderStore();
    const {cartContent} = storeToRefs(orderStore);

    const { mobile } = useDisplay();
    const isMobile = computed(() => mobile.value);

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