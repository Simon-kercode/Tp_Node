import {defineStore} from 'pinia';
import axios from 'axios';

export const useStore = defineStore("store", {
    state: () => ({
        msgSnackBar: {color: "", text: ""},
        snackbarState: false,

        confirmState: false,
        confirmMsg: {},
        confirmationResolver: null,
        allDataLoaded: false,
    }),
    actions: {
        // Envoie la snackbar avec la couleur et le message donné
        sendSnackBar({ color, text, timeout = 5000 }) {
          this.msgSnackBar.color = color;
          this.msgSnackBar.text = text;
          this.msgSnackBar.timeout = timeout;
          this.snackbarState = true;
        },

        // Envoi la boite de dialogue de confirmation avec le message donné
        setConfirmMsg(msg) {
          this.confirmMsg = msg;
          this.confirmState = true;
        },
        getConfirmation() {
          return new Promise((resolve) => {
            this.confirmationResolver = resolve;
          });
        },
        // Récupère le token csrf
        async getCsrfToken() {
          const response = await axios.get("http://localhost:3000/csrf-token", 
          { withCredentials: true }
          );
          console.log("Token csrf: ", response.data.csrfToken);
          
          return response.data.csrfToken;
        },
    }
})