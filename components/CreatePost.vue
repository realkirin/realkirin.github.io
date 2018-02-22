<template>
  <v-layout>
    
  </v-layout>
</template>

<template>
  <form>
    <h3>Make a new post:</h3>
    <div class="form-group row">
      <label class="col-sm-3">Name</label>
      <div class="col-sm-9">
        <input type="text" class="form-control" v-model="newPost.title">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-3">Description</label>
      <div class="col-sm-9">
        <textarea type="text" class="form-control" rows="5" v-model="newPost.body"></textarea>
      </div>
    </div>
    <div class="form-group row">
      <button type="button" class="btn btn-success btn-block" @click="addNewPost">Add</button>
    </div>
  </form>
</template>

<script>
import { dbPostsRef } from '../plugins/firebase.js'

export default {
  data() {
    return {
      newPost: {
        title: "Eg. Margherita",
        body: "Eg. A delicious tomato based pizza topped with mozzarella"
      }
    };
  },
  methods: {
    addNewPost() {
      // will push the data from the form to the firebase database
      dbPostsRef.push(this.newPost);
    }
  }
}
</script>