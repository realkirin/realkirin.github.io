<template>
  <v-card tile>
    <v-form>
      <div>
        <div>
          <v-text-field name="comment" label="Comment" multi-line v-model="comment"></v-text-field>
        </div>
      </div>
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
<!--
when looking at a single post add a comment box,
the comment will be sent to the current post ID in firebase
-->
