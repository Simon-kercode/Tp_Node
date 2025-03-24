<template>
    <v-card>
        <v-card-title>Votre panier</v-card-title>
        <v-row>
            <v-col cols="12" md="8">
                <v-data-table
                    :items="cartContent"
                    :headers="headers"
                    class="elevation-1"
                    fixed-header
                    :height="isMobile ? '400px' : ''"
                    hide-default-footer
                ></v-data-table>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup>
    
</script>