<template>
    <v-card variant="text" class="border">
        <v-card-title>Paiement</v-card-title>
        <v-card-text>
            <v-form>
                <v-label>Numéro de la carte</v-label>
                <v-text-field
                    v-model="cardNumber"
                    variant="outlined"
                    type="number"
                    density="comfortable"
                ></v-text-field>
                <v-label>Titulaire de la carte</v-label>
                <v-text-field
                    v-model="holder"
                    variant="outlined"
                    density="comfortable"
                >
                </v-text-field>
                <v-label>Date d'expiration</v-label>
                <v-text-field
                    v-model="expiration"
                    placeholder="MM / YY"
                    variant="outlined"
                    hide-details
                    @input="formatExpiration"
                ></v-text-field>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup>

</script>