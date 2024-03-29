import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        text: colors.shades,
        bg: colors.grey.darken4 ,
        primary: colors.purple,
        secondary: colors.teal
      }
    }
  }
});
