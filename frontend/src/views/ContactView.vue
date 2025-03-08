<template>
    <v-container class="mt-10">
      <h2 class="text-h3 text-center mb-6">Contactez-nous</h2>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="custom-card">
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <!-- Nom -->
                <v-text-field
                  v-model="name"
                  label="Nom"
                  outlined
                  :rules="[rules.required]"
                  required
                ></v-text-field>
  
                <!-- Email -->
                <v-text-field
                  v-model="email"
                  label="Email"
                  outlined
                  :rules="[rules.required, rules.email]"
                  required
                ></v-text-field>
  
                <!-- Sujet -->
                <v-text-field
                  v-model="subject"
                  label="Sujet"
                  outlined
                  :rules="[rules.required]"
                  required
                ></v-text-field>
  
                <!-- Message -->
                <v-textarea
                  v-model="message"
                  label="Message"
                  outlined
                  :rules="[rules.required]"
                  required
                ></v-textarea>
  
                <!-- Bouton Soumettre -->
                <v-btn :disabled="!valid" color="primary" block @click="submitForm" >
                  Envoyer le message
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>

    import { ref, computed } from 'vue'
    import { useDisplay } from 'vuetify'
    
  const { mobile } = useDisplay() // Détecte si on est sur mobile
  const isMobile = computed(() => mobile.value) // Variable réactive pour mobile
  
  
  const name = ref('')
  const email = ref('')
  const subject = ref('')
  const message = ref('')
  const valid = ref(false)
  
  const rules = {
    required: value => !!value || 'Ce champ est requis.',
    email: value => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return pattern.test(value) || 'Veuillez entrer un email valide.'
    }
  }
  
  function submitForm() {
    if (valid.value) {
      console.log({
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value
      })
      alert('Votre message a été envoyé avec succès !')
      resetForm()
    }
  }
  
  function resetForm() {
    name.value = ''
    email.value = ''
    subject.value = ''
    message.value = ''
  }
  </script>
  
  <style scoped>
  .mt-10 {
    margin-top: 40px;
  }

  .custom-card {
  box-shadow: none !important;
}
  </style>
  