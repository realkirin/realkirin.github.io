<template>
  <v-container>
    <v-layout>
      <v-flex xs12 md12>
        <app-view-single-post>
        </app-view-single-post>
      </v-flex>
      <v-flex xs12 md12>
        <app-create-comment>
        </app-create-comment>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  // import CreatePost from "@/components/CreatePost"
  import ViewSinglePost from "@/components/ViewSinglePost"
  import CreateComment from "@/components/CreateComment"

  export default {
    components: {
      // appCreatePost: CreatePost,
      appViewSinglePost: ViewSinglePost,
      appCreateComment: CreateComment
    }
  }

</script>
