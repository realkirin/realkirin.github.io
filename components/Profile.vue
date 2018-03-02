<template>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title primary-title>
            <div class="text-md-center" v-if="user">
              <h4 class="headline mb-0">{{ user.displayName }}</h4>
              <h4 class="headline mb-0">{{ user.email }}</h4>
            </div>
            <div v-else>
              <h1>Please sign in.</h1>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  <!-- add user db within firebase
       add firstname, lastname, displayName(this will be seperate than what is retrieved from google)
       so change that in createcoment,
       uid field, created datetime, updated datetime, bio, emailVerified(get from firebase user auth data)
       posts array(contains ids from the posts that the user created)
       commented on(array of post id keys) -->

</template>

<script>
  export default {
    middleware: ["userAuthed"],
    computed: {
      // get current user
      user() {
        return this.$store.getters.user
      }
    }
  }

</script>
