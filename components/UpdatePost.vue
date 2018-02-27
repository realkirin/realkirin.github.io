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
          {{postkey}}
          {{ currTitle}}
          {{ currBody }}
        </div>
      </div>
      <div>
        <v-btn @click.prevent="updatePost">Update</v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
  import {
    db
  } from '../plugins/firebase.js'
  import moment from 'moment'

  export default {
    mounted: function() {
      // once the component has mount set post content from props to postContent data property
      this.postContent.title = this.currTitle
      this.postContent.body = this.currBody
      this.postContent.postkey = this.postkey
    },
    middleware: ["userAuthed"],
    props: ['postkey', 'currTitle', 'currBody'],
    data() {
      return {
        postContent: {
          title: null,
          body: null,
          postkey: null
        }
      };
    },
    methods: {
      updatePost() {
        // create reference to posts collection
        let postsDBRef = db.ref('posts')
        // create reference to each user within posts
        let userPostRef = postsDBRef.child(this.user.uid)

        // get current Datetime
        let currDateTime = moment().toISOString()

        // get user post you want to update and push content
        userPostRef.child('/' + this.postkey).update({
          title: this.postContent.title,
          body: this.postContent.body,
          updatedDateTime: currDateTime
        })

        // clear form data after post
        this.postContent.title = "";
        this.postContent.body = ""
      }
    },
    computed: {
      user() {
        // get user from store
        return this.$store.getters.user
      }
    }
  }

</script>
