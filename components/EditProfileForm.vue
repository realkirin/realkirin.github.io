<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-text-field name="firstName" label="FirstName" v-model="userData.firstName"></v-text-field>
        <v-text-field name="lastName" label="LastName" v-model="userData.lastName"></v-text-field>
        <v-text-field name="age" label="Age" v-model="userData.age"></v-text-field>
        <v-text-field name="bio" label="Bio" v-model="userData.bio"></v-text-field>
      </v-card>
    </v-flex>
  </v-layout>
  <!-- add user db within firebase
       add firstname, lastname, displayName(this will be seperate than what is retrieved from google)
       so change that in createcoment,
       uid field, created datetime, updated datetime, bio, emailVerified(get from firebase user auth data)
       posts array(contains ids from the posts that the user created)
       commented on(array of post id keys)
       crate comments collections in firebase, for each posts, create keyid to each comment in comments collection
       -->

</template>

<script>
  export default {
    data () {
      return {
        userData: {
          firstName: null,
          lastName: null,
          age: null,
          uid: null,
          createdDateTime: null,
          updatedDateTime: null,
          bio: null,
          emailVerified: null,
          posts: null,
          comments: null,
        }
      }
    }
  }
</script>
