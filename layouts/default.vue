<template>
  <v-app dark>
    <v-navigation-drawer :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" fixed app>
      <v-list>
        <v-list-tile router :to="item.to" :key="i" v-for="(item, i) in items" exact>
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <!--
      <v-list v-if="user">
        <v-list-tile router :to="authedItem.to" :key="j+10" v-for="(authedItem, j) in authedItems" exact>
          <v-list-tile-action>
            <v-icon v-html="authedItem.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="authedItem.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list> -->


    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [{
            icon: 'apps',
            title: 'Welcome',
            to: '/'
          },
          {
            icon: 'lock_open',
            title: 'Login',
            to: '/login'
          },
          {
            icon: 'lock_open',
            title: 'Register',
            to: '/register'
          },
          {
            icon: 'person',
            title: 'Profile',
            to: '/profile'
          },
          {
            icon: 'create',
            title: 'Admin',
            to: '/admin'
          },
          {
            icon: 'create',
            title: 'Blog',
            to: '/blog'
          }
        ],
        /* causing error
        authedItems: [{
            icon: 'apps',
            title: 'Welcome',
            to: '/'
          },
          {
            icon: 'person',
            title: 'Profile',
            to: '/profile'
          },
          {
            icon: 'create',
            title: 'Admin',
            to: '/admin'
          }
        ], */
        miniVariant: false,
        title: 'Nuxt Firebase Login'
      }
    },
    computed: {
      user() {
        return this.$store.getters.user
      },

    },
  }

</script>
