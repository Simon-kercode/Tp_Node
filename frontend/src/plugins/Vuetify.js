import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";

export default createVuetify({
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      defaultTheme: "light",
    },
    components: { ...components },
    directives,
    display: {
      mobileBreakpoint: 960,
      thresholds: {
        xs: 600,
        sm: 960,
        md: 1280,
        lg: 1920,
      },
    },
  });