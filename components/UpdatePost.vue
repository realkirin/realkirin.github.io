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
      this.postContent = {
        key: this.getUpdatePost.key,
        title: this.getUpdatePost.title,
        body: this.getUpdatePost.body
      }
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
        'setUpdatePost', // map `this.setUpdatePostKey()` to `this.$store.commit('setUpdatePostKey')`
      ]),
      updatePost() {
        // create reference to posts collection
        let postsDBRef = db.ref('posts');

        // get current Datetime
        let currDateTime = moment().toISOString();

        // get user post you want to update and push content
        postsDBRef.child('/' + this.postContent.key).update({
          title: this.postContent.title,
          body: this.postContent.body,
          updatedDateTime: currDateTime
        });

        // clear form data after post
        this.postContent = {
          title: null,
          body: null,
          key: null
        }

        // clear update data in store
        this.setUpdatePost({key: null, title: null, body: null})
      }
    },
    computed: {
      ...mapGetters([
        'getPosts',
        'getUpdatePost',
        'user'
      ])
    }
  }

</script>
