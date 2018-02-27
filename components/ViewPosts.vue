<template>
  <v-layout>
    <v-list three-line>
      <!-- loop through each user within posts collection (through our vuex store binded to firebase) -->
      <div v-for="userPosts in getPosts" :key="userPosts['.key']">
        <!-- loop through each of their posts -->
        <v-layout v-for="(post,key) in userPosts" :key="post['key']">
          <!-- will show delete button on left if logged in user uid equals the user uid who made the post -->
          <v-subheader v-if="user && post.uid === user.uid">
            <v-btn @click="removePost(key)">x</v-btn>
          </v-subheader>

          <!-- edit button -->
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
            <div v-if="getUpdatePostKey !== null">
              <app-update-post ></app-update-post>
            </div>
          </v-flex>
        </v-layout>
      </div>
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
        'getUpdatePostKey',
        'getUpdatePostTitle',
        'getUpdatePostBody',
        'getPosts', // gets binded vuex post from firebase
        'user' // get current user
      ]),

    },
    methods: {
      ...mapMutations([
        'setUpdatePostKey', // map `this.setUpdatePostKey()` to `this.$store.commit('setUpdatePostKey')`
        'setUpdatePostTitle',
        'setUpdatePostBody'
      ]),
      removePost(key) {
        // create reference to posts collection
        let postsDBRef = db.ref('posts')
        // create reference to each user within posts
        let userPostRef = postsDBRef.child(this.user.uid);
        userPostRef.child(key).remove()
      },
      updatePost(key, title, body){
        // when user clicks edit, it sets the firebase key of the post to UpdatePostKey in the store
        this.setUpdatePostKey(key);
        this.setUpdatePostTitle(title);
        this.setUpdatePostBody(body);
        console.log(this.getUpdatePostKey, this.getUpdatePostTitle, this.getUpdatePostBody);
      }
    }
  }

</script>
