import {defineStore} from 'pinia';
import axios from 'axios';

export const useStore = defineStore("store", {
    state: () => ({
        msgSnackBar: {color: "", text: ""},
        snackbarState: false,
    }),
    actions: {
        sendSnackBar({ color, text, timeout = 5000 }) {
            this.msgSnackBar.color = color;
            this.msgSnackBar.text = text;
            this.msgSnackBar.timeout = timeout;
            this.snackbarState = true;
          },
    }
})