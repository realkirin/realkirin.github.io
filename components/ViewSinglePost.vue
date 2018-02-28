<template>
  <v-layout>
    <v-list three-line>
      <div >
        <v-layout>
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title v-html="post.title"></v-list-tile-title>
              <v-list-tile-sub-title v-html="post.body"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-layout>
      </div>
    </v-list>
  </v-layout>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    mounted: function() {
      this.getCurrentPost();
    },
    data() {
      return {
        post:{
          title: null,
          body: null,
          key: null
        },
      };
    },
    computed: {
      ...mapGetters([
        'getPosts', // gets binded vuex post from firebase
        'getViewPostKey',
        'user' // get current user
      ]),
    },
    methods: {
      ...mapMutations([
        'setViewPostKey'
      ]),
      getCurrentPost() {
        for(let each in this.getPosts) {
          if(this.getPosts[each]['.key'] === this.getViewPostKey) {
            let postInfo = this.getPosts[each]
            this.post = {
              title: postInfo.title,
              body: postInfo.body,
              key: postInfo['.key']
            }
          }
        }
      }
    }
  }

</script>
