<template>
  <v-card tile>
    <v-form>
      <div>
        <div>
          <v-text-field name="comment" label="Comment" multi-line v-model="comment"></v-text-field>
        </div>
      </div>
      <v-layout v-for="comment in comments" :key="comment['.key']">
        <v-divider></v-divider>
        <v-list-tile>
          <v-list-tile-content v-html="comment">
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
        comment: null,
        comments: []
      };
    },
    methods: {
      addNewComment() {
        // get the current date and time
        // let currDateTime = moment().toISOString()
        // push to firebase under the current users posts

        this.comments.push(this.comment);

        db.ref('/posts/' + this.getViewPostKey).update({
          comments: this.comments
        })
        // clear form data after post
        this.comment = null;
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
