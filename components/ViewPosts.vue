<template>
  <v-layout>
    <v-list three-line>
      <!-- loop through each of their posts -->
      <v-layout v-for="post in getPosts" :key="post['.key']">
        <!-- will show delete button on left if logged in user uid equals the user uid who made the post -->
        <v-subheader v-if="user && post.uid === user.uid">
          <v-btn @click="removePost(post['.key'])">X</v-btn>
        </v-subheader>

        <!-- edit button -->
        <v-subheader v-if="user && post.uid === user.uid">
          <v-btn @click="updatePost(post['.key'], post.title, post.body)">Edit</v-btn>
        </v-subheader>

        <!-- view button -->
        <v-subheader>
          <v-btn @click="viewPost(post['.key'])">View</v-btn>
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
          <div v-if="getUpdatePost.key !== null">
            <app-update-post></app-update-post>
          </div>
        </v-flex>
      </v-layout>
    </v-list>
  </v-layout>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { db } from '../plugins/firebase.js'
  import UpdatePost from './UpdatePost'

  export default {
    components: {
      appUpdatePost: UpdatePost
    },
    data() {
      return {
        posts: [],
      };
    },
    computed: {
      ...mapGetters([
        'getUpdatePost',
        'getPosts', // gets binded vuex post from firebase
        'user' // get current user
      ]),

    },
    methods: {
      ...mapMutations([
        'setUpdatePost', // map `this.setUpdatePostKey()` to `this.$store.commit('setUpdatePostKey')`
        'setViewPostKey'
      ]),
      removePost(key) {
        // create reference to posts collection
        let postsDBRef = db.collection('posts')
        postsDBRef.child(key).remove()
      },
      updatePost(key, title, body){
        // when user clicks edit, it sets the firebase key of the post to UpdatePostKey in the store
        this.setUpdatePost({key: key, title: title, body: body})
      },

      viewPost(key) {
        this.setViewPostKey(key);
        this.$router.push('/viewpost')
      }
    }
  }

</script>
