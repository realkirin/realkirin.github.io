<template>
  <v-layout>
    <v-list three-line>
      <!-- loop through each user within posts collection -->
      <div v-for="userPosts in getPosts" :key="userPosts['.key']">
        <!-- loop through each of their posts -->
        <v-layout v-for="(post,key) in userPosts" :key="post['key']">
          <!-- will show delete button on left if logged in user uid equals the user uid who made the post -->
          <v-subheader v-if="user && post.uid === user.uid">
            <v-btn @click="removePost(key)">x</v-btn>
          </v-subheader>
          <v-subheader v-if="user && post.uid === user.uid">
            <v-btn @click="updatePost(key, post.title, post.body)">edit</v-btn>
          </v-subheader>
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title v-html="post.title"></v-list-tile-title>
              <v-list-tile-sub-title v-html="post.body"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <div v-if="postUpdateKey !== null">
              <app-update-post :postkey="postUpdateKey" :currTitle="postUpdateTitle" :currBody="postUpdateBody"></app-update-post>
            </div>
          </v-flex>
        </v-layout>
      </div>
    </v-list>
  </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { db } from '../plugins/firebase.js'
  import UpdatePost from './UpdatePost'

  export default {
    components: {
      appUpdatePost: UpdatePost
    },
    data() {
      return {
        posts: [],
        postUpdateKey: null,
        postUpdateTitle: null,
        postUpdateBody: null
      };
    },
    computed: {
      // map getPosts from post store
      ...mapGetters([
        'getPosts'
      ]),
      // get current user from store
      user() {
        return this.$store.getters.user
      }
    },
    methods: {
      removePost(key) {
        // create reference to posts collection
        let postsDBRef = db.ref('posts')
        // create reference to each user within posts
        let userPostRef = postsDBRef.child(this.user.uid);
        userPostRef.child(key).remove()
      },
      updatePost(key, body, title) {
        this.postUpdateKey = key;
        this.postUpdateTitle = title;
        this.postUpdateBody = body;
      }
    }
  }

</script>
