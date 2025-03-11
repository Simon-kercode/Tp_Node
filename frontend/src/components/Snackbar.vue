<template>
    <v-snackbar
      v-model="snackbarState"
      :timeout="msgSnackBar.timeout"
      :color="msgSnackBar.color"
      class="elevation-24"
    >
      {{ msgSnackBar.text }}
    </v-snackbar>
  </template>
  
  <script setup>
    import { storeToRefs } from "pinia";
  
    import { useStore } from "../stores/store";
  
    const store = useStore();
    const dynStore = storeToRefs(store);
    const { snackbarState, msgSnackBar } = dynStore;

  </script>