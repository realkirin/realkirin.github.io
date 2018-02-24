<template>
  <v-layout>
    <h1 v-if="user === null">Login</h1>
    <h1 v-else>Logged in as {{ user.displayName }}</h1>
    <app-signup></app-signup>
  </v-layout>
</template>

<script>
  import Signup from "../components/Signup"

  export default {
    middleware: ["loginRedirect"],
    computed: {
      user() {
        return this.$store.getters.user
      }
    },
    watch: {
      user(value) {
        if (value !== null && value !== undefined) {
          this.$router.push("/profile")
        }
      }
    },
    components: {
      appSignup: Signup
    }
  }

</script>
