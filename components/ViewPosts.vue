<template>
  <v-layout>
    <v-list three-line>
      <v-layout v-for="post in getPosts" :key="post['.key']">
        <!-- will show delete button on left if logged in user uid equals the user uid who made the post -->
        <v-subheader v-if="user && post.uid === user.uid">
          <v-btn @click="removePost(post['.key'])">x</v-btn>
        </v-subheader>
        <v-divider></v-divider>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title v-html="post.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="post.body"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-layout>
    </v-list>
  </v-layout>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    dbPostsRef
  } from '../plugins/firebase.js'

  export default {
    data() {
      return {
        posts: []
      };
    },
    computed: {
      ...mapGetters([
        'getPosts'
      ]),
      user() {
        return this.$store.getters.user
      }
    },
    methods: {
      removePost(key) {
        dbPostsRef.child(key).remove()
      }
    }
  }

</script>
