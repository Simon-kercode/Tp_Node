<template>
    <div class="text-center pa-4">
      <v-dialog persistent
                v-model="confirmState"
                max-width="600px"
      >
        <v-card :class="confirm.type">
          <div class="d-flex align-center px-6">
            <v-icon>{{ confirm.icon }}</v-icon>
            <v-card-title>
              {{ confirm.title }}
            </v-card-title>
          </div>
          <v-card-text>
            {{ confirm.text }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="white"
                   variant="tonal"
                   @click="confirmOperation(false)"
            >Annuler</v-btn>
            <v-btn color="white"
                   variant="flat"
                   @click="confirmOperation(true)"
            >Continuer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from "vue";
  import { storeToRefs } from "pinia";
  import { useStore } from "../stores/store";
  
  const store = useStore();
  
  // Référence à confirmState de Pinia
  const { confirmState } = storeToRefs(store);
  
  // Référence à confirmMsg
  const msg = ref(store.confirmMsg);
  
  // Watch pour réagir aux changements de msg
  watch(() => store.confirmMsg, (_msg) => {
    msg.value = _msg;
  });
  
  // Propriétés calculées pour obtenir les valeurs de confirmation
  const confirm = computed(() => ({
    type: defineType(msg.value.type),
    icon: defineIcon(msg.value.type),
    title: msg.value.title,
    text: msg.value.text,
  }));
  
  // Fonction pour gérer l'opération de confirmation
  const confirmOperation = (isConfirmed) => {
    if (typeof store.confirmationResolver === "function") {
      store.confirmationResolver(isConfirmed);
    }
    store.confirmState = false;
  };
  
  // Définir le type visuel basé sur le type de message
  const defineType = (type) => {
    switch (type) {
      case "error":
        return "bg-error";
      case "success":
        return "bg-success";
      case "warning":
        return "bg-warning";
      default:
        return "";
    }
  };
  
  // Définir l'icône basée sur le type de message
  const defineIcon = (type) => {
    switch (type) {
      case "error":
        return "mdi-close-circle-outline";
      case "success":
        return "mdi-check-circle-outline";
      case "warning":
        return "mdi-alert-outline";
      default:
        return "";
    }
  };
  </script>
  
  <style scoped></style>
  