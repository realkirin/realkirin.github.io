<template>
  <v-layout>
    <h1 v-if="user === null">Login</h1>
    <h1 v-else>Logged in as {{ user.displayName }}</h1>
    <app-signin></app-signin>
  </v-layout>
</template>

<script>
import Signin from "../components/Signin";
export default {
  middleware: ["loginRedirect"],
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  components: {
    appSignin: Signin
  }
};
</script>
