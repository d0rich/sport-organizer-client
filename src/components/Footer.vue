<template>
  <v-footer padless>
    <v-card flat tile style="width:100%" class="primary darken-4 white--text text-center">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0" >
          Создано в рамках летней практики
      </v-card-text>
      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} —
        <strong>DoriChrome prod.</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {
      icons: [],
    };
  },
};
</script>