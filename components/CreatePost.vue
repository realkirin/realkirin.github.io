<template>
  <v-card tile="true">
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
  import {
    dbPostsRef
  } from '../plugins/firebase.js'

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
        // will push the data from the form to the firebase database
        dbPostsRef.push({
          title: this.newPost.title,
          body: this.newPost.body,
          uid: this.user.uid
        })
      }
    },
    computed: {
      user() {
        return this.$store.getters.user
      }
    }
  }

</script>
