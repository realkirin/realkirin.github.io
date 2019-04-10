<template>
  <v-card tile>
    <v-form>
      <div>
        <div>
          <v-text-field name="newComment" label="NewComment" multi-line v-model="newComment.body"></v-text-field>
        </div>
      </div>
      <v-layout v-for="comment in getComments" :key="comment['.key']">
        {{ comment }}
        <v-divider></v-divider>
        <v-list-tile>
          Posted by {{ comment.userDisplayName }} on {{ comment.dateTime }}
          <v-list-tile-content v-html="comment.body">
            <!-- <v-list-tile-title v-html="post.title"></v-list-tile-title> -->
          </v-list-tile-content>
        </v-list-tile>
      </v-layout>

      <div>
        <v-btn @click.prevent="addNewComment">Add</v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
  import { db } from '../plugins/firebase.js'
  import moment from 'moment'
  import { mapGetters } from 'vuex'

  export default {
    middleware: ["userAuthed"],
    data() {
      return {
        newComment: {
          body: null,
          uid: null,
          userDisplayName: null,
          votes: null,
          dateTime: null,
          postKey: null
        },
        comments: []
      };
    },
    methods: {
      addNewComment() {
        // get the current date and time
        let currDateTime = moment().toISOString();
        this.newComment.dateTime = currDateTime;

        this.newComment.uid = this.user.uid;
        this.newComment.userDisplayName = this.user.displayName;
        this.newComment.postKey = this.getViewPostKey;

        db.collection('comments').add(this.newComment);

        // clear form data after post
        this.newComment = {
          body: null,
          uid: null,
          userDisplayName: null,
          votes: null,
          dateTime: null,
          postKey: null
        };

        // console.log(this.getPosts);
        // console.log(db.ref('posts/' + this.getViewPostKey))


        //db.ref('posts/' + this.getViewPostKey).update({
        //
        //})
      },
    },
    computed: {
      ...mapGetters([
        'getComments',
        'getPosts',
        'getViewPostKey',
        'user' // get current user
      ]),
    }
  }

</script>
