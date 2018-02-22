<template>
  <div class="row">
    <div class="col-sm-12 col-md-6">
      <div v-for="post in getPosts" :key="post['.key']">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
        <button class="btn btn-outline-danger btn-sm" 
                  @click="removePost(post['.key'])">x</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { dbPostsRef } from '../plugins/firebase.js'

export default {
  data() {
    return {
      posts: []
    };
  },
  computed: {
    ...mapGetters ([
      'getPosts'
    ]),
  },
  methods: {
    removePost(key) {
      dbPostsRef.child(key).remove()
    }
  }
}
</script>