import {
  firebaseAction
} from 'vuexfire'

import user from '../user'

const state = {
  posts: [],
  updatePost: {
    key: null,
    title: null,
    body: null
  },
  viewPostKey: null
}

const getters = {
  getPosts: state => state.posts,
  getUpdatePost: state => state.updatePost, // get post key to update post
  getViewPostKey: state => state.viewPostKey
}

const mutations = {
  // pushes to the states "posts" array
  addPost: (state, posts) => state.posts.push(posts),

  // expects payload with key, title, and body attributes
  setUpdatePost: function (state, payload) {
    state.updatePost = {
      key: payload.key,
      title: payload.title,
      body: payload.body
    }
  },

  setViewPostKey: (state, key) => state.viewPostKey = key
}

const actions = {
  // set vuexfire firebase reference
  setPostsRef: firebaseAction(({bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('posts', ref)
  }),

};

export default {
  state,
  mutations,
  getters,
  actions
}
