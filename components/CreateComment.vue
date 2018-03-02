<template>
  <v-card tile>
    <v-form>
      <div>
        <div>
          <v-text-field name="newComment" label="NewComment" multi-line v-model="newComment.body"></v-text-field>
        </div>
      </div>
      <v-layout v-for="comment in comments" :key="comment['.key']">
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
    mounted: function() {
      this.getExistingComments();
    },
    middleware: ["userAuthed"],
    data() {
      return {
        newComment: {
          body: null,
          uid: null,
          userDisplayName: null,
          votes: null,
          dateTime: null
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
        // push to firebase under the current posts comments
        this.comments.push(this.newComment);

        db.ref('/posts/' + this.getViewPostKey).update({
          comments: this.comments
        })
        // clear form data after post
        this.newComment = {
          body: null,
          uid: null,
          userDisplayName: null,
          votes: null,
          dateTime: null
        };
      },
      getExistingComments() {
        for(let each in this.getPosts) {
          if(this.getPosts[each]['.key'] === this.getViewPostKey) {
            let postInfo = this.getPosts[each]
            if(postInfo.comments) {
              this.comments = postInfo.comments
            }
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'getPosts',
        'getViewPostKey',
        'user' // get current user
      ]),
    }
  }

</script>
