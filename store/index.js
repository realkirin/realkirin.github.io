import Vuex from 'vuex'

import user from './user'
import shared from './shared'
import blogPosts from './blogPosts'
import {
  firebaseMutations
} from 'vuexfire'

const store = () => {
  return new Vuex.Store({
    mutations: { ...firebaseMutations
    },
    modules: {
      user: user,
      shared: shared,
      blogPosts: blogPosts
    }
  })
}

export default store;
