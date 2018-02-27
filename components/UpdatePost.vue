<template>
  <v-card tile>
    <v-form>
      <div>
        <div>
          <v-text-field name="title" label="Title" v-model="postContent.title"></v-text-field>
        </div>
      </div>
      <div>
        <div>
          <v-text-field name="description" label="Description" multi-line v-model="postContent.body"></v-text-field>
        </div>
      </div>
      <div>
        <v-btn @click.prevent="updatePost">Update</v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
  import { db } from '../plugins/firebase.js'
  import moment from 'moment'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    mounted: function() {
      console.log(this.getUpdatePost)
      this.postContent.key = this.getUpdatePostKey;
      this.postContent.title = this.getUpdatePostTitle;
      this.postContent.body = this.getUpdatePostBody;
    },
    middleware: ["userAuthed"],
    data() {
      return {
        postContent: {
          key: null,
          title: null,
          body: null
        }
      };
    },
    methods: {
      ...mapMutations([
        'setUpdatePostKey', // map `this.setUpdatePostKey()` to `this.$store.commit('setUpdatePostKey')`
        'setUpdatePostTitle',
        'setUpdatePostBody'
      ]),
      updatePost() {
        // create reference to posts collection
        let postsDBRef = db.ref('posts')
        // create reference to each user within posts
        let userPostRef = postsDBRef.child(this.user.uid)

        // get current Datetime
        let currDateTime = moment().toISOString()

        // get user post you want to update and push content
        userPostRef.child('/' + this.postContent.key).update({
          title: this.postContent.title,
          body: this.postContent.body,
          updatedDateTime: currDateTime
        })

        // clear form data after post
        this.postContent.title = null;
        this.postContent.body = null;
        this.postContent.key = null;

        //clear update data in store
        this.setUpdatePostKey = null
        this.setUpdatePostTitle = null
        this.setUpdatePostBody = null


      }
    },
    computed: {
      ...mapGetters([
        'getPosts',
        'getUpdatePostKey',
        'getUpdatePostTitle',
        'getUpdatePostBody',
        'user'
      ])
    }
  }

</script>
