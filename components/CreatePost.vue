<template>
  <v-card tile>
    <v-form>
      <div>
        <div>
          <v-text-field name="title" label="Title" v-model="newPost.title"></v-text-field>
        </div>
      </div>
      <div>
        <div>
          <v-text-field name="description" label="Description" multi-line v-model="newPost.body"></v-text-field>
        </div>
      </div>
      <div>
        <v-btn @click.prevent="addNewPost">Add</v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
  import { db } from '../plugins/firebase.js'
  import moment from 'moment'
  export default {
    middleware: ["userAuthed"],
    data() {
      return {
        newPost: {
          title: null,
          body: null
        }
      };
    },
    methods: {
      addNewPost() {
        // get the current date and time
        let currDateTime = moment().toISOString()
        // push to firebase under the current users posts
        db.ref('posts').push({
          title: this.newPost.title,
          body: this.newPost.body,
          uid: this.user.uid,
          votes: 0,
          dateTime: currDateTime,
          comments: []
        })

        // clear form data after post
        this.newPost.title = "";
        this.newPost.body = ""
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
