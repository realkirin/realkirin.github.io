<template>
  <v-container>
    <v-layout>
      <v-flex xs6 md6>
        <app-create-post>
        </app-create-post>
      </v-flex>

      <v-flex xs6 md6>
        <app-view-posts>
        </app-view-posts>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import CreatePost from "@/components/CreatePost"
  import ViewPosts from "@/components/ViewPosts"

  export default {
    components: {
      appCreatePost: CreatePost,
      appViewPosts: ViewPosts
    }
  }

</script>
