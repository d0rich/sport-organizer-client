<template>
  <v-footer padless>
    <v-card flat tile style="width:100%" class="primary darken-4 white--text text-center">

      <v-card-text class="white--text">
        &copy; 2020
        <a href="https://d0rich.github.io" target="_blank" style="color: white; text-decoration: underline">
          Nikolay Dorofeev (d0rich)
        </a>
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
