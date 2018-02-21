<template>
    <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-list>
        <v-list-tile
          @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  middleware: ['userAuthed'],
  methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      }
    }
}
</script>