<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title primary-title>
            <div class="text-md-center" v-if="user">
              <h2>Login Success</h2>
              <h4 class="headline mb-0">{{ user.name }}</h4>
              <h4 class="headline mb-0">{{ user.email }}</h4>
            </div>
            <div v-else>
              <h1>Please sign in.</h1>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    middleware: ["userAuthed"],
    computed: {
      user() {
        return this.$store.getters.user
      }
    }
  }

</script>
