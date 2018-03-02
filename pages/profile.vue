<template>
  <v-container>
    <app-edit-profile-form></app-edit-profile-form>
    <app-profile></app-profile>
  </v-container>
</template>

<script>
  import Profile from '@/components/Profile'
  import EditProfileForm from '@/components/EditProfileForm'

  export default {
    components: {
      appProfile: Profile,
      appEditProfileForm: EditProfileForm
    },
    middleware: ["userAuthed"],
  }

</script>
